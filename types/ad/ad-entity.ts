//tworzymy interfejs zawierający wyselekcjonowane dane wysyłane na front mampy
export interface SimpleAdEntity {
  id: string;
  lat: number;
  lon: number;
}

//określamy typy danych które będą u nas w klasie występować
export interface AdEntity extends SimpleAdEntity {
  name: string;
  description: string;
  price: number;
  url: string;
}

//tworzymy interface dodawania, w którym zrobimy id na nie wymagane
export interface NewAdEntity extends Omit<AdEntity, "id"> {
  id?: string;
}
