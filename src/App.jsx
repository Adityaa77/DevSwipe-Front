import { useState } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Body from './components/Body';
import Login from './components/Login';
import Profile from './components/Profile';
import { Provider } from 'react-redux';
import appStore from './utls/reduxstore';
import Feed from "./components/Feed";
import Connections from './components/Connections';
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
   <Provider store={appStore}>{/*This is for the redux store */}
    <BrowserRouter basename='/'>
    <Routes>
    <Route path="/" element={<Body/>}>
      <Route path="/" element={<Feed/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/requests' element={<Profile/>}/>
        <Route path='/connections' element={<Connections/>}/>
    </Route>  
    </Routes>
    </BrowserRouter>
   </Provider>
    </>
  );
}

export default App;
