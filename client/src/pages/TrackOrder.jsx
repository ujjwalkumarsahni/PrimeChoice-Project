import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_BACKEND_URL, { transports: ["websocket"] });

const loadGoogleMaps = (apiKey) =>
  new Promise((resolve, reject) => {
    if (window.google?.maps) return resolve();
    const s = document.createElement("script");
    s.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    s.async = true;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });

const TrackOrder = () => {
  const { orderId } = useParams();
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerRef = useRef(null);
  const [coords, setCoords] = useState(null);

  // join socket room
  useEffect(() => {
    socket.emit("joinOrderRoom", { orderId });
    return () => socket.emit("leaveOrderRoom", { orderId });
  }, [orderId]);

  // listen to updates
  useEffect(() => {
    const handler = (payload) => setCoords(payload);
    socket.on("orderLocation", handler);
    return () => socket.off("orderLocation", handler);
  }, []);

  // init map once
  useEffect(() => {
    (async () => {
      await loadGoogleMaps(import.meta.env.VITE_GOOGLE_MAPS_KEY);
      mapInstance.current = new window.google.maps.Map(mapRef.current, {
        center: { lat: 28.6139, lng: 77.2090 }, // default Delhi
        zoom: 14,
        disableDefaultUI: false,
      });
      markerRef.current = new window.google.maps.Marker({
        map: mapInstance.current,
        position: { lat: 28.6139, lng: 77.2090 },
        title: "Delivery Partner",
        animation: window.google.maps.Animation.DROP,
      });
    })();
  }, []);

  // move marker on each update
  useEffect(() => {
    if (!coords || !markerRef.current || !mapInstance.current) return;
    const pos = { lat: coords.lat, lng: coords.lng };
    markerRef.current.setPosition(pos);
    mapInstance.current.panTo(pos);
  }, [coords]);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-semibold">Tracking Order #{orderId}</h2>
          <Link to="/orders" className="text-blue-600 hover:underline">Back to Orders</Link>
        </div>
        <div ref={mapRef} className="w-full h-[60vh] rounded-lg border" />
        <div className="mt-4 text-sm text-gray-600">
          {coords
            ? <>Live at: <b>{coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}</b> — {new Date(coords.at).toLocaleTimeString()}</>
            : <>Waiting for delivery partner’s location…</>}
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
