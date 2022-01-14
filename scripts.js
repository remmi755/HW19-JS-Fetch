let list = document.querySelector('ol')
let elem = document.getElementsByName('li')
let img = document.querySelector('img')
let photo = document.querySelector(".show-photo")
let urlAlbum = 'https://jsonplaceholder.typicode.com/photos?album'
let urlCatalog = "https://jsonplaceholder.typicode.com/albums"

function renderCatalog(arr) {
    let lis = '';
    for (let el of arr) {
        if (!el) {
            return;
        }
        lis += `<li class="item-catalog" data-id="${el.id}">${el.title}</li>`;
    }
    list.innerHTML = lis;
}

function renderPhoto(el) {
    el = `<p>Title: ${el.title}</p>
                <img  src="${el.url}" alt="${el.title}"  class="item-picture"  data-id="${el.id}">`;
    photo.innerHTML = el;
}

async function getCatalog() {
    let response = await fetch(urlCatalog)
    if (response.ok) {
        let catalog = await response.json()
        renderCatalog(catalog)
    } else {
        console.error('Error')
    }
}

getCatalog()

async function showAlbum(id) {
    let response = await fetch(urlAlbum + id)
    if (response.ok) {
        let photos = await response.json()
        renderPhoto(photos[id])
    } else {
        console.error('Error')
    }
}

showAlbum(1)

list.addEventListener('click', (e) => {
    let id = e.target.dataset.id
    showAlbum(id)
})