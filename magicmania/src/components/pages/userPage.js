import React from "react";
import { UserInfo } from "../userInfo";


const userInfo = [
    {
        username: 'sarahD',
        email: 'sarababuy@email.com',
    }
]

function showUser() {
return(
    <div>
<main className="block userInfo">
   {userInfo.map((p)=>{
    return <UserInfo
    username={p.username}
    email={p.email}>
     </UserInfo>
   })}
</main>
<div class='block showCards'>

</div>
    </div>
)

}

export default showUser
// import { CgCardHearts } from 'react-icons/cg'
