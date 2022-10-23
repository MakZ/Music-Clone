/* GLOBAL VARIABLES */

const allGenres = [];

const popularAlbums = [
  "176538582",
  "11244086",
  "161984202",
  "162683632",
  "157795452",
  "137217782",
  "169236642",
  "110040592",
  "91598612",
  "122429752",
  "159826232",
  "15478674",
];

const trendingNowAlbums = [
  "180681412",
  "180996332",
  "178086012",
  "180983992",
  "181446752",
  "181270962",
  "179934622",
  "180450492",
  "178406382",
  "179902942",
  "179906172",
  "179682412",
];

const popularPlaylists = [
  "7237234924",
  "1060971691",
  "2350568586",
  "7588869202",
  "4383182182",
  "5673128942",
  "7188387004",
  "1406578475",
  "1307150595",
  "915487765",
  "1154685481",
  "3411272262",
];

const topPodcasts = [
  "6945004524",
  "6987111284",
  "7958865622",
  "2526838344",
  "4503899902",
  "2389444482",
  "4460913144",
  "1140232701",
  "762567663",
  "2932519662",
  "4613753548",
  "6682154564",
];

const dynamicDuosPodcasts = [
  "1479458365",
  "7969999942",
  "919949225",
  "1913763402",
  "2249258602",
  "1036183001",
  "7456464544",
  "1306931615",
  "2532117644",
  "1640842381",
  "1282523285",
  "2113355604",
];

const edmMusic = [
  "180696432",
  "179896722",
  "177337822",
  "180851592",
  "179028752",
  "174992922",
  "176299672",
  "175476642",
  "179246732",
  "174716722",
  "162913742",
  "174704752",
];

const workoutMusic = [
  "7458033284",
  "7470337224",
  "7585782982",
  "7470347344",
  "7458018624",
  "7470341484",
  "7470345864",
  "251740573",
  "1358731495",
  "2153050122",
  "1924357302",
  "1719648481",
];

const relaxAndChillMusic = [
  "1274663331",
  "3338949242",
  "7393760844",
  "1578812305",
  "1787912442",
  "1911222042",
  "1927928822",
  "1914526462",
  "952513765",
  "3526107782",
  "1390327745",
  "1281590615",
];

const bestNewReleases = [
  "1118156702",
  "1114646912",
  "1117483882",
  "1115454582",
  "1116144312",
  "1116224522",
];

const newAlbumsAndSingles = [
  "169236642",
  "110040592",
  "91598612",
  "122429752",
  "159826232",
  "15478674",
  "176538582",
  "11244086",
  "161984202",
  "162683632",
  "157795452",
  "137217782",
];

const tracksJustForYou = [
  "180681412",
  "180996332",
  "178086012",
  "180983992",
  "181446752",
  "181270962",
  "179934622",
  "180450492",
  "178406382",
  "179902942",
  "179906172",
  "179682412",
];

const playlistsJustForYou = [
  "1190301781",
  "1291471565",
  "1950512362",
  "7371445944",
  "7840420082",
  "4168772042",
  "6422922564",
  "1964028802",
  "1963962142",
  "63141574",
  "1964085082",
  "2098157264",
];

let randomColour;
let loadBrowseSection = false;
let loadPodcastSecion = false;
let loadMoodsAndGenresSection = false;
let loadNewReleasesSection = false;
let loadDiscoverSection = false;
let selectedAlbumID = 0;
let yourLibraryAlbums = [];

// PLAYER VARIABLES

const range = document.querySelector("#range");

let song_url =
  "https://cdns-preview-c.dzcdn.net/stream/c-ccce4f65bbb9c058ab50dbb70fc5332d-3.mp3";
let total_time = 0;
let isPlaying = false;

/******************************************************************/

/* SWITCH ACTIVE FUNCTION */

function switchActive() {
  const clickedLink = event.currentTarget.parentNode;
  const allNavLinks = document.querySelectorAll(".link-item");

  allNavLinks.forEach((e) => {
    if (e.classList.contains("active")) {
      e.classList.remove("active");
    }
  });
  clickedLink.classList.add("active");
}

/******************************************************************/

/* SWITCH BG FUNCTION */

function switchBGColour() {
  const aside = document.querySelector("aside");
  const clickedLink = event.currentTarget.innerText;

  switch (clickedLink) {
    case "TRENDING":
      aside.className = "";
      aside.classList.add("trending-bg");
      break;
    case "PODCAST":
      aside.className = "";
      aside.classList.add("podcasts-bg");
      if (loadPodcastSecion === false) {
        generateTopPodcasts();
        generateDynamicDuos();
        loadPodcastSecion = true;
      }
      break;
    case "MOODS AND GENRES":
      aside.className = "";
      aside.classList.add("moods-bg");
      if (loadMoodsAndGenresSection === false) {
        generateEDMMood();
        generateWorkoutMood();
        generateRelaxMood();
        loadMoodsAndGenresSection = true;
      }
      break;
    case "NEW RELEASES":
      aside.className = "";
      aside.classList.add("newreleases-bg");
      if (loadNewReleasesSection === false) {
        generateBestNewReleases();
        generateNewAlbumsAndSingles();
        loadNewReleasesSection = true;
      }
      break;
    default:
      aside.className = "";
      aside.classList.add("discover-bg");
      if (loadDiscoverSection === false) {
        generateTracksJustForYou();
        generatePlaylistsForYou();
        loadDiscoverSection = true;
      }
  }
}

/******************************************************************/

/* RANDOM COLOUR FUNCTION */

function getRandomColour() {
  let randomColourR = Math.floor(Math.random() * 166) + 89;
  let randomColourG = Math.floor(Math.random() * 166) + 89;
  let randomColourB = Math.floor(Math.random() * 166) + 89;
  randomColour = `${randomColourR},${randomColourG},${randomColourB}`;
}

/******************************************************************/

/* PLAYER FUNCTIONALITY */

let song = new Audio();
song.volume = 0.2;

function playMusic() {
  const play_btn = document.querySelector("#play_img");

  song.src = song_url;
  if (!isPlaying) {
    song.play();
    isPlaying = true;
    play_btn.classList.remove("fa-play");
    play_btn.classList.add("fa-pause");
  } else {
    song.pause();
    isPlaying = false;
    play_btn.setAttribute("class", "fa fa-play");
  }
  song.addEventListener("ended", function () {
    song.pause();
    isPlaying = false;
    play_btn.classList.remove("fa-pause");
    play_btn.classList.add("fa-play");
  });
}

// VOLUME CHANGE FUNCTION
function changeVolume(volume) {
  const volume_icon = document.querySelector("#player #volume-icon");

  song.volume = volume / 100;
  if (song.volume === 0) {
    volume_icon.classList.remove("fa-volume-down");
    volume_icon.classList.remove("fa-volume-up");
    volume_icon.classList.add("fa-volume-off");
  } else if (song.volume > 0 && song.volume < 0.5) {
    volume_icon.classList.remove("fa-volume-off");
    volume_icon.classList.remove("fa-volume-up");
    volume_icon.classList.add("fa-volume-down");
  } else if (song.volume > 0.5) {
    volume_icon.classList.remove("fa-volume-off");
    volume_icon.classList.remove("fa-volume-down");
    volume_icon.classList.add("fa-volume-up");
  }
}

// UPDATE CURRENT DURATION TEXT FUNCTION
function updateCurrentTimeDisplay(time) {
  const currentTimeContainer = document.querySelector(".track-time-current");

  let roundedTime = Math.round(time);

  let seconds = roundedTime % 60;
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  let minutes = (roundedTime - seconds) / 60;
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  const currentTime = minutes + ":" + seconds;

  current_time = currentTime;
  currentTimeContainer.innerHTML = currentTime;
}

// DURATION BAR CHANGE FUNCTION
song.ontimeupdate = function (value) {
  const songDurationBar = document.querySelector("#player-duration-bar");

  updateCurrentTimeDisplay(song.currentTime);

  let perc = Math.round((song.currentTime / song.duration) * 100);

  songDurationBar.value = perc;
};

// CHANGE PLACE IN SONG FUNCTION

function changeSongPlace(time) {
  song.currentTime = Math.round((time / 100) * song.duration);
}

/*********************************************************************/

function addActiveTrack() {
  const allTracks = document.querySelectorAll(".track-wrap");
  const clickedTrack = event.currentTarget;

  allTracks.forEach((e) => {
    if (e.classList.contains("active-track")) {
      e.classList.remove("active-track");
    }
  });

  clickedTrack.classList.add("active-track");
}

/* SHOW TRACKLIST PAGE FUNCTION */

const showTracklistPage = async () => {
  const tracklistPageContainer = document.querySelector("#tracklist-page");
  tracklistPageContainer.classList.remove("d-none");
  tracklistPageContainer.classList.add("d-flex");

  const albumID = document.querySelector("#tracklist-page .albumid");

  // Reset like button if not in library
  const likeButton = document.querySelector("#tracklist-page .btn-heart");

  let matchedID = 0;

  for (let i = 0; i < yourLibraryAlbums.length; i++) {
    if (yourLibraryAlbums[i].id === selectedAlbumID) {
      matchedID++;
    }
  }

  if (matchedID > 0) {
    likeButton.innerHTML = `<i class="fa fa-heart"></i>`;
    likeButton.classList.add("heart-fill");
  } else if (matchedID === 0) {
    likeButton.innerHTML = `<i class="far fa-heart"></i>`;
    likeButton.classList.remove("heart-fill");
  }

  // Search for necessary data
  const data = await deezer(`album/${selectedAlbumID}`);
  const trackData = await deezer(`album/${selectedAlbumID}/tracks`);

  // Populate left side album data
  const albumCover = document.querySelector("#tracklist-page #album-cover");
  const albumName = document.querySelector("#tracklist-page #album-name");
  const artistName = document.querySelector("#tracklist-page #artist-name");
  const numOfSongs = document.querySelector("#tracklist-page #num-of-songs");

  albumCover.style.backgroundImage = `url(${data.cover_medium})`;
  albumName.innerText = data.title;
  artistName.innerText = data.artist.name;
  numOfSongs.innerText = `${data.release_date.slice(0, 4)}  -  ${
    data.nb_tracks
  } SONGS`;
  albumID.innerHTML = data.id;

  // Add function to big play button
  const tracklistPlayButton = document.querySelector(
    "#tracklist-page .btn-play"
  );
  tracklistPlayButton.addEventListener("click", function loadSong() {
    song_url = trackData.data[0].preview;
    total_time = trackData.data[0].duration;
    player_coverArt.style.backgroundImage = `url("${data.cover_small}")`;
    player_trackName.innerText = trackData.data[0].title;
    player_artistName.innerHTML = `${data.artist.name}`;
    const allTracks = document.querySelectorAll(".track-wrap");
    allTracks[0].classList.add("active-track");
    playMusic();
  });

  // Show tracklist section and hide all other sections
  const tracklistPageSection = document.querySelector("#tracklist-page");
  const allSections = document.querySelectorAll("aside");
  allSections.forEach((e) => {
    e.classList.add("d-none");
  });
  tracklistPageSection.classList.remove("d-none");
  tracklistPageSection.classList.add("d-flex");

  // Populate right side track data
  const trackRow = document.querySelector("#track-row");

  const player_coverArt = document.querySelector("#player .player-cover-img");
  const player_trackName = document.querySelector("#player-song-name");
  const player_artistName = document.querySelector("#player-artist-name");
  const player_maxDuration = document.querySelector(".track-time-to-finish");

  trackRow.innerHTML = "";

  for (let i = 0; trackData.data.length; i++) {
    const newTrack = document.createElement("div");

    // Get song duration and convert to minutes/seconds
    let songDurationMinutes = Math.floor(trackData.data[i].duration / 60);
    if (songDurationMinutes < 10) {
      songDurationMinutes = "0" + songDurationMinutes;
    }

    let songDurationSeconds =
      trackData.data[i].duration - songDurationMinutes * 60;
    if (songDurationSeconds < 10) {
      songDurationSeconds = "0" + songDurationSeconds;
    }

    const songDurationFull =
      "00:" + songDurationMinutes + ":" + songDurationSeconds;

    // Add update player function to each track
    newTrack.addEventListener("click", function loadSong() {
      song_url = trackData.data[i].preview;
      total_time = trackData.data[i].duration;
      player_coverArt.style.backgroundImage = `url("${data.cover_small}")`;
      player_trackName.innerText =
        trackData.data[i].title.length > 25
          ? trackData.data[i].title.substring(0, 25) + "..."
          : trackData.data[i].title;
      player_artistName.innerHTML = `${data.artist.name}`;
      player_maxDuration.innerHTML = `${songDurationFull.slice(3)}`;
      isPlaying = false;
      playMusic();
      addActiveTrack();
    });

    // Apply structure and styling to new track
    newTrack.classList.add(
      "track-wrap",
      "d-flex",
      "justify-content-between",
      "align-items-start"
    );
    newTrack.innerHTML = `              
    <i class="fas fa-music"></i>
    <div class="track-info">
      <h6 class="mb-1">${trackData.data[i].title}</h6>
      <p>${trackData.data[i].artist.name}</p>
    </div>
    <p>${songDurationFull}</p>`;

    trackRow.appendChild(newTrack);
  }
};

/*********************************************************************/

/* GENERATE GENRES FUNCTION */

const generateGenres = async () => {
  const data = await getGenres();
  const genresContainer = document.querySelector("#genres-wrapper");
  const genresHeader = document.querySelector("#browse-genres-header");
  genresContainer.classList.remove("d-none");
  genresHeader.classList.remove("d-none");

  if (loadBrowseSection === false) {
    data.forEach((e) => {
      getRandomColour();

      const newCard = document.createElement("div");
      newCard.classList.add("browse-card");
      newCard.style.backgroundColor = `rgb(${randomColour})`;
      newCard.innerHTML = `<h4 class="text-left">${e.name}</h4>`;

      genresContainer.appendChild(newCard);
    });
  }

  loadBrowseSection = true;
};

/******************************************************************/

/* LOAD LIBRARY FUNCTION */

function loadLibrary() {
  const artistLibrary = document.querySelector("#library-albums-row");

  artistLibrary.innerHTML = "";

  for (let i = 0; i < yourLibraryAlbums.length; i++) {
    const newAlbum = document.createElement("div");
    newAlbum.classList.add(
      "col-sm-12",
      "col-md-6",
      "col-lg-4",
      "col-xl-2",
      "mb-2",
      "px-0",
      "pr-md-2",
      "d-flex",
      "flex-column",
      "align-items-center",
      "library-album"
    );

    newAlbum.innerHTML =
      `${yourLibraryAlbums[i].cover}` +
      `<h5 class="mb-0">${yourLibraryAlbums[i].albumName}</h5>` +
      `<p>${yourLibraryAlbums[i].artistName}</p>` +
      `<p class="albumid">${yourLibraryAlbums[i].id}</p>`;

    artistLibrary.appendChild(newAlbum);

    newAlbum.addEventListener("click", function () {
      selectedAlbumID = event.currentTarget.querySelector(".albumid").innerHTML;
      showTracklistPage();
    });
  }
}

/******************************************************************/

function resetSearch() {
  const artistRow = document.querySelector("#artist-row");
  const tracksRow = document.querySelector("#songs-row");
  const searchHeader = document.querySelector(".search-header");
  artistRow.innerHTML = "";
  tracksRow.innerHTML = "";
  searchHeader.innerHTML = "";
}

/* SHOW SECTION FUNCTION */

function showSection() {
  const sections = document.querySelectorAll("aside");
  const clickedLink = event.currentTarget.innerText;

  switch (clickedLink) {
    case "Home":
      sections[1].classList.add("d-none");
      sections[2].classList.add("d-none");
      sections[3].classList.add("d-none");
      sections[4].classList.add("d-none");
      sections[4].classList.remove("d-flex");
      sections[0].classList.remove("d-none");
      break;
    case "Search":
      sections[0].classList.add("d-none");
      sections[2].classList.add("d-none");
      sections[3].classList.add("d-none");
      sections[4].classList.add("d-none");
      sections[4].classList.remove("d-flex");
      sections[1].classList.remove("d-none");
      const searchBar = document.querySelector(".search-bar input");
      searchBar.value = "";
      searchBar.focus();
      generateGenres();
      resetSearch();
      break;
    case "Your Library":
      sections[0].classList.add("d-none");
      sections[1].classList.add("d-none");
      sections[3].classList.add("d-none");
      sections[4].classList.add("d-none");
      sections[4].classList.remove("d-flex");
      sections[2].classList.remove("d-none");
      loadLibrary();
      break;
    default:
  }
  switchActive();
}

/******************************************************************/

/* SHOW ARTIST PAGE FUNCTION */

const showArtistPage = async (artist) => {
  const data = await deezer(`search?q=${artist}`);

  const artistPage = document.querySelector("#artist-page");
  const mainPage = document.querySelector("#main");
  const searchPage = document.querySelector("#search");

  const artistAlbumRow = document.querySelector("#artist-album-row");
  artistAlbumRow.innerHTML = "";

  mainPage.classList.add("d-none");
  searchPage.classList.add("d-none");
  artistPage.classList.remove("d-none");

  const artistHeader = document.querySelector("h1");
  artistHeader.innerText = `${data.data[0].artist.name}`;

  let albumArray = [];

  for (let i = 0; i < data.data.length - 1; i++) {
    albumArray.push(data.data[i].album.id);
  }

  albumArray = [...new Set(albumArray)];

  const albumArt = document.querySelector(".album-art-jumbotron");
  albumArt.style.backgroundImage = `url(${data.data[0].artist.picture_xl})`;

  for (let i = 0; i < albumArray.length - 1; i++) {
    const albumData = await deezer(`album/${albumArray[i]}`);
    const newCard = document.createElement("div");
    newCard.classList.add(
      "col-sm-12",
      "col-md-6",
      "col-lg-4",
      "col-xl-2",
      "mb-2",
      "px-0",
      "pr-md-2",
      "flip-in-hor-bottom"
    );

    const newCardContent = document.createElement("div");
    newCardContent.classList.add("album-card");

    newCardContent.innerHTML =
      `<img src="${albumData.cover_medium}" class="img-fluid"/>` +
      `<h5 class="mb-0">${albumData.title}</h5>` +
      `<p>${albumData.artist.name}</p>` +
      `<p class="albumid">${albumArray[i]}</p>`;

    newCard.appendChild(newCardContent);
    artistAlbumRow.appendChild(newCard);

    newCard.addEventListener("click", function () {
      selectedAlbumID = event.currentTarget.querySelector(".albumid").innerHTML;
      showTracklistPage();
    });
  }
};

/*********************************************************************/

/* SEARCH FUNCTION */

const search = async () => {
  // TRIGGER WHEN ENTER IS PRESSED
  if (event.keyCode === 13) {
    const searchInput = document.querySelector(".search-bar input").value;
    if (searchInput.length > 0) {
      // Hide genres after search
      const genresContainer = document.querySelector("#genres-wrapper");
      const genresHeader = document.querySelector("#browse-genres-header");
      genresContainer.classList.add("d-none");
      genresHeader.classList.add("d-none");

      // MAIN SELECTORS
      const searchMainContainer = document.querySelector("#search-content");
      const songsRow = document.querySelector("#songs-row");
      const artistRow = document.querySelector("#artist-row");

      // GET INPUT FROM SEARCH BAR AND CLEAR THE BAR
      const searchInput = document.querySelector(".search-bar input").value;
      document.querySelector(".search-bar input").value = ""; // Empty the search bar

      // RESET THE CONTAINER
      songsRow.innerHTML = `<h4 id="tracks-header" class="w-100">Tracks</h4>`; // Empty the search container (to replace a previous search with new content)
      artistRow.innerHTML = `<h4 id="artist-header" class="w-100">Artist</h4>`; // Empty the search container (to replace a previous search with new content)

      // UPDATE SEARCH FOR TEXT
      const searchHeader = document.querySelector(".search-header");
      searchHeader.innerText = `Search results for "${searchInput}"...`;
      searchMainContainer.appendChild(artistRow);

      // SHOW ARTIST AND TRACKS TITLES
      const artistHeader = document.querySelector("#artist-header");
      const tracksHeader = document.querySelector("#tracks-header");
      artistHeader.style.opacity = "1";
      tracksHeader.style.opacity = "1";

      // START API SEARCH
      const data = await deezer(`search?q=${searchInput}`);

      // ARTIST SEARCH AND GENERATE
      const artistID = data.data[0].artist.id;
      const artistData = await deezer(`artist/${artistID}`);

      const newCard = document.createElement("div");
      newCard.classList.add(
        "col-sm-12",
        "col-md-6",
        "col-lg-4",
        "col-xl-2",
        "mb-2",
        "px-0",
        "pr-md-2",
        "flip-in-hor-bottom"
      );

      const newCardContent = document.createElement("div");
      newCardContent.classList.add("album-card");
      newCardContent.addEventListener("click", function () {
        showArtistPage(`${searchInput}`);
      });

      newCardContent.innerHTML =
        `<img src="${artistData.picture_medium}" class="img-fluid rounded-circle artist-shadow"/>` +
        `<h5 class="mb-0">${artistData.name}</h5>` +
        `<p>Artist</p>`;

      newCard.appendChild(newCardContent);

      artistRow.appendChild(newCard);

      // TRACKS GENERATE
      for (let i = 0; i < data.data.length - 1; i++) {
        const newCard = document.createElement("div");
        newCard.classList.add(
          "col-sm-12",
          "col-md-6",
          "col-lg-4",
          "col-xl-2",
          "mb-2",
          "px-0",
          "pr-md-2",
          "flip-in-hor-bottom"
        );

        const newCardContent = document.createElement("div");
        newCardContent.classList.add("album-card");

        newCardContent.innerHTML =
          `<img src="${data.data[i].album.cover_medium}" class="img-fluid"/>` +
          `<h5 class="mb-0">${data.data[i].title}</h5>` +
          `<p>${data.data[i].artist.name}</p>`;

        newCard.appendChild(newCardContent);
        songsRow.appendChild(newCard);
      }
      searchMainContainer.appendChild(songsRow);
    }
  }
};

/******************************************************************/

/* GENERATE POPULAR ALBUMS FUNCTION */

const generatePopularAlbums = async () => {
  /* Fill first 6 */
  for (let i = 0; i < 6; i++) {
    const data = await deezer(`album/${popularAlbums[i]}`);
    const popularAlbumsRow = document.querySelector("#popular-albums-row");

    const newCol = document.createElement("div");
    newCol.classList.add(
      "col-sm-12",
      "col-md-6",
      "col-lg-4",
      "col-xl-3",
      "col-xxl-2",
      "mb-2",
      "pr-3",
      "pr-md-2",
      "px-lg-2",
      "fade-in"
    );
    const newCard = document.createElement("div");
    newCard.classList.add("album-card");
    newCard.innerHTML =
      `<img src="${data.cover_medium}" class="img-fluid"/>` +
      `<h5>${data.title}</h5>` +
      `<p>${data.artist.name}</p>`;

    newCol.appendChild(newCard);
    popularAlbumsRow.appendChild(newCol);
  }

  /* Fill expand 6 */
  for (let i = 6; i < 12; i++) {
    const data = await deezer(`album/${popularAlbums[i]}`);
    const popularAlbumsExpandRow = document.querySelector(
      "#popular-expand-section"
    );

    const newCol = document.createElement("div");
    newCol.classList.add(
      "col-sm-12",
      "col-md-6",
      "col-lg-4",
      "col-xl-3",
      "col-xxl-2",
      "mb-2",
      "pr-3",
      "pr-md-2",
      "px-lg-2"
    );
    const newCard = document.createElement("div");
    newCard.classList.add("album-card");
    newCard.innerHTML =
      `<img src="${data.cover_medium}" class="img-fluid"/>` +
      `<h5>${data.title}</h5>` +
      `<p>${data.artist.name}</p>`;

    /*     newCard.addEventListener("click", function loadSong() {
      song_url = data[i].preview;
      total_time = data[i].duration;
      player_coverArt.style.backgroundImage = `url("${data.cover_small}")`;
      player_trackName.innerText = data.data[i].title;
      player_artistName.innerHTML = `${data.artist.name}`;
      player_maxDuration.innerHTML = `${songDurationFull.slice(3)}`;
      playMusic();
    }); */

    newCol.appendChild(newCard);
    popularAlbumsExpandRow.appendChild(newCol);
  }
};

/******************************************************************/

/* GENERATE TRENDING NOW ALBUMS FUNCTION */

const generateTrendingNowAlbums = async () => {
  /* Fill first 6 */
  for (let i = 0; i < 6; i++) {
    const data = await deezer(`album/${trendingNowAlbums[i]}`);
    const popularAlbumsRow = document.querySelector("#trending-now-row");

    const newCol = document.createElement("div");
    newCol.classList.add(
      "col-sm-12",
      "col-md-6",
      "col-lg-4",
      "col-xl-3",
      "col-xxl-2",
      "mb-2",
      "pr-3",
      "pr-md-2",
      "px-lg-2",
      "fade-in"
    );
    const newCard = document.createElement("div");
    newCard.classList.add("album-card");
    newCard.innerHTML =
      `<img src="${data.cover_medium}" class="img-fluid"/>` +
      `<h5>${data.title}</h5>` +
      `<p>${data.artist.name}</p>`;

    newCol.appendChild(newCard);
    popularAlbumsRow.appendChild(newCol);
  }

  /* Fill expand 6 */
  for (let i = 6; i < 12; i++) {
    const data = await deezer(`album/${trendingNowAlbums[i]}`);
    const popularAlbumsExpandRow = document.querySelector(
      "#trending-expand-section"
    );

    const newCol = document.createElement("div");
    newCol.classList.add(
      "col-sm-12",
      "col-md-6",
      "col-lg-4",
      "col-xl-3",
      "col-xxl-2",
      "mb-2",
      "pr-3",
      "pr-md-2",
      "px-lg-2"
    );
    const newCard = document.createElement("div");
    newCard.classList.add("album-card");
    newCard.innerHTML =
      `<img src="${data.cover_medium}" class="img-fluid"/>` +
      `<h5>${data.title}</h5>` +
      `<p>${data.artist.name}</p>`;

    newCol.appendChild(newCard);
    popularAlbumsExpandRow.appendChild(newCol);
  }
};

/******************************************************************/

/* GENERATE POPULAR PLAYLISTS ALBUMS FUNCTION */

const generatePopularPlaylists = async () => {
  /* Fill first 6 */
  for (let i = 0; i < 6; i++) {
    const data = await deezer(`playlist/${popularPlaylists[i]}`);
    const popularPlaylistsRow = document.querySelector(
      "#popular-playlists-row"
    );

    const newCol = document.createElement("div");
    newCol.classList.add(
      "col-sm-12",
      "col-md-6",
      "col-lg-4",
      "col-xl-3",
      "col-xxl-2",
      "mb-2",
      "pr-3",
      "pr-md-2",
      "px-lg-2",
      "fade-in"
    );
    const newCard = document.createElement("div");
    newCard.classList.add("album-card");
    newCard.innerHTML =
      `<img src="${data.picture_medium}" class="img-fluid"/>` +
      `<h5>${data.title}</h5>` +
      `<p>${data.nb_tracks} Tracks</p>`;

    newCol.appendChild(newCard);
    popularPlaylistsRow.appendChild(newCol);
  }

  /* Fill expand 6 */
  for (let i = 6; i < 12; i++) {
    const data = await deezer(`playlist/${popularPlaylists[i]}`);
    const popularPlaylistsExpandRow = document.querySelector(
      "#popular-playlists-expand-section"
    );

    const newCol = document.createElement("div");
    newCol.classList.add(
      "col-sm-12",
      "col-md-6",
      "col-lg-4",
      "col-xl-3",
      "col-xxl-2",
      "mb-2",
      "pr-3",
      "pr-md-2",
      "px-lg-2"
    );
    const newCard = document.createElement("div");
    newCard.classList.add("album-card");
    newCard.innerHTML =
      `<img src="${data.picture_medium}" class="img-fluid"/>` +
      `<h5>${data.title}</h5>` +
      `<p>${data.nb_tracks} Tracks</p>`;

    newCol.appendChild(newCard);
    popularPlaylistsExpandRow.appendChild(newCol);
  }
};

/******************************************************************/

/* GENERATE TOP PODCASTS FUNCTION */

const generateTopPodcasts = async () => {
  /* Fill first 6 */
  for (let i = 0; i < 6; i++) {
    const data = await deezer(`playlist/${topPodcasts[i]}`);
    const popularPlaylistsRow = document.querySelector("#top-podcasts-row");

    const newCol = document.createElement("div");
    newCol.classList.add(
      "col-sm-12",
      "col-md-6",
      "col-lg-4",
      "col-xl-3",
      "col-xxl-2",
      "mb-2",
      "pr-3",
      "pr-md-2",
      "px-lg-2",
      "fade-in"
    );
    const newCard = document.createElement("div");
    newCard.classList.add("album-card");
    newCard.innerHTML =
      `<img src="${data.picture_medium}" class="img-fluid"/>` +
      `<h5>${data.title}</h5>` +
      `<p>${data.nb_tracks} Episodes</p>`;

    newCol.appendChild(newCard);
    popularPlaylistsRow.appendChild(newCol);
  }

  /* Fill expand 6 */
  for (let i = 6; i < 12; i++) {
    const data = await deezer(`playlist/${topPodcasts[i]}`);
    const popularPlaylistsExpandRow = document.querySelector(
      "#top-podcasts-expand-section"
    );

    const newCol = document.createElement("div");
    newCol.classList.add(
      "col-sm-12",
      "col-md-6",
      "col-lg-4",
      "col-xl-3",
      "col-xxl-2",
      "mb-2",
      "pr-3",
      "pr-md-2",
      "px-lg-2"
    );
    const newCard = document.createElement("div");
    newCard.classList.add("album-card");
    newCard.innerHTML =
      `<img src="${data.picture_medium}" class="img-fluid"/>` +
      `<h5>${data.title}</h5>` +
      `<p>${data.nb_tracks} Episodes</p>`;

    newCol.appendChild(newCard);
    popularPlaylistsExpandRow.appendChild(newCol);
  }
};

/*********************************************************************/

/* GENERATE DYNAMIC DUOS PODCASTS FUNCTION */

const generateDynamicDuos = async () => {
  /* Fill first 6 */
  for (let i = 0; i < 6; i++) {
    const data = await deezer(`playlist/${dynamicDuosPodcasts[i]}`);
    const dynamicDuosRow = document.querySelector("#dynamic-duos-row");

    const newCol = document.createElement("div");
    newCol.classList.add(
      "col-sm-12",
      "col-md-6",
      "col-lg-4",
      "col-xl-3",
      "col-xxl-2",
      "mb-2",
      "pr-3",
      "pr-md-2",
      "px-lg-2",
      "fade-in"
    );
    const newCard = document.createElement("div");
    newCard.classList.add("album-card");
    newCard.innerHTML =
      `<img src="${data.picture_medium}" class="img-fluid"/>` +
      `<h5>${data.title}</h5>` +
      `<p>${data.nb_tracks} Episodes</p>`;

    newCol.appendChild(newCard);
    dynamicDuosRow.appendChild(newCol);
  }

  /* Fill expand 6 */
  for (let i = 6; i < 12; i++) {
    const data = await deezer(`playlist/${dynamicDuosPodcasts[i]}`);
    const dynamicDuosExpandRow = document.querySelector(
      "#dynamic-duos-expand-section"
    );

    const newCol = document.createElement("div");
    newCol.classList.add(
      "col-sm-12",
      "col-md-6",
      "col-lg-4",
      "col-xl-3",
      "col-xxl-2",
      "mb-2",
      "pr-3",
      "pr-md-2",
      "px-lg-2"
    );
    const newCard = document.createElement("div");
    newCard.classList.add("album-card");
    newCard.innerHTML =
      `<img src="${data.picture_medium}" class="img-fluid"/>` +
      `<h5>${data.title}</h5>` +
      `<p>${data.nb_tracks} Episodes</p>`;

    newCol.appendChild(newCard);
    dynamicDuosExpandRow.appendChild(newCol);
  }
};

/*********************************************************************/

/* GENERATE EDM ALBUMS FUNCTION */

const generateEDMMood = async () => {
  /* Fill first 6 */
  for (let i = 0; i < 6; i++) {
    const data = await deezer(`album/${edmMusic[i]}`);
    const edmRow = document.querySelector("#edm-row");

    const newCol = document.createElement("div");
    newCol.classList.add(
      "col-sm-12",
      "col-md-6",
      "col-lg-4",
      "col-xl-3",
      "col-xxl-2",
      "mb-2",
      "pr-3",
      "pr-md-2",
      "px-lg-2",
      "fade-in"
    );
    const newCard = document.createElement("div");
    newCard.classList.add("album-card");
    newCard.innerHTML =
      `<img src="${data.cover_medium}" class="img-fluid"/>` +
      `<h5>${data.title}</h5>` +
      `<p>${data.artist.name}</p>`;

    newCol.appendChild(newCard);
    edmRow.appendChild(newCol);
  }

  /* Fill expand 6 */
  for (let i = 6; i < 12; i++) {
    const data = await deezer(`album/${edmMusic[i]}`);
    const edmExpandRow = document.querySelector("#edm-expand-section");

    const newCol = document.createElement("div");
    newCol.classList.add(
      "col-sm-12",
      "col-md-6",
      "col-lg-4",
      "col-xl-3",
      "col-xxl-2",
      "mb-2",
      "pr-3",
      "pr-md-2",
      "px-lg-2"
    );
    const newCard = document.createElement("div");
    newCard.classList.add("album-card");
    newCard.innerHTML =
      `<img src="${data.cover_medium}" class="img-fluid"/>` +
      `<h5>${data.title}</h5>` +
      `<p>${data.artist.name}</p>`;

    newCol.appendChild(newCard);
    edmExpandRow.appendChild(newCol);
  }
};

/*********************************************************************/

/* GENERATE WORKOUT ALBUMS FUNCTION */

const generateWorkoutMood = async () => {
  /* Fill first 6 */
  for (let i = 0; i < 6; i++) {
    const data = await deezer(`playlist/${workoutMusic[i]}`);
    const workoutRow = document.querySelector("#workout-mood-row");

    const newCol = document.createElement("div");
    newCol.classList.add(
      "col-sm-12",
      "col-md-6",
      "col-lg-4",
      "col-xl-3",
      "col-xxl-2",
      "mb-2",
      "pr-3",
      "pr-md-2",
      "px-lg-2",
      "fade-in"
    );
    const newCard = document.createElement("div");
    newCard.classList.add("album-card");
    newCard.innerHTML =
      `<img src="${data.picture_medium}" class="img-fluid"/>` +
      `<h5>${data.title}</h5>` +
      `<p>${data.nb_tracks} Tracks</p>`;

    newCol.appendChild(newCard);
    workoutRow.appendChild(newCol);
  }

  /* Fill expand 6 */
  for (let i = 6; i < 12; i++) {
    const data = await deezer(`playlist/${workoutMusic[i]}`);
    const workoutExpandRow = document.querySelector("#workout-expand-section");

    const newCol = document.createElement("div");
    newCol.classList.add(
      "col-sm-12",
      "col-md-6",
      "col-lg-4",
      "col-xl-3",
      "col-xxl-2",
      "mb-2",
      "pr-3",
      "pr-md-2",
      "px-lg-2"
    );
    const newCard = document.createElement("div");
    newCard.classList.add("album-card");
    newCard.innerHTML =
      `<img src="${data.picture_medium}" class="img-fluid"/>` +
      `<h5>${data.title}</h5>` +
      `<p>${data.nb_tracks} Tracks</p>`;

    newCol.appendChild(newCard);
    workoutExpandRow.appendChild(newCol);
  }
};

/*********************************************************************/

/* GENERATE CHILL AND RELAX ALBUMS FUNCTION */

const generateRelaxMood = async () => {
  /* Fill first 6 */
  for (let i = 0; i < 6; i++) {
    const data = await deezer(`playlist/${relaxAndChillMusic[i]}`);
    const workoutRow = document.querySelector("#chill-mood-row");

    const newCol = document.createElement("div");
    newCol.classList.add(
      "col-sm-12",
      "col-md-6",
      "col-lg-4",
      "col-xl-3",
      "col-xxl-2",
      "mb-2",
      "pr-3",
      "pr-md-2",
      "px-lg-2",
      "fade-in"
    );
    const newCard = document.createElement("div");
    newCard.classList.add("album-card");
    newCard.innerHTML =
      `<img src="${data.picture_medium}" class="img-fluid"/>` +
      `<h5>${data.title}</h5>` +
      `<p>${data.nb_tracks} Tracks</p>`;

    newCol.appendChild(newCard);
    workoutRow.appendChild(newCol);
  }

  /* Fill expand 6 */
  for (let i = 6; i < 12; i++) {
    const data = await deezer(`playlist/${relaxAndChillMusic[i]}`);
    const workoutExpandRow = document.querySelector("#chill-expand-section");

    const newCol = document.createElement("div");
    newCol.classList.add(
      "col-sm-12",
      "col-md-6",
      "col-lg-4",
      "col-xl-3",
      "col-xxl-2",
      "mb-2",
      "pr-3",
      "pr-md-2",
      "px-lg-2"
    );
    const newCard = document.createElement("div");
    newCard.classList.add("album-card");
    newCard.innerHTML =
      `<img src="${data.picture_medium}" class="img-fluid"/>` +
      `<h5>${data.title}</h5>` +
      `<p>${data.nb_tracks} Tracks</p>`;

    newCol.appendChild(newCard);
    workoutExpandRow.appendChild(newCol);
  }
};

/*********************************************************************/

/* GENERATE THE BEST NEW RELEASES ALBUMS FUNCTION */

const generateBestNewReleases = async () => {
  /* Fill first 6 */
  for (let i = 0; i < 6; i++) {
    const data = await deezer(`track/${bestNewReleases[i]}`);
    const bestNewReleasesRow = document.querySelector("#best-new-releases-row");

    const newCol = document.createElement("div");
    newCol.classList.add(
      "col-sm-12",
      "col-md-6",
      "col-lg-4",
      "col-xl-3",
      "col-xxl-2",
      "mb-2",
      "pr-3",
      "pr-md-2",
      "px-lg-2",
      "fade-in"
    );
    const newCard = document.createElement("div");
    newCard.classList.add("album-card");
    newCard.innerHTML =
      `<img src="${data.album.cover_medium}" class="img-fluid"/>` +
      `<h5>${data.title}</h5>` +
      `<p>${data.artist.name}</p>`;

    newCol.appendChild(newCard);
    bestNewReleasesRow.appendChild(newCol);
  }
};

/*********************************************************************/

/* GENERATE NEW ALBUMS AND SINGLES FUNCTION */

const generateNewAlbumsAndSingles = async () => {
  /* Fill first 6 */
  for (let i = 0; i < 6; i++) {
    const data = await deezer(`album/${newAlbumsAndSingles[i]}`);
    const newAlbumsSinglesRow = document.querySelector(
      "#new-albums-singles-row"
    );

    const newCol = document.createElement("div");
    newCol.classList.add(
      "col-sm-12",
      "col-md-6",
      "col-lg-4",
      "col-xl-3",
      "col-xxl-2",
      "mb-2",
      "pr-3",
      "pr-md-2",
      "px-lg-2",
      "fade-in"
    );
    const newCard = document.createElement("div");
    newCard.classList.add("album-card");
    newCard.innerHTML =
      `<img src="${data.cover_medium}" class="img-fluid"/>` +
      `<h5>${data.title}</h5>` +
      `<p>${data.nb_tracks} Tracks</p>`;

    newCol.appendChild(newCard);
    newAlbumsSinglesRow.appendChild(newCol);
  }

  /* Fill expand 6 */
  for (let i = 6; i < 12; i++) {
    const data = await deezer(`album/${newAlbumsAndSingles[i]}`);
    const newAlbumsSinglesExpandRow = document.querySelector(
      "#new-albums-singles-expand-section"
    );

    const newCol = document.createElement("div");
    newCol.classList.add(
      "col-sm-12",
      "col-md-6",
      "col-lg-4",
      "col-xl-3",
      "col-xxl-2",
      "mb-2",
      "pr-3",
      "pr-md-2",
      "px-lg-2"
    );
    const newCard = document.createElement("div");
    newCard.classList.add("album-card");
    newCard.innerHTML =
      `<img src="${data.cover_medium}" class="img-fluid"/>` +
      `<h5>${data.title}</h5>` +
      `<p>${data.nb_tracks} Tracks</p>`;

    newCol.appendChild(newCard);
    newAlbumsSinglesExpandRow.appendChild(newCol);
  }
};

/*********************************************************************/

/* GENERATE TRACKS JUST FOR YOU FUNCTION */

const generateTracksJustForYou = async () => {
  /* Fill first 6 */
  for (let i = 0; i < 6; i++) {
    const data = await deezer(`album/${tracksJustForYou[i]}`);
    const tracksForYouRow = document.querySelector("#tracks-for-you-row");

    const newCol = document.createElement("div");
    newCol.classList.add(
      "col-sm-12",
      "col-md-6",
      "col-lg-4",
      "col-xl-3",
      "col-xxl-2",
      "mb-2",
      "pr-3",
      "pr-md-2",
      "px-lg-2",
      "fade-in"
    );
    const newCard = document.createElement("div");
    newCard.classList.add("album-card");
    newCard.innerHTML =
      `<img src="${data.cover_medium}" class="img-fluid"/>` +
      `<h5>${data.title}</h5>` +
      `<p>${data.artist.name} Tracks</p>`;

    newCol.appendChild(newCard);
    tracksForYouRow.appendChild(newCol);
  }
};

/*********************************************************************/

/* GENERATE PLAYLISTS JUST FOR YOU FUNCTION */

const generatePlaylistsForYou = async () => {
  /* Fill first 6 */
  for (let i = 0; i < 6; i++) {
    const data = await deezer(`playlist/${playlistsJustForYou[i]}`);
    const playlistsForRow = document.querySelector("#playlists-for-you-row");

    const newCol = document.createElement("div");
    newCol.classList.add(
      "col-sm-12",
      "col-md-6",
      "col-lg-4",
      "col-xl-3",
      "col-xxl-2",
      "mb-2",
      "pr-3",
      "pr-md-2",
      "px-lg-2",
      "fade-in"
    );
    const newCard = document.createElement("div");
    newCard.classList.add("album-card");
    newCard.innerHTML =
      `<img src="${data.picture_medium}" class="img-fluid"/>` +
      `<h5>${data.title}</h5>` +
      `<p>${data.nb_tracks} Tracks</p>`;

    newCol.appendChild(newCard);
    playlistsForRow.appendChild(newCol);
  }

  /* Fill expand 6 */
  for (let i = 6; i < 12; i++) {
    const data = await deezer(`playlist/${playlistsJustForYou[i]}`);
    const playlistsForYouRow = document.querySelector(
      "#playlists-for-you-expand-section"
    );

    const newCol = document.createElement("div");
    newCol.classList.add(
      "col-sm-12",
      "col-md-6",
      "col-lg-4",
      "col-xl-3",
      "col-xxl-2",
      "mb-2",
      "pr-3",
      "pr-md-2",
      "px-lg-2"
    );
    const newCard = document.createElement("div");
    newCard.classList.add("album-card");
    newCard.innerHTML =
      `<img src="${data.picture_medium}" class="img-fluid"/>` +
      `<h5>${data.title}</h5>` +
      `<p>${data.nb_tracks} Tracks</p>`;

    newCol.appendChild(newCard);
    playlistsForYouRow.appendChild(newCol);
  }
};

/*********************************************************************/

function generateContent() {
  generatePopularAlbums();
  generateTrendingNowAlbums();
  generatePopularPlaylists();
}

/* LIKE SONG FUNCTIONALITY */

function likeSongToggle() {
  // Fill heart and change colour
  const likeButton = document.querySelector(".btn-heart");
  const currentAlbumID = document.querySelector("#tracklist-page .albumid")
    .innerHTML;
  const addedToLibraryMessage = document.querySelector(".added-to-album");

  if (likeButton.classList.contains("heart-fill")) {
    likeButton.innerHTML = `<i class="far fa-heart"></i>`;
    likeButton.classList.remove("heart-fill");

    // Remove album from library
    for (let i = 0; i < yourLibraryAlbums.length; i++) {
      if (selectedAlbumID === yourLibraryAlbums[i].id) {
        yourLibraryAlbums.splice(i, 1);
      }
    }
  } else {
    likeButton.innerHTML = `<i class="fa fa-heart"></i>`;
    likeButton.classList.add("heart-fill");

    addedToLibraryMessage.classList.remove("d-none");
    addedToLibraryMessage.style.opacity = "1";

    setTimeout(function () {
      addedToLibraryMessage.classList.add("d-none");
    }, 1500);

    // Add album to your library
    const albumContainer = document.querySelector(".left-wrapper");
    const albumObject = {
      albumName: albumContainer.querySelector("#tracklist-page #album-name")
        .innerText,
      artistName: albumContainer.querySelector("#tracklist-page #artist-name")
        .innerText,
      cover: albumContainer.querySelector("#tracklist-page #album-cover")
        .outerHTML,
      id: albumContainer.querySelector("#tracklist-page .albumid").innerHTML,
    };

    yourLibraryAlbums.push(albumObject);
  }
}

/* EXPAND MOBILE NAV FUNCTION */

function expandMobileNav() {
  const pageBody = document.querySelector("body");
  const navigationMenu = document.querySelector("#navigation");
  const burgerNavigation = document.querySelector(".btn-burger");

  if (navigationMenu.classList.contains("mobile-nav-active")) {
    navigationMenu.classList.remove("mobile-nav-active");
    burgerNavigation.classList.remove("burger-menu-active");
    pageBody.classList.remove("overflow-hidden");
  } else {
    navigationMenu.classList.add("mobile-nav-active");
    burgerNavigation.classList.add("burger-menu-active");
    pageBody.classList.add("overflow-hidden");
  }
}

/*********************************************************************/

window.onload = generateContent();

const find = async (searchQuery) => {
  const data = await deezer(`search?q=${searchQuery}`);
  console.log(data);
};

window.onload = function () {
  setTimeout(function () {
    $("body").addClass("loaded");
  }, 3000);
};
