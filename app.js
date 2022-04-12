const apiUrl = `https://api.lyrics.ovh/`;

const getForm = document.querySelector('#form');
const getInput = document.querySelector('#search');
const getButton = document.querySelector('button');
const getUlSongs = document.querySelector('#songs-container');
const getPrevNext = document.querySelector('#prev-and-next-container');

//console.log({getForm, getInput, getButton, getUlSongs, getPrevNext});

const insertIntoPage = songsInfo => {
    getUlSongs.innerHTML = songsInfo.data.map(song => `
    <li class="song">
        <span class="song-artist"><strong>${song.artist.name}</strong> - ${song.title}</span>
    <button class="btn" data-artist="${song.artist.name}" data-song-title="${song.title}">Ver letra</button>
    </li>
    `).join('');

    if(songsInfo.next || songsInfo.prev){
        getPrevNext.innerHTML = `
        ${songsInfo.next ? `<button class="btn" onClick="getMoreSongs('${songsInfo.next}')">Próxima</button>` : ""};
        ${songsInfo.prev ? `<button class="btn" onClick="getMoreSongs('${songsInfo.prev}')">Anteriores</button>` : ""};
        `
        return
    }

    getPrevNext.innerHTML = "";
}


const fetchMusic = async term => {
    const response = await fetch(`${apiUrl}/suggest/${term}`)
    const data = await response.json();
    insertIntoPage(data);
}


getForm.addEventListener('submit', e => {
    e.preventDefault();
    const termInput = getInput.value.trim();
    //console.log(termInput);
    
    if(termInput == ''){
        getUlSongs.innerHTML = `<li class="warning-message">Por favor, digite um termo válido</li>`;
        return
    }

    fetchMusic(termInput);
    
});