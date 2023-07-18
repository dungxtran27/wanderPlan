import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Home from './screens/Home';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Container>
      <BrowserRouter>
        {/* Header Template */}
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>} />
        </Routes>

        {/* Footer Template */}
        <Footer/>
      </BrowserRouter>
    </Container>
  );
}

export default App;
