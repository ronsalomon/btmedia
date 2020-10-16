// fetch prayer meeting playlist posters
const fetchPrayerMain = async () => {
    const response = await fetch("https://cdn.jwplayer.com/v2/playlists/Kmp7oUbk"); 
    if(response.status !== 200) {
        throw new Error('Cannot fetch the data');
    }
    const data = await response.json();
    return data;
}

// call JW Delivery API
fetchPrayerMain()
    .then(data => {

        const current = data.playlist[0];

        // display current prayer meeting on Main Media Page
        const current_html = 
            ` 
                <a href="prayer_media.html#prayer_media_current" alt="current prayer service">
                    <div class="d-flex flex-wrap align-items-center align-self-center">
                        <div class="zoom_index_current_container">
                            <img class="img-fluid zoom" src ="https://cdn.jwplayer.com/v2/media/${current.mediaid}/poster.jpg" width="100%" height="100%" frameborder="0" scrolling="auto" allowfullscreen></img>
                        </div>
                        <div style="color: #212529; padding-top: 20px;"><h3>${current.title}</h3></div>
                    </div>
                    <p style="padding-top: 10px; padding-bottom: 20px;">${current.description}</p>
                </a>
            `;
        document.querySelector('#prayer_current').insertAdjacentHTML('afterbegin', current_html);


        // display (3) most recent Prayer Meetings after current
        data.playlist.slice(1, 4).reverse().forEach(recent => {

        const list_html = 
            `
                <a href="devo_media.html#devo_media_current" alt="prayer meeting">
                    <div class="d-flex justify-content-between align-items-center align-self-center">
                        <div class="zoom_index_list">
                            <img class="img-fluid zoom" src="https://cdn.jwplayer.com/v2/media/${recent.mediaid}/poster.jpg?width=320" width="100%" height="100%" frameborder="0"></img>
                        </div>
                        <div><h3>${recent.title}</h3></div>
                    </div>
                    <p style="padding-top: 10px; padding-bottom: 20px; overflow: hidden;">${recent.description}</p>
                <a>
            `;
         document.querySelector('#prayer_list').insertAdjacentHTML('afterbegin', list_html);
        });
}).catch(err => console.log('rejected', err.message)); 



// fetch prayer meeting playlist
const fetchPrayerTiles = async () => {
    const response = await fetch("https://cdn.jwplayer.com/v2/playlists/Kmp7oUbk"); 
    if(response.status !== 200) {
        throw new Error('Cannot fetch the data');
    }
    const data = await response.json();
    return data;
}


// call JW Delivery API
fetchPrayerTiles()
    .then(data => {

        const current = data.playlist[0];

     // display current content - Individual Media Page (992px x 558px)
        const current_html = 
            `
            <div class="main_video_media_page">
                <div style="position:relative; overflow:hidden; padding-bottom:56.25%">
                    <iframe src="https://cdn.jwplayer.com/players/Kmp7oUbk-BI9bjUiV.html" width="100%" height="100%" frameborder="0" scrolling="auto" title="Tuesday Night Prayer Meeting" style="position:absolute;" allowfullscreen></iframe>
                </div>
                <p><h4>${current.title}</h4></p>
                <p>${current.description}</p>
            </div>
            `;
        document.querySelector('#prayer_media_current').insertAdjacentHTML('afterbegin', current_html);

        // display the most recent (100) (320 x 180)
        data.playlist.slice(0, 99).reverse().forEach(tile => {
        const tile_html = 
            `
                <div class="zoom-container-no-border" style="width: 320px; height:225px; margin-top: 20px;">
                    <img class="img-fluid zoom tile_sizing_media" src="https://cdn.jwplayer.com/v2/media/${tile.mediaid}/poster.jpg" width="100%" height="100%" frameborder="0" scrolling="auto" allowfullscreen></img>
                    <p>${tile.title}</p>
                    <p>${tile.description}</p>
                </div>
            ` ;
        document.querySelector('#prayer_tile_list').insertAdjacentHTML('afterbegin', tile_html);
        }); 
    }).catch(err => console.log('rejected', err.message)); 