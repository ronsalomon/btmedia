// fetch prayer meeting playlist
const fetchPrayer = async () => {
    const response = await fetch("https://cdn.jwplayer.com/v2/playlists/Kmp7oUbk"); 
    if(response.status !== 200) {
        throw new Error('Cannot fetch the data');
    }
    const data = await response.json();
    return data;
}

// call JW Delivery API
fetchPrayer()
    .then(data => {

        const current = data.playlist[0];

        // display current prayer meeting
        const current_html = 
            `
                <a href="prayer_media.html">
                    <img class="img-fluid" src ="https://cdn.jwplayer.com/v2/media/${current.mediaid}/poster.jpg" width="600" height="100%"; frameborder="0" scrolling="auto" allowfullscreen></img>
                    <h3 style="font-weight:500; padding:20px 0px 20px 0px;">${current.title}</h3>
                </a>
                <p>${current.description}</p>
            `;
        document.querySelector('#media_prayer_current').insertAdjacentHTML('afterbegin', current_html);

        // display (3) most recent prayer meetings after current
        data.playlist.slice(1, 4).reverse().forEach(recent => {
        const recent_list_html = 
            `
                <a href="prayer_media.html">
                    <div class="multiple_list">
                        <img class="img-fluid" src="https://cdn.jwplayer.com/v2/media/${recent.mediaid}/poster.jpg?width=320" width="180" height="112" frameborder="0"></img>
                        <h3 style="font-weight:500; padding-left:15px;">${recent.title}</h3>
                    </div>
                </a>
                <p style="padding: 20px 0px 20px 0px;">${recent.description}</p>
            `;
        document.querySelector('#media_prayer_list').insertAdjacentHTML('afterbegin', recent_list_html);
        });
    }).catch(err => console.log('rejected', err.message));



// fetch for Daily Devotionals Media Page
const fetchPrayerMainPage = async () => {
    const response = await fetch("https://cdn.jwplayer.com/v2/playlists/Kmp7oUbk"); 
    if(response.status !== 200) {
        throw new Error('Cannot fetch the data');
    }
    const data = await response.json();
    return data;
}

// JW Delivery API - Prayer Meeting Media Page
fetchPrayerMainPage()
    .then(data => {

        // capture current prayer meeting
        const current = data.playlist[0];
    
        // display current prayer service (865 x 486)
        const prayer_page_html = 
            `
                <div>
                    <iframe class="main_player" src ="https://cdn.jwplayer.com/players/${current.mediaid}-40YHK51f.html" width="100%" height="100%" frameborder="0" scrolling="auto" allowfullscreen></iframe>
                </div>
            `;
        document.querySelector('#prayer_page_current').insertAdjacentHTML('afterbegin', prayer_page_html);

        // display video page title
        const title = data.playlist[0];
        const title_html = 
            `
            <p><h4>${title.title}</h4></p>
            `;
        document.querySelector('#prayer_title').insertAdjacentHTML('afterbegin', title_html);

        // display video page description
        const desc = data.playlist[0];
        const description_html = 
            `
            <p>${desc.description}</p>
            `;
        document.querySelector('#prayer_desc').insertAdjacentHTML('afterbegin', description_html);
        
        // display the most recent (8) prayer meetings after current (320 x 180)
        data.playlist.reverse().forEach(tile => {
        const tile_html = 
            `
            <div class="p-2" style="width:320px; margin-top: 20px;">
                <iframe src ="https://cdn.jwplayer.com/players/${tile.mediaid}-40YHK51f.html" width="320" height="180"; frameborder="0" scrolling="auto" allowfullscreen></iframe>
                <h6>${tile.title}</h6>
            </div>
            ` ;
        document.querySelector('#prayer_tile_list').insertAdjacentHTML('afterbegin', tile_html);
        });
    }).catch(err => console.log('rejected', err.message));   