import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_BACKEND_URL, { transports: ["websocket"] });

const DriverTracker = () => {
  const [orderId, setOrderId] = useState("");
  const [watchId, setWatchId] = useState(null);
  const [streaming, setStreaming] = useState(false);

  const startStreaming = () => {
    if (!orderId) return alert("Enter orderId");
    if (!navigator.geolocation) return alert("Geolocation not supported");

    const id = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude: lat, longitude: lng, heading } = pos.coords;
        socket.emit("driverLocation", { orderId, lat, lng, heading });
      },
      (err) => console.error(err),
      { enableHighAccuracy: true, maximumAge: 2000, timeout: 10000 }
    );
    setWatchId(id);
    setStreaming(true);
  };

  const stopStreaming = () => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
    }
    setStreaming(false);
  };

  useEffect(() => () => stopStreaming(), []);

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Delivery Partner Live Tracking</h2>
      <input
        type="text"
        placeholder="Enter Order ID"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
        className="w-full border rounded px-3 py-2 mb-3"
      />
      {!streaming ? (
        <button onClick={startStreaming} className="px-4 py-2 bg-green-600 text-white rounded">
          Start Sharing Location
        </button>
      ) : (
        <button onClick={stopStreaming} className="px-4 py-2 bg-red-600 text-white rounded">
          Stop Sharing
        </button>
      )}
      <p className="mt-3 text-sm text-gray-600">
        Status: {streaming ? "LIVE" : "OFF"}
      </p>
    </div>
  );
};

export default DriverTracker;
