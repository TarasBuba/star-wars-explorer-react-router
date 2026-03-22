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
    route('characters/:id', 'routes/detail/CharactersDetail.tsx'),

    route('films', 'routes/films.tsx'),
    route('films/:id', 'routes/detail/FilmDetail.tsx'),

    route('planets', 'routes/planets.tsx'),
    route('planets/:id', 'routes/detail/PlanetsDetail.tsx'),

    route('species', 'routes/species.tsx'),
    route('species/:id', 'routes/detail/SpeciesDetail.tsx'),

    route('starships', 'routes/starships.tsx'),
    route('starships/:id', 'routes/detail/StarshipsDetail.tsx'),

    route('vehicles', 'routes/vehicles.tsx'),
    route('vehicles/:id', 'routes/detail/VehiclesDetail.tsx'),

    route('organizations', 'routes/organizations.tsx'),
    route('organizations/:id', 'routes/detail/OrganizationsDetail.tsx'),

    route('events', 'routes/events.tsx'),
    route('events/:id', 'routes/detail/EventsDetail.tsx'),

    route('quotes', 'routes/quotes.tsx'),
    route('quotes/:id', 'routes/detail/QuotesDetail.tsx'),

    route('weapons', 'routes/weapons.tsx'),
    route('weapons/:id', 'routes/detail/WeaponsDetail.tsx'),
  ]),
] satisfies RouteConfig;
