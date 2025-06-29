import Header from './Header/Header.jsx';
// import Sidebar from './Sidebar/Sidebar.jsx';
import Sidebar from './SIdebar/Sidebar.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import '../App.css'
import { useEffect } from 'react';

const MainLayout = () => {

    const token = localStorage.getItem('bearer_token')
    
    const navigate = useNavigate()
    useEffect(() => {



        const checkAuthenticated = async () => {

            if (!token) {
                navigate('/sign-in');
                return;
            }

            try {
                const res = await axios.get('api/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                    },
                })
    
                console.log(`user: ${JSON.stringify(res.data)}`)
    
            } catch (err) {
                console.log(err.message)
                navigate('/sign-in')
                
            }
        }

        checkAuthenticated();


    }, [])


    return (
        <div className="app">
            <Header />
            <div className="content-wrapper">
                <Sidebar />
                <Outlet /> 
            </div>
        </div>
    );
};

export default MainLayout;
