import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext.jsx";
import { Title } from "../components/Title.jsx";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { token, backendUrl } = useContext(ShopContext)

    useEffect(() => {
        if (!token) {
            setLoading(false);
            return;
        }

        const fetchUser = async () => {
            try {
                const res = await axios.post(`${backendUrl}/api/user/profile`, {}, { headers: { token } });
                if (res.data.success) {
                    setUser(res.data.userData);
                }
            } catch (err) {
                console.error("Failed to fetch user profile:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [token]);

    if (loading) return <div>Loading...</div>;
    if (!user) return <div>User not found</div>;

    return (
         <div className="max-w-md mx-auto mt-10 p-6  rounded-2xl border border-gray-200">
      <Title text1="MY" text2="PROFILE" textSize="text-2xl" />
      
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm">
          <span className="font-semibold text-gray-700">Name:</span>
          <span className="text-gray-900">{user.name}</span>
        </div>
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm">
          <span className="font-semibold text-gray-700">Email:</span>
          <span className="text-gray-900">{user.email}</span>
        </div>
      </div>
    </div>
    );
};

export default Profile;
