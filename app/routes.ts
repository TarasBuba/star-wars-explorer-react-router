import {
  type RouteConfig,
  index,
  route,
  layout,
} from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  layout('components/layout/MainLayout.tsx', [
    route('characters', 'routes/characters.tsx'),
    route(
      'characters/:id',
      'routes/detail/CharactersDetails/CharactersDetailContainer.tsx'
    ),

    route('films', 'routes/films.tsx'),
    route('films/:id', 'routes/detail/FilmDetail/FilmDetailContainer.tsx'),

    route('planets', 'routes/planets.tsx'),
    route(
      'planets/:id',
      'routes/detail/PlanetsDetail/PlanetsDetailContainer.tsx'
    ),

    route('species', 'routes/species.tsx'),
    route(
      'species/:id',
      'routes/detail/SpeciesDetail/SpeciesDetailContainer.tsx'
    ),

    route('starships', 'routes/starships.tsx'),
    route(
      'starships/:id',
      'routes/detail/StarshipsDetail/StarshipsDetailContainer.tsx'
    ),

    route('vehicles', 'routes/vehicles.tsx'),
    route(
      'vehicles/:id',
      'routes/detail/VehiclesDetail/VehiclesDetailContainer.tsx'
    ),

    route('organizations', 'routes/organizations.tsx'),
    route(
      'organizations/:id',
      'routes/detail/OrganizationsDetail/OrganizationsDetailContainer.tsx'
    ),

    route('weapons', 'routes/weapons.tsx'),
    route(
      'weapons/:id',
      'routes/detail/WeaponsDetail/WeaponsDetailContainer.tsx'
    ),

    route('droids', 'routes/droids.tsx'),
    route(
      'droids/:id',
      'routes/detail/DroidsDetail/DroidsDetailsContainer.tsx'
    ),

    route('quiz', 'routes/quiz.tsx'),
  ]),
] satisfies RouteConfig;
