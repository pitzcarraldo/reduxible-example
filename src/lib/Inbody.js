import graphite from 'graphite';
import Measured from 'measured';
import gc from 'gc-stats';
import os from 'os';
import cluster from 'cluster';
import eventLoopLag from 'event-loop-lag';

export default class Inbody {
  constructor(options) {
    this.client = graphite.createClient(`plaintext://${options.graphite.host}:${options.graphite.port}/`);
    this.id = options.graphite.prefix + '.' + os.hostname() + '.' + cluster.worker.id;
    this.requests = new Measured.Meter();
    this.errors = new Measured.Meter();
    this.lag = eventLoopLag(interval);
    this.gc = (gc)();
    this.defaultEvents(options.interval);
  }

  defaultEvents(interval) {
    setInterval(() => {
      this.send(this.getMetrics());
    }, interval);

    gc.on('stats', function (stats) {
      this.send(this.getGCMetrics(stats));
    });
  }

  getMetrics() {
    const metrics = {};
    metrics[`${this.id}.node.eventLoopLag`] = this.lag();
    metrics[`${this.id}.node.requestCount`] = this.requests.toJSON().currentRate;
    metrics[`${this.id}.node.errorCount`] = this.errors.toJSON().currentRate;
    metrics[`${this.id}.node.memory`] = process.memoryUsage();
    return metrics;
  }

  getGCMetrics(stats) {
    const metrics = {};
    metrics[`${this.id}.node.gc.${this.getGCType(stats.gctype)}`] = stats.pauseMS;
    return metrics;
  }

  getGCType(type) {
    switch (type) {
      case 1 :
        return 'minor';
      case 2 :
        return 'major';
      case 3 :
        return 'major';
      default :
        return '';
    }
  }

  send(metrics) {
    this.client.write(metrics, function (err) {
      console.error(err);
    });
  }

  middleware() {
    return (req, res, next) => {
      this.requests.mark();
      if (res.statusCode >= 400) {
        this.errors.mark();
      }
      next();
    }
  }
}
