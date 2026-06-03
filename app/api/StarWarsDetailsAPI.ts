const StarWarsDetailsAPI = async (resource: string, id: string) => {
  const response = await fetch(
    `https://star-wars-api-bi5l.onrender.com/api/v1/${resource}/${id}`
  );
  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${resource} with id ${id}: ${response.statusText}`
    );
  }
  const results = await response.json();
  return results;
};

export default StarWarsDetailsAPI;
