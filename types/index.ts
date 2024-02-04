export interface IUser {
  id: string;
  name: string;
  email: string;
  hashedPassword: string | null;
  activity: string[] | null;
}

export interface ICategory {
  id: string;
  categoryname: string;
}
