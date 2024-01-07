import { useState } from 'react';
import Modal from 'react-modal';
import { ImageGalleryItemImage } from './ImageGalleryItem.styled';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 'calc(100vw - 48px)',
    maxHeight: 'calc(100vh - 24px)',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
};

Modal.setAppElement('#root');

export const ImageGalleryItem = ({ webformatURL, tags, largeImageURL }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <div>
      <ImageGalleryItemImage
        src={webformatURL}
        onClick={() => setIsOpenModal(true)}
      />
      <Modal
        isOpen={isOpenModal}
        onRequestClose={() => setIsOpenModal(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <img src={largeImageURL} alt={tags} />
      </Modal>
    </div>
  );
};
