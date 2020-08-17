const searchButton = document.getElementById('searchButton');

searchButton.addEventListener('click',function(){
    const serchInput = document.getElementById('serchInput').value;

    fetch(`https://api.lyrics.ovh/suggest/${serchInput}/`)
    .then(response => response.json())
    .then(data => getSerchResult(data));
})

function getSerchResult(search){
    let parent = document.getElementById('parent');
    console.log(search);
    for(let i = 0; i<10 ;i++){
        let title = search.data[i].title;
        let artist = search.data[i].artist.name;
        let image = search.data[i].artist.picture_small;
        
        let result = `<div class="single-result row align-items-center my-3 p-3">
            <div class="col-md-8">
                <h3 class="lyrics-name">${title}</h3>
                <p class="author lead">Album by <span>${artist}</span></p>
            </div>
            <div class="col-md-1">
                <img src="${image}" alt="">
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button class="btn btn-success">Get Lyrics</button>
            </div>
        </div>`;
        parent.innerHTML += result;
        
    }
}

