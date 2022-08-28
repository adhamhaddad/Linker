import React from "react";
import './App.css';
import Header from "./components/Header/Header";
// import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
// import Messages from "./components/Messages/Messages";
// import Notification from "./components/Notification/Notification";
// import Settings from "./components/Settings/Settings";
// import Signup from "./components/Forms/Signup";
// import Signin from "./components/Forms/Signin";
import Footer from "./components/Footer/Footer";

function App() {
    return (
        <>
            <Header/>
            <Profile title='Profile Page'/>
            <Footer/>
            {/*
            <Signup title='Signup Page' register={true}/>
            <Home title='Home Page'/>
            <Messages title='Messages Page'/>
            <Notification title='Notification Page'/>
            <Settings title='Settings Page'/>
            <Signin title='Signin Page' login={true}/>
            <Contact title='Contact Page'/>
        */}
        </>
    )
}
export default App;