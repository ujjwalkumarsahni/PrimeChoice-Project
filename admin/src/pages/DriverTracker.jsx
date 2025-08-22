import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_BACKEND_URL, { transports: ["websocket"] });

// Load Google Maps script
const loadGoogleMaps = (apiKey) =>
  new Promise((resolve, reject) => {
    if (window.google?.maps) return resolve();
    const s = document.createElement("script");
    s.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=geometry`;
    s.async = true;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });

const DriverTracker = () => {
  const [orderId, setOrderId] = useState("");
  const [watchId, setWatchId] = useState(null);
  const [streaming, setStreaming] = useState(false);
  const [driverCoords, setDriverCoords] = useState(null);
  const [distance, setDistance] = useState(null);

  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const driverMarker = useRef(null);
  const deliveryMarker = useRef(null);

  // ⚡ Dummy delivery location (backend se fetch karna hoga in real project)
  const deliveryLocation = { lat: 28.6200, lng: 77.2100 };

  // Init Google Maps once
  useEffect(() => {
    (async () => {
      await loadGoogleMaps(import.meta.env.VITE_GOOGLE_MAPS_KEY);

      mapInstance.current = new window.google.maps.Map(mapRef.current, {
        center: deliveryLocation,
        zoom: 14,
      });

      // 🟢 Driver marker
      driverMarker.current = new window.google.maps.Marker({
        map: mapInstance.current,
        position: deliveryLocation,
        title: "Your Location",
        icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
      });

      // 🔴 Delivery address marker
      deliveryMarker.current = new window.google.maps.Marker({
        map: mapInstance.current,
        position: deliveryLocation,
        title: "Delivery Address",
        icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
      });
    })();
  }, []);

  // Start sharing driver location
  const startStreaming = () => {
    if (!orderId) return alert("Enter Order ID");
    if (!navigator.geolocation) return alert("Geolocation not supported");

    const id = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude: lat, longitude: lng, heading } = pos.coords;
        setDriverCoords({ lat, lng });

        // 🔄 Emit live location to backend
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

  // Update driver marker + calculate distance
  useEffect(() => {
    if (!driverCoords || !mapInstance.current || !driverMarker.current) return;

    const pos = { lat: driverCoords.lat, lng: driverCoords.lng };
    driverMarker.current.setPosition(pos);
    mapInstance.current.panTo(pos);

    // ✅ Distance calculation (in KM)
    if (window.google?.maps?.geometry) {
      const d = window.google.maps.geometry.spherical.computeDistanceBetween(
        new window.google.maps.LatLng(pos.lat, pos.lng),
        new window.google.maps.LatLng(deliveryLocation.lat, deliveryLocation.lng)
      );
      setDistance((d / 1000).toFixed(2)); // convert meters → km
    }
  }, [driverCoords]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
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

      <div ref={mapRef} className="w-full h-[60vh] rounded-lg border mt-4" />

      <p className="mt-3 text-sm text-gray-600">
        Status: {streaming ? "LIVE" : "OFF"}
        {distance && <span> | Distance to Delivery: <b>{distance} km</b></span>}
      </p>
    </div>
  );
};

export default DriverTracker;
