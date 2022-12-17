export type UserInfoType = {
  id: string;
  name: string;
  mail: string;
  token: string;
  profileImage: string;
  friendList: Array<FriendType>;
};

export type FriendType = {
  inviterID: string;
  inviterMail: string;
  inviterName: string;
}

export default {
  signUpFetch: async (name: string, mail: string, password: string) => {
    const endpoint = `${process.env.REACT_APP_API_URL}/api/register`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        mail: mail,
        password: password,
      }),
    });

    return await res.json();
  },
  signInFetch: async (mail: string, password: string) => {
    const endpoint = `${process.env.REACT_APP_API_URL}/api/login`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        mail: mail,
        password: password,
      }),
    });

    return await res.json();
  },
  getUserDataFetch: async(mail: string) => {
    const endpoint = `${process.env.REACT_APP_API_URL}/api/getData`

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        mail: mail,
      }),
    });

    return await res.json();
  },
  findUsers: async(id: string, inviterName: string, inviterMail: string) => {
  const endpoint = `${process.env.REACT_APP_API_URL}/api/findFriends`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        inviterMail: inviterMail,
        inviterName: inviterName
      }),
    });

    return await res.json();
  },
  findUserById: async(id: string) => {
    const endpoint = `${process.env.REACT_APP_API_URL}/api/getUser`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });

    return await res.json();
  }
};
