import { useDispatch, useSelector } from 'react-redux';
import { toggleModal } from '../../slices/modalsSlice';
import AdvertForm from '../AdvertForm';
import Modal from '../ui/Modal';

const AdvertModal = () => {

  const showModal = useSelector(state => state.modals.advert)
  const dispatch = useDispatch()
  
  const close = () => dispatch(toggleModal({advert: false}))

  if(showModal){
    return (
      <Modal close={close}>
        <AdvertForm close={close} />
      </Modal>
    )
  }
  return null;
}

export default AdvertModal