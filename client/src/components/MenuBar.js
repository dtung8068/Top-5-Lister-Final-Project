import { useContext } from 'react'
import AuthContext from '../auth'
import { GlobalStoreContext } from '../store'
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import FunctionsIcon from '@mui/icons-material/Functions';
import TextField from '@mui/material/TextField';
import SortIcon from '@mui/icons-material/Sort';
import { Typography } from '@mui/material';
/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function MenuBar() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    function handleHomeClick() {
        store.updateCurrentIcon("Home");
    }
    function handleGroupsClick() {
        store.updateCurrentIcon("All Lists");
    }
    function handlePersonClick() {
        store.updateCurrentIcon("Users");
    }
    function handleFunctionClick() {
        store.updateCurrentIcon("Community");
    }
    function handleSortMenuOpen() {
        console.log("Home");
    }
    if(!auth.loggedIn) {
        return null
    };
    let homeIcon = <HomeIcon className="menuIcon" style={{
        width: 50,
        height: 50,
    }} onClick ={handleHomeClick}> </HomeIcon>
    if(store.currentIcon === 'Home') {
        homeIcon = <HomeIcon className="menuIcon" style={{
            width: 50,
            height: 50,
            borderColor: '#008000'
        }} onClick ={handleHomeClick}> </HomeIcon>
    }
    if(auth.guest){
        homeIcon = <HomeIcon className="menuIconDisabled" style={{
            width: 50,
            height: 50,
        }}> </HomeIcon>
    }
    return (
        <div id="menubar">
            {homeIcon}
            <GroupsIcon className="menuIcon" style={{
                width: 50,
                height: 50,
            }} onClick ={handleGroupsClick}> </GroupsIcon>
            <PersonIcon className="menuIcon" style={{
                width: 50,
                height: 50,
            }} onClick ={handlePersonClick}> </PersonIcon>
            <FunctionsIcon className="menuIcon" style={{
                width: 50,
                height: 50,
            }} onClick ={handleFunctionClick}> </FunctionsIcon>
            <TextField style={{
                width: "50%",
            }} id="outlined-basic" label="Search" variant="outlined" />
            <Typography style = {{
                fontSize: 30,
                marginLeft: "200px",
                display: 'inline',
            }}> Sort By </Typography>
            <SortIcon className="menuIcon" style={{
                marginLeft: "10px",
                width: 50,
                height: 50,
            }} onClick = {handleSortMenuOpen}> </SortIcon>
        </div>
    )
}

export default MenuBar;