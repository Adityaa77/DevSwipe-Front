import { useState } from 'react';
import Navbar from './Navbar';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Body from './Body';
import Login from './Login';
import Profile from './Profile';
import { Provider } from 'react-redux';
import appStore from './utls/reduxstore';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
   <Provider store={appStore}>{/*This is for the redux store */}
    <BrowserRouter basename='/'>
    <Routes>
      <Route path="/" element={<Body/>}>
        <Route path='/login' element={<Login/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Route>  
    </Routes>
    </BrowserRouter>
   </Provider>
    </>
  );
}

export default App;
