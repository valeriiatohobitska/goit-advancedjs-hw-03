import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { fetchImages } from './js/pixabay-api';
import { renderGallery } from './js/render-functions';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.search-form');
const input = form.querySelector('input[name="search"]');
const loader = document.querySelector('.loader');

let lightbox = null;

form.addEventListener('submit', onSearch);

function onSearch(event) {
  event.preventDefault();

  const query = input.value.trim();

  if (query === '') {
    iziToast.warning({
      message: 'Please enter a search query.',
      position: 'topRight',
    });
    return;
  }

  loader.classList.add('active');

  fetchImages(query)
    .then(images => {
      renderGallery(images);

      if (lightbox) {
        lightbox.refresh();
      } else {
        lightbox = new SimpleLightbox('.gallery a', {
          captionsData: 'alt',
          captionDelay: 250,
        });
      }
    })
    .catch(error => {
      iziToast.error({
        message: 'Something went wrong. Please try again later.',
        position: 'topRight',
      });
      console.error(error);
    })
    .finally(() => {
      loader.classList.remove('active');
    });
}
