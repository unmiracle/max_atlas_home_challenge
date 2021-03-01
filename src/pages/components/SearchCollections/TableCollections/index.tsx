import React, {FC} from 'react';
import {DottedMenu} from './DottedMenu';
import {FaRegEdit} from 'react-icons/fa';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import {RiDeleteBin6Line} from 'react-icons/ri';
import Toolbar from '@material-ui/core/Toolbar';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Typography from '@material-ui/core/Typography';
import TableContainer from '@material-ui/core/TableContainer';

import {makeStyles} from '@material-ui/core/styles';

import {CollectionType} from '../../../../models/collection';


const useStyles = makeStyles({
    table: {
        minWidth: 1100
    },
    buttonOnOff: {
        display: 'inline-block',
        padding: '0px 10px',
        borderRadius: '14px',
        color: 'white',
        fontWeight: 600
    },
    buttonActions: {
        verticalAlign: 'middle',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    toolbar: {
        padding: '0 16px'
    },
    toolbarTitle: {
        flex: '1 1 100%',
    },
    tableCell: {
        '&.MuiTableCell-root': {
            maxWidth: '100px',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap'
        }
    }
});

type Props = {
    collections: CollectionType[],
    handleOpenDelete: (collection: CollectionType) => void,
    handleOpenEdit: (collection: CollectionType) => void
}

export const TableCollections: FC<Props> = ({collections, handleOpenDelete, handleOpenEdit}) => {
    const classes = useStyles();

    const buttonOnOff = (title: string, color: string) => {
        return <div style={{backgroundColor: color}} className={classes.buttonOnOff}>{title}</div>
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Toolbar className={classes.toolbar}>
                    <Typography className={classes.toolbarTitle} variant="h6" id="tableTitle" component="div">
                        Search collections
                    </Typography>

                    <DottedMenu/>
                </Toolbar>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell classes={{root: classes.tableCell}}>Name</TableCell>
                            <TableCell classes={{root: classes.tableCell}}>Organisation</TableCell>
                            <TableCell classes={{root: classes.tableCell}}>Intent Collection</TableCell>
                            <TableCell classes={{root: classes.tableCell}} align="center">Match intent</TableCell>
                            <TableCell classes={{root: classes.tableCell}} align="center">Scrape Search
                                Queries</TableCell>
                            <TableCell classes={{root: classes.tableCell}}>Dedicated Crawlers</TableCell>
                            <TableCell classes={{root: classes.tableCell}}>Adwords ID for Demand</TableCell>
                            <TableCell classes={{root: classes.tableCell}} align="center">Actions</TableCell>
                            <TableCell classes={{root: classes.tableCell}} align="center"
                                       style={{color: 'transparent'}}>A</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {collections.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell classes={{root: classes.tableCell}} component="th"
                                           scope="row">{row.name}</TableCell>
                                <TableCell classes={{root: classes.tableCell}}
                                           align="left">{row.organisationId}</TableCell>
                                <TableCell classes={{root: classes.tableCell}}
                                           align="left">{row.intentCollectionId}</TableCell>
                                <TableCell classes={{root: classes.tableCell}} align="center">
                                    {row.matchIntent ? buttonOnOff("On", "dodgerblue") : buttonOnOff("Off", "darkgray")}
                                </TableCell>
                                <TableCell classes={{root: classes.tableCell}} align="center">
                                    {row.scrapeSearchQueries ? buttonOnOff("On", "dodgerblue") : buttonOnOff("Off", "darkgray")}
                                </TableCell>
                                <TableCell classes={{root: classes.tableCell}}
                                           align="left">{row.dedicatedCrawlers}</TableCell>
                                <TableCell classes={{root: classes.tableCell}}
                                           align="left">{row.demandSEMProviderId}</TableCell>
                                <TableCell classes={{root: classes.tableCell}} align="center">
                                    <RiDeleteBin6Line className={classes.buttonActions}
                                                      color="red"
                                                      size={20}
                                                      onClick={() => handleOpenDelete(row)}
                                    />
                                </TableCell>
                                <TableCell classes={{root: classes.tableCell}} align="center">
                                    <FaRegEdit
                                        className={classes.buttonActions}
                                        color="blue"
                                        size={20}
                                        onClick={() => handleOpenEdit(row)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
