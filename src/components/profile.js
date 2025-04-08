import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";

function Profile() {
    const [userDetails, setUserDetails] = useState(null);

    const fetchUserDetails = async () => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                try {
                    const userRef = doc(db, "users", user.uid);
                    const docSnap = await getDoc(userRef);
                    if (docSnap.exists()) {
                        setUserDetails(docSnap.data());
                    } else {
                        console.log("No such document!");
                    }
                } catch (error) {
                    console.log(error);
                    toast.error("Failed to fetch user data", {
                        position: "bottom-center",
                        autoClose: 2000,
                    });
                }
            }
        });
    };

    useEffect(() => {
        fetchUserDetails();
    }, []);

    const handleLogout = async () => {
        try {
            await auth.signOut();
            toast.success("User logged out successfully", {
                position: "top-center",
                autoClose: 2000,
            });
            window.location.href = "/login";
        } catch (error) {
            console.log(error);
            toast.error(error.message, {
                position: "bottom-center",
                autoClose: 2000,
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            {userDetails ? (
                <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
                    <h3 className="text-2xl font-semibold text-blue-600 mb-4">
                        Welcome {userDetails.firstName}
                    </h3>
                    <div className="text-left space-y-2 mb-6">
                        <p><span className="font-semibold">First Name:</span> {userDetails.firstName}</p>
                        <p><span className="font-semibold">Last Name:</span> {userDetails.lastName}</p>
                        <p><span className="font-semibold">Email:</span> {userDetails.email}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <div className="text-center text-lg font-medium text-gray-600">Loading...</div>
            )}
        </div>
    );
}

export default Profile;
