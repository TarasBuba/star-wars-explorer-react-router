import { type RouteConfig, index, route } from "@react-router/dev/routes";
import MainLayout from "./components/layout/MainLayout";

export default [
  
  index("routes/home.tsx"),
  
  route("people", "routes/people.tsx"),
  route("people/:id", "routes/detail/PeopleDetail.tsx"),

  route("films", "routes/films.tsx"),
  route("films/:id", "routes/detail/FilmDetail.tsx"),

  route("planets", "routes/planets.tsx"),
  route("planets/:id", "routes/detail/PlanetsDetail.tsx"),

  route("species", "routes/species.tsx"),
  route("species/:id", "routes/detail/SpeciesDetail.tsx"),

  route("starships", "routes/starships.tsx"),
  route("starships/:id", "routes/detail/StarshipsDetail.tsx"),

  route("vehicles", "routes/vehicles.tsx"),
  route("vehicles/:id", "routes/detail/VehiclesDetail.tsx"),
] satisfies RouteConfig;

