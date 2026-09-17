import axios from 'axios';
const StarWarsDetailsAPI = async (resource: string, id: string) => {
  const results = await axios.get(
    `https://star-wars-api-bi5l.onrender.com/api/v1/${resource}/${id}`
  );
  return results.data;
};

export default StarWarsDetailsAPI;
