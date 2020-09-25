// fetch daily devo playlist
const fetchMain = async () => {
    const response = await fetch("https://cdn.jwplayer.com/v2/playlists/sX5mUe4T"); 
    if(response.status !== 200) {
        throw new Error('Cannot fetch the data');
    }
    const data = await response.json();
    return data;
}

fetchMain()
    .then(data => {

        // display latest devotional
        const main = data.playlist[0];
        console.log(main);

        const html = 
            `
            <div class="col-sm-6"> 
                <iframe src="https://cdn.jwplayer.com/players/${main.mediaid}-UsTK3SIc.html" width="480" height="325" frameborder="0" scrolling="auto" allowfullscreen></iframe>
                <h5>${main.title}</h5>
            </div>
            <p class="col-sm-6 d-flex align-items-center">${main.description}</p>
            </a>
            `;
        document.querySelector('#main').insertAdjacentHTML('afterbegin', html);
    }).catch(err => console.log('rejected', err.message));