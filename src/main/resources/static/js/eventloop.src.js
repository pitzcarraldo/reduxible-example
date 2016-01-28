/**
 * @origin https://gist.github.com/bripkens/8597903
 * @modifier Minkyu Cho(mrnoname@naver)
 */
((context) => {
  const Timer = Java.type('java.util.Timer');
  const Phaser = Java.type('java.util.concurrent.Phaser');
  const TimeUnit = Java.type('java.util.concurrent.TimeUnit');
  const System = Java.type('java.lang.System');
  const RestTemplate = Java.type('org.springframework.web.client.RestTemplate');
  const AsyncRestTemplate = Java.type('org.springframework.web.client.AsyncRestTemplate');
  const HttpHeaders = Java.type('org.springframework.http.HttpHeaders');
  const HttpEntity = Java.type('org.springframework.http.HttpEntity');
  const HttpMethod = Java.type('org.springframework.http.HttpMethod');
  const HttpRequestFactory = Java.type('org.springframework.http.client.HttpComponentsClientHttpRequestFactory');
  const ListenableFutureCallback = Java.type('org.springframework.util.concurrent.ListenableFutureCallback');
  const JavaObject = Java.type('java.lang.Object');

  context.window = context;
  context.window.document = {};
  context.window.document.coookie = '';
  context.console.log = print;
  context.console.warn = print;
  context.console.error = print;
  context.console.debug = print;

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
    }

    ontimeout() {
      throw new Error('Request timed out.');
    }

    onreadystatechange() {
    }

    getAllResponseHeaders() {
      return JSON.stringify(this.responseHeaders);
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
      const requestFactory = new HttpRequestFactory();
      if (this.timeout) {
        requestFactory.setReadTimeout(this.timeout);
        requestFactory.setConnectionTimeout(this.timeout);
      }
      const client = this.async ? new AsyncRestTemplate(requestFactory) : new RestTemplate(requestFactory);
      const method = HttpMethod.valueOf(this.method);
      const header = new HttpHeaders();

      Object.keys(this.headers)
        .forEach((name) => {
          const value = this.headers[name];
          header.put(name, value);
        });
      const entity = new HttpEntity(data, header);

      this.readyState = 2;
      setTimeout(this.onreadystatechange, 0);
      const response = client.exchange(this.url, method, entity, JavaObject.class);
      if (this.async) {
        response.addCallback(new ListenableFutureCallback({
          onFailure: (error) => {
            throw new Error(error);
          },
          onSuccess: (res) => {
            this.readyState = 4;
            this.responseText = JSON.stringify(response.getBody());
            this.responseHeaders = response.getHeaders();
            this.response = response.getBody();
            this.status = response.getStatusCode().value;
            this.statusText = response.getStatusCode().toString();
            context.setTimeout(this.onreadystatechange, 0);
            phaser.arriveAndDeregister();
          }
        }));
      } else {
        this.readyState = 4;
        this.responseText = JSON.stringify(response.getBody());
        this.responseHeaders = response.getHeaders();
        this.response = response.getBody();
        this.status = response.getStatusCode().value;
        this.statusText = response.getStatusCode().toString();
        context.setTimeout(this.onreadystatechange, 0);
        phaser.arriveAndDeregister();
      }
    }
  }
})
(this);