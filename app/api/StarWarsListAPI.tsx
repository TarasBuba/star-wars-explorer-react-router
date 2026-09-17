import axios from 'axios';

const StarWarsListAPI = async (resource: string) => {
  const results = await axios.get(
    `https://star-wars-api-bi5l.onrender.com/${resource}`
  );
  return results.data.data;
};

export default StarWarsListAPI;
