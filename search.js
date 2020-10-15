const form = document.getElementById('search-form');
const term = document.getElementById('term');
const api = 'https://cdn.jwplayer.com/v2/playlists/faW1nzct?search=';

const searchTerm = document.getElementById('search_term');
const searchResults = document.getElementById('search_results');

    // listen for submit event
    form.addEventListener('submit', e => {
        e.preventDefault();

        // clear previous search results from page
        function clearResults(){
            $("#search_term").children().remove();
            $("#search_results").children().remove();
        }
        clearResults();

        // build api
        const val = term.value;
        const request =  api + term.value;

        // capture search term
        const displaySearchTerm = async () => {
            return val;
        }

        // display search term
        displaySearchTerm()
        .then(val => {

            // display search term entered
            const searchTitle_html = 
            `<div class="search_term">
                <h3>'${val}' Search Results...</h3>
            </div>`;
            document.querySelector('#search_term').insertAdjacentHTML('afterbegin', searchTitle_html);
        })

        // fetch media
        const fetchMedia = async () => {
            const response = await fetch(request); 
            if(response.status !== 200) {
                throw new Error('Cannot fetch the data');
            }
            const data = await response.json();
            return data;
        }


        // display media results
        fetchMedia()
        .then(data => {

            // display all results
            data.playlist.forEach(item => {

                const current_html = 
                    `   
                        <!--Media Image-->
                        <div class="d-flex flex-wrap align-items-center align-self-center">
                            <a href="https://cdn.jwplayer.com/players/${item.mediaid}-40YHK51f.html">
                                <div class="zoom-container-no-border" style="width:320px; height:180px; margin: 50px 20px 10px 0px;">
                                    <img class="img-fluid zoom" src ="https://cdn.jwplayer.com/v2/media/${item.mediaid}/poster.jpg?width=320" width="100%" height="100%" frameborder="0" scrolling="auto" allowfullscreen></img>
                                </div>
                            </a>
                            <!--Title & Description-->
                            <div class="col-md-8" style="margin-left: 15px;">
                                <a href="http://localhost:5500/search.html#search_page_current"><h2 style="font-weight:500;">${item.title}</h2></a>
                                <p style="white-space: nowrap; overflow:hidden; text-overflow:ellipsis; width: 100%;">${item.description}</p>
                            </div>
                        </div>
                        <!--Read More Divider-->
                        <div class="search_divider_top"><hr /></div>
                        <div class="d-flex bd-highlight mb-3" style="margin-top: -15px;">
                            <div id="category" class="mr-auto p-2 bd-highlight" style="font-size: 13px; color: #212934;">Category: ${item.tags}</div>
                            <a href="https://cdn.jwplayer.com/players/${item.mediaid}-40YHK51f.html">
                                <div id="view_more" class="ml-auto p-2 bd-highlight" style="font-size: 13px; color: #212934;">View More ></div>
                            </a>
                        </div>
                        <div class="search_divider_bottom"><hr /></div>
                    `;
                document.querySelector('#search_results').insertAdjacentHTML('afterbegin', current_html);
            })
        }).catch(err => console.log('rejected', err.message));
    });
