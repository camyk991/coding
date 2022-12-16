import React from 'react';
import logo from './logo.svg';
import './components/common/sass/App.scss';
import { useIsLoggedIn } from './hooks/useIsLoggedIn';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Dashboard from './pages/Dashboard';
import FindFriends from './components/FindFriends/FindFriends';

function App() {
  
  const { loggedIn, setLoggedIn, userData, setUserData, loading, getData} = useIsLoggedIn();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home isLoggedIn={loggedIn} />}></Route>
        <Route path="/sign-up" element={<Register isLoggedIn={loggedIn}/>}></Route>
        <Route path="/sign-in" element={<Login isLoggedIn={loggedIn} setLoggedIn={setLoggedIn} setUserData={setUserData} />}></Route>
        <Route path="/dashboard" element={<Dashboard userData={userData} getData={getData}/>} />
      </Routes>
    </div>
  );
}

export default App;
