import React from "react";
import './App.css';
import Header from "./components/Header/Header";
// import Home from "./components/Home/Home";
// import Profile from "./components/Profile/Profile";
// import Posts from "./components/Posts/Posts";
import Messages from "./components/Messages/Messages";
// import Notifications from "./components/Notifications/Notifications";
// import Settings from "./components/Settings/Settings";
import Footer from "./components/Footer/Footer";

function App() {
    /*
    const [data, setData] = React.useState(null);
    React.useEffect(() => {
        fetch("/")
        .then((res) => res.json())
        .then((data) => setData(data.message));
    }, []);
    */
    return (
        <div>
            <Header/>
            <Messages title='Profile Page'/>
            <Footer/>
        </div>
    )
}
export default App;