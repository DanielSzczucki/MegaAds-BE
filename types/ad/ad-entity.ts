//określamy typy danych które będą u nas w klasie występować
export interface AdEntity {
  id: string;
  name: string;
  description: string;
  price: number;
  url: string;
  lat: number;
  lon: number;
}

//tworzymy interface dodawania, w którym zrobimy id na nie wymagane
export interface NewAdEntity extends Omit<AdEntity, "id"> {
  id?: string;
}
