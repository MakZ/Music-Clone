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
    0,
    132,
    116,
    152,
    113,
    165,
    85,
    106,
    466,
    144,
    129,
    98,
    173,
    169,
    2,
    12,
    16,
    153,
    75,
    81,
    95,
    197,
  ].map(async (id) => {
    const promise = await deezer(`/genre/${id}`);
    return promise;
  });
  const data = await Promise.all(promises);
  return data;
};
