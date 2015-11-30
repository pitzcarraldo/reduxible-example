import log4js from 'log4js';

log4js.configure({
  appenders: [
    {
      type: "console",
      layout: {
        type: "pattern",
        pattern: "%-5p %d{yyyy-MM-dd HH:mm:ss} [cluster-%y] - %m"
      }
    }
  ],
  replaceConsole: true
});
