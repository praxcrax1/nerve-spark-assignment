import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { useLoading } from "./LoadingContext";
import { useRef } from "react";

const DashboardDealership = ({ userType }) => {
  const [cars, setCars] = useState([]);
  const [inventory, setInventory] = useState([]);
  const { email } = useParams();
  const [soldVehicles, setSoldVehicles] = useState([]);
  const { setLoadingState, setErrorState } = useLoading();
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      fetchCars();
      fetchSoldVehicles();
      isMounted.current = true; // Set to true after the initial mount
    }
  },[]);

  const fetchCars = async () => {
    setLoadingState(true); // Set loading state to true
    setErrorState(null); // Reset error state
    try {
      const response = await fetch(
        "https://nerve-spark-backend.onrender.com/api/cars"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch cars");
      }
      const data = await response.json();
      let carsInInventory = await fetchInventory();
      if (!Array.isArray(carsInInventory)) {
        carsInInventory = []; // Set carsInInventory to an empty array if it's not an array
      }
      const acquiredCarIds = carsInInventory.map((car) => car.car_id);
      setCars(data.filter((car) => !acquiredCarIds.includes(car.car_id)));
      setInventory(carsInInventory);
    } catch (error) {
      console.error("Error fetching cars:", error);
      setErrorState("Failed to fetch cars"); // Set error message
    } finally {
      setLoadingState(false); // Set loading state back to false
    }
  };

  const fetchInventory = async () => {
    try {
      const response = await fetch(
        `https://nerve-spark-backend.onrender.com/api/dealership/inventory/${email}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch inventory");
      }
      const data = await response.json();
      setInventory(data.cars);
      return data.cars;
    } catch (error) {
      console.error("Error fetching inventory:", error);
      setErrorState("Failed to fetch inventory"); // Set error message
      return [];
    }
  };

  const handleAcquireCar = async (carId) => {
    setLoadingState(true); // Set loading state to true
    setErrorState(null); // Reset error state
    try {
      const response = await fetch(
        `https://nerve-spark-backend.onrender.com/api/dealership/acquire/${email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ carId }),
        }
      );
      const data = await response.json();
      console.log(data.message);
      fetchCars();
    } catch (error) {
      console.error("Error acquiring car:", error);
      setErrorState("Failed to acquire car"); // Set error message
    } finally {
      setLoadingState(false); // Set loading state back to false
    }
  };

  const fetchSoldVehicles = async () => {
    setLoadingState(true); // Set loading state to true
    setErrorState(null); // Reset error state
    try {
      const response = await fetch(
        `https://nerve-spark-backend.onrender.com/api/dealership/sold-vehicles/${email}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch sold vehicles");
      }
      const data = await response.json();
      setSoldVehicles(data);
    } catch (error) {
      console.error("Error fetching sold vehicles:", error);
      setErrorState("Failed to fetch sold vehicles"); // Set error message
    } finally {
      setLoadingState(false); // Set loading state back to false
    }
  };

  return (
    <div>
      <Navbar userEmail={email} userType={userType} />
      <div className="cars-display">
        <h1>All Cars</h1>
        <div className="card-container">
          {cars.length === 0 ? (
            <p>No cars available</p>
          ) : (
            cars.map((car) => (
              <div key={car.car_id} className="card-item">
                <div className="card">
                  <p>Type: {car.type}</p>
                  <p>Name: {car.name}</p>
                  <p>Model: {car.model}</p>
                  <p>Color: {car.car_info.color}</p>
                  <p>Year: {car.car_info.year}</p>
                  <p>Price: ${car.car_info.price}</p>
                  <button
                    variant="success"
                    onClick={() => handleAcquireCar(car.car_id)}>
                    Acquire
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <h1>Inventory</h1>
      {inventory && inventory.length > 0 ? (
        <div className="card-container">
          {inventory.map((car) => (
            <div key={car.car_id} className="card-item">
              <div className="card">
                <p>Type: {car.type}</p>
                <p>Name: {car.name}</p>
                <p>Model: {car.model}</p>
                <p>Color: {car.car_info.color}</p>
                <p>Year: {car.car_info.year}</p>
                <p>Price: ${car.car_info.price}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No cars in inventory</p>
      )}

      <h1>Sold Cars</h1>
      {soldVehicles && soldVehicles.length > 0 ? (
        <div className="card-container">
          {soldVehicles.map((soldCar) => (
            <div key={soldCar.car_details._id} className="card-list">
              <div className="card">
                <p>Type: {soldCar.car_details.type}</p>
                <p>Name: {soldCar.car_details.name}</p>
                <p>Model: {soldCar.car_details.model}</p>
                <p>Color: {soldCar.car_details.vehicle_info.color}</p>
                <p>Year: {soldCar.car_details.vehicle_info.year}</p>
                <p>Price: ${soldCar.car_details.vehicle_info.price}</p>
                <p>Sold to: {soldCar.sold_to}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No cars sold</p>
      )}
    </div>
  );
};

export default DashboardDealership;
