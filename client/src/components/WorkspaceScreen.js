import { useContext} from 'react'
import Top5Item from './Top5Item.js'
import List from '@mui/material/List';
import { Typography } from '@mui/material'
import { GlobalStoreContext } from '../store/index.js'
import Button from '@mui/material/Button';
//import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);
    let editItems = "";
    function handleSave(event) {
        console.log(store.currentList._id);
    }
    if (store.currentList) {
        editItems = 
            <List id="edit-items" sx={{ width: '100%'}}>
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
    return (
        <div id="top5-workspace">
            <div id="workspace-edit">
                <TextField sx={{
                    width: '50%',
                    backgroundColor: 'white',
                    mb: 1,
                }} defaultValue= {store.currentList.name}>
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
        <Button sx={{
            mx: '-870px',
            borderRadius: 35,
            color: "black",
            backgroundColor: "#abdba0",
            padding: "18px 36px",
            fontSize: "18px",
        }}> Publish </Button>
        </div>

    )
}

export default WorkspaceScreen;