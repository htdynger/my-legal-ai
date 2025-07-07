import Header from './Header/Header.jsx';
// import Sidebar from './Sidebar/Sidebar.jsx';
import Sidebar from './SIdebar/Sidebar.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import '../App.css'
import { useEffect } from 'react';

const MainLayout = () => {

    const token = localStorage.getItem('access_token')
    const client_id = localStorage.getItem('client_id')







    



    
    const navigate = useNavigate()

    useEffect(() => {





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
