// src/socket.js
import { io } from "socket.io-client";

const token = localStorage.getItem("session_token"); // или из стора

export const socket = io("https://legai.io", {
  path: "/api/v2/alp",
  // transports: ["websocket"], 
  extraHeaders: {
    Authorization: `Bearer ${token}`,
  },
  autoConnect: false, // чтобы вручную управлять
});
