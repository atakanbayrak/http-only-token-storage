"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation';
import { getAllUsers } from "@/api/user";
import { getAllCars } from "@/api/car";
import { getAllRentals } from "@/api/rentals";

export default function Home() {
  const [menu, setMenu] = useState("dashboard"); // Örnek için aktif menü durumu
  const [token, setToken] = useState(null);
  const [users, setUsers] = useState([]);
  const [cars, setCars] = useState([]);
  const [rentals, setRentals] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Sayfa yüklendiğinde yapılacak
    console.log("Page loaded");
    const tk = Cookies.get("token");
    setToken(tk);
    if (tk) {
      console.log("Token found: ", tk);
    }
    else {
      console.log("Token not found");
      router.push("/login");
    }

    const handleGetAllUsers = async () => {
      console.log("Get all users");
      const response = await getAllUsers();
      console.log("Response", response.data);
      setUsers(response.data)
      //setUsers(response.data);
    }

    const handleGetAllCars = async () => {
      console.log("Get all cars");
      const response = await getAllCars();
      console.log("Response", response.data);
      setCars(response.data)
      //setUsers(response.data);
    }

    const handleGetAllRentals = async () => {
      console.log("Get all cars");
      const response = await getAllRentals();
      console.log("Response", response.data);
      setRentals(response.data)
      //setUsers(response.data);
    }



    handleGetAllUsers();
    handleGetAllCars();
    handleGetAllRentals();
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    setToken(null);
    router.push("/login");
  }

  return (
    <>
      {token ? <div className="flex h-screen">
        {/* Sol Panel */}
        <div className="w-1/8 bg-blue-500 text-white flex flex-col p-4">
          <h2 className="text-2xl font-bold mb-6">Car Rental</h2>
          <nav className="space-y-4">
            <button
              className={`w-full text-left p-2 rounded-lg ${menu === "dashboard" ? "bg-blue-600" : "hover:bg-blue-400"
                }`}
              onClick={() => setMenu("dashboard")}
            >
              Dashboard
            </button>
            <button
              className={`w-full text-left p-2 rounded-lg ${menu === "vehicles" ? "bg-blue-600" : "hover:bg-blue-400"
                }`}
              onClick={() => setMenu("users")}
            >
              Users
            </button>
            <button
              className={`w-full text-left p-2 rounded-lg ${menu === "rentals" ? "bg-blue-600" : "hover:bg-blue-400"
                }`}
              onClick={() => setMenu("rentals")}
            >
              Rentals
            </button>
            <button
              className={`w-full text-left p-2 rounded-lg ${menu === "profile" ? "bg-blue-600" : "hover:bg-blue-400"
                }`}
              onClick={() => setMenu("cars")}
            >
              Cars
            </button>
            <button
              className={`w-full text-left p-2 rounded-lg ${menu === "logout" ? "bg-blue-600" : "hover:bg-blue-400"
                }`}
              onClick={handleLogout}
            >
              Logout
            </button>
          </nav>
        </div>

        {/* Sağ Panel */}
        <div className="flex-1 bg-gray-100 text-black p-8">
          <h1 className="text-3xl font-bold mb-6">Welcome to the Dashboard</h1>
          {menu === "dashboard" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Dashboard Overview</h2>
              <p className="text-gray-600 mb-4">Here you can view the main dashboard stats.</p>
              <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                  <thead className="bg-blue-500 text-white">
                    <tr>
                      <th className="py-2 px-4 text-left">Category</th>
                      <th className="py-2 px-4 text-left">Count</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="py-2 px-4">Total Users</td>
                      <td className="py-2 px-4">{users.length}</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4">Total Cars</td>
                      <td className="py-2 px-4">{cars.length}</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4">Total Rentals</td>
                      <td className="py-2 px-4">{rentals.length}</td>
                    </tr>
                  </tbody>
                </table>
            </div>
          )}
          {menu === "users" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">User Table</h2>
              <p className="text-gray-600 mb-4">See information about users</p>
              <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                <thead className="bg-blue-500 text-white">
                  <tr>
                    <th className="py-2 px-4 text-left">Name</th>
                    <th className="py-2 px-4 text-left">Surname</th>
                    <th className="py-2 px-4 text-left">Email</th>
                    <th className="py-2 px-4 text-left">IdentityNumber</th>
                    <th className="py-2 px-4 text-left">Username</th>
                    <th className="py-2 px-4 text-left">Password</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.userId} className="hover:bg-gray-100">
                      <td className="py-2 px-4">{user.firstName}</td>
                      <td className="py-2 px-4">{user.lastName}</td>
                      <td className="py-2 px-4">{user.email}</td>
                      <td className="py-2 px-4">{user.identityNumber}</td>
                      <td className="py-2 px-4">{user.username}</td>
                      <td className="py-2 px-4">{user.password}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {menu === "rentals" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Rental History</h2>
              <p className="text-gray-600 mb-4">View all rental transactions.</p>
              <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                <thead className="bg-blue-500 text-white">
                  <tr>
                      <td className="py-2 px-4 text-left">First Name</td>
                      <td className="py-2 px-4 text-left">Last Name</td>
                      <td className="py-2 px-4 text-left">Phone Number</td>
                      <td className="py-2 px-4 text-left">Number of People</td>
                      <td className="py-2 px-4 text-left">Luggage Count</td>
                      <td className="py-2 px-4 text-left">Is Confirmed</td>
                      <td className="py-2 px-4 text-left">Start Location</td>
                      <td className="py-2 px-4 text-left">End Location</td>
                      <td className="py-2 px-4 text-left">Car ID</td>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {rentals.map((rental) => (
                    <tr key={rental.reservationId} className="hover:bg-gray-100">
                      <td className="py-2 px-4">{rental.firstName}</td>
                      <td className="py-2 px-4">{rental.lastName}</td>
                      <td className="py-2 px-4">{rental.phoneNumber}</td>
                      <td className="py-2 px-4">{rental.numberOfPeople}</td>
                      <td className="py-2 px-4">{rental.luggageCount}</td>
                      <td className="py-2 px-4">{rental.isConfirmed ? "true" : "false"}</td>
                      <td className="py-2 px-4">{rental.startLocation}</td>
                      <td className="py-2 px-4">{rental.endLocation}</td>
                      <td className="py-2 px-4">{rental.car.carId}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {menu === "cars" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Cars</h2>
              <p className="text-gray-600 mb-4">Manage your cars</p>
              <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                <thead className="bg-blue-500 text-white">
                  <tr>
                    <th className="py-2 px-4 text-left">Brand</th>
                    <th className="py-2 px-4 text-left">Model</th>
                    <th className="py-2 px-4 text-left">Plate</th>
                    <th className="py-2 px-4 text-left">Year</th>
                    <th className="py-2 px-4 text-left">Fuel Type</th>
                    <th className="py-2 px-4 text-left">Gear Type</th>
                    <th className="py-2 px-4 text-left">Description</th>
                    <th className="py-2 px-4 text-left">Max Passenger</th>
                    <th className="py-2 px-4 text-left">Max Luggage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {cars.map((car) => (
                    <tr key={car.carId} className="hover:bg-gray-100">
                      <td className="py-2 px-4">{car.brand}</td>
                      <td className="py-2 px-4">{car.model}</td>
                      <td className="py-2 px-4">{car.plate}</td>
                      <td className="py-2 px-4">{car.year}</td>
                      <td className="py-2 px-4">{car.fuelType}</td>
                      <td className="py-2 px-4">{car.gearType}</td>
                      <td className="py-2 px-4">{car.description}</td>
                      <td className="py-2 px-4">{car.maxPassenger}</td>
                      <td className="py-2 px-4">{car.maxLuggage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div> : <div> Loading... </div>}

    </>

  );
}
