import React, { useState } from "react";
import { UserInfo } from "../userInfo";


const userInfo = [
    {
        username: 'sarahD',
        email: 'sarababuy@email.com',
    }
    //use effect run once upon page load 
    // query data base for logged in user and send that data to the props
]

function showUser() {


  
    return (
        <div>
            <main className="block userInfo">
                {/* this is where the username and the email for the user go */}
                {/* {userInfo((p) => { */}
                    {/* return */}
                      <UserInfo
                        username={userInfo[0].username}
                        email={userInfo[0].email}>
                    </UserInfo>
                {/* })} */}
            </main>
            <div class='block showCards'>
                <h1>cards here</h1>
            </div>
        </div>
    )

}

export default showUser
// import { CgCardHearts } from 'react-icons/cg'
