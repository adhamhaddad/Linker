import React from "react";
import './App.css';
import Header from "./components/Header/Header";
// import Home from "./components/Home/Home";
// import Settings from "./components/Settings/Settings";
// import Messages from "./components/Messages/Messages";
import Profile from "./components/Profile/Profile";
import Footer from "./components/Footer/Footer";
// import Signup from "./components/Forms/Signup";
// import Signin from "./components/Forms/Signin";

function App() {
    
    // fetch('http://localhost:3000/information/1')
    /*
    const [data, setData] = React.useState(null);
    React.useEffect(() => {
        fetch("/")
        .then((res) => res.json())
        .then((data) => setData(data.message));
    }, []);
    */

    return (
        <>
            <Header/>
            {/* <Messages title='Messages Page'/> */}
            {/* <Settings title='Settings Page'/> */}
            {/*
            <Home title='Home Page'/>
            <Signup title='Signup Page' register={true}/>
            <Signin title='Signin Page' login={true}/>
            <Contact title='Contact Page'/>
        */}
            <Profile title='Profile Page'/>
            <Footer/>
        </>
    )
}
export default App;