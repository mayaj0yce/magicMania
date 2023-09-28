// props for username and card data

import React from 'react';

export const UserInfo =
    (props) => {
        return (
            <div className="block">
                <h1> {props.username}</h1>
                <h2>{props.email}</h2>

            </div>
        )
    }

