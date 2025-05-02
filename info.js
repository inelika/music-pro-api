function loadAllTracksByArtist(artistId) {
    const script = document.createElement('script');
    script.src = `https://api.deezer.com/artist/${artistId}/top?limit=20&output=jsonp&callback=handleAllTracks`;
    document.body.appendChild(script);
  }
  
  function attachTrackClickHandlers() {
    document.querySelectorAll('.track-clickable').forEach(element => {
      element.addEventListener('click', () => {
        const artistId = element.getAttribute('data-artist-id');
        loadAllTracksByArtist(artistId);
      });
    });
  }
  
  window.loadAllTracksByArtist = loadAllTracksByArtist;
  window.attachTrackClickHandlers = attachTrackClickHandlers;
  