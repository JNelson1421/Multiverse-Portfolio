import { useState, useEffect } from "react";
import "../css/Search.css"
import axios from "axios";
import Card from './CardComponent';

function Search() {
    const [players, setPlayers] = useState([]);
    const [totalPlayers, setTotalPlayers] = useState(0);
    const [searchTitle, setSearchTitle] = useState("");

    useEffect(() => {
        const loadPlayers = async () => {
            const response = await axios.get(
                `http://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code=%27mlb%27&active_sw=%27Y%27&name_part=%27${searchTitle}%25%27`
            );
            console.log(response.data.search_player_all)
            setPlayers(response.data.search_player_all.queryResults.row);
            setTotalPlayers(response.data.search_player_all.queryResults.totalSize);
        };

        loadPlayers();
    }, [searchTitle]);

    return (
        <div className="container">
            <input className="search_input"
                type="text"
                placeholder="Search by Last Name..."
                onBlur={(e) => {
                    setSearchTitle(e.target.value)
                }}
            />
            <button className="btn btn-info" type='button'>Search</button> 
            <div className='cardContainer'>
                {totalPlayers == 1 ? ( 
                                    <Card key={players.player_id} player={players} /> 
                ) : (
                        players
                        .map((item) => {
                            return (   
                                        <Card key={item.player_id} player={item} /> 
                            );
                        })
                )}
            </div>
        </div>
    );
}

export default Search;
