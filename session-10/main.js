const CatButton = document.querySelector('#catButton')
const Dogbutton = document.querySelector('#dogButton')
const searchForm = document.querySelector('.search-form')
const searchInput = document.querySelector('.search-bar')
const imagesContainer = document.querySelector('.img-container')
const randomImage = document.querySelector('.random-image')
const randomImgContainer = document.querySelector('.random-image-container')
const APIKEY = 'A6FNdLEI8LkzwWSyn5WcUKCf235ohuNQ'

const fetchDogImage = () => {
  const URL = `https://api.giphy.com/v1/gifs/translate?api_key=${APIKEY}&s=dogs`

  fetch(URL, { mode: 'cors' })
    .then((response) => {
      return response.json()
    })
    .then((response) => {
      randomImage.setAttribute('src', response.data.images.original.url)
    })
    .catch((error) => {
      console.log(error)
    })
}

const fetchCatImage = () => {
  const URL = `https://api.giphy.com/v1/gifs/translate?api_key=${APIKEY}&s=cats`

  fetch(URL, { mode: 'cors' })
    .then((response) => {
      return response.json()
    })
    .then((response) => {
      randomImage.setAttribute('src', response.data.images.original.url)
    })
    .catch((error) => {
      console.log(error)
    })
}

const removeGifsFrom = (container) => {
  while (container.firstChild) {
    container.removeChild(container.firstChild)
  }
}

const searchGifs = () => {
  const URL = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&q=${searchInput.value}&limit=4&bundler=downsized_small`

  fetch(URL, { mode: 'cors' })
    .then((response) => {
      return response.json()
    })
    .then((response) => {
      const data = response.data
      data.forEach((object) => {
        const src = object.images.fixed_height.url
        const image = document.createElement('img')
        image.setAttribute('src', src)
        imagesContainer.appendChild(image)
      })
    })
    .catch((error) => {
      console.log(error)
    })
}

Dogbutton.addEventListener('click', fetchDogImage)
CatButton.addEventListener('click', fetchCatImage)
searchForm.addEventListener('submit', (event) => {
  event.preventDefault()
  removeGifsFrom(imagesContainer)
  searchGifs()
})

window.addEventListener('load', fetchCatImage)
