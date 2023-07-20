import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Header from "./components/Header";
import Destination from "./components/Destination";
import "react-toastify/dist/ReactToastify.css";
import DestinationDetail from "./components/DestinationDetail";
import AccomodationDetail from "./components/AccomodationDetail";
import Accomodation from "./components/Accomodation";
import Transportation from "./components/Transportation";
import Footer from './components/Footer';
import About from "./screens/About";

function App() {
  return (
    <BrowserRouter>
      {/* Header Template */}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element ={<About/>}/>
        <Route path="/Destination" element={<Destination />} />
        <Route path="/Accomodation" element={<Accomodation />} />
        <Route path="/Transportation" element={<Transportation />} />
        <Route
          path="/Destination/detail/:dId"
          element={<DestinationDetail />}
        />
        <Route
          path="/Accomodation/detail/:cId"
          element={<AccomodationDetail />}
        />
      </Routes>
        {/* Footer Template */}
        <Footer/>
      </BrowserRouter>
  );
}

export default App;
