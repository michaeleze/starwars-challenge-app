export type Person = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

export type Film = {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
}

export type Planet = {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

export type ApiResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export type PlanetCardProps = Pick<Planet, 'name' | 'climate' | 'population' | 'terrain' | 'url'>;

export type CharacterDetails = Omit<Person, 'created' | 'edited' | 'species' | 'vehicles' | 'starships'>;

export type PlanetDetails = Omit<Planet, 'created' | 'edited' | 'residents'>;

export type CharacterCardProps = Pick<Person, 'name' | 'gender' | 'url'> & { birthYear: string };
