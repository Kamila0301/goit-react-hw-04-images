import { useEffect, useState } from 'react';
import Notiflix from 'notiflix';
import { fetchItems } from 'api';
import { Loader } from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { AppStyle } from './App.styled';
import { Button } from './Button/Button';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const changeQuery = newQuery => {
    setQuery(`${Date.now()}/${newQuery}`);
    setImages([]);
    setPage(1);
  };

  useEffect(() => {
    const showResult = async () => {
      try {
        setLoading(true);
        const image = await fetchItems(query, page);
        if (image.length) {
          setImages(prevImages =>
            page > 1 ? [...prevImages, ...image] : image
          );
          setLoading(false);
        } else {
          Notiflix.Notify.failure(
            'Вибачте, щось пішло не так, спробуйте ще раз'
          );
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
      }
    };

    if (query && page) {
      showResult();
    }
  }, [query, page]);

  const handleSubmit = event => {
    event.preventDefault();

    if (query.trim() !== '') {
      Notiflix.Notify.info('Введіть, будь ласка, пошукове слово');
      return;
    }
    changeQuery(event.target.elements.query.value);
    event.target.reset();
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <AppStyle>
      <Searchbar onSubmit={handleSubmit} />

      {images.length > 0 && <ImageGallery imageItems={images} />}
      {loading && <Loader />}
      {images.length > 0 && !loading && (
        <Button onClick={handleLoadMore}>Load More</Button>
      )}
    </AppStyle>
  );
};
