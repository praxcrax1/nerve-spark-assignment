import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLoading } from "./LoadingContext";

const DashboardUser = ({ userType }) => {
  const [cars, setCars] = useState([]);
  const [btnState, setBtnState] = useState(false);
  const [dealerships, setDealerships] = useState({});
  const [filterText, setFilterText] = useState("");
  const [boughtCars, setBoughtCars] = useState([]);
  const { email } = useParams();
  const { setLoadingState, setErrorState } = useLoading();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCars();
    getBoughtCars();
  },[]);

  const fetchCars = async () => {
    setLoadingState(true); // Set loading state to true
    setErrorState(null); // Reset error state
    try {
      const response = await fetch(
        "https://nerve-spark-backend.onrender.com/api/cars"
      );
      // if (!response.ok) {
      //   throw new Error("Failed to fetch cars");
      // }
      const data = await response.json();
      setCars(data);
    } catch (error) {
      console.error("Error fetching cars:", error);
      setErrorState("Failed to fetch cars"); // Set error message
    } finally {
      setLoadingState(false); // Set loading state back to false
    }
  };

  const confirmBuyCar = async (carId, dealership) => {
    setLoadingState(true); // Set loading state to true
    setErrorState(null); // Reset error state

    try {
      const response = await fetch(
        `https://nerve-spark-backend.onrender.com/api/buy-car/${email}/${dealership}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ carId: carId }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to buy car");
      }
      setCars((prevCars) => prevCars.filter((car) => car.car_id !== carId));
      navigate(`/dashboard/user/${email}`);
    } catch (error) {
      console.error("Error during buying car:", error);
      setErrorState("Failed to buy car"); // Set error message
    } finally {
      setLoadingState(false);
      getBoughtCars(); // Set loading state back to false
    }
  };

  const handleViewDealerships = async (carId) => {
    setLoadingState(true); // Set loading state to true
    setErrorState(null); // Reset error state
    setDealerships({});
    setBtnState(!btnState);
    try {
      const response = await fetch(
        `https://nerve-spark-backend.onrender.com/api/dealerships/${carId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch dealerships");
      }
      const data = await response.json();
      console.log(data);

      setDealerships((prevDealerships) => ({
        ...prevDealerships,
        [carId]: data.dealerships,
      }));
    } catch (error) {
      console.error("Error fetching dealerships:", error);
      setErrorState("Failed to fetch dealerships"); // Set error message
    } finally {
      setLoadingState(false); // Set loading state back to false
    }
  };

  const handleFilterByName = (event) => {
    // Update filterText state on every keystroke
    setFilterText(event.target.value.toLowerCase());
  };

  const getFilteredCars = () => {
    if (!Array.isArray(cars)) {
      return [];
    }
    if (!filterText) {
      // No filter applied, return all cars
      return cars;
    }
    return cars.filter((car) => car.name.toLowerCase().includes(filterText));
  };

  const getBoughtCars = async () => {
    setLoadingState(true); // Set loading state to true
    setErrorState(null); // Reset error state
    try {
      const response = await fetch(
        `https://nerve-spark-backend.onrender.com/api/user/cars/${email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user cars");
      }

      const data = await response.json();
      setBoughtCars(data.cars);
    } catch (error) {
      console.error("Error fetching user cars:", error);
      setErrorState("Failed to fetch user cars"); // Set error message
    } finally {
      setLoadingState(false); // Set loading state back to false
    }
  };

  return (
    <div>
      <Navbar userEmail={email} userType={userType} />
      <br />
      <div className="cars-display">
        <h1>Available Cars</h1>
        <input
          type="text"
          placeholder="Enter name to filter"
          value={filterText}
          onChange={handleFilterByName}
        />

        <div className="card-container">
          {getFilteredCars().length === 0 ? (
            <p>No cars found matching your filter</p>
          ) : (
            getFilteredCars().map((car) => (
              <div key={car.car_id} className="card-item">
                <div className="card">
                  <p>Type: {car.type}</p>
                  <p>Name: {car.name}</p>
                  <p>Model: {car.model}</p>
                  <p>Color: {car.car_info.color}</p>
                  <p>Year: {car.car_info.year}</p>
                  <p>Price: ${car.car_info.price}</p>
                  <button
                    variant="primary"
                    onClick={() => handleViewDealerships(car.car_id)}>
                    View Dealerships
                  </button>
                  {btnState &&
                    dealerships[car.car_id] &&
                    dealerships[car.car_id].map((dealership, index) => (
                      <div key={index} className="view-dealership">
                        <p>{dealership}</p>
                        <button
                          onClick={() => confirmBuyCar(car.car_id, dealership)}>
                          Buy Car
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <h1>Bought Cars</h1>
      <div className="card-container">
        {boughtCars.map((car) => (
          <div key={car.car_id} className="card-item">
            <div className="card">
              <p>Type: {car.type}</p>
              <p>Name: {car.name}</p>
              <p>Model: {car.model}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardUser;
