import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import withAuthCheck from '../components/withAuthCheck';
import BetHistory from '../components/BetHistory';
import {FaUser, FaEnvelope, FaCalendarAlt, FaPhone } from 'react-icons/fa'; // Importar ícones
import '../css/Profile.css';


const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('/getUserInfo');
                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
                } else {
                    setError('Failed to fetch user data');
                }
            } catch (error) {
                console.error('Error:', error);
                setError('Failed to fetch user data');
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, []);

    const handleLogout = () => {
        fetch('/logout', {
            method: 'POST',
        }).then(response => {
            if (response.ok) {
                console.log('Logged out successfully');
                navigate('/');
                window.location.reload();
            } else {
                console.error('Failed to logout');
            }
        }).catch(error => {
            console.error('Error:', error);
        });
    };

    const calculateAge = (birthdate) => {
        const today = new Date();
        const birthDate = new Date(birthdate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="profile-container">
            <div className="profile-info">
                <h2 style={{ marginBottom: '25px' }}>User Profile</h2>
                {userData && (
                    <div style={{ marginBottom: '10px' }}>
                        <p><FaUser /><strong>Name:</strong> {userData.userName}</p>
                        <p ><FaEnvelope /> <strong>Email:</strong> {userData.email}</p>
                        <p><FaCalendarAlt /><strong>Date of Birth:</strong> {userData.birthDay}</p>
                        <p><FaPhone /> <strong>Phone Number:</strong> {userData.phoneNumber}</p>
                        <p><strong>Age:</strong> {calculateAge(userData.birthDay)}</p>
                    </div>
                )}
                <button onClick={handleLogout}>Logout</button>
            </div>
            <div className="bet-history">
                <BetHistory />
            </div>
        </div>
    );
};



export default withAuthCheck(Profile);
