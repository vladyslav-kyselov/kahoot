import React, {useState} from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';

import './index.scss';
import Typography from "@mui/material/Typography";

type Props = {
    buttonHandler?: () => void,
    variant?: 'text' | 'outlined'
}

export default function Confirmation(props: Props) {
    const [open, setOpen] = useState(false);
    const {buttonHandler, variant = 'text'} = props;
    const handleClickOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();
        setOpen(true);
    };

    const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();
        setOpen(false);
    };

    const onDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();
        handleClose(e);
        if (buttonHandler) {
            buttonHandler();
        }
    }
    return (
        <React.Fragment>
            <Button color="error" variant={variant} onClick={handleClickOpen}>
                Видалити
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className="confirmation__modal"
            >
                <Typography variant="h6" gutterBottom className="modal__font">
                    Ви впевнені, що хочете видалити?
                </Typography>
                <DialogActions className="action-buttons">
                    <Button color="error" onClick={onDelete} variant="outlined">
                        Видалити
                    </Button>
                    <Button onClick={handleClose} variant="outlined">
                        Відмінити
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
