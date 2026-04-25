const StarWarsDetailsAPI = async (resource: string, id: string) => {
  const response = await fetch(
    `https://star-wars-api-bi5l.onrender.com/${resource}/${id}`
  );
  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${resource} with id ${id}: ${response.statusText}`
    );
  }
  const data = await response.json();
  return data.results;
};

export default StarWarsDetailsAPI;
