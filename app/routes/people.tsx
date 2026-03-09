import { Link } from "react-router";
import { useState, useEffect } from "react";
// import PeopleDetail from "./detail/PeopleDetail";
import Card from "~/components/Card";
import Loading from "~/components/Loading";
import Errors from "~/components/Errors";
import useDetails from "~/hooks/useDetails";
import parseURL from "~/utils/parseURL";

interface People {
  name: string;
  height: string;
  birth_year: string,
  gender: string;
  url: string;
}

const People = () => {

  const { data: people, loading, error } = useDetails<People[]>({ resource: "people" })

  return (
    <>
      {loading ? <Loading /> : error ? <Errors message={error} /> : (
        <div className="p-4 bg-people min-h-screen">
          <h2 className="text-2xl font-bold mb-4 text-center text-amber-500">People</h2>
          <section className="p-4 grid gap-4 grid-cols-1 md:grid-cols-2 sm:grid-cols-3">
            {people?.map((person: People) => (
              <Link to={`/${parseURL(person.url).resource}/${parseURL(person.url).id}`} key={person.name} >
                <div key={person.name} className="border border-amber-400 rounded shadow p-4 flex justify-between items-center">

                  <Card heading={person.name} description={`Height: ${person.height}, Birth Year: ${person.birth_year}, Gender: ${person.gender}`} />
                </div>

              </Link >
            ))}
          </section>
        </div>
      )}
    </>


  )
};

export default People;