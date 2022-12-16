import React, { useEffect, useState } from 'react'
import API, { UserInfoType } from '../../API';

type Props = {
  userData: UserInfoType | undefined;
  getData: () => Promise<void>
}

const FindFriends: React.FC<Props> = ({userData, getData}) => {
  const [loading, setLoading] = useState(false);
  const [friendID, setFriendID] = useState('');
  const [info, setInfo] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!friendID)
      setInfo('Pole nie moze pozostać puste');

    setInfo('');
    

    if (!userData || !userData.name || !userData.mail)
      return;
      
    const data = await API.findUsers(friendID, userData?.name, userData?.mail )

    if (data.ok) {
      setInfo(data.msg);
      getData();
    } else {
      setInfo(data.error)
    }


    console.log(data);

  }

  return (
    <div>
      <div>Znajdź znajomych</div>
      <form onSubmit={handleSubmit}>
        <label>
          Wpisz ID znajomego:
          <input type="mail" name='text' onChange={(e) => setFriendID(e.target.value)}/>
          <input type="submit" value="Szukaj" />
        </label>
        {info}
      </form>

    </div>
  )
}

export default FindFriends