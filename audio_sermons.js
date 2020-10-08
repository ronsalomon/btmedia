// fetch audio sermons
const fetchAudioSermons = async () => {
    const response = await fetch("https://cdn.jwplayer.com/v2/playlists/ffbUhUp1"); 
    if(response.status !== 200) {
        throw new Error('Cannot fetch the data');
    }
    const data = await response.json();
    return data;
}


fetchAudioSermons()
.then(data => {

    const current = data.playlist[0];

    // display current audio service
    const current_html = 
        `
            <a href="audio_media.html">
                <img class="img-fluid" src ="https://cdn.jwplayer.com/v2/media/${current.mediaid}/poster.jpg" width="865" height="100%" frameborder="0" scrolling="auto" allowfullscreen></img>
                <h3 style="font-weight:500; padding:20px 0px 20px 0px;">${current.title}</h3>
            </a>
            <p>${current.description}</p>
        `;
    document.querySelector('#media_audio_current').insertAdjacentHTML('afterbegin', current_html);

    // display (3) most recent audio sermons after current
    data.playlist.slice(1, 4).reverse().forEach(recent => {
    const recent_list_html = 
        `
            <a href="audio_media.html">
                <div class="d-flex align-items-center align-self-center">
                    <img class="img-fluid zoom" src="https://cdn.jwplayer.com/v2/media/${recent.mediaid}/poster.jpg?width=320" width="180" height="100%" class="img-fluid" frameborder="0"></img>
                    <h3 style="font-weight:500; padding-left: 20px;">${recent.title}</h3>
                </div>
            </a>
            <p style="padding: 20px 0px 20px 0px;">${recent.description}</p>
        `;
    document.querySelector('#media_audio_list').insertAdjacentHTML('afterbegin', recent_list_html);
    });
}).catch(err => console.log('rejected', err.message));


// fetch for Audio Sermons Media Page
const fetchAudioMainPage = async () => {
    const response = await fetch("https://cdn.jwplayer.com/v2/playlists/ffbUhUp1"); 
    if(response.status !== 200) {
        throw new Error('Cannot fetch the data');
    }
    const data = await response.json();
    return data;
}

// JW Delivery API - Audio Sermons Media Page
fetchAudioMainPage()
    .then(data => {

        // capture current audio sermons
        const current = data.playlist[0];
    
        // display current audio service
        const audio_page_html = 
            `
            <div style="width: 992px; height: 556px; margin-top:100px; margin-bottom: 100px;">
                <iframe src ="https://cdn.jwplayer.com/players/${current.mediaid}-40YHK51f.html" width="992" height="100%" frameborder="0" scrolling="auto" allowfullscreen></iframe>
                <p><h4>${current.title}</h4></p>
                <p>${current.description}</p>
            </div>
            `;
        document.querySelector('#audio_page_current').insertAdjacentHTML('afterbegin', audio_page_html);

        
        // display the most recent (8) audio services after current (320 x 180)
        data.playlist.slice(1,100).reverse().forEach(tile => {
        const tile_html = 
            `
            <a href="https://cdn.jwplayer.com/players/${tile.mediaid}-40YHK51f.html">
                <div class="p-2 zoom-container-no-border" style="width:320px; margin-top: 20px;">
                    <img class="img-fluid zoom" src="https://cdn.jwplayer.com/v2/media/${tile.mediaid}/poster.jpg?width=320" width="100%" height="100%"; frameborder="0" scrolling="auto" allowfullscreen></img>
                    <div style="margin-top: 20px;"><h6>${tile.title}</h6></div>
                </div>
            </a>
            ` ;
        document.querySelector('#audio_tile_list').insertAdjacentHTML('afterbegin', tile_html);
        });
    }).catch(err => console.log('rejected', err.message)); 