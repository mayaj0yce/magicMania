// props for username and card data

import React from 'react';

export const UserInfo =
    (props) => {
        return (
            <div  className='justify-center'>
                <h1 className='subtitle text-2xl'> {props.username}</h1>
                <h2 className=''>{props.email}</h2>

            </div>
        )
    }

