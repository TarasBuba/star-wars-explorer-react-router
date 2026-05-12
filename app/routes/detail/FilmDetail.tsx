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
import Card from '~/components/Card';
import {
  getAllPlanets,
  getAllCharacters,
  getAllSpecies,
  getAllOrganizations,
} from '~/api/StarWarsAPI';

export default function FilmDetail() {
  const { id } = useParams();

  const { data: allDataPlanets } = useAsync<Planets[]>(getAllPlanets);
  const { data: allDataCharacters } = useAsync<Characters[]>(getAllCharacters);
  const { data: allDataSpecies } = useAsync<Species[]>(getAllSpecies);
  const { data: allDataOrganizations } =
    useAsync<Organizations[]>(getAllOrganizations);

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
          { label: 'Canon', value: film?.canon ? 'Yes' : 'No' },
          {
            label: 'Characters',
            value: film?.characters.map((char) => (
              <span>
                <LinkResolved
                  key={char}
                  value={char}
                  resource="characters"
                  idKey="id"
                  matchKey="id"
                  collection={allDataCharacters || []}
                />
                {' | '}
              </span>
            )),
          },
          {
            label: 'Planets',
            value: film?.planets.map((planet) => (
              <span>
                <LinkResolved
                  key={planet}
                  value={planet}
                  resource="planets"
                  idKey="id"
                  matchKey="id"
                  collection={allDataPlanets || []}
                />
                {' | '}
              </span>
            )),
          },
          {
            label: 'Species',
            value: film?.species.map((specie) => (
              <span>
                <LinkResolved
                  key={specie}
                  value={specie}
                  resource="species"
                  idKey="id"
                  matchKey="id"
                  collection={allDataSpecies || []}
                />
                {' | '}
              </span>
            )),
          },
          {
            label: 'Organizations',
            value: film?.organizations.map((org) => (
              <span>
                <LinkResolved
                  key={org}
                  value={org}
                  resource="organizations"
                  idKey="id"
                  matchKey="id"
                  collection={allDataOrganizations || []}
                />
                {' | '}
              </span>
            )),
          },
        ]}
      />
    </DataWrapper>
  );
}
