import React, { useEffect, useRef } from "react";
import { UserInfoType } from "../API";
import FindFriends from "../components/FindFriends/FindFriends";
import UserList from "../components/UserList/UserList";

type Props = {
  userData: UserInfoType | undefined;
  getData: () => Promise<void>;
  setRoomId: any;
};

const Dashboard: React.FC<Props> = ({ userData, getData, setRoomId }) => {
  const gotData = useRef(false);

  useEffect(() => {
    if (!userData || gotData.current) return;

    getData();
    gotData.current = true;
  }, [userData]);

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  return (
    <>
      <FindFriends
        userData={userData}
        getData={getData}
        setRoomId={setRoomId}
      />
      <UserList userData={userData} />
    </>
  );
};

export default Dashboard;
