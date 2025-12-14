export interface City {
  id: string;
  name: string;
}

export interface District {
  id: string;
  name: string;
  cities: City[];
}

export interface Province {
  id: string;
  name: string;
  districts: District[];
}