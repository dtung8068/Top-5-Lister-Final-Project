import { useContext, useState, } from 'react'
import Top5Item from './Top5Item.js'
import List from '@mui/material/List';
import { Typography } from '@mui/material'
import { GlobalStoreContext } from '../store/index.js'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);
    const [listName, setListName] = useState(store.currentList.name);
    const [listItems, setListItems] = useState(store.currentList.items);
    const [publish, updatePublish] = useState(canPublish());
    let editItems = "";
    function handleSave() {
        store.changeList(store.currentList._id, listName, listItems, new Date(0));
    }
    function handlePublish() {
        store.changeList(store.currentList._id, listName, listItems, new Date());
    }
    const updateListName = (event) => {
        setListName(event.target.value);
        updatePublish(canPublish2(event.target.value));
    }
    const updateListItems = (event) => {
        let newArr = store.currentList.items;
        newArr[parseInt(event.target.id[5]) - 1] = event.target.value
        setListItems(newArr);
        updatePublish(canPublish());
    }
    function canPublish() {
        let temp = store.idNamePairs;
        for(let i = 0; i < temp.length; i++) {
            if(temp[i].published === "1970-01-01T00:00:00.000Z") {
                temp.splice(i, 1);
                i--;
            }
        }
        for(let i = 0; i < temp.length; i++) {
            if(temp[i].name === listName) {
                return false;
            }
        }
        if(listName === "" || listName[0] === " ") {
            return false;
        }
        for(let i = 0; i < listItems.length; i++) {
            if(listItems[i] === "" || listItems[i][0] === " ") {
                return false;
            }
        }
        let contains = [];
        for(let i = 0; i < listItems.length; i++) {
            if(contains.includes(listItems[i])) {
                return false;
            }
            else {
                contains.push(listItems[i]);
            }
        }
        return true;
    }
    function canPublish2(name) {
        let temp = store.idNamePairs;
        for(let i = 0; i < temp.length; i++) {
            if(temp[i].published === "1970-01-01T00:00:00.000Z") {
                temp.splice(i, 1);
                i--;
            }
        }
        for(let i = 0; i < temp.length; i++) {
            if(temp[i].name === name) {
                return false;
            }
        }
        if(name === "" || name[0] === " ") {
            return false;
        }
        for(let i = 0; i < listItems.length; i++) {
            if(listItems[i] === "" || listItems[i][0] === " ") {
                return false;
            }
        }
        let contains = [];
        for(let i = 0; i < listItems.length; i++) {
            if(contains.includes(listItems[i])) {
                return false;
            }
            else {
                contains.push(listItems[i]);
            }
        }
        return true;
    }
    if (store.currentList) {
        editItems = 
            <List id="edit-items" sx={{ width: '100%'}}  onChange={updateListItems}>
                {
                    store.currentList.items.map((item, index) => (
                        <Top5Item 
                            key={'top5-item-' + (index+1)}
                            text={item}
                            index={index}
                        />
                    ))
                }
            </List>;
    }
    let publishButton = <Button disabled sx={{
        mx: '-870px',
        borderRadius: 35,
        color: "black",
        backgroundColor: "#abdba0",
        padding: "18px 36px",
        fontSize: "18px",
        cursor: 'not-allowed',
        opacity: 0.25,
    }}> Publish </Button>
    if(publish) {
        publishButton = <Button sx={{
            mx: '-870px',
            borderRadius: 35,
            color: "black",
            backgroundColor: "#abdba0",
            padding: "18px 36px",
            fontSize: "18px",
        }} onClick = {handlePublish}> Publish </Button>
    }
    return (
        <div id="top5-workspace">
            <div id="workspace-edit">
                <TextField sx={{
                    width: '50%',
                    backgroundColor: 'white',
                    mb: 1,
                }} defaultValue= {store.currentList.name} onChange = {updateListName}>
                </TextField>
                <div id="edit-numbering">
                    <div className="item-number"><Typography variant="h3">1.</Typography></div>
                    <div className="item-number"><Typography variant="h3">2.</Typography></div>
                    <div className="item-number"><Typography variant="h3">3.</Typography></div>
                    <div className="item-number"><Typography variant="h3">4.</Typography></div>
                    <div className="item-number"><Typography variant="h3">5.</Typography></div>
                </div>
                {editItems}
            </div>
        <Button sx={{
            mx: '900px',
            borderRadius: 35,
            color: "black",
            backgroundColor: "#abdba0",
            padding: "18px 36px",
            fontSize: "18px",
        }} onClick = {handleSave}> Save </Button>
        {publishButton}
        </div>
        
    )
}

export default WorkspaceScreen;