export function renderGallery(images) {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';

  const markup = images
    .map(image => {
      return `
      <li class="gallery__item">
        <a href="${image.largeImageURL}">
          <div class="photo-card">
            <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
            <div class="info">
              <p><b>Likes:</b> ${image.likes}</p>
              <p><b>Views:</b> ${image.views}</p>
              <p><b>Comments:</b> ${image.comments}</p>
              <p><b>Downloads:</b> ${image.downloads}</p>
            </div>
          </div>
        </a>
      </li>
    `;
    })
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
}
