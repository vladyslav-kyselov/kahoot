import React, {useState} from "react";
import Button from '@mui/material/Button';
import {TextField} from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';

import './index.scss';

type Props = {
    buttonHandler?: (name: string) => void,
    refButtonText: string
}

export default function CustomModal(props: Props) {
    const [open, setOpen] = useState(false);
    const {buttonHandler} = props;
    const [name, setName] = useState<string>('');
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onSave = () => {
        handleClose();
        setName('');
        if (buttonHandler) {
            buttonHandler(name);
        }
    }
    return (
        <React.Fragment>
            <Button variant="contained" onClick={handleClickOpen}>
                Add new quiz
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className="modal"
            >
                <TextField
                    className="modal__input"
                    label="Quiz Name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <DialogActions>
                    <Button onClick={onSave} disabled={!name}>Save</Button>
                    <Button onClick={handleClose}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
