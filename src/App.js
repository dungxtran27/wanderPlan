import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./screens/Home";
import Header from "./components/Header";
import Destination from "./components/Destination";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DestinationDetail from "./components/DestinationDetail";
import AccomodationDetail from "./components/AccomodationDetail";
import Accomodation from "./components/Accomodation";
import Transportation from "./components/Transportation";
import Footer from "./components/Footer";
import TransportDetail from "./components/TransportDetail";
import Profile from "./components/Profile";
import Changepass from "./components/Changepass";
//toast.configure();

function App() {
  return (
    <BrowserRouter>
      {/* Header Template */}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
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
        <Route
          path="/Transportation/detail/:tId"
          element={<TransportDetail />}
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/changepass" element={<Changepass />} />
      </Routes>
      {/* Footer Template */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;
