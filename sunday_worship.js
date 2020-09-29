// fetch sunday worship
const fetchSundayWorship = async () => {
    const response = await fetch("https://cdn.jwplayer.com/v2/playlists/BQ51BDT5"); 
    if(response.status !== 200) {
        throw new Error('Cannot fetch the data');
    }
    const data = await response.json();
    return data;
}


fetchSundayWorship()
.then(data => {

    const current = data.playlist[0];

    // display current sunday service
    const current_html = 
        `
            <a href="sunday_media.html">
                <img class="img-fluid" src ="https://cdn.jwplayer.com/v2/media/${current.mediaid}/poster.jpg?width=480" width="480" height="100%" frameborder="0" scrolling="auto" allowfullscreen></img>
                <h5 style="padding: 20px 0px 20px 0px;">${current.title}</h5>
            </a>
            <p>${current.description}</p>
        `;
    document.querySelector('#media_sunday_current').insertAdjacentHTML('afterbegin', current_html);

    // display (3) most recent after current
    data.playlist.slice(1, 4).reverse().forEach(recent => {
    const recent_list_html = 
        `
            <a href="sunday_media.html">
                <div class="multi_list">
                    <img class="img-fluid" src="https://cdn.jwplayer.com/v2/media/${recent.mediaid}/poster.jpg?width=120" width="120" height="100" class="img-fluid" frameborder="0"></img>
                    <h5 style="padding-left: 20px;">${recent.title}</h5>
                </div>
            </a>
            <p style="padding: 20px 0px 20px 0px;">${recent.description}</p>
        `;
    document.querySelector('#media_sunday_list').insertAdjacentHTML('afterbegin', recent_list_html);
    });
}).catch(err => console.log('rejected', err.message));


// fetch for Daily Devotionals Media Page
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
    
        // display current sunday service (865 x 486)
        const sunday_page_html = 
            `
                <div>
                    <iframe class="main_player" src ="https://cdn.jwplayer.com/players/${current.mediaid}-40YHK51f.html" width="100%" height="100%" frameborder="0" scrolling="auto" allowfullscreen></iframe>
                </div>
            `;
        document.querySelector('#sunday_page_current').insertAdjacentHTML('afterbegin', sunday_page_html);

        // display video page title
        const title = data.playlist[0];
        const title_html = 
            `
                <p><h4>${title.title}</h4></p>
            `;
        document.querySelector('#sunday_title').insertAdjacentHTML('afterbegin', title_html);

        // display video page description
        const desc = data.playlist[0];
        const description_html = 
            `
                <p>${desc.description}</p>
            `;
        document.querySelector('#sunday_desc').insertAdjacentHTML('afterbegin', description_html);
        
        // display the most recent (8) sunday services after current (320 x 180)
        data.playlist.slice(1, 9).reverse().forEach(tile => {
        const tile_html = 
            `
                <div class="p-2" style="width:320px; margin-top: 20px;">
                    <iframe src ="https://cdn.jwplayer.com/players/${tile.mediaid}-40YHK51f.html" width="320" height="180"; frameborder="0" scrolling="auto" allowfullscreen></iframe>
                    <h6>${tile.title}</h6>
                </div>
            ` ;
        document.querySelector('#sunday_tile_list').insertAdjacentHTML('afterbegin', tile_html);
        });
    }).catch(err => console.log('rejected', err.message)); 