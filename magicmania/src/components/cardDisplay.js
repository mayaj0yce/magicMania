 // this is for the card display on user page
import React from 'react';

export const CardDisplay =
    (props) => {
        return (
            <div  className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4'>
                <h1 className='subtitle text-xl'>first card {props.card}</h1>
                <h1 className='subtitle text-xl'>second card {props.card2}</h1>
                <h1 className='subtitle text-xl'>third card {props.card2}</h1>
                <h1 className='subtitle text-xl'>fourth card {props.card2}</h1>
                <h1 className='subtitle text-xl'>fifth card {props.card2}</h1>
                <h1 className='subtitle text-xl'>sixth card {props.card2}</h1>
                <h1 className='subtitle text-xl'>seventh card {props.card2}</h1>
                <h1 className='subtitle text-xl'>eighth card {props.card2}</h1>
            </div>
        )
    }