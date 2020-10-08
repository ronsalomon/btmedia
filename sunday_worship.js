// fetch sunday worship
const fetchSundayWorship = async () => {
    const response = await fetch("https://cdn.jwplayer.com/v2/playlists/BQ51BDT5"); 
    if(response.status !== 200) {
        throw new Error('Cannot fetch the data');
    }
    const data = await response.json();
    return data;
}

// JW Delivery API - Main Media Page
fetchSundayWorship()
.then(data => {

    const current = data.playlist[0];

    // display current sunday service
    const current_html = 
        `
            <a href="sunday_media.html">
                <img class="img-fluid zoom" src ="https://cdn.jwplayer.com/v2/media/${current.mediaid}/poster.jpg" width="720" height="100%" frameborder="0" scrolling="auto" allowfullscreen></img>
                <h3 style="font-weight:500; padding:20px 0px 20px 0px;">${current.title}</h3>
            </a>
            <p>${current.description}</p>
        `;
    document.querySelector('#media_sunday_current').insertAdjacentHTML('afterbegin', current_html);

    // display (3) most recent after current
    data.playlist.slice(1, 4).reverse().forEach(recent => {
    const recent_list_html = 
        `
            <a href="sunday_media.html">
                <div class="d-flex align-items-center align-self-center">
                    <img class="img-fluid zoom" style="width: 180px;" src="https://cdn.jwplayer.com/v2/media/${recent.mediaid}/poster.jpg?width=320" width="180" height="100%" frameborder="0"></img>
                    <h3 style="font-weight:500; padding-left: 15px;">${recent.title}</h3>
                </div>
            </a>
            <p style="padding:20px 0px 20px 0px; white-space: nowrap; overflow:hidden; text-overflow:ellipsis; width: 100%;">${recent.description}</p>
        `;
    document.querySelector('#media_sunday_list').insertAdjacentHTML('afterbegin', recent_list_html);
    });
}).catch(err => console.log('rejected', err.message));


// fetch for Sunday Worship Media Page
const fetchSundayMainPage = async () => {
    const response = await fetch("https://cdn.jwplayer.com/v2/playlists/BQ51BDT5"); 
    if(response.status !== 200) {
        throw new Error('Cannot fetch the data');
    }
    const data = await response.json();
    return data;
}

// JW Delivery API - Sunday Worship Media Page
fetchSundayMainPage()
    .then(data => {

        // capture current sunday worship
        const current = data.playlist[0];
    
        // display current sunday worship
        const sunday_page_html = 
            `
            <div style="width: 992px; height: 556px; margin-top:100px; margin-bottom: 100px;">
                <iframe src ="https://cdn.jwplayer.com/players/${current.mediaid}-40YHK51f.html" width="992" height="100%" frameborder="0" scrolling="auto" allowfullscreen></iframe>
                <p><h4>${current.title}</h4></p>
                <p>${current.description}</p>
            </div>
            `;
        document.querySelector('#sunday_page_current').insertAdjacentHTML('afterbegin', sunday_page_html);


        // display the most recent (8) sunday services after current (320 x 180)
        data.playlist.slice(1,100).reverse().forEach(tile => {
        const tile_html = 
            `
            <a href="https://cdn.jwplayer.com/players/${tile.mediaid}-40YHK51f.html">
                <div class="p-2 zoom-container-no-border" style="width:320px; margin-top: 20px;">
                    <img class="img-fluid zoom" src="https://cdn.jwplayer.com/v2/media/${tile.mediaid}/poster.jpg?width=320" width="100%" height="100%" frameborder="0" scrolling="auto" allowfullscreen></img>
                    <div style="margin-top: 20px;"><h6>${tile.title}</h6></div>
                </div>
            </a>
            ` ;
        document.querySelector('#sunday_tile_list').insertAdjacentHTML('afterbegin', tile_html);
        });
    }).catch(err => console.log('rejected', err.message)); 