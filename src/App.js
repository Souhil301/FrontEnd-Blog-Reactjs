import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import CreatePost from './components/CreatePost';
import Profile from './components/profile';
import ChangePassword from './components/changePassword';
import Post from './components/Posts'; 
import Login from './components/Log_in';
import Registration from './components/Registration';
import AuthContext from './helpers/AuthContext';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header'; 

function App() {
  const [authState, setAuthState] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://127.0.0.1:3100/api/validate-token', {
            headers: { Authorization: `Bearer ${token}` }
          });
          console.log(response.data);

          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        } catch (error) {
          localStorage.removeItem('token');
          setAuthState(false);
        }
      } else {
        setAuthState(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <div className='App'>
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <Header /> 
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/createpost' element={<CreatePost />} />
            <Route path='/post/:id' element={<Post />} />
            <Route path='/login' element={<Login />} />
            <Route path='/registration' element={<Registration />} />
            <Route path='/profile' element={<Profile />} /> 
            <Route path='/changepassword' element={<ChangePassword />} /> 
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
