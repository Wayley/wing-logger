# wing-logger

```ts
import Logger, { Appender, type ExecuteHandler } from 'wing-logger';

const logAsync: ExecuteHandler = (value: string) =>
  new Promise((resolve) => {
    setTimeout(() => {
      console.log(value);
      resolve(true);
    }, Math.random() * 500);
  });

const logger = new Logger('subject');
logger.addAppenders([new Appender(logAsync)]);

setTimeout(() => {
  logger.log(1);
}, 200);
logger.log(2);
logger.log(3);

// The console output:
// 2
// 3
// 1
```
