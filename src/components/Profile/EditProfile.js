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
  text-align: center;
  .centered-form {
    display: flex;
    color: red;
    flex-direction: column;
    gap: 15px;
    width: 18rem;
  }
`;

const Title = styled.h1`
  font-weight: 600;
  font-size: 1.8rem;
  margin-bottom:2rem;

`

const Container = styled.div`
    background-color: ${(props) => props.theme.palette.background.paper};
    box-shadow: rgba(33, 35, 39, 0.08) 0px 8px 24px;
    padding: 90px;
    border-radius: 5px;

    @media (max-width: 750px) {
        padding: 20px;
        background-color: transparent;
        box-shadow: none;
      }
`

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
        <Centered >
            <Container>
                <Title>Change Password</Title>
                <div class="centered-form">
                    <TextField
                        label="Email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                    />
                    <TextField
                        label="New Password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />

                    <Button variant="contained" onClick={openDialog}>Update</Button>
                </div>

                <Dialog open={isDialogOpen} onClose={closeDialog}>
                    <DialogTitle>Re-authenticate</DialogTitle>
                    <DialogContent style={{
                        paddingTop: "10px"
                    }}>
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
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </Centered>

    );
}

export default EditProfile;
