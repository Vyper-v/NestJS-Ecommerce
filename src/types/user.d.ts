export interface User {
  _id: string;
  email: string;
  password: string;
  image: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  birthday: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}
