import Card from '~/components/Card';
import LinkResolved from '~/utils/link-resolved';
import type {
  FilmDetails,
  Planets,
  Characters,
  Species,
  Organizations,
} from '~/types/types';

type Props = {
  film: FilmDetails | undefined;
  allDataCharacters: Characters[] | undefined;
  allDataPlanets: Planets[] | undefined;
  allDataSpecies: Species[] | undefined;
  allDataOrganizations: Organizations[] | undefined;
};

export default function useCreatureDetail({
  film,
  allDataCharacters,
  allDataPlanets,
  allDataSpecies,
  allDataOrganizations,
}: Props) {
  return (
    <Card
      variant="detail"
      image={film?.image}
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
  );
}
