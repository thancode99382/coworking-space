// interfaces.ts
export interface IUser {
  username: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
}
