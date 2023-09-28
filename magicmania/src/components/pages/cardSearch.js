import React from 'react';
// import { Link } from 'react-router-dom';


function cardSearch() {
    // onSubmit={showCard}

    return (
<div>
<div className='block cardSearch'>
<form >
    <div>
    <label>Search by Card</label>
    <input type='text' required/>
{/* had to add a self closing tag above */}
    <button>Send Search</button>
    </div>
</form>

{/* </div>
<div className='block cardResults'>

<h1>results</h1> */}
</div>
</div>
    )
}

export default cardSearch