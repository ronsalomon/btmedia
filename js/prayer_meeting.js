// fetch prayer meeting playlist
const fetchPrayer = async () => {
    const response = await fetch("https://cdn.jwplayer.com/v2/playlists/Kmp7oUbk?poster_width=480"); 
    if(response.status !== 200) {
        throw new Error('Cannot fetch the data');
    }
    const data = await response.json();
    return data;
}

fetchPrayer()
    .then(data => {

        // display latest prayer service
        const main = data.playlist[0];
        console.log(main);

        const html = 
            `
            <a href="prayer_media.html">
                <iframe src="https://cdn.jwplayer.com/v2/media/${main.mediaid}/poster.jpg?width=480" width="480" height="270" frameborder="0" scrolling="auto" allowfullscreen></iframe>
                <h5 style="width:480px; margin-top: 20px;">${main.title}</h5>
                <p style="padding:40px auto 20px auto; width:480px;">${main.description}</p>
            </a>
            `;
        document.querySelector('#prayer_current').insertAdjacentHTML('afterbegin', html);
    }).catch(err => console.log('rejected', err.message));

    const fetchPrayerList = async () => {
        const response = await fetch("https://cdn.jwplayer.com/v2/playlists/Kmp7oUbk?poster_width=320"); 
        if(response.status !== 200) {
            throw new Error('Cannot fetch the data');
        }
        const data = await response.json(); // convert returned object to json and store
        return data;
    }
    
    fetchPrayerList()
        .then(data => {
            
            // capture date prefix from titles
            data.playlist.slice(1, 4).reverse().forEach(prayer => {
    
                const html = 
                    `
                    <a href="prayer_media.html"><div class="d-flex align-self-center align-items-center justify-content-center" style="width:480px;">
                            <iframe src="https://cdn.jwplayer.com/v2/media/${prayer.mediaid}/poster.jpg?width=120" width="120" height="80" frameborder="0"></iframe>
                            <h5 style="width:480px; padding-left:15px;">${prayer.title}</h5>
                        </div>
                        <p style="padding:40px auto 20px auto; width:480px;">${prayer.description}</p>
                    </a>
                    ` ;
            document.querySelector('#prayer_list').insertAdjacentHTML('afterbegin', html);
            });
        }).catch(err => console.log('rejected', err.message));


        
// fetch for Prayer Meeting Page
const fetchPrayerMainPage = async () => {
    const response = await fetch("https://cdn.jwplayer.com/v2/playlists/Kmp7oUbk"); 
    if(response.status !== 200) {
        throw new Error('Cannot fetch the data');
    }
    const data = await response.json();
    return data;
}

fetchPrayerMainPage()
    .then(data => {

        // display latest devotional
        const prayer_page = data.playlist[0];
        const prayer_page_player_html = 
            `
            <div style="position:relative; overflow:hidden; margin-top:100px;" class="d-flex justify-content-center align-items-center">
                <iframe src ="https://cdn.jwplayer.com/players/${prayer_page.mediaid}-40YHK51f.html" width="865" height="486"; frameborder="0" scrolling="auto" allowfullscreen></iframe>
            </div>
            `;
        document.querySelector('#prayer_main_player').insertAdjacentHTML('afterbegin', prayer_page_player_html);

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
        document.querySelector('#prayer_title_desc').insertAdjacentHTML('afterbegin', title_desc_html);

        
        // eight most recent videos descending order
        data.playlist.slice(1, 9).reverse().forEach(prayer_tile => {
            
            const prayer_tile_html = 
                `
                    <div class="p-2" style="width:320px; margin-top: 20px;">
                    <iframe src ="https://cdn.jwplayer.com/players/${prayer_tile.mediaid}-40YHK51f.html" width="320" height="180"; frameborder="0" scrolling="auto" allowfullscreen></iframe>
                        <h6>${prayer_tile.title}</h6>
                    </div>
                ` ;
        document.querySelector('#prayer_tile_list').insertAdjacentHTML('afterbegin', prayer_tile_html);
        });
    }).catch(err => console.log('rejected', err.message));