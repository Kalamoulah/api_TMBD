// recuperation des element du DOM
const cards = document.querySelector('.cards')
const form = document.querySelector('form')
const inputSearch = document.querySelector('#search')

// declaration des variables
let count = 1;
const apiurl = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=${count}`;
let searchUrl = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query="
let plane = "plane"
const IMGPATH = "https://image.tmdb.org/t/p/w1280";

function createElement(tagName, attr, content) {
    let element  = document.createElement(tagName);
    for (const key in attr) {
       element.setAttribute(key, attr[key])
    }
    element.textContent = content;
    return element;
}

function appendChildEL(parent, child) {
    parent.appendChild(child);
}

function createParent(title, desc, note, img) {
    let movie = createElement("div", {class:"movis"});
    let imgBox = createElement("div", {class:"img_box"}); 

        imgBox.style.background =`url(${img})`
        imgBox.style.backgroundSize = "cover"
    let overviewBox = createElement("div", {class:"overview_box"});
    let over = createElement("h3", {class:"over"}, "Overview");
    let description = createElement("p", {class:"desc"}, desc); 
    let infoBox = createElement("div", {class:"info_box"}); 
    let movieTitle = createElement("h2", {class:"movie_title "},title); 
    let noteInfo = createElement("div", {class:"note_info "}); 
    let noteel = createElement("div", {class:"note"}, note.toFixed(1));
 
    appendChildEL(movie, imgBox);
    appendChildEL(movie, overviewBox);
    appendChildEL(overviewBox, over);
    appendChildEL(overviewBox, description);
    appendChildEL(movie, infoBox);
    appendChildEL(infoBox, movieTitle),
    appendChildEL(infoBox, noteInfo);
    appendChildEL(noteInfo, noteel);

  return movie;
}

function removeChild(parent, child) {
    parent.remove(child);    
}

function moviesEL(data) {      
    for (const movies of data) {       
        const{title, poster_path, vote_average, overview} = movies;
       let film = createParent(title, overview, vote_average, IMGPATH+poster_path)
       appendChildEL(cards, film)      
    }
}

function getMovis(url) {    
   fetch(url)
  .then(response=>response.json())
  .then(data =>  moviesEL(data.results))    
}
getMovis(apiurl);  

inputSearch.addEventListener('input',()=>{     
    filmSearch = inputSearch.value
      if (filmSearch) {
        cards.innerHTML=""
        getMovis(searchUrl + filmSearch);
    } if (filmSearch==" "){
        location.reload();
    }        
})
 
const view = document.querySelector('.view')
const infinty = entries =>{
    // console.log(entries);
    if (entries[0].isIntersecting) {       
       getMovis(apiurl+count++); 
    }    
 }
const options={
    rootMargin:"-15% 0%",
}

new IntersectionObserver(infinty, options).observe(view);
