import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './screens/Home';
import Header from './components/Header';
import Register from './components/Register';

function App() {
  return (
    <div>

      <BrowserRouter>
        {/* Header Template */}
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
        </Routes>

        {/* Footer Template */}
      </BrowserRouter>
    </div>

  );
}

export default App;
