
import Navbar from './components/Navbar'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar componente='home'></Navbar>} />
          <Route path="/home" element={<Navbar componente='home'></Navbar>} />
          <Route path="/login" element={<Navbar componente='login'></Navbar>} />
          <Route path="/registro" element={<Navbar componente='registro'></Navbar>} />
          <Route path="/error" element={<Navbar componente='error'></Navbar>} />
          <Route path="/consulta" element={<Navbar componente='consulta'></Navbar>} />
          <Route path="/mantenimiento" element={<Navbar componente='mantenimiento'></Navbar>} />
          <Route path="*" element={<Navigate to='/error'></Navigate>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
