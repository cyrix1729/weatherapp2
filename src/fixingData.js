import React from 'react'
import cityIDs from "./citylist.json"


function fixingData(item){
    const ft = props.filter;
    return <ul>
        {cityIDs.filter((city)=>city.name.toLowerCase().includes(ft)).sort((a,b)=> {return a.name < b.name}).splice(0, 20).map((city)=>(
            <li key={city.id}>{city.name}</li>
        ))}
        
    </ul>


};

export default fixingData;