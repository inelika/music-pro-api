const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const progress = document.getElementById('progress');
const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const genreSelect = document.getElementById('genre-select');
const randomBtn = document.getElementById('random-btn');
const currentTrackTitle = document.getElementById('current-track-title');

let isPlaying = false;

// play/pause
function togglePlay() {
  if (isPlaying) {
    audio.pause();
  } else {
    audio.play();
  }
}

playBtn.addEventListener('click', togglePlay);

audio.addEventListener('play', () => {
  isPlaying = true;
  playBtn.querySelector('i').classList.replace('fa-play', 'fa-pause');
});

audio.addEventListener('pause', () => {
  isPlaying = false;
  playBtn.querySelector('i').classList.replace('fa-pause', 'fa-play');
});

audio.addEventListener('timeupdate', () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = `${percent}%`;
});

// Поиск
searchBtn.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query) {
    searchTracks(query);
  }
});

function searchTracks(query) {
  const script = document.createElement('script');
  script.src = `https://api.deezer.com/search?q=${encodeURIComponent(query)}&output=jsonp&callback=handleResults`;
  document.body.appendChild(script);
}

function handleResults(response) {
  if (response.data && response.data.length > 0) {
    const track = response.data[0];
    title.textContent = `${track.title} — ${track.artist.name}`;
    currentTrackTitle.textContent = `${track.title} — ${track.artist.name}`;
    cover.src = track.album.cover_medium;
    audio.src = track.preview;
    audio.pause();
  } else {
    title.textContent = 'No results found';
    currentTrackTitle.textContent = 'No track selected';
    cover.src = 'https://dummyimage.com/110x110/ccc/000.png&text=No+Cover';
    audio.pause();
  }
}

// Жанр
genreSelect.addEventListener('change', () => {
  const genreId = genreSelect.value;
  if (!genreId) return;

  const script = document.createElement('script');
  script.src = `https://api.deezer.com/genre/${genreId}/artists?output=jsonp&callback=handleGenreArtists`;
  document.body.appendChild(script);
});

function handleGenreArtists(response) {
  if (response.data && response.data.length > 0) {
    const artist = response.data[Math.floor(Math.random() * response.data.length)];
    loadTrackByArtist(artist.id);
    loadAllTracksByArtist(artist.id);
  } else {
    title.textContent = 'No artist found';
    currentTrackTitle.textContent = 'No track selected';
  }
}

function loadTrackByArtist(artistId) {
  const script = document.createElement('script');
  script.src = `https://api.deezer.com/artist/${artistId}/top?limit=1&output=jsonp&callback=handleTopTrack`;
  document.body.appendChild(script);
}

function handleTopTrack(response) {
  if (response.data && response.data.length > 0) {
    const track = response.data[0];
    title.textContent = `${track.title} — ${track.artist.name}`;
    currentTrackTitle.textContent = `${track.title} — ${track.artist.name}`;
    cover.src = track.album.cover_medium;
    audio.src = track.preview;
    audio.pause();
  }
}

// RANDOM
randomBtn.addEventListener('click', () => {
  const script = document.createElement('script');
  script.src = `https://api.deezer.com/chart/0/tracks?output=jsonp&callback=handleRandomTrack`;
  document.body.appendChild(script);
});

function handleRandomTrack(response) {
  if (response.data && response.data.length > 0) {
    const track = response.data[Math.floor(Math.random() * response.data.length)];
    title.textContent = `${track.title} — ${track.artist.name}`;
    currentTrackTitle.textContent = `${track.title} — ${track.artist.name}`;
    cover.src = track.album.cover_medium;
    audio.src = track.preview;
    audio.play();
  }
}
