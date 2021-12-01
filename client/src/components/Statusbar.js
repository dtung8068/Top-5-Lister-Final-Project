import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { Fab, Typography } from '@mui/material'
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
    //if (store.currentList)
    //    text = store.currentList.name;
    return (
        <div id="top5-statusbar">
            <Fab 
                color="primary" 
                disabled={store.isListNameEditActive}
                aria-label="add"
                id="add-list-button"
                onClick={handleCreateNewList}
            >
                <AddIcon />
            </Fab>
            <Typography variant="h2">{text}</Typography>
        </div>
    );
}

export default Statusbar;