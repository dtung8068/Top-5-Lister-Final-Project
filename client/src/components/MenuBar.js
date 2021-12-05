import { useContext, useState } from 'react'
import AuthContext from '../auth'
import { GlobalStoreContext } from '../store'
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import FunctionsIcon from '@mui/icons-material/Functions';
import TextField from '@mui/material/TextField';
import SortIcon from '@mui/icons-material/Sort';
import { Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function MenuBar() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
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
    const handleSortMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    async function handleKeyPress(event) {
        if (event.code === "Enter") {
            store.handleSearch(text);
        }
    }
    function handleUpdateText(event) {
        text = event.target.value;
    }
    const handleSort = (event) => {
        handleMenuClose();
        store.sort(event.target.textContent);
    }
    if(!auth.loggedIn) {
        return null
    };
    let homeIcon = <HomeIcon className="menuIcon" style={{
        width: 50,
        height: 50,
    }} onClick ={handleHomeClick}> </HomeIcon>
    let allListsIcon = <GroupsIcon className="menuIcon" style={{
        width: 50,
        height: 50,
        marginLeft: "10px",
    }} onClick ={handleGroupsClick}> </GroupsIcon>
    let userIcon = <PersonIcon className="menuIcon" style={{
        width: 50,
        height: 50,
        marginLeft: "10px",
    }} onClick ={handlePersonClick}> </PersonIcon>
    let communityIcon = <FunctionsIcon className="menuIcon" style={{
        width: 50,
        height: 50,
        marginLeft: "10px",
    }} onClick ={handleFunctionClick}> </FunctionsIcon>
    let searchField = <TextField onChange={handleUpdateText}
    onKeyPress={handleKeyPress}
    style={{
        width: "50%",
    }} id="outlined-basic" label="Search" variant="outlined" />
    let sortByIcon = <SortIcon className="menuIcon" style={{
        width: 50,
        height: 50,
        display: "inline",
        float: "right",
        marginRight: "50px"
    }} onClick = {handleSortMenuOpen}> </SortIcon>
    let sortBy = <Typography style = {{
        fontSize: 30,
        display: "inline",
        float: "right",
        marginRight: "10px"
    }} > Sort By </Typography>
    const menuId = 'primary-search-account-menu';
    const menu = <Menu
    anchorEl={anchorEl}
    anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
    }}
    id={menuId}
    keepMounted
    transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
    }}
    open={isMenuOpen}
    onClose={handleMenuClose}
>
    <MenuItem onClick={handleSort}>Publish Date (Newest)</MenuItem>
    <MenuItem onClick={handleSort}>Publish Date (Oldest)</MenuItem>
    <MenuItem onClick={handleSort}>Views</MenuItem>
    <MenuItem onClick={handleSort}>Likes</MenuItem>
    <MenuItem onClick={handleSort}>Dislikes</MenuItem>
</Menu>

    if(store.currentIcon === 'Home') {
        homeIcon = <HomeIcon className="menuIcon" style={{
            width: 50,
            height: 50,
            border: "5px solid rgb(0, 128, 0)"
        }} onClick ={handleHomeClick}> </HomeIcon>
    }
    if(store.currentIcon === 'All Lists') {
        allListsIcon = <GroupsIcon className="menuIcon" style={{
            width: 50,
            height: 50,
            border: "5px solid rgb(0, 128, 0)",
            marginLeft: "10px",
        }} onClick ={handleGroupsClick}> </GroupsIcon>
    }
    if(store.currentIcon === 'Users') {
        userIcon = <PersonIcon className="menuIcon" style={{
            width: 50,
            height: 50,
            border: "5px solid rgb(0, 128, 0)",
            marginLeft: "10px",
        }} onClick ={handlePersonClick}> </PersonIcon>
    }
    if(store.currentIcon === "Community") {
        communityIcon = <FunctionsIcon className="menuIcon" style={{
            width: 50,
            height: 50,
            border: "5px solid rgb(0, 128, 0)",
            marginLeft: "10px",
        }} onClick ={handleFunctionClick}> </FunctionsIcon>
    }
    if(auth.guest || store.currentList){
        homeIcon = <HomeIcon className="menuIconDisabled" style={{
            width: 50,
            height: 50,
        }}> </HomeIcon>
    }
    if(store.currentList){
        allListsIcon = <GroupsIcon className="menuIconDisabled" style={{
            width: 50,
            height: 50,
            marginLeft: "10px",
        }}> </GroupsIcon>
        userIcon = <PersonIcon className="menuIconDisabled" style={{
            width: 50,
            height: 50,
            marginLeft: "10px",
        }}> </PersonIcon>
        communityIcon = <FunctionsIcon className="menuIconDisabled" style={{
            width: 50,
            height: 50,
            marginLeft: "10px",
        }}> </FunctionsIcon>
        searchField = <TextField className = "menuIconDisabled"
            style={{
                width: "50%",
                
            }} id="outlined-basic" label="Search" variant="outlined" disabled />
        sortByIcon = <SortIcon className="menuIconDisabled" style={{
        width: 50,
        height: 50,
        display: "inline",
        float: "right",
        marginRight: "50px"
    }} onClick = {handleSortMenuOpen}> </SortIcon>
        sortBy = <Typography className="menuIconDisabled" style = {{
        fontSize: 30,
        display: "inline",
        float: "right",
        marginRight: "10px"
    }}> Sort By </Typography>
    }
    return (
        <div id="menubar">
            {homeIcon}
            {allListsIcon}
            {userIcon}
            {communityIcon}
            {searchField}
            {sortByIcon}
            {sortBy}
            {menu}
        </div>
        
    )
}

export default MenuBar;