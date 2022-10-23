const deezer = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: "GET",
      headers: {
        "x-rapidapi-key": "d445c11f9fmsh56df24a1c7a5a23p1c4426jsnd53880f12332",
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
