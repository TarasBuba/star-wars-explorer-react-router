import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  // route('people/:id', 'routes/people.tsx'),
  route("people", "routes/people.tsx"),
  route("padawans", "routes/padawans.tsx"),
  route("masters", "routes/masters.tsx"),
  route("films", "routes/films.tsx"),
  route("films/:id", "routes/detail/FilmDetail.tsx"),
  route("planets", "routes/planets.tsx"),
] satisfies RouteConfig;

