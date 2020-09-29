// fetch daily devotionals
const fetchDailyDevos = async () => {
    const response = await fetch("https://cdn.jwplayer.com/v2/playlists/sX5mUe4T?poster_width=480"); 
    if(response.status !== 200) {
        throw new Error('Cannot fetch the data');
    }
    const data = await response.json();
    return data;
}

// JW Delivery API - Main Media Page
fetchDailyDevos()
    .then(data => {

        const current = data.playlist[0];

        // display current devotional
        const current_html = 
            `
                <a href="devotional_media.html">
                    <img class="img-fluid" src ="https://cdn.jwplayer.com/v2/media/${current.mediaid}/poster.jpg?width=480" width="480" height="100%"; frameborder="0" scrolling="auto" allowfullscreen></img>
                    <h5 style="padding: 20px 0px 20px 0px;">${current.title}</h5>
                </a>
                <p>${current.description}</p>
            `;
        document.querySelector('#media_devo_current').insertAdjacentHTML('afterbegin', current_html);

        // display (3) most recent devotionals after current
        data.playlist.slice(1, 4).reverse().forEach(recent => {
        const recent_list_html = 
            `
                <a href="devotional_media.html">
                    <div class="multi_list">
                        <img class="img-fluid" src="https://cdn.jwplayer.com/v2/media/${recent.mediaid}/poster.jpg?width=120" width="120" height="100" frameborder="0"></img>
                        <h5 style="padding-left: 20px;">${recent.title}</h5>
                    </div>
                </a>
                <p style="padding: 20px 0px 20px 0px;">${recent.description}</p>
            `;
        document.querySelector('#media_devo_list').insertAdjacentHTML('afterbegin', recent_list_html);
        });
    }).catch(err => console.log('rejected', err.message));



// fetch for Daily Devotionals Media Page
const fetchDevoMainPage = async () => {
    const response = await fetch("https://cdn.jwplayer.com/v2/playlists/sX5mUe4T"); 
    if(response.status !== 200) {
        throw new Error('Cannot fetch the data');
    }
    const data = await response.json();
    return data;
}

// JW Delivery API - Daily Devotional Media Page
fetchDevoMainPage()
    .then(data => {

        // capture current devotional
        const current = data.playlist[0];
    
        // display current devotional (865 x 486)
        const devo_page_html = 
            `
                <div>
                    <iframe class="main_player" src ="https://cdn.jwplayer.com/players/${current.mediaid}-40YHK51f.html" width="100%" height="100%" frameborder="0" scrolling="auto" allowfullscreen></iframe>
                <div>
            `;
        document.querySelector('#devo_page_current').insertAdjacentHTML('afterbegin', devo_page_html);

        // display video page title
        const title = data.playlist[0];
        const title_html = 
            `
                <p><h4>${title.title}</h4></p>
            `;
        document.querySelector('#devo_title').insertAdjacentHTML('afterbegin', title_html);

        // display video page description
        const desc = data.playlist[0];
        const description_html = 
            `
                <p>${desc.description}</p>
            `;
        document.querySelector('#devo_desc').insertAdjacentHTML('afterbegin', description_html);
        
        // display the most recent (8) devos after current (320 x 180)
        data.playlist.slice(1, 9).reverse().forEach(tile => {
        const tile_html = 
            `
                <div class="p-2" style="width:320px; margin-top: 20px;">
                    <iframe src ="https://cdn.jwplayer.com/players/${tile.mediaid}-40YHK51f.html" width="320" height="180"; frameborder="0" scrolling="auto" allowfullscreen></iframe>
                    <h6>${tile.title}</h6>
                </div>
            ` ;
        document.querySelector('#devo_tile_list').insertAdjacentHTML('afterbegin', tile_html);
        });
    }).catch(err => console.log('rejected', err.message));   