import React from 'react';
import './App.css';
// import Home from "./components/Home/Home";
// import Notification from "./components/Notification/Notification";
// import Settings from "./components/Settings/Settings";
// import Signup from "./components/Forms/Signup";
// import Signin from "./components/Forms/Signin";
// import Profile from "./components/Profile/Profile";
import Header from './components/Header/Header';
import Messages from './components/Messages/Messages';
import Footer from './components/Footer/Footer';

function App() {
  /*
    const [user, setUser] = React.useState({})
    // User
    React.useEffect(() => {
        async function getUser() {
            const response = await fetch('http://localhost:3000/user/4e5c7f44-f20d-458b-a204-5fca018c93c2')
            const user = await response.json();
            try {
                setUser(prev => {
                    return {
                        ...prev,
                        id: user.data.id,
                        username: user.data.username,
                        email: user.data.email,
                        gender: user.data.gender,
                        joined: user.data.joined
                    }
                })
            } catch (err) {console.log(err.message)}
        }
        getUser()
    }, [])
    */
  return (
    <>
      <Header />
      <Messages title='Messages Page' />
      <Footer />
      {/*
            <Profile title='Profile Page' user={user}/>
            <Signup title='Signup Page' register={true}/>
            <Home title='Home Page'/>
            <Notification title='Notification Page'/>
            <Settings title='Settings Page'/>
            <Signin title='Signin Page' login={true}/>
            <Contact title='Contact Page'/>
        */}
    </>
  );
}
export default App;
