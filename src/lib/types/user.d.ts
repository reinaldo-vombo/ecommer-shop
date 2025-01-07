import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: IUser & DefaultSession['user'];
  }

  export interface IUser {
    id: string;
    name: string;
    email: string;
    avatar: string;
    roleId: number;
  }
}
