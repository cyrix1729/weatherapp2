import cityIDs from "./citylist.json"


function fixingData(item){
    return <ul>
        {cityIDs.map((city)=>(
            <li key={city.id}>{city.name}</li>
        ))}
        
    </ul>


};

export default fixingData;