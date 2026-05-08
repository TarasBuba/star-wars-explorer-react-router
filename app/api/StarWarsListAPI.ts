const StarWarsListAPI = async (resource: string) => {
  const response = await fetch(
    `https://star-wars-api-bi5l.onrender.com/${resource}`
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch ${resource}: ${response.statusText}`);
  }
  const results = await response.json();
  return results.data;
};

export default StarWarsListAPI;
