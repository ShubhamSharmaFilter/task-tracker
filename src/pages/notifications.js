import React, { useState } from "react";
import Layout, { Container } from "../components/layout";

const notifications = [
  {
    id: 1,
    type: "info",
    message: "You have an upcoming leave request approval pending.",
    date: "2025-05-02",
  },
  {
    id: 2,
    type: "warning",
    message: "Your leave request for 2025-05-03 is still under review.",
    date: "2025-05-03",
  },
  {
    id: 3,
    type: "error",
    message: "You missed your attendance for 2025-05-01. Please mark it as present or notify HR.",
    date: "2025-05-01",
  },
];

const getNotificationColor = (type) => {
  switch (type) {
    case "info":
      return "bg-[#7DA0FA]"; 
    case "warning":
      return "bg-[#F3797E]";
    case "error":
      return "bg-[#4B49AC]";
    default:
      return "bg-gray-200";
  }
};

export default function Notifications() {
  return (
    <Layout>
      <Container overflow={"overflow-scroll"}>
        <div className="p-4 bg-[#f5f7fb] min-h-screen space-y-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">Notifications</h1>

          {/* Notification List */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Your Notifications</h2>
            <ul className="space-y-4">
              {notifications.map((notification) => (
                <li key={notification.id} className={`flex items-center p-4 rounded-lg ${getNotificationColor(notification.type)} text-white`}>
                  <div className="flex-1">
                    <p className="font-medium">{notification.message}</p>
                    <p className="text-sm mt-1">{notification.date}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Layout>
  );
}