//import { React, useContext, useState } from "react";
import { React} from "react";
//import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
/*
    This React component represents a single item in our
    Top 5 List, which can be edited or moved around.
    
    @author McKilla Gorilla
*/
function Top5Item(props) {
    //const { store } = useContext(GlobalStoreContext);

    let { index } = props;
    return (
        <TextField sx={{
            border: "1.5px solid rgb(0, 0, 0)",
            borderRadius: "5px",
            mb: 1, 
        }}
            required
            fullWidth
            id={"item-" + (index + 1)}
            name="name"
            autoComplete="Top 5 Item Name"
            className='top5-item'
            defaultValue={props.text}
            inputProps={{style: {fontSize: 48}}}
        />
    )
    }

export default Top5Item;