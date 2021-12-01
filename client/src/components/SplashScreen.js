import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'
import Copyright from './Copyright'

function handleGuest() {
    console.log("Guest");
}
export default function SplashScreen() {
    return (
        <div id="splash-screen">
            <h1>Welcome To The Top 5 Lister</h1>
            <h2> 
            Create Your Own Top 5 Lists! <br />
            Share Your Lists With Others! <br />
            See What The Community Thinks!
            </h2>
            <Box mx = {5} display="absolute" justifyContent="space-between">
                <Button style = {{
                    borderRadius: 35,
                    color: "black",
                    backgroundColor: "#abdba0",
                    padding: "18px 36px",
                    fontSize: "18px",
                    margin: "18px"                    
                }} component={Link} to = "/register"> Create New Account </Button>
                <Button style = {{
                    borderRadius: 35,
                    color: "black",
                    backgroundColor: "#abdba0",
                    padding: "18px 36px",
                    fontSize: "18px",
                    margin: "18px"                    
                }} component={Link} to = "/login"> Login </Button>
                <Button onClick = {handleGuest} style = {{
                    borderRadius: 35,
                    color: "black",
                    backgroundColor: "#abdba0",
                    padding: "18px 36px",
                    fontSize: "18px",
                    margin: "18px"                  
                }}> Continue As Guest </Button>
            </Box>
            <Copyright style = {{
                 margin: "100px"
            }}>
            </Copyright>
        </div>
    )
}