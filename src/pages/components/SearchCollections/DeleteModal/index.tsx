import React, {FC} from 'react';
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import Typography from '@material-ui/core/Typography';

import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        modalTitle: {
            margin: '35px 0 25px'
        },
        modalRoot: {
            width: '350px',
            borderRadius: '5px',
            backgroundColor: 'white',
            outline: 'none'
        },
        buttons: {
            display: 'flex',
            justifyContent: 'center',
            padding: '17px 0'
        },
        button: {
            margin: '0 10px',
            '&.MuiButton-root': {
                minWidth: '115px'
            }
        }

    }),
);

type Props = {
    open: boolean,
    handleClose: () => void,
    deleteCollection: () => void
}

export const DeleteModal: FC<Props> = ({open, handleClose, deleteCollection}) => {
    const classes = useStyles();

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Box className={classes.modalRoot} component="div">
                <Typography className={classes.modalTitle} align="center" variant="h6" component="div">
                    Delete collection?
                </Typography>
                <Box className={classes.buttons} component="div">
                    <Button onClick={handleClose} className={classes.button} variant="outlined">Cancel</Button>
                    <Button onClick={deleteCollection} className={classes.button} variant="contained" color="primary">
                        Delete
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}
