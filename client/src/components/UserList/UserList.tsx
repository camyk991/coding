import React, {useEffect} from 'react'
import { UserInfoType } from '../../API';

type Props = {
  userData: UserInfoType | undefined;
}

const UserList: React.FC<Props> = ({userData}) => {

  return (
    <div>
      {
        userData && userData.friendList.length ? 
        userData.friendList.map(el => (
          <>{el.inviterName}</>
        )) 
        :
        "Brak znajomych"
      }
    </div>
  )
}

export default UserList