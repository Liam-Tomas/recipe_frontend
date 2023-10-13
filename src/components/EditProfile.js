// import React, { useState, useEffect } from 'react';
// import { getAuth, onAuthStateChanged, updateEmail, updatePassword, signOut } from 'firebase/auth';
// import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
// import { useNavigate } from 'react-router-dom';
// import { TextField, Button, Typography } from '@mui/material';
// import styled from 'styled-components';
// import { reload } from 'firebase/auth';


// const Centered = styled.div`
//   color: /* your desired text color */;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   min-height: 90vh;

//   form {
//     display: flex;
//     color: red;
//     flex-direction: column;
//     gap: 15px;
//     width: 18rem;
//   }

// `;

// const EditProfile = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [message, setMessage] = useState('');
//     const auth = getAuth();
//     const navigate = useNavigate();


//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, user => {
//             if (user) {
//                 setEmail(user.email);
//                 // Populate other fields if needed
//             }
//         });

//         // Cleanup subscription
//         return () => unsubscribe();
//     }, [auth]);

//     const handleUpdate = async (event) => {
//         event.preventDefault();
//         try {
//             if (auth.currentUser) {
//                 console.log("Trying to update email to:", email);
//                 await updateEmail(auth.currentUser, email);
//                 await reload(auth.currentUser); // Reload the user to get the latest data
//                 console.log("Updated Email in Firebase:", auth.currentUser.email);
//                 if (email !== auth.currentUser.email) {
//                     console.error("Email mismatch!");
//                 }
//                 if (password) {
//                     await updatePassword(auth.currentUser, password);
//                 }
//                 setMessage('Profile updated successfully!');
//             }
//         } catch (error) {
//             console.error("Error during update:", error);
//             setMessage('Failed to update profile. Please try again.');
//         }
//     };




//     return (
//         <Centered>
//             {/* Form similar to Register component, but for editing */}
//             <h1>Edit Profile</h1>
//             <form onSubmit={handleUpdate}>
//                 <TextField
//                     id="email"
//                     name="email"
//                     label="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                 />
//                 <TextField
//                     id="password"
//                     name="password"
//                     label="Password"
//                     type="password"
//                     placeholder="Enter new password"
//                     onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <Button type="submit" variant="contained">Update Profile</Button>
//                 {message && <Typography variant="subtitle1">{message}</Typography>}
//             </form>
//         </Centered>
//     );
// };

// export default EditProfile;
import React, { useState, useEffect } from 'react';
import { getAuth, updateEmail, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Centered = styled.div`
  color: /* your desired text color */;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 90vh;

  .centered-form {
    display: flex;
    color: red;
    flex-direction: column;
    gap: 15px;
    width: 18rem;
  }

`;



function EditProfile() {
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [reauthEmail, setReauthEmail] = useState('');
    const [reauthPassword, setReauthPassword] = useState('');
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);
    const navigate = useNavigate();



    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            setNewEmail(user.email || '');
        }
    }, []);

    const openDialog = () => setDialogOpen(true);
    const closeDialog = () => setDialogOpen(false);

    const handleUpdate = async () => {
        try {
            const auth = getAuth();
            const user = auth.currentUser;

            const credential = EmailAuthProvider.credential(reauthEmail, reauthPassword);
            await reauthenticateWithCredential(user, credential);

            if (newEmail) {
                await updateEmail(user, newEmail);
            }

            if (newPassword) {
                await updatePassword(user, newPassword);
            }

            closeDialog();
            setSuccessDialogOpen(true);

        } catch (error) {
            alert('Error updating: ', error.message);
        }
    }

    const handleCloseSuccessDialog = () => {
        setSuccessDialogOpen(false);
        navigate('/login');
    }

    return (
        <Centered>
            <div class="centered-form">
                <TextField
                    label="New Email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                />
                <TextField
                    label="New Password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />

                <Button variant="contained" onClick={openDialog}>Update Profile</Button>
            </div>

            <Dialog open={isDialogOpen} onClose={closeDialog}>
                <DialogTitle>Re-authenticate</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Current Email"
                        value={reauthEmail}
                        onChange={(e) => setReauthEmail(e.target.value)}
                    />
                    <TextField
                        label="Current Password"
                        type="password"
                        value={reauthPassword}
                        onChange={(e) => setReauthPassword(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog} color="secondary">Cancel</Button>
                    <Button onClick={handleUpdate} color="primary">Confirm</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={successDialogOpen}
                onClose={handleCloseSuccessDialog}
            >
                <DialogTitle>Update Successful</DialogTitle>
                <DialogActions>
                    <Button onClick={handleCloseSuccessDialog} color="primary">
                        Acknowledge
                    </Button>
                </DialogActions>
            </Dialog>
        </Centered>
    );
}

export default EditProfile;
