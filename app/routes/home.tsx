import type { Route } from "./+types/home";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Star Wars Universe" },
    {
      name: "description",
      content: "Browse People, Padawans and Masters",
    },
  ]
}

export default function Home() {
  return(
     <div className='grid place-items-center' >
      <h1 className='text-4xl font-bold' >Welcome to the Star Wars Universe!</h1>
      <div className='flex gap-4 text-2xl' >
        <Link to="/films">Films</Link>
        <Link to="/planets">Planets</Link>
        <Link to="/people">People</Link>
        <Link to="/padawans">Padawans</Link>
        <Link to="/masters">Masters</Link>
      </div>
      
    </div>
  )
}
