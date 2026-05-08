import useDetails from '~/hooks/useAsync';
import { useParams } from 'react-router';
import LinkResolved from '~/utils/link-resolved';
import DataWrapper from '~/components/DataWrapper';
import type {
  FilmDetails,
  Planets,
  Characters,
  Species,
  Organizations,
} from '~/types/types';
import useAsync from '~/hooks/useAsync';
import { useCallback } from 'react';
import StarWarsDetailsAPI from '~/api/StarWarsDetailsAPI';
import StarWarsListAPI from '~/api/StarWarsListAPI';
import Card from '~/components/Card';

export default function FilmDetail() {
  const { id } = useParams();

  const fetchPlanets = useCallback(() => {
    return StarWarsListAPI('planets');
  }, []);
  const fetchCharacters = useCallback(() => {
    return StarWarsListAPI('characters');
  }, []);
  const fetchSpecies = useCallback(() => {
    return StarWarsListAPI('species');
  }, []);
  const fetchOrganizations = useCallback(() => {
    return StarWarsListAPI('organizations');
  }, []);
  const { data: allDataPlanets } = useAsync<Planets[]>(fetchPlanets);
  const { data: allDataCharacters } = useAsync<Characters[]>(fetchCharacters);
  const { data: allDataSpecies } = useAsync<Species[]>(fetchSpecies);
  const { data: allDataOrganizations } =
    useAsync<Organizations[]>(fetchOrganizations);

  const fetchFilmsDetails = useCallback(() => {
    return StarWarsDetailsAPI('films', id || '');
  }, [id]);

  const {
    data: film,
    loading,
    error,
  } = useDetails<FilmDetails>(fetchFilmsDetails);

  return (
    <DataWrapper loading={loading} error={error}>
      <Card
        heading={film?.title}
        fields={[
          { label: 'Episode', value: film?.episode_id },
          { label: 'Director', value: film?.director },
          { label: 'Producer', value: film?.producer },
          { label: 'Release Date', value: film?.release_date },
          { label: 'Opening Crawl', value: film?.opening_crawl },
          { label: 'Timeline Date', value: film?.timeline_date },
        ]}
      />
      <ul>
        {film?.characters.map((character: string) => (
          <li key={character}>
            <LinkResolved
              key={character}
              value={character}
              resource="characters"
              idKey="id"
              matchKey="id"
              collection={allDataCharacters || []}
            />
          </li>
        ))}
      </ul>
      <ul>
        {film?.planets.map((planet: string) => (
          <li key={planet}>
            <LinkResolved
              key={planet}
              value={planet}
              resource="planets"
              idKey="id"
              matchKey="id"
              collection={allDataPlanets || []}
            />
          </li>
        ))}
      </ul>
      <ul>
        {film?.species.map((specie: string) => (
          <li key={specie}>
            <LinkResolved
              key={specie}
              value={specie}
              resource="species"
              idKey="id"
              matchKey="id"
              collection={allDataSpecies || []}
            />
          </li>
        ))}
      </ul>
      <ul>
        {film?.organizations.map((org: string) => (
          <li key={org}>
            <LinkResolved
              key={org}
              value={org}
              resource="organizations"
              idKey="id"
              matchKey="id"
              collection={allDataOrganizations || []}
            />
          </li>
        ))}
      </ul>
    </DataWrapper>
  );
}
