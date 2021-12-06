import { useContext, useState} from 'react'
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AuthContext from '../auth';
import CommentCard from './CommentCard.js';
/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [expandActive, setExpandActive] = useState(false);
    const { idNamePair } = props;
    const [text, setText] = useState("");

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
        let temp = idNamePair.views;
        temp = temp + 1;
        if(!expandActive && idNamePair.published !== "1970-01-01T00:00:00.000Z") {
            store.changeListNoPublish(idNamePair._id, idNamePair.likes, idNamePair.dislikes, temp, idNamePair.comments);
        }
    }
    function parsePublishDate(date) {
        let arr = date.split('T');
        return arr[0];
    }
    function handleLike() {
        let temp = idNamePair.likes;
        if(!temp.includes(auth.user.username)) {
            temp.push(auth.user.username)
        }
        else {
            let index = temp.indexOf(auth.user.username);
                if (index !== -1) {
                    temp.splice(index, 1);
                }
        }
        let temp2 = idNamePair.dislikes;
        if(temp2.includes(auth.user.username)) {
            let index = temp2.indexOf(auth.user.username);
            if (index !== -1) {
                temp2.splice(index, 1);
            }
        }
        store.changeListNoPublish(idNamePair._id, temp, temp2, idNamePair.views, idNamePair.comments);
    }
    function handleDislike() {
        let temp = idNamePair.dislikes;
        if(!temp.includes(auth.user.username)) {
            temp.push(auth.user.username)
        }
        else {
            let index = temp.indexOf(auth.user.username);
                if (index !== -1) {
                    temp.splice(index, 1);
                }
        }
        let temp2 = idNamePair.likes;
        if(temp2.includes(auth.user.username)) {
            let index = temp2.indexOf(auth.user.username);
            if (index !== -1) {
                temp2.splice(index, 1);
            }
        }
        store.changeListNoPublish(idNamePair._id, temp2, temp, idNamePair.views, idNamePair.comments);
    }
    async function handleKeyPress(event) {
        if (event.code === "Enter" && text !== "") {
            let temp = idNamePair.comments;
            let comment = {name: auth.user.username, comment: text};
            temp.push(comment);
            store.changeListNoPublish(idNamePair._id, idNamePair.likes, idNamePair.dislikes, idNamePair.views, temp);
            setText("");
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }
    let likeButton = <ListItemIcon>
    <ThumbUpOffAltIcon onClick={handleLike} className="menuIcon" style={{
        marginRight: "50px",
        display: 'flex',
        fontSize:'32pt'}}>
    </ThumbUpOffAltIcon>
    </ListItemIcon>
    let dislikeButton = <ListItemIcon>
    <ThumbDownOffAltIcon onClick = {handleDislike} className="menuIcon" style={{
        marginRight: "50px",
        display: 'flex',
        fontSize:'32pt'}}>
    </ThumbDownOffAltIcon>
    </ListItemIcon>
    if(auth.guest) {
        likeButton = <ListItemIcon>
        <ThumbUpOffAltIcon className="menuIconDisabled" style={{
            marginRight: "50px",
            display: 'flex',
            fontSize:'32pt'}}>
        </ThumbUpOffAltIcon>
        </ListItemIcon>
        dislikeButton = <ListItemIcon>
        <ThumbDownOffAltIcon className="menuIconDisabled" style={{
            marginRight: "50px",
            display: 'flex',
            fontSize:'32pt'}}>
        </ThumbDownOffAltIcon>
        </ListItemIcon>
    }
    if(idNamePair.likes.includes(auth.user.username)) {
        likeButton = <ListItemIcon>
        <ThumbUpAltIcon onClick={handleLike} className="menuIcon" style={{
            marginRight: "50px",
            display: 'flex',
            fontSize:'32pt'}}>
        </ThumbUpAltIcon>
        </ListItemIcon>
    }
    if(idNamePair.dislikes.includes(auth.user.username)) {
        dislikeButton = <ListItemIcon>
        <ThumbDownAltIcon onClick={handleDislike} className="menuIcon" style={{
            marginRight: "50px",
            display: 'flex',
            fontSize:'32pt'}}>
        </ThumbDownAltIcon>
        </ListItemIcon>
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
                    handleDeleteList(event, idNamePair)
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
    }} primary={"Views: " + idNamePair.views}>

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

    if(idNamePair.published !== "1970-01-01T00:00:00.000Z" && store.currentIcon === "Home") {
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
                {likeButton}
                <Typography sx={{
                    fontSize: '32pt',
                }}>
                {idNamePair.likes.length}
                </Typography>
                {dislikeButton}
                <Typography sx={{
                    fontSize: '32pt',
                }}>
                {idNamePair.dislikes.length}
                </Typography>
                <ListItemIcon>
                <IconButton onClick={(event) => {
                        handleDeleteList(event, idNamePair)
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
        }} primary={"Views: " + idNamePair.views}>
    
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
    if(idNamePair.published !== "1970-01-01T00:00:00.000Z" && store.currentIcon !== "Home") {
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
                {likeButton}
                <Typography sx={{
                    fontSize: '32pt',
                }}>
                {idNamePair.likes.length}
                </Typography>
                {dislikeButton}
                <Typography sx={{
                    fontSize: '32pt',
                }}>
                {idNamePair.dislikes.length}
                </Typography>
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
        }} primary={"Views: " + idNamePair.views}>
    
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
                        handleDeleteList(event, idNamePair)
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
        }} primary={"Views: " + idNamePair.views}>
    
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
    if(expandActive && idNamePair.published !== "1970-01-01T00:00:00.000Z" && store.currentIcon === "Home") {
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
                {likeButton}
                <Typography sx={{
                    fontSize: '32pt',
                }}>
                {idNamePair.likes.length}
                </Typography>
                {dislikeButton}
                <Typography sx={{
                    fontSize: '32pt',
                }}>
                {idNamePair.dislikes.length}
                </Typography>
                <ListItemIcon>
                <IconButton onClick={(event) => {
                        handleDeleteList(event, idNamePair)
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
        height: 300,
        width: 400,
        overflow: 'auto',
    }}>
        {idNamePair.comments.map((item) => (
                        <CommentCard
                        username={item.name}
                        comment={item.comment}/>
                    ))}
        <ListItemIcon>
        <TextField onChange={handleUpdateText}
    onKeyPress={handleKeyPress}
    value = {text}
            style={{
                width: 370,
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
        }} primary={"Views: " + idNamePair.views}>
    
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
    if(expandActive && idNamePair.published !== "1970-01-01T00:00:00.000Z" && store.currentIcon !== "Home") {
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
                {likeButton}
                <Typography sx={{
                    fontSize: '32pt',
                }}>
                {idNamePair.likes.length}
                </Typography>
                {dislikeButton}
                <Typography sx={{
                    fontSize: '32pt',
                }}>
                {idNamePair.dislikes.length}
                </Typography>
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
        height: 300,
        width: 400,
        overflow: 'auto',
    }}>
        {idNamePair.comments.map((item) => (
                        <CommentCard
                        username={item.name}
                        comment={item.comment}/>
                    ))}
        <ListItemIcon>
        <TextField onChange={handleUpdateText}
    onKeyPress={handleKeyPress}
    value = {text}
            style={{
                width: 370,
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
        }} primary={"Views: " + idNamePair.views}>
    
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