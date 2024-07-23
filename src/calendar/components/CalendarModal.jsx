import { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');
export const CalendarModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const onCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onCloseModal}
        style={customStyles}
        className="modal"
        overlayClassName="modal-fondo"
        closeTimeoutMS={200}
      >
        <h1>Holoa mundo</h1>
        <hr />
        <span>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi,
          labore vitae nam placeat repudiandae dignissimos voluptates ad
          temporibus recusandae cumque voluptatem ipsa. Dolore quod deleniti
          delectus, possimus perspiciatis placeat error!
        </span>
      </Modal>
    </>
  );
};
