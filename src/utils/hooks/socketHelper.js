// src/utils/socketHelper.js
import { io } from "socket.io-client";
import axios from "axios";

let socket = null;

export const connectAndSendMessage = async (message, onMessage) => {
  const token = localStorage.getItem("access_token");
  const client_id = localStorage.getItem("client_id");
  const chatRaw = localStorage.getItem("chat_id");

  if (!chatRaw) {
    console.error("❗ chat_id не найден в localStorage");
    return;
  }

//   const chat_id = JSON.parse(chatRaw).id;
  const chat_id = chatRaw

  try {
    // 1. Получить session_token
    const res = await axios.post(
      "/ascender/api/v1/1/alp/initiate",
      {
        account_id: client_id,
        chats_to_listen: [chat_id],
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    const session_token = res.data.session_token;
    localStorage.setItem("session_token", session_token);

    // 2. Инициализировать сокет, если ещё не создан
    if (!socket) {
      socket = io("https://dev-api.ascender-ai.com", {
        path: "/api/v2/alp",
        extraHeaders: {
          Authorization: `Bearer ${session_token}`,
        },
        autoConnect: false,
      });

      // Подключение
      socket.connect();

      socket.on("connect", () => {
        console.log("✅ Сокет подключён:", socket.id);
      });

      socket.on("disconnect", () => {
        console.log("❌ Сокет отключён");
      });

      socket.on("chat-message", (data) => {
        console.log("📥 chat-message:", data);
        if (onMessage) onMessage(data);
      });

      socket.on("chat-message-response", (data) => {
        console.log("📥 chat-message-response:", data);
        if (onMessage) onMessage(data);
      });

      socket.on("error", (err) => {
        console.log("⚠️ Socket error:", err);
      });
    }

    // 3. Отправка сообщения
    const payload = {
      content: message,
      chat_id: chat_id,
      message_type: "customer_message",
    };

    console.log("📤 Отправка:", payload);
    console.log("Сокет подключён?", socket.connected);

    socket.emit("chat-message", payload, (response) => {
      console.log("📩 Ответ от сервера:", response);
    });

  } catch (err) {
    console.error("Ошибка в connectAndSendMessage:", err.message);
  }
};


export const disconnectSocket = () => {
    if (socket) {
      socket.disconnect();
      socket = null;
      console.log("🔌 Сокет отключён вручную");
    }
  };
