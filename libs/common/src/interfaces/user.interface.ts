export interface Iuser {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface IAuthUser extends Pick<Iuser, 'id' | 'name' | 'email'> {
  roles: string[];
}
