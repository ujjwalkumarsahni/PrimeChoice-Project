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
  const driverMarker = useRef(null);
  const [coords, setCoords] = useState(null);

  // ⚡ Dummy delivery address (backend se fetch karo in real case)
  const deliveryLocation = { lat: 28.6200, lng: 77.2100 };

  useEffect(() => {
    socket.emit("joinOrderRoom", { orderId });
    return () => socket.emit("leaveOrderRoom", { orderId });
  }, [orderId]);

  useEffect(() => {
    const handler = (payload) => setCoords(payload);
    socket.on("orderLocation", handler);
    return () => socket.off("orderLocation", handler);
  }, []);

  // Init Google Map
  useEffect(() => {
    (async () => {
      await loadGoogleMaps(import.meta.env.VITE_GOOGLE_MAPS_KEY);

      mapInstance.current = new window.google.maps.Map(mapRef.current, {
        center: deliveryLocation,
        zoom: 14,
      });

      // 🟢 Delivery address marker
      new window.google.maps.Marker({
        map: mapInstance.current,
        position: deliveryLocation,
        title: "Delivery Address",
        icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
      });

      // 🟡 Driver marker
      driverMarker.current = new window.google.maps.Marker({
        map: mapInstance.current,
        position: deliveryLocation,
        title: "Delivery Partner",
        icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
      });
    })();
  }, []);

  // Move driver marker
  useEffect(() => {
    if (!coords || !driverMarker.current || !mapInstance.current) return;
    const pos = { lat: coords.lat, lng: coords.lng };
    driverMarker.current.setPosition(pos);
    mapInstance.current.panTo(pos);
  }, [coords]);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-semibold">Tracking Order #{orderId}</h2>
          <Link to="/orders" className="text-blue-600 hover:underline">
            Back to Orders
          </Link>
        </div>
        <div ref={mapRef} className="w-full h-[60vh] rounded-lg border" />
        <div className="mt-4 text-sm text-gray-600">
          {coords
            ? <>Driver: <b>{coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}</b> — {new Date(coords.at).toLocaleTimeString()}</>
            : <>Waiting for driver’s location…</>}
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
