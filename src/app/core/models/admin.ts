export interface Admin {
  id: number;
  name: string;
  email: string;
  password: string;
  role: {id: string, name: string};
  committee: {id: string, name: string};
  image: string;
}
