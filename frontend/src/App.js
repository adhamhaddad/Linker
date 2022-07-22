import React from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import ProfileUser from "./components/Profile/ProfileUser";

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
            <Profile title='Profile Page'/>
            {/* <Home title='Home Page'/> */}
            {/* <ProfileUser title='Profile-User Page'/> */}
            <Footer/>
        </div>
    )
}
export default App;