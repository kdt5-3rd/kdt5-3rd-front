export interface LocationResult {
  title: string;
  address: string;
  category: string;
  description: string;
  link: string;
  roadAddress: string;
  telephone: string;
}

export interface RawSearchResult extends LocationResult {
  mapx: string;
  mapy: string;
}

export interface GeoSearchResult extends LocationResult {
  mapx: number;
  mapy: number;
}

