export type Pagination<T> = {
  items: T[];
  itemsPerPage: number;
};

export type DetailsProps = {
  resource: string;
  id: string | undefined;
};

export type ListProps = {
  resource: string;
};

export type CharactersDetails = {
  id: number;
  name: string;
  rank: string;
  force_side: string;
  lightsaber_colors: string[];
  birth_year: string;
  death_year: string;
  status: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  homeworld_id: string;
  mass: string;
  skin_color: string;
  films: string[];
  spacies_id?: string;
  affiliations?: string[];
  apprearances?: string[];
  apprentices?: string[];
  masters?: string[];
  era?: string[];
  canon: boolean;
};

export type EventsDetails = {
  name: string;
  date: string;
  type: string;
  location_id: string;
  description: string;
  participants: string[];
  organizations_involved: string[];
  casualties: string;
  outcome: string;
  significance: string;
  film_id: number;
  canon: boolean;
  url: string;
};

export type FilmDetails = {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  timeline_date: string;
  characters: string[];
  planets: string[];
  species: string[];
  organizations: string[];
  vehicles: string[];
  starships: string[];
  canon: boolean;
};

export type OrganizationsDetails = {
  name: string;
  type: string;
  founding_date: string;
  dissolution_date: string;
  refounded_date: string;
  ideology: string;
  force_alignment: string;
  headquarters_id: number;
  leader_id: number;
  notable_members: string[];
  era: string[];
  status: string;
  canon: boolean;
};

export type PlanetsDetails = {
  name: string;
  diameter: string;
  climate: string;
  terrain: string;
  population: string;
  gravity: string;
  surface_water: string;
  orbital_period: string;
  rotation_period: string;
  region: string;
  sector: string;
  system: string;
  suns: string;
  moons: string;
  affiliation: string[];
  notable_locations: string[];
  native_species: string[];
  canon: boolean;
};

export type QuotesDetails = {
  id: number;
  text: string;
  character_id: number;
  film_id: number;
  context: string;
  is_iconic: boolean;
  canon: boolean;
};

export type SpeciesDetails = {
  name: string;
  classification: string;
  designation: string;
  average_lifespan: string;
  average_height: string;
  skin_colors: string[];
  hair_colors: string[];
  eye_colors: string[];
  language: string;
  homeworld_id: string;
  force_sensitive: string;
  canon: boolean;
};

export type StarshipsDetails = {
  name: string;
  model: string;
  manufacturer: string;
  class: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  armament: string[];
  affiliations: string[];
  pilots?: string[];
  canon: boolean;
};

export type VehiclesDetails = {
  name: string;
  model: string;
  manufacturer: string;
  class: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  armor: string;
  vehicle_class: string;
  armament: string[];
  affiliation: string[];
  canon: boolean;
};
export type WeaponsDetails = {
  name: string;
  type: string;
  manufacturer: string;
  model: string;
  range: string;
  owner_id: number;
  current_owner_id: number;
  color: string;
  crystal_type: string;
  crystal_origin_id: number;
  hilt_material: string;
  blade_length: string;
  special_features: string[];
  affiliations: string[];
  first_appearance_film_id: number;
  canon: boolean;
};

export type Characters = {
  name: string;
  height: string;
  birth_year: string;
  gender: string;
  id: number;
};

export type Events = {
  name: string;
  date: string;
  description: string;
  url: string;
};

export type Films = {
  name: string;
  director: string;
  producer: string;
  release_date: string;
  canon: boolean;
  url: string;
};

export type Organizations = {
  name: string;
  type: string;
  force_alignment: string;
  status: string;
  url: string;
};

export type Planets = {
  name: string;
  population: string;
  climate: string;
  terrain: string;
  url: string;
};

export type Quotes = {
  text: string;
  is_iconic: boolean;
  url: string;
};

export type Species = {
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  average_lifespan: string;
  url: string;
};

export type Starships = {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  url: string;
};

export type Vehicles = {
  name: string;
  model: string;
  manufacturer: string;
  url: string;
};

export type Weapons = {
  name: string;
  type: string;
  model: string;
  color: string;
  url: string;
};

export type DataWrapperProps = {
  children: React.ReactNode;
  loading: boolean;
  error: string | null;
};
