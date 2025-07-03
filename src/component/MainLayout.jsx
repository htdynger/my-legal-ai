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



    const createChat = async () => {

        try {
            const res = await axios.post(
                
                '/ascender/api/v1/1/chats', 
                {
                    "name": "newChat",
                    "agent_id": 1,
                    "organization_id": 1,
                    "mode": "agent_autopilot",
                    "platform": "unknown",
                    "responsible": 0,
                    "client_id": client_id,
                    "created_by_id": 0,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                    },
                

                })

                console.log(res.data)
        } catch (err) {
            console.log(err.message)
        }
    }

        const getChats = async () => {

        try {
            const res = await axios.get('/ascender/api/v1/1/chats', {
                headers: {
                  Authorization: `Bearer ${token}`,
                  Accept: 'application/json',
                }
              })

              console.log(res.data)
        } catch (err) {

            console.log(err)
        }

    }

    


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

            localStorage.setItem('client_id', res.data.id)

        } catch (err) {
            console.log(err.message)
            navigate('/sign-in')
            
        }
    }
    
    const navigate = useNavigate()
    useEffect(() => {





        // checkAuthenticated();
        // createChat()
        // getChats()


    }, [])


    return (
        <div className="app">
            {/* <Header /> */}
            <div className="content-wrapper">
                {/* <Sidebar /> */}
                <Outlet /> 
            </div>
        </div>
    );
};

export default MainLayout;
