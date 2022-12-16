import React, {useEffect, useRef} from 'react'
import { UserInfoType } from '../API';
import FindFriends from '../components/FindFriends/FindFriends';
import UserList from '../components/UserList/UserList';


type Props = {
  userData: UserInfoType | undefined;
  getData: () => Promise<void>
}

const Dashboard: React.FC<Props> = ({userData, getData}) => {

  const gotData = useRef(false)

  useEffect(() => {
    if (!userData || gotData.current)
      return;

    getData()
    gotData.current = true
  }, [userData])

  useEffect(() => {
    console.log(userData)
  }, [userData])

  return (
    <>
      <FindFriends userData={userData} getData={getData} />
      <UserList userData={userData} />
      {userData?.id}
    </>
  )
}

export default Dashboard