import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
/*
    This modal is shown when the user asks to delete a list. Note 
    that before this is shown a list has to be marked for deletion,
    which means its id has to be known so that we can retrieve its
    information and display its name in this modal. If the user presses
    confirm, it will be deleted.
    
    @author McKilla Gorilla
*/
function DeleteModal() {
    const { store } = useContext(GlobalStoreContext);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
    function handleDeleteList(event) {
        store.deleteMarkedList();
    }
    function handleCloseModal(event) {
        store.unmarkListForDeletion();
    }
    return (
        <div>
            <Modal
            open={store.listMarkedForDeletion !== null}
        >
            <Box sx={style}>
            <Typography id="dialog-header">
                Delete the {store.listMarkedForDeletionName} Top 5 List?
                </Typography>
            <Button onClick={handleDeleteList}>Confirm</Button>
            <Button onClick={handleCloseModal}>Cancel</Button>
            </Box>
          </Modal>
        </div>
    );
}

export default DeleteModal;