export interface Volunteer {
  id: number;
  arab_name: string;
  eng_name: string;
  age: number;
  role: {id: number, name: string};
  committee: {id: number, name: string};
  gmail: string;
  linkedIn: string;
  image: string;
}
