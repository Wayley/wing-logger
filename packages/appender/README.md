# @wing-logger/appender

```ts
import Appender, { type ExecuteHandler } from '@wing-logger/appender';

const handler: ExecuteHandler = (value: string) =>
  new Promise((resolve) => {
    setTimeout(() => {
      console.log(value);
      resolve(true);
    }, Math.random() * 500);
  });

const appender = new Appender(handler);
```
