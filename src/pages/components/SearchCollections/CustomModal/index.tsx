import React, {FC, useState} from 'react';
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';
import Backdrop from '@material-ui/core/Backdrop';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';

import {makeObjectId} from '../../../../utils/makeObjectId';
import {CollectionType} from '../../../../models/collection';
import {OrganisationType} from '../../../../models/organisation';
import {IntentCollectionType} from '../../../../models/intentCollection';

import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        modalTitle: {
            margin: '35px 0 25px'
        },
        modalRoot: {
            width: '750px',
            borderRadius: '5px',
            backgroundColor: 'white',
            outline: 'none'
        },
        settings: {
            display: 'flex',
            padding: '0 40px',
            marginBottom: '35px'
        },
        settingsFirst: {
            width: '50%'
        },
        settingsSecond: {
            width: '50%'
        },
        formFirst: {
            marginRight: '20px',
            display: 'flex',
            flexDirection: 'column',
        },
        formSecond: {
            marginLeft: '20px',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'whitesmoke',
            padding: '0 10px 20px 20px',
            borderRadius: '5px'
        },
        textField: {
            marginTop: '10px'
        },
        switchFields: {
            marginTop: '10px',
            paddingRight: '50px'
        },
        switchField: {
            marginTop: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        switch: {
            '&.MuiSwitch-switchBase': {
                color: 'darkgray'
            },
            "&.MuiSwitch-colorPrimary + .MuiSwitch-track": {
                backgroundColor: "silver"
            }
        },
        switchChecked: {
            '&.MuiSwitch-colorPrimary.Mui-checked': {
                color: '#2b66ba'
            },
            "&.Mui-checked + .MuiSwitch-track": {
                backgroundColor: "#95b5df",
            },
        },
        formControl: {
            marginTop: '10px',
            paddingRight: '10px'
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
    btnTitle: string,
    handleClose: () => void,
    collection: CollectionType | null,
    organisation: OrganisationType[],
    intentCollection: IntentCollectionType[],
    handler: (collection: CollectionType) => void,
}

export const CustomModal: FC<Props> =
    ({
         open, handleClose, handler, btnTitle, collection,
         intentCollection, organisation
     }) => {
        const classes = useStyles();
        const [name, setName] = useState<string>(collection?.name || "");
        const [demandSEMProviderId, setDemandSEMProviderId] = useState<string>(collection?.demandSEMProviderId || "");
        const [minimumImpressions, setMinimumImpressions] = useState<number | string>(collection?.minimumImpressions || "");
        const [scrapeSearchQueries, setScrapeSearchQueries] = useState(collection?.scrapeSearchQueries || false);
        const [matchIntent, setMatchIntent] = useState(collection?.matchIntent || false);
        const [dedicatedCrawlers, setDedicatedCrawlers] = useState(collection?.dedicatedCrawlers || false);
        const [existsOnServer, setExistsOnServer] = useState(collection?.existsOnServer || false);
        const [language, setLanguage] = useState<string>(collection?.language || "");
        const [locale, setLocale] = useState<string>(collection?.locale || "");
        const [organisationId, setOrganisationId] = useState<string>(collection?.organisationId || "");
        const [intentCollectionId, setIntentCollectionId] = useState<string>(collection?.intentCollectionId || "");
        const [valid, setIsValid] = useState<boolean>(true);


        const handlerSuccess = (e: React.MouseEvent<HTMLButtonElement | MouseEvent>) => {
            e.preventDefault();
            const disabled = !name || !language || !locale || !organisationId || !intentCollectionId;
            if (disabled) {
                setIsValid(false)
            } else {
                const id: string = collection ? collection.id : makeObjectId();
                const collectionSingle = {
                    autoEdit: true,
                    dedicatedCrawlers: Number(dedicatedCrawlers),
                    demandSEMProviderId,
                    errors: {},
                    existsOnServer,
                    id,
                    intentCollectionId,
                    language,
                    locale,
                    matchIntent,
                    minimumImpressions,
                    name,
                    organisationId,
                    scrapeSearchQueries,
                    valid: true
                }
                handler(collectionSingle);
            }
        }

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
                <form className={classes.modalRoot} autoComplete="off">
                    <Typography className={classes.modalTitle} align="center" variant="h6" component="div">
                        Search collection details
                    </Typography>
                    <Box className={classes.settings} component="div">
                        <Box className={classes.settingsFirst} component="div">
                            <Box className={classes.formFirst} component="div">
                                <TextField required
                                           error={!valid && name === ""}
                                           value={name}
                                           onChange={e => setName(e.target.value)}
                                           className={classes.textField} label="Name"/>
                                <TextField value={demandSEMProviderId}
                                           onChange={e => setDemandSEMProviderId(e.target.value)}
                                           className={classes.textField}
                                           label="Adwords ID (for Demand)"/>
                                <TextField value={String(minimumImpressions)}
                                           onChange={e => setMinimumImpressions(+e.target.value)}
                                           type="number" className={classes.textField}
                                           label="Minimum impressions"/>
                                <Box className={classes.switchFields}>
                                    <Box className={classes.switchField} component="div">
                                        Scrape Search Queries
                                        <Switch
                                            classes={{
                                                switchBase: classes.switch,
                                                checked: classes.switchChecked
                                            }}
                                            checked={scrapeSearchQueries}
                                            onChange={() => setScrapeSearchQueries(prevState => !prevState)}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box className={classes.switchField} component="div">
                                        Match intent
                                        <Switch
                                            classes={{
                                                switchBase: classes.switch,
                                                checked: classes.switchChecked
                                            }}
                                            checked={matchIntent}
                                            onChange={() => setMatchIntent(prevState => !prevState)}
                                            color="primary"
                                        />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box className={classes.settingsSecond} component="div">
                            <Box className={classes.formSecond} component="div">
                                <FormControl className={classes.formControl}>
                                    <InputLabel>Language</InputLabel>
                                    <Select
                                        required
                                        error={!valid && language === ""}
                                        value={language}
                                        onChange={(event) => setLanguage(event.target.value as string)}
                                    >
                                        <MenuItem value={'Language1'}>Language1</MenuItem>
                                        <MenuItem value={'Language2'}>Language2</MenuItem>
                                        <MenuItem value={'Language3'}>Language3</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <InputLabel>Locale</InputLabel>
                                    <Select
                                        required
                                        error={!valid && locale === ""}
                                        value={locale}
                                        onChange={(event) => setLocale(event.target.value as string)}
                                    >
                                        <MenuItem value={'Locale1'}>Locale1</MenuItem>
                                        <MenuItem value={'Locale2'}>Locale2</MenuItem>
                                        <MenuItem value={'Locale3'}>Locale3</MenuItem>
                                    </Select>
                                </FormControl>
                                <Box className={classes.switchField} component="div">
                                    Dedicated crawlers
                                    <Switch
                                        classes={{
                                            switchBase: classes.switch,
                                            checked: classes.switchChecked
                                        }}
                                        checked={Boolean(dedicatedCrawlers)}
                                        onChange={() => setDedicatedCrawlers(prevState => !prevState)}
                                        color="primary"
                                    />
                                </Box>
                                <FormControl className={classes.formControl}>
                                    <InputLabel>Organization</InputLabel>
                                    <Select
                                        required
                                        error={!valid && organisationId === ""}
                                        value={organisationId}
                                        onChange={(event) => setOrganisationId(event.target.value as string)}
                                    >
                                        {organisation.map(item => <MenuItem key={item.id}
                                                                            value={item.id}>{item.name}</MenuItem>)}
                                    </Select>
                                </FormControl>
                                <Box className={classes.switchField} component="div">
                                    Existing intent collection
                                    <Switch
                                        classes={{
                                            switchBase: classes.switch,
                                            checked: classes.switchChecked
                                        }}
                                        checked={existsOnServer}
                                        onChange={() => setExistsOnServer(prevState => !prevState)}
                                        color="primary"
                                    />
                                </Box>
                                <FormControl className={classes.formControl}>
                                    <InputLabel>Intent Collection</InputLabel>
                                    <Select
                                        required
                                        error={!valid && intentCollectionId === ""}
                                        value={intentCollectionId}
                                        onChange={(event) => setIntentCollectionId(event.target.value as string)}
                                    >
                                        {intentCollection.map(item => <MenuItem key={item.id}
                                                                                value={item.id}>{item.name}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>
                    </Box>
                    <Divider/>
                    <Box className={classes.buttons} component="div">
                        <Button onClick={handleClose}
                                className={classes.button}
                                variant="outlined">
                            Cancel
                        </Button>
                        <Button type="submit"
                                onClick={handlerSuccess}
                                className={classes.button}
                                variant="contained"
                                color="primary">
                            {btnTitle}
                        </Button>
                    </Box>
                </form>
            </Modal>
        );
    }
