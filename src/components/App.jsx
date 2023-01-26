import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { searchImage } from 'services/API';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import toast, { Toaster } from 'react-hot-toast';
import { Modal } from './Modal/Modal';
import { Wrapper } from './App.styled';
import { Grid } from 'react-loader-spinner';
export function App() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [totalImages, setTotalImages] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const onSearchQuery = evt => {
    evt.preventDefault();
    const { value } = evt.target.elements.search;
    if (value.trim() === '') {
      setGalleryImages([]);
      setTotalImages(0);
      return toast('Упс( Пустой запрос ');
    }
    setGalleryImages([]);
    setTotalImages(0);
    setPage(1);
    setSearchQuery(value.trim());
  };
  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    const fetchImage = async () => {
      setIsLoading(true);
      try {
        const data = await searchImage(searchQuery, page);
        if (data.totalHits > 0) {
          setGalleryImages(prevState => [...prevState, ...data.hits]);
          setTotalImages(data.totalHits);
        } else {
          toast('Неудачный поиск, сделайте повторный запрос');
        }
      } catch (error) {
        toString('Упс(: Что-то пошло не так перезагрузите страницу');
      } finally {
        setIsLoading(false);
      }
    };
    fetchImage();
  }, [searchQuery, page]);
  const onLoadMore = () => setPage(prevState => prevState + 1);
  const onToggleModal = () => setShowModal(!showModal);
  const onOpenModal = evt => {
    const largeImageURL = evt.target.dataset.source;
    if (largeImageURL) {
      setLargeImageURL(largeImageURL);
      onToggleModal();
    }
  };

  const showLoadMore = galleryImages.length < totalImages;

  return (
    <Wrapper>
      <Toaster />
      <Searchbar onSubmit={onSearchQuery} />
      <ImageGallery onClick={onOpenModal} images={galleryImages}></ImageGallery>
      {showLoadMore && <Button onClick={onLoadMore} />}
      {isLoading ? (
        <Grid
          height="300"
          width="300"
          color="blue"
          ariaLabel="grid-loading"
          radius="12.5"
          wrapperStyle={{ display: 'block', margin: '0 auto' }}
        />
      ) : null}
      {showModal && (
        <Modal onToggleModal={onToggleModal}>
          <img src={largeImageURL} alt={largeImageURL} />
        </Modal>
      )}
    </Wrapper>
  );
}
