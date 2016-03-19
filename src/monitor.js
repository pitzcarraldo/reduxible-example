import Monyt, {
  GraphiteSender,
  RequestCountMetrics,
  ErrorCountMetrics,
  MemoryMetrics,
  MemoryLeakMetrics,
  GarbageCollectionMetrics,
  EventLoopLagMetrics
} from 'monyt';
import os from 'os';

const apiKey = process.env.HOSTEDGRAPHITE_APIKEY || 'GRAPHITE';
const interval = 10000;
const prefix = `${apiKey}.reduxible.${os.hostname()}.`;
const senders = [new GraphiteSender({
  host: 'da46402c.carbon.hostedgraphite.com',
  port: '2003'
})];

const metricses = [
  new RequestCountMetrics(),
  new ErrorCountMetrics(),
  new MemoryMetrics(),
  new MemoryLeakMetrics(),
  new GarbageCollectionMetrics(),
  new EventLoopLagMetrics({ interval })
];

export default new Monyt({
  interval,
  senders,
  metricses,
  prefix,
  replaceConsole: true
});
