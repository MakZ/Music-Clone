const deezer = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: "GET",
      headers: {
        "x-rapidapi-key": "3e3c6bdaa3mshbb452ba41a39dbbp1bfa0fjsn89762b416a91",
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
      },
    });

    const data = await response.json();
    return data;
  } catch (e) {
    console.error(`API ERROR : ${e.message}`);
  }
};

const getGenres = async () => {
  const promises = [
    23,
    12,
    16,
    36,
    65,
    67,
    73,
  ].map(async (id) => {
    const promise = await deezer(`/genre/${id}`);
    return promise;
  });
  const data = await Promise.all(promises);
  return data;
};
