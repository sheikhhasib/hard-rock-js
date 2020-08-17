const searchButton = document.getElementById('searchButton');

searchButton.addEventListener('click',function(){
    const serchInput = document.getElementById('serchInput').value;

    fetch(`https://api.lyrics.ovh/suggest/${serchInput}/`)
    .then(response => response.json())
    .then(data => getSerchResult(data));
})

function getSerchResult(search){
    let parent = document.getElementById('parent');
    for(let i = 0; i<10 ;i++){
        let title = search.data[i].title;
        let artist = search.data[i].artist.name;
        let image = search.data[i].artist.picture_small;
        
        let result = `<div class="single-result row align-items-center my-3 p-3">
            <div class="col-md-8">
                <h3 class="lyrics-name" id="title">${title}</h3>
                <p class="author lead">Album by <span id="artistName">${artist}</span></p>
            </div>
            <div class="col-md-1">
                <img src="${image}" alt="">
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button  onclick="getArtistTitle('${artist}','${title}')" class="btn btn-success">Get Lyrics</button>
            </div>
        </div>`;
        parent.innerHTML += result;
        
    }
}

function getArtistTitle(artist,title){
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    .then(response => response.json())
    .then(lyrics => showLyrics(lyrics,title));
}

function showLyrics(lyrics,title){
    document.getElementById('displayLyrics').innerText = lyrics.lyrics;
    document.getElementById('songTitle').innerText = title;
}