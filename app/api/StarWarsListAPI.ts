import axios from 'axios';

const StarWarsListAPI = async (resource: string) => {
  const results = await axios
    .get(`https://star-wars-api-bi5l.onrender.com/${resource}`)
    .then(({ data }) => data);
  return results.data;
};

export default StarWarsListAPI;
