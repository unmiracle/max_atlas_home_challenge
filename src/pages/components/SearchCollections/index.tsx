import React, {FC, useEffect, useState} from 'react';
import {CustomModal} from './CustomModal';
import {DeleteModal} from './DeleteModal';
import {Notification} from './Notification';
import {TableCollections} from './TableCollections';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import {CollectionType} from '../../../models/collection';
import {OrganisationType} from '../../../models/organisation';
import {IntentCollectionType} from '../../../models/intentCollection';
import {
    addSearchCollection,
    getSearchCollections,
    getIntentCollections,
    getOrganisations,
    updateSearchCollection,
    deleteSearchCollection
} from '../../../actions/collections';

import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles({
    searchCollections: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {},
    buttonAdd: {
        '&.MuiButton-root': {
            minWidth: '115px'
        }
    },
    divider: {
        margin: '15px 0 25px'
    }
});

const SearchCollections: FC = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [collection, setCollection] = useState<CollectionType | null>(null);
    const [collections, setCollections] = useState<CollectionType[]>([]);
    const [intentCollection, setIntentCollection] = useState<IntentCollectionType[]>([]);
    const [organisation, setOrganisation] = useState<OrganisationType[]>([]);
    const [isAdd, setIsAdd] = useState(false);
    const [notification, setNotification] = useState(false);
    const [messageNotification, setMessageNotification] = useState('');

    useEffect(() => {
        loadCollections();
        loadIntentCollections();
        loadOrganisations();

    }, [])

    const loadCollections = async () => {
        try {
            const collections = await getSearchCollections();
            setCollections(collections.searchCollections);
        } catch (e) {
            setMessageNotification(e.message || e);
            setNotification(true);
        }
    }

    const addNewCollection = async (collection: CollectionType) => {

        try {
            const response = await addSearchCollection(collection);
            loadCollections();
        } catch (e) {
            setMessageNotification(e.message || e);
            setNotification(true);
        } finally {
            handleClose();
        }
    }

    const editCollection = async (collection: CollectionType) => {
        try {
            const response = await updateSearchCollection(collection);
            loadCollections();
        } catch (e) {
            setMessageNotification(e.message || e);
            setNotification(true);
        } finally {
            handleClose();
        }
    }

    const deleteCollection = async () => {
        try {
            const response = await deleteSearchCollection(collection as CollectionType);
            loadCollections();
        } catch (e) {
            setMessageNotification(e.message || e);
            setNotification(true);
        } finally {
            handleCloseDelete();
        }
    }

    const loadIntentCollections = () => {
        getIntentCollections().then(res => setIntentCollection(res.intentCollections));
    }
    const loadOrganisations = () => {
        getOrganisations().then(res => setOrganisation(res.organisations));
    }

    const handleOpenAdd = () => {
        setIsAdd(true);
        setOpen(true);
    };
    const handleOpenEdit = (collection: CollectionType) => {
        setIsAdd(false);
        setCollection(collection);
        setOpen(true);
    };
    const handleClose = () => {
        setCollection(null);
        setOpen(false);
    };

    const handleOpenDelete = (collection: CollectionType) => {
        setCollection(collection);
        setOpenDelete(true);
    };
    const handleCloseDelete = () => {
        setCollection(null);
        setOpenDelete(false);
    };

    const handleCloseNotification = () => {
        setNotification(false);
    };

    return (
        <div>
            <Box className={classes.searchCollections} component="div">
                <Typography className={classes.title} align="center" variant="h5" component="div">
                    Configuration
                </Typography>
                <Button onClick={handleOpenAdd} className={classes.buttonAdd} variant="contained" color="primary">
                    Add new
                </Button>
            </Box>
            <Divider className={classes.divider}/>
            <TableCollections collections={collections} handleOpenEdit={handleOpenEdit}
                              handleOpenDelete={handleOpenDelete}/>
            {open ? <CustomModal open={open}
                                 handleClose={handleClose}
                                 collection={collection}
                                 intentCollection={intentCollection}
                                 organisation={organisation}
                                 btnTitle={isAdd ? 'Add' : 'Edit'}
                                 handler={isAdd ? addNewCollection : editCollection}
            /> : null}
            <DeleteModal open={openDelete} deleteCollection={deleteCollection} handleClose={handleCloseDelete}/>
            <Notification open={notification} onClose={handleCloseNotification} message={messageNotification}
                          type="error"/>
        </div>
    );
}

export default SearchCollections;