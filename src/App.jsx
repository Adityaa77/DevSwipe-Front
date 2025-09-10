import { useState } from 'react';
import Navbar from './Navbar';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Body from './Body';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>

    <BrowserRouter basename='/'>
    <Routes>
      <Route path="/" element={<Body/>}  />
    </Routes>
    </BrowserRouter>



    <Navbar/>
 
    </>
  );
}

export default App;
