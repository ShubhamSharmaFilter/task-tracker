import React, { useEffect, useState } from "react";
import Layout, { Container } from "../components/layout";
import axios from "axios";
import { apiurl } from "../config/config";
import { useUser } from "../config/userProvider";

function getOrdinal(n) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export default function Dashboard() {
  let { userData } = useUser();
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=910f3e3e040f48048b260849251405&q=Noida`
        );
        const data = await res.json();
        setWeather(data);
      } catch (error) {
        console.error("Weather fetch error:", error);
      }
    };
    fetchWeather();
  }, []);
  const [events, setEvents] = useState({
    birthdays: [],
    anniversaries: [],
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(
          `${apiurl}/api/payroll/dashboard/upcoming-events`
        );
        setEvents(res.data || {});
      } catch (err) {
        console.error("Error fetching events", err);
      }
    };
    fetchEvents();
  }, []);

  const initials = `${userData?.first_name?.[0] || ""}${
    userData?.last_name?.[0] || ""
  }`.toUpperCase();

  const user = {
    name:
      userData?.personalDetails?.firstName +
      " " +
      userData?.personalDetails?.lastName,
    dob: "1995-05-17",
    initials: initials,
  };

  return (
    <Layout>
      <Container overflow="overflow-scroll">
        <div className="flex min-h-screen bg-[#f5f7fb] text-gray-800">
          <main className="flex-1 px-6 py-6 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-2xl shadow p-5 col-span-1 md:col-span-2 flex items-center justify-between border border-[#F3797E]">
                <div>
                  {weather ? (
                    <>
                      <h2 className="text-lg font-semibold">
                        {weather?.current?.temp_c}°C {weather?.name}
                      </h2>
                      <p className="text-gray-500 text-sm mt-1"></p>
                      <img
                        src={weather?.current?.condition?.icon}
                        alt="Weather Icon"
                        className="w-16 h-16 mt-2"
                      />
                      <p className="text-sm text-gray-500 mt-2">
                        {weather?.current?.condition?.text}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Wind: {weather?.current?.wind_kph} km/h
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Humidity: {weather?.current?.humidity}%
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Feels like: {weather?.current?.feelslike_c}°C
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Last updated: {weather?.current?.last_updated}
                      </p>
                    </>
                  ) : (
                    <p>Loading weather...</p>
                  )}
                </div>
                <div className="text-center">
                  <p className="text-sm md:text-base text-gray-500 font-medium">
                    {new Date().toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <h2 className="text-[60px] md:text-[80px] font-bold text-[#F3797E] leading-none mt-1">
                    {new Date().getDate()}
                  </h2>
                  <p className="text-gray-400 text-sm mt-1">Today</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow p-5 col-span-1 md:col-span-2 border border-[#98BDFF]">
                <div className="flex items-center gap-4">
                  {userData?.documents?.photo ? (
                    <img
                      src={userData?.documents?.photo}
                      alt="Employee"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-[#7DA0FA] flex items-center justify-center text-white font-bold text-xl">
                      {initials}
                    </div>
                  )}

                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {userData?.first_name} {userData?.last_name}
                    </h2>
                    <p className="text-sm capitalize text-[#F3797E] font-medium">
                      {userData?.designation}
                    </p>
                    <p className="text-sm capitalize text-gray-500">
                      {userData?.department}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="bg-[#98BDFF] text-white text-sm px-3 py-1 rounded-md">
                    ID: {userData?.id}
                  </span>
                </div>

                <div className="mt-3 text-sm text-gray-600">
                  <p>
                    <strong>Role:</strong>{" "}
                    {userData?.role || "N/A"}
                  </p>
                  <p>
                    <strong>Email:</strong>{" "}
                    {userData?.email || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Upcoming Events Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl shadow p-5">
                <h2 className="text-lg font-semibold mb-3">
                  Upcoming Birthdays
                </h2>
                <ul className="text-sm text-gray-600 space-y-2">
                  {events.birthdays.length === 0 && (
                    <li>No upcoming birthdays</li>
                  )}
                  {events.birthdays.map((b, i) => (
                    <li key={i}>
                      🎂 <strong>{b.name}</strong> —{" "}
                      {new Date(b.date).toDateString()}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-2xl shadow p-5">
                <h2 className="text-lg font-semibold mb-3">
                  Work Anniversaries
                </h2>
                <ul className="text-sm text-gray-600 space-y-2">
                  {events.anniversaries.length === 0 && (
                    <li>No upcoming anniversaries</li>
                  )}
                  {events.anniversaries.map((a, i) => (
                    <li key={i}>
                      🎉 <strong>{a.name}</strong> —{" "}
                      {getOrdinal(a.anniversaryYear)} Anniversary on{" "}
                      {new Date(a.date).toDateString()}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-2xl shadow p-5">
                <h2 className="text-lg font-semibold mb-3">
                  Upcoming Holidays
                </h2>
                <li>No upcoming Holidays</li>

              </div>
              <div className="bg-white rounded-2xl shadow p-5">
                <h2 className="text-lg font-semibold mb-3">On Leave</h2>
                <li>No One on Leave</li>
              </div>
            </div>
          </main>
        </div>
      </Container>
    </Layout>
  );
}
