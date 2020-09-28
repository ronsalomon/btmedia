// fetch Sunday Worship
const fetchSundayWorship = async () => {
    const response = await fetch("https://cdn.jwplayer.com/v2/playlists/BQ51BDT5?poster_width=480"); 
    if(response.status !== 200) {
        throw new Error('Cannot fetch the data');
    }
    const data = await response.json();
    return data;
}

fetchSundayWorship()
    .then(data => {

        // display latest devotional
        const main = data.playlist[0];
        console.log(main);

        const html = 
            `
            <a href="sunday_media.html">
                <img src="https://cdn.jwplayer.com/v2/media/${main.mediaid}/poster.jpg?width=480" width="480" height="270" frameborder="0" scrolling="auto" allowfullscreen></img>
                <h5 style="width:480px; margin-top: 20px;">${main.title}</h5>
                <p style="padding: 40px 0px 20px 0px; width:480px;">${main.description}</p>
            </a>
            `;
        document.querySelector('#sunday_current').insertAdjacentHTML('afterbegin', html);
    }).catch(err => console.log('rejected', err.message));




// fetch Daily Devotionals Playlist
const fetchSundayPlayList = async () => {
    const response = await fetch("https://cdn.jwplayer.com/v2/playlists/BQ51BDT5?poster_width=320"); 
    if(response.status !== 200) {
        throw new Error('Cannot fetch the data');
    }
    const data = await response.json(); // convert returned object to json and store
    return data;
}
    

fetchSundayPlayList()
    .then(data => {
        const sunday = data.playlist[0];
        console.log(sunday);
        
        // capture date prefix from titles
        data.playlist.slice(1, 4).reverse().forEach(sunday => { // iterate over titles starting at index 1
            const month = sunday.title.slice(0, 1); // store value for month
            const day = sunday.title.slice(2, 4); // store value for day
            const year = sunday.title.slice(5, 7); // store value for year

            const html = 
                `
                <a href="sunday_media.html"><div class="d-flex align-self-center align-items-center justify-content-center" style="width:480px;">
                    <img src="https://cdn.jwplayer.com/v2/media/${sunday.mediaid}/poster.jpg?width=120" width="120" height="80" frameborder="0"></img>
                        <h5 style="width:480px; padding-left:15px;">${sunday.title}</h5>
                    </div>
                    <p style="padding:20px 0px 10px 0px; width:480px;">${sunday.description}</p>
                </a>
                ` ;
        document.querySelector('#sunday_list').insertAdjacentHTML('afterbegin', html);
        });
    }).catch(err => console.log('rejected', err.message));



// fetch for Prayer Meeting Page
const fetchSundayMainPage = async () => {
    const response = await fetch("https://cdn.jwplayer.com/v2/playlists/BQ51BDT5"); 
    if(response.status !== 200) {
        throw new Error('Cannot fetch the data');
    }
    const data = await response.json();
    return data;
}

fetchSundayMainPage()
    .then(data => {

        // display latest devotional
        const sunday_page = data.playlist[0];
        const sunday_page_player_html = 
            `
            <div style="position:relative; overflow:hidden; margin-top:100px;" class="d-flex justify-content-center align-items-center">
                <iframe src ="https://cdn.jwplayer.com/players/${sunday_page.mediaid}-40YHK51f.html" width="865" height="486"; frameborder="0" scrolling="auto" allowfullscreen></iframe>
            </div>
            `;
        document.querySelector('#sunday_main_player').insertAdjacentHTML('afterbegin', sunday_page_player_html);

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
        document.querySelector('#sunday_title_desc').insertAdjacentHTML('afterbegin', title_desc_html);

        
        // eight most recent videos descending order
        data.playlist.slice(1, 9).reverse().forEach(sunday_tile => {
            
            const sunday_tile_html = 
                `
                    <div class="p-2" style="width:320px; margin-top: 20px;">
                    <iframe src ="https://cdn.jwplayer.com/players/${sunday_tile.mediaid}-40YHK51f.html" width="320" height="180"; frameborder="0" scrolling="auto" allowfullscreen></iframe>
                        <h6>${sunday_tile.title}</h6>
                    </div>
                ` ;
        document.querySelector('#sunday_tile_list').insertAdjacentHTML('afterbegin', sunday_tile_html);
        });
    }).catch(err => console.log('rejected', err.message));
