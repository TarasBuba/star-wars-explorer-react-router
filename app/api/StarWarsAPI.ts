import StarWarsListAPI from '~/api/StarWarsListAPI';
import StarWarsDetailsAPI from './StarWarsDetailsAPI';

export const getAllCharacters = () => StarWarsListAPI('characters');

export const getAllPlanets = () => StarWarsListAPI('planets');

export const getAllSpecies = () => StarWarsListAPI('species');
export const getAllOrganizations = () => StarWarsListAPI('organizations');

export const getAllStarships = () => StarWarsListAPI('starships');

export const getAllVehicles = () => StarWarsListAPI('vehicles');

export const getAllQuotes = () => StarWarsListAPI('quotes');

export const getAllWeapons = () => StarWarsListAPI('weapons');
export const getAllFilms = () => StarWarsListAPI('films');
export const getAllEvents = () => StarWarsListAPI('events');

export const getAllDroids = () => StarWarsListAPI('droids');

export const getAllCreatures = () => StarWarsListAPI('creatures');

export function getResourceById(resource: string, id: string) {
  return StarWarsDetailsAPI(resource, id || '');
}
