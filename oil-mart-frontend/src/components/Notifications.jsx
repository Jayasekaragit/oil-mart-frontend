import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReturnTable from './Tables/ReturnTable';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch notifications from the API
    axios.get('http://localhost:5000/api/notifications')
      .then(response => {
        setNotifications(response.data);
      })
      .catch(error => {
        console.error('Error fetching notifications:', error);
      });
  }, []);

  const deleteNotification = (id) => {
    // Send a DELETE request to the API to delete the notification
    axios.delete(`http://localhost:5000/api/notifications/${id}`)
      .then(response => {
        // Remove the deleted notification from the state
        setNotifications(notifications.filter(notification => notification.id !== id));
      })
      .catch(error => {
        console.error('Error deleting notification:', error);
      });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
      <div className="grid gap-4">
        {notifications.map(notification => (
          <div key={notification.id} className="bg-white shadow-md p-4 rounded-md">
            {/* <p className="text-lg font-semibold">{notification.message}</p> */}
            <p className="text-gray-600">Product: {notification.p_name} is out of Stock</p>
            <p className="text-gray-600">Created At: {new Date(notification.created_at).toLocaleString()}</p>
            <button
              className="mt-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
              onClick={() => deleteNotification(notification.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      {/* <ReturnTable/>
       */}
    </div>
  );
};

export default Notifications;
