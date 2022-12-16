import React from 'react';
import logo from './logo.svg';
import './components/common/sass/App.scss';
import { useIsLoggedIn } from './hooks/useIsLoggedIn';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Header from './components/Header/Header';
import Dashboard from "./components/FindFriends/FindFriends";
import FindFriends from "./components/FindFriends/FindFriends";
import Main from "./components/Room/Main";

function App() {
  const { loggedIn, setLoggedIn, userData, setUserData, loading, getData } =
    useIsLoggedIn();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home isLoggedIn={loggedIn} />}></Route>
        <Route
          path="/sign-up"
          element={<Register isLoggedIn={loggedIn} />}
        ></Route>
        <Route
          path="/sign-in"
          element={
            <Login
              isLoggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              setUserData={setUserData}
            />
          }
        ></Route>
        <Route
          path="/dashboard"
          element={<FindFriends userData={userData} />}
        />
        <Route path="/test" element={<Main />}></Route>
      </Routes>
    </div>
  );
}

export default App;
