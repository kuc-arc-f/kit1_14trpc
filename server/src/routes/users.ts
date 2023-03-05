import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
//
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
//type
//
export const userRouter = router({
  hello: publicProcedure.query(() => { return 'Hello World-444';}),  
  helloName: publicProcedure
    .input(z.object({ name: z.string(), age: z.number() }))
    .query(({ input }) => {
      return {
        name: `Hello World ${input.name}`,
        age: input.age,
      };
  }),  
  /**
   * userById
   * @param
   *
   * @return
   */   
  userById: publicProcedure
  .input((val: unknown) => {
    if (typeof val === 'string') return val;
    throw new Error(`Invalid input: ${typeof val}`);
  })
  .query((req) => {
    const input = req.input;
    const user = userList.find((it) => it.id === input);
    return user;
  }),
  /**
   * userCreate
   * @param
   *
   * @return
   */   
  userCreate: publicProcedure
  .input(z.object({ name: z.string() }))
  .mutation((req) => {
    //const id = `${Math.random()}`;
    const id =  Math.floor(Math.random() * 1000 * 1000);
    const user: User = {
      id: String(id),
      name: req.input.name,
    };
console.log(user);
    userList.push(user);
    return user;
  }),
  /**
   * getUserList
   * @param
   *
   * @return
   */   
  getUserList: publicProcedure.query(() => {
    return userList;
  }),   
  
});

