import React, {useState} from 'react';
import TextField from "@mui/material/TextField";
import fixingData from "./fixingData.js"

function SearchBar(x){
    let inputHandler = (e) => {
        const lc = e.target.value.toLowerCase();
        x.onTextChange(lc);
    };



    return (

        <div classname = "searchbar">
            <TextField
                id="outlined-basic"
                onChange={inputHandler}
                variant="outlined"
                fullWidth
                label="Search" 
            />

        </div>
    );

}

export default SearchBar;