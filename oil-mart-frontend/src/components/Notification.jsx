import React from 'react';
import { useNotification } from './NotificationContext';

function Notification() {
  const { notification } = useNotification();

  if (!notification) return null;

  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 mt-4 px-4 py-2 bg-green-500 text-white rounded">
      {notification}
    </div>
  );
}

export default Notification;
