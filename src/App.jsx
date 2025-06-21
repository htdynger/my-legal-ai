import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './component/Header/Header'
import Sidebar from './component/SIdebar/Sidebar'
import Main from './component/Main/Main'
import DocumentGeneration from './component/DocumentGeneration/DocumentGeneration'
import './App.css'

function App() {

  const register = async () => {
    try {
        const res = await fetch('/api/agents/auth/register', {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                username: "rustam_test_" + Date.now(), // 👈 сделай уникальный логин
                email: `rustam_${Date.now()}@example.com`, // 👈 уникальный email
                password: "Qwerty123!",
                first_name: "Rustam",
                last_name: "Antipov"
            })
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.log("❌ Ошибка регистрации:", errorText);
            return; // 👈 ВАЖНО: прекращаем выполнение
        }

        const data = await res.json();
        console.log("✅ Зарегистрирован:", data);

    } catch (err) {
        console.error("❗ Ошибка сети:", err);
    }
};

// register();



  const [count, setCount] = useState(0)

  return (
    <div className='app'>
      

      <BrowserRouter> 
        <Header></Header>
        <div className='content-wrapper'>

          <Sidebar></Sidebar>
          
          <Routes>
            <Route path='/' element={<Main></Main>} />
            
            <Route path='/document-generation' element={<DocumentGeneration></DocumentGeneration>} />
            <Route path='/sign-up' element={<SignUp></SignUp>} />

          </Routes>
        </div>
        
      </BrowserRouter>
    </div>
  )
}

export default App
