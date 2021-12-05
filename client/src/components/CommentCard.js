import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material'
function CommentCard(props) {
    return(
        <ListItem>
            <Box sx={{p: 1, flexGrow: 1, backgroundColor: "#d4af37", borderRadius: "5px"}}>
                <Typography sx={{
                    fontSize: "8px",
                }}>{props.username}
                </Typography>
                <Typography sx={{
                    fontSize: "16px",
                }}>{props.comment}
                </Typography>
                </Box>
        </ListItem>   
    )
}

export default CommentCard;