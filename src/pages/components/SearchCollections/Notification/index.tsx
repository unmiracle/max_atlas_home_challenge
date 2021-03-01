import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, {Color} from '@material-ui/lab/Alert';


type Props = {
    open: boolean;
    onClose: () => void;
    type?: Color;
    message: string;
}

export const Notification = ({open, onClose, type, message}: Props) => {
    return (
        <Snackbar open={open}
                  autoHideDuration={5000}
                  onClose={onClose}
                  anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
            <MuiAlert elevation={1}
                      severity={type}
                      variant="filled"
                      onClose={onClose}
            >
                {message}
            </MuiAlert>
        </Snackbar>
    );
};