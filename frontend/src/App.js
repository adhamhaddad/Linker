import React from "react";
import './App.css';
import Header from "./components/Header/Header";
// import Home from "./components/Home/Home";
import Settings from "./components/Settings/Settings";
import Profile from "./components/Profile/Profile";
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
        <>
            <Header/>
            <Settings title='Profile Page'/>
            <Footer/>
        </>
    )
}
export default App;