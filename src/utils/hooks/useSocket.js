// src/hooks/useSocket.js
import { useEffect } from "react";
// import { socket } from "./socket.js";
import { socket } from "./Socket";
import axios from "axios";

import { useChatStore } from "../../store/useChatStore";

export const useSocket = (onMessage) => {

    const token = localStorage.getItem('access_token')
    const client_id = localStorage.getItem('client_id')

    const { selectedChat } = useChatStore()
    
    useEffect(() => {

        const getSessionToken = async () => {

            try {
                const res = await axios.post(
                    
                    'https://dev-api.ascender-ai.com/api/v1/1/alp/initiate', 
                    {
                        "account_id": client_id,
                        "chats_to_listen": [
                            // selectedChat
                            'd540a398-ceb4-4e3d-9cc6-c9ce6d07a967',
                        ]
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: 'application/json',
                            "Content-Type": 'application/json'
                        },
                    
    
                    })
    
                    localStorage.setItem('session_token', res.data.session_token)

                    const session_token = res.data.session_token


                    socket.connect();

                    socket.on("connect", () => {
                    console.log("✅ Подключено:", socket.id);
                    console.log(socket)
                    });
                
                    socket.on("disconnect", () => {
                        console.log("❌ Отключено");
                    });
                
                    if (onMessage) {

                    }

                    socket.on("chat-message", (res) => {
                        console.log("📥 Ответ пришёл:", res);
                        console.log(onMessage)
                    });
                    socket.on("chat-message-response", (res) => {
                        console.log("📥 Ответ пришёл:", res);
                        console.log(onMessage)
                    });
                    socket.on("error", (res) => {
                        console.log("📥 Ответ пришёл:", res);
                        console.log(onMessage)
                    });

                    
            } catch (err) {
                console.log(err.message)
            }

            return () => {
                // socket.off("chat-message-response", onMessage);
                socket.disconnect();
            };

        }

        getSessionToken()

    


    }, []);


};
