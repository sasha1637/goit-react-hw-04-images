import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { searchImage } from 'services/API';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import toast, { Toaster } from 'react-hot-toast';
import { Modal } from './Modal/Modal';
import { Wrapper } from './App.styled';
import { Grid } from 'react-loader-spinner';
export class App extends Component {
  state = {
    page: 1,
    searchQuery: '',
    isLoading: false,
    galleryImages: [],
    largeImageURL: '',
    totalImages: 0,
    showModal: false,
  };
  onSearchQuery = evt => {
    evt.preventDefault();
    const { value } = evt.target.elements.search;
    if (value.trim() === '') {
      this.setState({
        galleryImages: [],
        totalImages: 0,
      });
      return toast('Упс( Пустой запрос ');
    }
    this.setState({
      searchQuery: value,
      page: 1,
      galleryImages: [],
      totalImages: 0,
    });
  };
  componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.fetchImage();
    }
  }
  fetchImage = async () => {
    const { searchQuery, page } = this.state;
    this.setState({ isLoading: true });
    try {
      const data = await searchImage(searchQuery, page);
      if (data.totalHits > 0) {
        this.setState(prevState => ({
          galleryImages: [...prevState.galleryImages, ...data.hits],
          totalImages: data.totalHits,
        }));
      } else {
        toast('Неудачный поиск, сделайте повторный запрос');
      }
    } catch (error) {
      toString('Упс(: Что-то пошло не так перезагрузите страницу');
    } finally {
      this.setState({ isLoading: false });
    }
  };
  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };
  onToggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };
  onOpenModal = evt => {
    const largeImageURL = evt.target.dataset.source;
    if (largeImageURL) {
      this.setState({ largeImageURL: largeImageURL });
      this.onToggleModal();
    }
  };
  render() {
    const {
      showModal,
      largeImageURL,
      imageAlt,
      galleryImages,
      totalImages,
      isLoading,
    } = this.state;
    const showLoadMore = galleryImages.length < totalImages;
    return (
      <Wrapper>
        <Toaster />
        <Searchbar onSubmit={this.onSearchQuery} />
        <ImageGallery
          onClick={this.onOpenModal}
          images={galleryImages}
        ></ImageGallery>
        {showLoadMore && <Button onClick={this.onLoadMore} />}
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
          <Modal onToggleModal={this.onToggleModal}>
            <img src={largeImageURL} alt={imageAlt} />
          </Modal>
        )}
      </Wrapper>
    );
  }
}
