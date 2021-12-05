import { useContext, useState} from 'react'
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Grid from '@mui/material/Grid';
/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [expandActive, setExpandActive] = useState(false);
    const { idNamePair } = props;

    function handleLoadList(event, id) {
        if (!event.target.disabled) {
            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        store.markListForDeletion(id);
    }


    function handleExpand(event) {
        event.stopPropagation();
        toggleExpansion();
    }
    function toggleExpansion() {
        let newActive = !expandActive;
        setExpandActive(newActive);
    }
    function parsePublishDate(date) {
        let arr = date.split('T');
        return arr[0];
    }
    let cardElement = <List sx={{
        border: "1.5px solid rgb(0, 0, 0)",
        borderRadius: "5px",
        backgroundColor: "#fffff1",
        p: 1,
        mb: 1, 
    }}>
        <ListItem
        id={idNamePair._id}
        key={idNamePair._id}
        alignItems="flex-start"
        sx={{display: 'flex'}}
        style={{
            fontSize: '48pt',
            width: '100%',
        }}
        >
            <ListItemText sx ={{
                whiteSpace: "nowrap",
            }}
            primary = {idNamePair.name}
            secondary= {"By: " +  idNamePair.ownerUsername} />
            <ListItemIcon>
            <IconButton onClick={(event) => {
                    handleDeleteList(event, idNamePair._id)
                }} aria-label='delete'>
                    <DeleteIcon style={{
                        fontSize:'32pt',
                        display: 'flex',}} />
            </IconButton>
            </ListItemIcon>
    </ListItem>
    <ListItem id={idNamePair._id}
        key={idNamePair._id}
        alignItems="flex-start"
        sx={{display: 'flex'}}
        style={{
            fontSize: '48pt',
            width: '100%',
        }}
        >
        <ListItemIcon> 
        <Button sx={{
        }}onClick = {(event) => {handleLoadList(event, idNamePair._id)}}> Edit </Button>
        </ListItemIcon>
    <ListItemText sx={{
        mx: 72,
        my: 2,
        whiteSpace: "nowrap",
    }} primary={"Views: 0"}>

    </ListItemText>
    <ListItemIcon>
    <ExpandMoreIcon sx={{
        mx: -42,
    }} className="menuIcon" style = {{
        fontSize:'32pt'
    }} onClick = {handleExpand}>
    </ExpandMoreIcon>
    </ListItemIcon>
    </ListItem>
    </List>

    if(idNamePair.published !== "1970-01-01T00:00:00.000Z") {
        cardElement = <List sx={{
            border: "1.5px solid rgb(0, 0, 0)",
            borderRadius: "5px",
            backgroundColor: "#d4d4f5",
            p: 1,
            mb: 1, 
        }}>
            <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            alignItems="flex-start"
            sx={{display: 'flex'}}
            style={{
                fontSize: '48pt',
                width: '100%',
            }}
            >
                <ListItemText sx ={{
                    whiteSpace: "nowrap",
                }}
                primary = {idNamePair.name}
                secondary= {"By: " +  idNamePair.ownerUsername} />
                <ListItemIcon>
                <ThumbUpIcon className="menuIcon" style={{
                    marginRight: "50px",
                    display: 'flex',
                    fontSize:'32pt'}}>
                </ThumbUpIcon>
                </ListItemIcon>
                <ListItemIcon>
                <ThumbDownIcon className="menuIcon" style={{
                    marginRight: "50px",
                    display: 'flex',
                    fontSize:'32pt'}}>
                </ThumbDownIcon>
                </ListItemIcon>
                <ListItemIcon>
                <IconButton onClick={(event) => {
                        handleDeleteList(event, idNamePair._id)
                    }} aria-label='delete'>
                        <DeleteIcon style={{
                            fontSize:'32pt',
                            display: 'flex',}} />
                </IconButton>
                </ListItemIcon>
        </ListItem>
        <ListItem id={idNamePair._id}
            key={idNamePair._id}
            alignItems="flex-start"
            sx={{display: 'flex'}}
            style={{
                fontSize: '48pt',
                width: '100%',
            }}
            >
            <ListItemText sx={{
                whiteSpace: "nowrap",
            }}> 
                Published: {parsePublishDate(idNamePair.published)}
            </ListItemText>
        <ListItemText sx={{
            mx: 80,
            my: 2,
            whiteSpace: "nowrap",
        }} primary={"Views: 0"}>
    
        </ListItemText>
        <ListItemIcon>
        <ExpandMoreIcon sx={{
            mx: -50,
        }} className="menuIcon" style = {{
            fontSize:'32pt'
        }} onClick = {handleExpand}>
        </ExpandMoreIcon>
        </ListItemIcon>
        </ListItem>
        </List>
    
    }
    if(expandActive && idNamePair.published === "1970-01-01T00:00:00.000Z") {
        cardElement = <List sx={{
            border: "1.5px solid rgb(0, 0, 0)",
            borderRadius: "5px",
            backgroundColor: "#fffff1",
            p: 1,
            mb: 1,
        }}>
            <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            alignItems="flex-start"
            sx={{display: 'flex'}}
            style={{
                fontSize: '48pt',
                width: '100%',
            }}
            >
                <ListItemText sx ={{
                    whiteSpace: "nowrap",
                }}
                primary = {idNamePair.name}
                secondary= {"By: " +  idNamePair.ownerUsername} />
                <ListItemIcon>
                <IconButton onClick={(event) => {
                        handleDeleteList(event, idNamePair._id)
                    }} aria-label='delete'>
                        <DeleteIcon style={{
                            fontSize:'32pt',
                            display: 'flex',}} />
                </IconButton>
                </ListItemIcon>
        </ListItem>
<Grid container spacing={2}>
    <List sx={{
        backgroundColor: "#2c2f70",
        width: 500,
        color: "#d4af37",
        mx: 3,
    }}>
        <ListItem>
            <ListItemText
            primary={"1: " + idNamePair.items[0]}>
            </ListItemText>
        </ListItem>
        <ListItem>
            <ListItemText
            primary={"2: " + idNamePair.items[1]}>
            </ListItemText>
        </ListItem>
        <ListItem>
            <ListItemText
            primary={"3: " + idNamePair.items[2]}>
            </ListItemText>
        </ListItem>
        <ListItem>
            <ListItemText
            primary={"4: " + idNamePair.items[3]}>
            </ListItemText>
        </ListItem>
        <ListItem>
            <ListItemText
            primary={"5: " + idNamePair.items[4]}>
            </ListItemText>
        </ListItem>
    </List>
    <List sx={{
        width: 400,
    }}>
    </List>
</Grid>
        <ListItem id={idNamePair._id}
            key={idNamePair._id}
            alignItems="flex-start"
            sx={{display: 'flex'}}
            style={{
                fontSize: '48pt',
                width: '100%',
            }}
            >
            <ListItemIcon> 
            <Button sx={{
            }}onClick = {(event) => {handleLoadList(event, idNamePair._id)}}> Edit </Button>
            </ListItemIcon>
        <ListItemText sx={{
            mx: 72,
            my: 2,
            whiteSpace: "nowrap",
        }} primary={"Views: 0"}>
    
        </ListItemText>
        <ListItemIcon>
        <ExpandLessIcon sx={{
            mx: -42,
        }} className="menuIcon" style = {{
            fontSize:'32pt'
        }} onClick = {handleExpand}>
        </ExpandLessIcon>
        </ListItemIcon>
        </ListItem>
        </List>
    }
    if(expandActive && idNamePair.published !== "1970-01-01T00:00:00.000Z") {
        cardElement = <List sx={{
            border: "1.5px solid rgb(0, 0, 0)",
            borderRadius: "5px",
            backgroundColor: "#d4d4f5",
            p: 1,
            mb: 1,
        }}>
            <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            alignItems="flex-start"
            sx={{display: 'flex'}}
            style={{
                fontSize: '48pt',
                width: '100%',
            }}
            >
                <ListItemText sx ={{
                    whiteSpace: "nowrap",
                }}
                primary = {idNamePair.name}
                secondary= {"By: " +  idNamePair.ownerUsername} />
                <ListItemIcon>
                <ThumbUpIcon className="menuIcon" style={{
                    marginRight: "50px",
                    display: 'flex',
                    fontSize:'32pt'}}>
                </ThumbUpIcon>
                </ListItemIcon>
                <ListItemIcon>
                <ThumbDownIcon className="menuIcon" style={{
                    marginRight: "50px",
                    display: 'flex',
                    fontSize:'32pt'}}>
                </ThumbDownIcon>
                </ListItemIcon>
                <ListItemIcon>
                <IconButton onClick={(event) => {
                        handleDeleteList(event, idNamePair._id)
                    }} aria-label='delete'>
                        <DeleteIcon style={{
                            fontSize:'32pt',
                            display: 'flex',}} />
                </IconButton>
                </ListItemIcon>
        </ListItem>
<Grid container spacing={2}>
    <List sx={{
        backgroundColor: "#2c2f70",
        width: 500,
        color: "#d4af37",
        mx: 3,
    }}>
        <ListItem>
            <ListItemText
            primary={"1: " + idNamePair.items[0]}>
            </ListItemText>
        </ListItem>
        <ListItem>
            <ListItemText
            primary={"2: " + idNamePair.items[1]}>
            </ListItemText>
        </ListItem>
        <ListItem>
            <ListItemText
            primary={"3: " + idNamePair.items[2]}>
            </ListItemText>
        </ListItem>
        <ListItem>
            <ListItemText
            primary={"4: " + idNamePair.items[3]}>
            </ListItemText>
        </ListItem>
        <ListItem>
            <ListItemText
            primary={"5: " + idNamePair.items[4]}>
            </ListItemText>
        </ListItem>
    </List>
    <List sx={{
        width: 400,
    }}>
        <ListItemIcon>
        <TextField
            style={{

                width: "100%",
            }} id="outlined-basic" label="Search" variant="outlined" />
        </ListItemIcon>
    </List>
</Grid>
        <ListItem id={idNamePair._id}
            key={idNamePair._id}
            alignItems="flex-start"
            sx={{display: 'flex'}}
            style={{
                fontSize: '48pt',
                width: '100%',
            }}
            >
            <ListItemText sx={{
                whiteSpace: "nowrap",
            }}> 
                Published: {parsePublishDate(idNamePair.published)}
            </ListItemText>
        <ListItemText sx={{
            mx: 80,
            my: 2,
            whiteSpace: "nowrap",
        }} primary={"Views: 0"}>
    
        </ListItemText>
        <ListItemIcon>
        <ExpandLessIcon sx={{
            mx: -50,
        }} className="menuIcon" style = {{
            fontSize:'32pt'
        }} onClick = {handleExpand}>
        </ExpandLessIcon>
        </ListItemIcon>
        </ListItem>
        </List>
    }
    return (
        cardElement
    );
}

export default ListCard;