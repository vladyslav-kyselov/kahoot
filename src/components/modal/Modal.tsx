import React, {useState} from "react";
import Button from '@mui/material/Button';
import {TextField} from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';

import './index.scss';

type Props = {
    buttonHandler?: (name: string) => void
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
        <>
            <Button variant="contained" onClick={handleClickOpen}>
                Добавити нову збірку
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
                    label="Назва збірки"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <DialogActions>
                    <Button onClick={onSave} color="success" disabled={!name}>Зберегти</Button>
                    <Button onClick={handleClose}>
                        Відмінити
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
