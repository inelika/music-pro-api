let currentPage = 1;
const tracksPerPage = 5;
let currentArtistTracks = [];

function showTracksPage() {
  const container = document.getElementById('tracks-container');
  const pageText = document.getElementById('page-indicator');
  container.innerHTML = '';

  const start = (currentPage - 1) * tracksPerPage;
  const pageTracks = currentArtistTracks.slice(start, start + tracksPerPage);

  pageTracks.forEach(track => {
    const el = document.createElement('div');
    el.innerHTML = `
      <p class="track-clickable" data-artist-id="${track.artist.id}" style="cursor:pointer; color:#ffcccc;">
        <strong>${track.title}</strong> — ${track.artist.name}
      </p>
      <audio controls>
        <source src="${track.preview}" type="audio/mp3">
      </audio>
    `;
    container.appendChild(el);
  });

  pageText.textContent = `Page ${currentPage}`;
  if (window.attachTrackClickHandlers) window.attachTrackClickHandlers();
}

function handleAllTracks(response) {
  if (response.data && response.data.length > 0) {
    currentArtistTracks = response.data;
    currentPage = 1;
    showTracksPage();
  } else {
    document.getElementById('tracks-container').innerHTML = '<p>No tracks found.</p>';
  }
}

document.getElementById('prev-page').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    showTracksPage();
  }
});
document.getElementById('next-page').addEventListener('click', () => {
  if (currentPage * tracksPerPage < currentArtistTracks.length) {
    currentPage++;
    showTracksPage();
  }
});

window.handleAllTracks = handleAllTracks;
