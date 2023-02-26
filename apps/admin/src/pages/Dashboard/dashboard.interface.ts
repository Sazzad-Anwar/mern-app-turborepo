export interface IUser {
  id: number;
  name: string;
  username?: string;
  email: string;
  address: IAddress;
}

export interface IAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Geo {
  lat: string;
  lng: string;
}
