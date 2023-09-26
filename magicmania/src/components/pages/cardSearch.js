import React from 'react';
import { Link } from 'react-router-dom';


function cardSearch() {
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

export default cardSearch