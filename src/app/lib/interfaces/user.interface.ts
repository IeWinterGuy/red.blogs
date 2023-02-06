export interface User {
  username: string;
  email: string;
  role: string;
}

export interface IUser {
  nickname?: string;
  name: string | undefined;
  picture?: string;
  updated_at?: string;
  email?: string;
  email_verified?: boolean;
  sub?: string;
  user_id?: string
}
