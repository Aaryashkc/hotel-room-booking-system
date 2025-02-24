import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

const Profile = () => {
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      // Always use the most up-to-date user data from Firebase
      setUserInfo(prev => ({
        ...prev,
        name: user.displayName || "Guest",
        email: user.email || "",
      }));
    }
  }, [user]);

  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 mb-8 text-white shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
              <span className="text-4xl text-blue-500">
                {userInfo.name ? userInfo.name.charAt(0).toUpperCase() : "G"}
              </span>
            </div>
            <div>
              <h2 className="text-3xl font-bold">Welcome back, {userInfo.name}!</h2>
              <p className="text-blue-100">Manage your profile information</p>
            </div>
          </div>
        </div>

        {/* Personal Information Card */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800">Personal Information</h3>
            <button
              onClick={isEditing ? handleSave : handleEdit}
              className="text-blue-500 hover:text-blue-600"
            >
              {isEditing ? 'Save' : 'Edit Profile'}
            </button>
          </div>

          <div className="space-y-4">
            <div className="p-3 hover:bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Full Name</p>
              {isEditing ? (
                <input
                  type="text"
                  value={userInfo.name}
                  onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-800">{userInfo.name || "Not set"}</p>
              )}
            </div>

            <div className="p-3 hover:bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Email Address</p>
              <p className="text-gray-800">{userInfo.email || "Not set"}</p>
            </div>

            <div className="p-3 hover:bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Phone Number</p>
              {isEditing ? (
                <input
                  type="tel"
                  value={userInfo.phone}
                  onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-800">{userInfo.phone || "Not set"}</p>
              )}
            </div>

            <div className="p-3 hover:bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Location</p>
              {isEditing ? (
                <input
                  type="text"
                  value={userInfo.location}
                  onChange={(e) => setUserInfo({ ...userInfo, location: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-800">{userInfo.location || "Not set"}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
