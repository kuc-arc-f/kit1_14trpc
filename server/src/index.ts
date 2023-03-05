import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import cors from 'cors';
import { z } from 'zod';
//
import {taskRouter} from './routes/tasks'
import {userRouter} from './routes/users'
//
const app = express();
const PORT = 3000;
app.use(cors());

import { router, publicProcedure } from './trpc';
//type
interface User {
  id: string;
  name: string;
}
const userList: User[] = [
  {
    id: '1',
    name: 'User_1st',
  },
];
//
const appRouter = router({
  hello: publicProcedure.query(() => {
    return 'Hello World-111';
  }),
  task: taskRouter,   
  user: userRouter,   
});
//
app.get('/', (_req, res) => res.send('hello'));
app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  })
);
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));

export type AppRouter = typeof appRouter;
