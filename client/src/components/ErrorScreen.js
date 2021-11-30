import * as React from 'react';
import { useContext } from 'react';
import Alert from '@mui/material/Alert';
import AuthContext from '../auth'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

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

export default function ErrorScreen() {
  const { auth } = useContext(AuthContext);
  return (
    <div>
      <Modal
        open={auth.open}
        onClose={auth.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Alert severity="error">{auth.errorMessage}</Alert>
          <Button onClick={auth.handleClose}>Close</Button>
        </Box>
      </Modal>
    </div>
  );
}