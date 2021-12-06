import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { Typography } from '@mui/material'
import AuthContext from '../auth'
import AddIcon from '@mui/icons-material/Add';
/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    if(!auth.loggedIn) {
        return null
    };
    function handleCreateNewList() {
        store.createNewList();
    }
    let text ="Your Lists";
    if (store.currentIcon === "Home") {
        text = "Your Lists";
    }
    if (store.currentIcon === "All Lists") {
        if(store.searchText === "") {
            text = "All Lists";
        }
        else {
            text = store.searchText + " Lists";
        }
    }
    if (store.currentIcon === "Users") {
        if(store.searchText === "") {
            text = "User Lists";
        }
        else {
            text = store.searchText + " Lists";
        }

    }
    if (store.currentIcon === "Community") {
        text = "Community Lists";
    }
    if(store.currentList) {
        return (
            <div id="top5-statusbar">
                    <AddIcon className = "menuIconDisabled" sx ={{
                        fontSize: "64px",
                    }}
                    color="gray" 
                    disabled={store.isListNameEditActive || auth.guest}
                    id="add-list-button" />
                <Typography variant="h2" className = "menuIconDisabled">{text}</Typography>
            </div>
        );
    }
    else if(text === "Your Lists") {
        return (
            <div id="top5-statusbar">
                    <AddIcon className = "menuIcon" sx ={{
                        fontSize: "64px",
                    }}
                    color="gray" 
                    disabled={store.isListNameEditActive || auth.guest}
                    id="add-list-button"
                    onClick={handleCreateNewList} />
                <Typography variant="h2">{text}</Typography>
            </div>
        );
    }
    else {
        return (
            <div id="top5-statusbar">
                <Typography variant="h2">{text}</Typography>
            </div>
        );
    }

}

export default Statusbar;