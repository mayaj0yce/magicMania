import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Header.css'


function CardSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {

    };

    return (
<div>
<div className='block cardSearch'>
<form>
    <label>Search by Card</label>
    <input type='text' required>
        
    </input>
</form>

</div>
<div className='block cardResults'>


</div>
</div>
    )
}

export default CardSearch