// fetch sunday Worship playlist posters
const fetchSundayMain = async () => {
    const response = await fetch("https://cdn.jwplayer.com/v2/playlists/BQ51BDT5"); 
    if(response.status !== 200) {
        throw new Error('Cannot fetch the data');
    }
    const data = await response.json();
    return data;
}

// call JW Delivery API
fetchSundayMain()
    .then(data => {

        const current = data.playlist[0];

        // display current Sunday Worship on Main Media Page
        const current_html = 
            ` 
                <a href="sunday_media.html#sunday_media_current" alt="sunday service">
                <div class="d-flex flex-wrap align-items-center align-self-center"> 
                        <div class="zoom_index_current_container">
                            <img class="img-fluid zoom" src ="https://cdn.jwplayer.com/v2/media/${current.mediaid}/poster.jpg" width="100%" height="100%" frameborder="0" scrolling="auto" allowfullscreen></img>
                        </div>
                        <div style="color: #212529; padding-top: 20px;"><h3>${current.title}</h3></div>
                    </div>
                    <p style="padding-top: 10px; padding-bottom: 20px;">${current.description}</p>
                </a>
            `;
        document.querySelector('#sunday_current').insertAdjacentHTML('afterbegin', current_html);


        // display (3) most recent Sunday Worship after current
        data.playlist.slice(1, 4).reverse().forEach(recent => {

        const list_html = 
            `
                <a href="sunday_media.html" alt="sunday worship">
                    <div class="d-flex align-items-center align-self-center">
                        <div class="zoom_index_list">
                            <img class="img-fluid zoom" src="https://cdn.jwplayer.com/v2/media/${recent.mediaid}/poster.jpg?width=320" width="100%" height="100%" frameborder="0"></img>
                        </div>
                        <h3 style="width: 375px;">${recent.title}</h3>
                    </div>
                    <p style="padding-top: 10px; padding-bottom: 20px; overflow: hidden;">${recent.description}</p>
                <a>
            `;
         document.querySelector('#sunday_list').insertAdjacentHTML('afterbegin', list_html);
        });
}).catch(err => console.log('rejected', err.message)); 



// fetch Sunday Worship playlist
const fetchSundayTiles = async () => {
    const response = await fetch("https://cdn.jwplayer.com/v2/playlists/BQ51BDT5"); 
    if(response.status !== 200) {
        throw new Error('Cannot fetch the data');
    }
    const data = await response.json();
    return data;
}


// call JW Delivery API
fetchSundayTiles()
    .then(data => {

        const current = data.playlist[0];

     // display current content - Individual Media Page (992px x 558px)
        const current_html = 
            `
            <div class="main_video_media_page">
                <div style="position:relative; overflow:hidden; padding-bottom:56.25%">
                    <iframe src="https://cdn.jwplayer.com/players/BQ51BDT5-BI9bjUiV.html" width="100%" height="100%" frameborder="0" scrolling="auto" title="Sunday Worship Online" style="position:absolute;" allowfullscreen></iframe>
                </div>
                <p><h4>${current.title}</h4></p>
                <p>${current.description}</p>
            </div>
            `;
        document.querySelector('#sunday_media_current').insertAdjacentHTML('afterbegin', current_html);

        // display the most recent (100) (320 x 180)
        data.playlist.slice(0, 99).reverse().forEach(tile => {
        const tile_html = 
            `
                <div class="tile_video_media_page">
                    <div class="zoom-container-no-border" style="position:relative;">
                        <img class="img-fluid zoom" src="https://cdn.jwplayer.com/v2/media/${tile.mediaid}/poster.jpg" width="100%" height="100%" frameborder="0" scrolling="auto" style="position:absolute;" allowfullscreen></img>
                        <p class="tile_title" style="visibility: hidden;">${tile.title}</p>
                        <p>${tile.description}</p>
                    </div>
                    <p class="tile_title">${tile.title}</p>
                </div>
            ` ;
        document.querySelector('#sunday_tile_list').insertAdjacentHTML('afterbegin', tile_html);
        }); 
    }).catch(err => console.log('rejected', err.message)); 