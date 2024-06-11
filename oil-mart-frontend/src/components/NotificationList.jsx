import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = () => {
    // Fetch notifications from the API
    axios.get('http://localhost:5000/api/notifications')
      .then(response => {
        setNotifications(response.data);
      })
      .catch(error => {
        console.error('Error fetching notifications:', error);
      });
  };

  useEffect(() => {
    // Fetch notifications initially
    fetchNotifications();

    // Fetch notifications every 5 seconds
    const intervalId = setInterval(() => {
      fetchNotifications();
    }, 5000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
      <ul>
        {notifications.map(notification => (
          <li key={notification.id}>
            {/* <p>{notification.message}</p> */}
            <p>Product: {notification.p_name} is out of stock</p>
            <p>Created At: {new Date(notification.created_at).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationList;
