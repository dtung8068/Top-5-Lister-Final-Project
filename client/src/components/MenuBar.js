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
    let text = "";
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
    async function handleKeyPress(event) {
        if (event.code === "Enter") {
            store.handleSearch(text);
        }
    }
    function handleUpdateText(event) {
        text = event.target.value;
    }
    if(!auth.loggedIn) {
        return null
    };
    let homeIcon = <HomeIcon className="menuIcon" style={{
        width: 50,
        height: 50,
    }} onClick ={handleHomeClick}> </HomeIcon>
    let communityIcon = <FunctionsIcon className="menuIcon" style={{
        width: 50,
        height: 50,
        marginLeft: "10px",
    }} onClick ={handleFunctionClick}> </FunctionsIcon>
    if(store.currentIcon === 'Home') {
        homeIcon = <HomeIcon className="menuIcon" style={{
            width: 50,
            height: 50,
            border: "5px solid rgb(0, 128, 0)"
        }} onClick ={handleHomeClick}> </HomeIcon>
    }
    if(store.currentIcon === "Community") {
        communityIcon = <FunctionsIcon className="menuIcon" style={{
            width: 50,
            height: 50,
            border: "5px solid rgb(0, 128, 0)",
            marginLeft: "10px",
        }} onClick ={handleFunctionClick}> </FunctionsIcon>
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
                marginLeft: "10px",
            }} onClick ={handleGroupsClick}> </GroupsIcon>
            <PersonIcon className="menuIcon" style={{
                width: 50,
                height: 50,
                marginLeft: "10px",
            }} onClick ={handlePersonClick}> </PersonIcon>
            {communityIcon}
            <TextField onChange={handleUpdateText}
            onKeyPress={handleKeyPress}
            style={{
                width: "50%",
            }} id="outlined-basic" label="Search" variant="outlined" />
            <SortIcon className="menuIcon" style={{
                width: 50,
                height: 50,
                display: "inline",
                float: "right",
                marginRight: "50px"
            }} onClick = {handleSortMenuOpen}> </SortIcon>
            <Typography style = {{
                fontSize: 30,
                display: "inline",
                float: "right",
                marginRight: "10px"
            }}> Sort By </Typography>

        </div>
    )
}

export default MenuBar;