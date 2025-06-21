import Header from './Header/Header.jsx';
import Sidebar from './Sidebar/Sidebar.jsx';
import { Outlet } from 'react-router-dom';
import '../App.css'

const MainLayout = () => {
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
