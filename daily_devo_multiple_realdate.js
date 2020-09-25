const fetchPlayList = async () => {
    const response = await fetch("https://cdn.jwplayer.com/v2/playlists/sX5mUe4T"); 
    if(response.status !== 200) {
        throw new Error('Cannot fetch the data');
    }
    const data = await response.json(); // convert returned object to json and store
    return data;
}

fetchPlayList()
    .then(data => {
        
        // capture date prefix from titles
        data.playlist.slice(1, 4).reverse().forEach(devo => { // iterate over titles starting at index 1
            const month = devo.title.slice(0, 1); // store value for month
            const day = devo.title.slice(2, 4); // store value for day
            const year = devo.title.slice(5, 7); // store value for year

            const html = 
                `
                <div class="col-sm-6">
                    <iframe src="https://cdn.jwplayer.com/players/${devo.mediaid}-UsTK3SIc.html" width="200" height:"100" frameborder="0" scrolling="auto" position:"absolute" allowfullscreen></iframe>
                    <h5>${devo.title}</h5=>
                </div>
                <p class="col-sm-6 d-flex>${devo.description}</p>
                ` ;
        document.querySelector('#list').insertAdjacentHTML('afterbegin', html);
        });
    }).catch(err => console.log('rejected', err.message));