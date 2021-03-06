// fetch Daily Devotionals playlist posters
const fetchDevoMain = async () => {
    const response = await fetch("https://cdn.jwplayer.com/v2/playlists/sX5mUe4T"); 
    if(response.status !== 200) {
        throw new Error('Cannot fetch the data');
    }
    const data = await response.json();
    return data;
}

// call JW Delivery API
fetchDevoMain()
    .then(data => {

        const current = data.playlist[0];

        // display current Daily Devotionals on Main Media Page
        const current_html = 
            ` 
                <a href="devo_media.html#devo_media_current" alt="daily devotional">
                    <div class="d-flex flex-wrap align-items-center align-self-center">
                        <div class="zoom_index_current_container">
                            <img class="img-fluid zoom" src ="https://cdn.jwplayer.com/v2/media/${current.mediaid}/poster.jpg" width="100%" height="100%" frameborder="0" scrolling="auto" allowfullscreen></img>
                        </div>
                        <div style="color: #212529; padding-top: 20px;"><h3>${current.title}</h3></div>
                    </div>
                    <p style="padding-top: 10px; padding-bottom: 20px;">${current.description}</p>
                </a>
            `;
        document.querySelector('#devo_current').insertAdjacentHTML('afterbegin', current_html);


        // display (3) most recent Devotionals after current on main media page
        data.playlist.slice(1, 4).reverse().forEach(recent => {

        const list_html = 
            `
                <a href="devo_media.html#devo_media_current" alt="daily devotionals">
                    <div class="d-flex align-items-center align-self-center">
                        <div class="zoom_index_list">
                            <img class="img-fluid zoom" src="https://cdn.jwplayer.com/v2/media/${recent.mediaid}/poster.jpg?width=320" width="100%" height="100%" frameborder="0"></img>
                        </div>
                        <h3 style="width: 375px;">${recent.title}</h3>
                    </div>
                    <p style="padding-top: 10px; padding-bottom: 20px;">${recent.description}</p>
                <a>
            `;
         document.querySelector('#devo_list').insertAdjacentHTML('afterbegin', list_html);
        });
}).catch(err => console.log('rejected', err.message)); 



// fetch Daily Devotionals playlist
const fetchDevoTiles = async () => {
    const response = await fetch("https://cdn.jwplayer.com/v2/playlists/sX5mUe4T"); 
    if(response.status !== 200) {
        throw new Error('Cannot fetch the data');
    }
    const data = await response.json();
    return data;
}


// call JW Delivery API
fetchDevoTiles()
    .then(data => {

        const current = data.playlist[0];

     // display current content - Individual Media Page (992px x 558px)
        const current_html = 
            `
            <div class="main_video_media_page">
                <div style="position:relative; overflow:hidden; padding-bottom:56.25%">
                    <iframe src="https://cdn.jwplayer.com/players/sX5mUe4T-BI9bjUiV.html" width="100%" height="100%" frameborder="0" scrolling="auto" title="Daily Devotions" style="position:absolute;" allowfullscreen></iframe>
                </div>
                <p><h4>${current.title}</h4></p>
                <p>${current.description}</p>
            </div>
            `;
        document.querySelector('#devo_media_current').insertAdjacentHTML('afterbegin', current_html);

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
        document.querySelector('#devo_tile_list').insertAdjacentHTML('afterbegin', tile_html);
        }); 
    }).catch(err => console.log('rejected', err.message)); 