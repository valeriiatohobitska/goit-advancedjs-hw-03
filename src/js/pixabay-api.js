const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '37266256-83bd782bb95c33f4401b18249';

export async function fetchImages(query) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });

  try {
    const response = await fetch(`${BASE_URL}?${params}`);
    const data = await response.json();

    if (!data.hits.length) {
      throw new Error('No results');
    }

    return data.hits;
  } catch (error) {
    const { default: iziToast } = await import('izitoast');
    iziToast.error({
      message: 'Sorry, there are no images matching. Please try again',
      position: 'topRight',
    });
    throw error;
  }
}
