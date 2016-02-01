/**
 * @origin https://gist.github.com/bripkens/8597903
 * @modifier Minkyu Cho(mrnoname@naver)
 */
(function (context) {
  const Timer = Java.type('java.util.Timer');
  const Phaser = Java.type('java.util.concurrent.Phaser');
  const TimeUnit = Java.type('java.util.concurrent.TimeUnit');
  const System = Java.type('java.lang.System');
  const HttpClients = Java.type('com.github.reduxible.example.script.HttpClients');
  const HttpHeaders = Java.type('org.springframework.http.HttpHeaders');
  const HttpEntity = Java.type('org.springframework.http.HttpEntity');
  const HttpMethod = Java.type('org.springframework.http.HttpMethod');
  const ListenableFutureCallback = Java.type('org.springframework.util.concurrent.ListenableFutureCallback');
  context.parse = (object) => JSON.parse(HttpClients.toJson(object));

  context.window = context;
  context.window.document = {};
  context.window.document.coookie = '';
  context.console = {
    log: print,
    warn: print,
    error: print,
    debug: print
  };

  const timer = new Timer('jsEventLoop', false);
  let phaser = new Phaser();

  const onTaskFinished = () => phaser.arriveAndDeregister();

  context.setTimeout = (fn, millis, ...args) => {
    const phase = phaser.register();

    let canceled = false;
    timer.schedule(() => {
      if (canceled) {
        return;
      }

      try {
        fn.apply(context, args);
      } catch (e) {
        console.error(e);
      } finally {
        onTaskFinished();
      }
    }, millis);

    return () => {
      onTaskFinished();
      canceled = true;
    };
  };

  context.setInterval = (fn, delay, ...args) => {
    let cancel = null;

    const loop = () => {
      cancel = context.setTimeout(loop, delay);
      fn.apply(context, args);
    };

    cancel = context.setTimeout(loop, delay);
    return () => cancel();
  };

  context.clearTimeout = cancel => cancel();
  context.clearInterval = cancel => cancel();

  /**
   * we register the main(...) function with the phaser so that we
   * can be notified of all cases. If we wouldn't do this, we would have a
   * race condition as `fn` could be finished before we call `await(...)`
   * on the phaser.
   * @param fn
   * @param waitTimeMillis
   */
  context.main = (fn, waitTimeMillis) => {
    if (!waitTimeMillis) {
      waitTimeMillis = 60 * 1000;
    }
    if (phaser.isTerminated()) {
      phaser = new Phaser();
    }
    phaser.register();
    setTimeout(fn, 0);
    phaser.awaitAdvanceInterruptibly(phaser.arrive(),
      waitTimeMillis,
      TimeUnit.MILLISECONDS);
    phaser.arriveAndDeregister();
  };

  context.shutdown = function () {
    timer.cancel();
    phaser.forceTermination();
  };

  context.XMLHttpRequest = class XMLHttpRequest {
    constructor() {
      this.method = {};
      this.url = {};
      this.async = {};
      this.user = {};
      this.password = {};
      this.headers = {};
      this.readyState = 0;
      this.response = null;
      this.responseText = null;
      this.responseType = '';
      this.responseHeaders = {};
      this.status = null;
      this.statusText = null;
      this.withCredentials = false;
      this.timeout = 0;
    }

    abort() {
      throw new Error('Request aborted.');
    }

    ontimeout() {
      throw new Error('Request timed out.');
    }

    onload() {
    }

    onerror() {
    }

    onreadystatechange() {
    }

    getAllResponseHeaders() {
      let headers = '';
      Object.keys(this.responseHeaders).forEach((key) => {
        headers += `${key}: ${this.responseHeaders[key]}\n`;
      });
      return headers;
    }

    getResponseHeader(key) {
      return this.responseHeaders[key];
    }

    setRequestHeader(key, value) {
      this.headers[key] = value;
    };

    open(method, url, async = true, user = '', password = '') {
      this.method = method.toUpperCase();
      this.url = url;
      this.async = async;
      this.user = user;
      this.password = password;
      this.readyState = 1;
      setTimeout(this.onreadystatechange, 0);
    };

    send(data) {
      phaser.register();
      const client = this.async ? HttpClients.getAsync(this.timeout) : HttpClients.getSync(this.timeout);
      const method = HttpMethod.valueOf(this.method);
      const header = new HttpHeaders();

      Object.keys(this.headers)
        .forEach((name) => {
          const value = this.headers[name];
          header.set(name, value);
        });
      const entity = new HttpEntity(data, header);

      this.readyState = 2;
      setTimeout(this.onreadystatechange, 0);

      const response = client.exchange(this.url, method, entity, java.lang.Object.class);

      this.readyState = 3;
      setTimeout(this.onreadystatechange, 0);

      if (!this.async) {
        return this.setResponse(response);
      }

      return response.addCallback(new ListenableFutureCallback({
        onFailure: (error) => {
          console.log(JSON.stringify(parse(error)));
          if (this.onerror) {
            return this.onerror()
          }
          onTaskFinished();
          throw new Error(parse(error));
        },
        onSuccess: (res) => {
          this.setResponse(res);
        }
      }));
    }

    setResponse(res) {
      this.response = parse(res.body);
      this.responseText = JSON.stringify(this.response);
      this.responseHeaders = parse(res.getHeaders());
      this.status = res.statusCode.value();
      this.statusText = res.statusCode.value() + ' ' + res.statusCode.getReasonPhrase();
      this.readyState = 4;
      context.setTimeout(this.onreadystatechange, 0);
      context.setTimeout(this.onload, 0);
      onTaskFinished();
    }
  }
})(context);
