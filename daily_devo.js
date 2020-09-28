// fetch Daily Devotionals
const fetchDailyDevos = async () => {
    const response = await fetch("https://cdn.jwplayer.com/v2/playlists/sX5mUe4T?poster_width=480"); 
    if(response.status !== 200) {
        throw new Error('Cannot fetch the data');
    }
    const data = await response.json();
    return data;
}

fetchDailyDevos()
    .then(data => {

        // display latest devotional
        const main = data.playlist[0];
        console.log(main);

        const html = 
            `
            <a href="devotional_media.html">
                <img src ="https://cdn.jwplayer.com/v2/media/${main.mediaid}/poster.jpg?width=480" width="480" height="270"; frameborder="0" scrolling="auto" allowfullscreen></img>
                <h5 style="width:480px; margin-top: 20px;">${main.title}</h5>
                <p style="padding: 40px auto 20px auto; width:480px;">${main.description}</p>
            </a>
            `;
        document.querySelector('#devo_current').insertAdjacentHTML('afterbegin', html);
    }).catch(err => console.log('rejected', err.message));


// fetch Daily Devotionals Playlist
const fetchDevosPlayList = async () => {
    const response = await fetch("https://cdn.jwplayer.com/v2/playlists/sX5mUe4T?poster_width=320"); 
    if(response.status !== 200) {
        throw new Error('Cannot fetch the data');
    }
    const data = await response.json();
    return data;
}
    
fetchDevosPlayList()
    .then(data => {
        const main = data.playlist[0];
        console.log(main);
        
        // capture date prefix from titles
        data.playlist.slice(1, 4).reverse().forEach(devos => {
            
            const html = 
                `
                    <a href="devotional_media.html"><div class="d-flex align-self-center align-items-center justify-content-center" style="width:480px;">
                        <img src="https://cdn.jwplayer.com/v2/media/${main.mediaid}/poster.jpg?width=120" width="120" height="80" frameborder="0"></img>
                        <h5 style="width:480px; padding-left:15px;">${devos.title}</h5>
                        </div>
                        <p style="padding: 10px 0px 10px 0px; width:480px;">${devos.description}</p>
                    </a>
                ` ;
        document.querySelector('#devo_list').insertAdjacentHTML('afterbegin', html);
        });
    }).catch(err => console.log('rejected', err.message));




// fetch for Daily Devotionals Page
const fetchDevoMainPage = async () => {
    const response = await fetch("https://cdn.jwplayer.com/v2/playlists/sX5mUe4T"); 
    if(response.status !== 200) {
        throw new Error('Cannot fetch the data');
    }
    const data = await response.json();
    return data;
}

fetchDevoMainPage()
    .then(data => {

        // display latest devotional
        const devo_page = data.playlist[0];
        const devo_page_player_html = 
            `
            <div style="position:relative; overflow:hidden; margin-top:100px;" class="d-flex justify-content-center align-items-center">
                <iframe src ="https://cdn.jwplayer.com/players/${devo_page.mediaid}-40YHK51f.html" width="865" height="486"; frameborder="0" scrolling="auto" allowfullscreen></iframe>
            </div>
            `;
        document.querySelector('#devo_main_player').insertAdjacentHTML('afterbegin', devo_page_player_html);

        const title_desc = data.playlist[0];
        const title_desc_html = 
            `
            <div style="width: 865px; margin:10px 0px 30px 520px;">
                <h4>${title_desc.title}</h4>
            </div>
            <div style="width: 865px; margin-left:520px;">
                <p>${title_desc.description}</p>
            </div>
            `;
        document.querySelector('#devo_title_desc').insertAdjacentHTML('afterbegin', title_desc_html);
        
        // capture date prefix from titles
        data.playlist.slice(1, 9).reverse().forEach(devo_tile => {
            
            const devo_tile_html = 
                `
                    <div class="p-2" style="width:320px; margin-top: 20px;">
                    <iframe src ="https://cdn.jwplayer.com/players/${devo_tile.mediaid}-40YHK51f.html" width="320" height="180"; frameborder="0" scrolling="auto" allowfullscreen></iframe>
                        <h6>${devo_tile.title}</h6>
                    </div>
                ` ;
        document.querySelector('#devo_tile_list').insertAdjacentHTML('afterbegin', devo_tile_html);
        });
    }).catch(err => console.log('rejected', err.message));
