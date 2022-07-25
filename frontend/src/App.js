import React from "react";
import './App.css';
import Header from "./components/Header/Header";
// import Home from "./components/Home/Home";
// import Profile from "./components/Profile/Profile";
// import Posts from "./components/Posts/Posts";
// import Notifications from "./components/Notifications/Notifications";
// import Messages from "./components/Messages/Messages";
import Signin from "./components/Forms/Signin";
import Signup from "./components/Forms/Signup";
import Footer from "./components/Footer/Footer";

function App() {
    const changeComponent = () => {

    }
    /*
    const [data, setData] = React.useState(null);
    React.useEffect(() => {
        fetch("/")
        .then((res) => res.json())
        .then((data) => setData(data.message));
    }, []);
    */
    return (
        <div className="App">
            <Header/>
            <Signin title='Profile Page'/>
            <Footer/>
        </div>
    )
}
export default App;