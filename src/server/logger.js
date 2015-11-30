import log4js from 'log4js';
const STACK_LIMIT = 11;
Error.stackTraceLimit = STACK_LIMIT;
log4js.configure({
  appenders: [
    {
      type: "console",
      layout: {
        type: "pattern",
        pattern: "%-5p %d{yyyy-MM-dd hh:mm:ss} [process-%y] %x{ln} - %m",
        tokens: {
          ln: function () {
            return (new Error).stack
              .split("\n")[STACK_LIMIT]
              .replace(/^\s+at\s+(\S+)\s\((.+?)([^\/]+):(\d+):\d+\)$/, function () {
                return `${arguments[1]} ${arguments[3]}:${arguments[4]}`;
              });
          }
        }
      }
    }
  ],
  replaceConsole: true
});
export default log4js.getLogger();
