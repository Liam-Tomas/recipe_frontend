// import React from 'react';
// import { Modal, Box, Typography, Button } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
//   textAlign: 'center',
// };

// const SuccessModal = ({ open, handleClose }) => {
//   const navigate = useNavigate();

//   const handleRedirect = () => {
//     handleClose();
//     navigate('/login');
//   };

//   return (
//     <Modal
//       open={open}
//       onClose={handleClose}
//       aria-labelledby="success-modal-title"
//       aria-describedby="success-modal-description"
//     >
//       <Box sx={style}>
//         <Typography id="success-modal-title" variant="h6" component="h2">
//           Successfully Signed Up
//         </Typography>
//         <Typography id="success-modal-description" sx={{ mt: 2 }}>
//           You may now sign in.
//         </Typography>
//         <Button onClick={handleRedirect} sx={{ mt: 2 }}>
//           Go to Login
//         </Button>
//       </Box>
//     </Modal>
//   );
// };

// export default SuccessModal;
// // import React from 'react';
// // import { Modal, Box, Typography, Button } from '@mui/material';
// // import { useNavigate } from 'react-router-dom';

// // const style = {
// //   position: 'absolute',
// //   top: '50%',
// //   left: '50%',
// //   transform: 'translate(-50%, -50%)',
// //   width: 300, // Adjust the width as necessary
// //   bgcolor: 'background.paper',
// //   boxShadow: 24,
// //   p: 4,
// // };

// // const SuccessModal = ({ open, handleClose }) => {
// //   const navigate = useNavigate();

// //   const handleRedirect = () => {
// //     handleClose();
// //     navigate('/login');
// //   };

// //   return (
// //     <Modal open={open} onClose={handleClose}>
// //       <Box sx={style}>
// //         <Typography variant="h6">
// //           Successfully Signed Up!
// //         </Typography>
// //         <Button onClick={handleRedirect} color="primary" sx={{ mt: 2 }}>
// //           Go to Login
// //         </Button>
// //       </Box>
// //     </Modal>
// //   );
// // };

// // export default SuccessModal;

// SuccessModal.js
import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';


const StyledBox = styled(Box)`
  position: absolute;
  padding: 50px;
  border-radius: 5px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  text-align: center;
  background-color: ${(props) => props.theme.palette.background.paper};
`;

const SuccessModal = ({ open, handleClose }) => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    handleClose();
    navigate('/login');
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="success-modal-title"
      aria-describedby="success-modal-description"
    >
      <StyledBox>
        <Typography id="success-modal-title" variant="h5" component="h2">
          Successfully Signed Up
        </Typography>
        <Typography id="success-modal-description" sx={{ mt: 3 }}>
          You may now sign in.
        </Typography>
        <Button variant="contained" onClick={handleRedirect} sx={{ mt: 3 }}>
          Go to Login
        </Button>
      </StyledBox>
    </Modal>
  );
};

export default SuccessModal;
