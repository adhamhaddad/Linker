import React from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";

function App() {
    const [data, setData] = React.useState(null);
    React.useEffect(() => {
        fetch("/api")
        .then((res) => res.json())
        .then((data) => setData(data.message));
    }, []);
    return (
        <div>
            <Header/>
            <Home title='Home Page'/>
            <Footer/>
        </div>
    )
}
export default App;