export interface LoginResponse {
  message: string;
  token: string;
}

export interface Action {
  type: string;
  payload?: any;
}

export interface Point {
  _id: string;
  lat: string;
  lng: string;
}

export interface ZoneResponse {
  _id?: string;
  label: string;
  color: string;
  points: Point[];
  user?: string;
  __v?: number;
}

export interface DefaultRootState {
  auth : any,
  zone : any,
}
