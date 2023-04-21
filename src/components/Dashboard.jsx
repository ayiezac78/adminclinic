import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { ClockLoader } from 'react-spinners';
import { BsArrowClockwise } from 'react-icons/bs';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;

  const getPaginatedData = () => {
    const filteredAppointments = appointments.filter((appointment) => {
      const fullName = `${appointment.first_name} ${appointment.last_name}`;
      return (
        appointment.appointment_id.toString().includes(searchQuery) ||
        fullName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredAppointments.slice(startIndex, endIndex);
  };

  const fetchData = () => {
    setIsLoading(true);
    axios.get('/appointments')
      .then(response => {
        setAppointments(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    axios.get('/appointments')
      .then(response => {
        setAppointments(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="overflow-x-auto px-5 py-2">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-medium">Appointments</h1>
        <div className="flex items-center gap-2">
          <button
            className="btn btn-outline btn-sm btn-info gap-2"
            onClick={fetchData}
          >
            Refresh <BsArrowClockwise className="h-5 w-5" />
          </button>
          <input
            type="text"
            className="border border-gray-400 rounded-md py-2 px-3 mr-2 input-sm"
            placeholder="Search by name or appointment number"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center mt-52">
          <ClockLoader
            color="#36d7b7"
            loading={isLoading}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div>
          <table className="table w-full">
            <thead>
              <tr>
                <th>Appointment #</th>
                <th>Appointment Date</th>
                <th>Schedule Time</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Contact Number</th>
                <th>Email Address</th>
                <th>Medical Concern</th>
              </tr>
            </thead>
            <tbody>
              {getPaginatedData().length === 0 ? (
                <tr>
                  <td colSpan="10" className="text-center">
                    No records found.
                  </td>
                </tr>
              ) : (
                getPaginatedData().map((appointment, index) => (
                  <tr key={index}>
                    <td>{appointment.appointment_id}</td>
                    <td>{appointment.appointment_date}</td>
                    <td>{appointment.schedule_time}</td>
                    <td>{appointment.first_name}</td>
                    <td>{appointment.last_name}</td>
                    <td>{appointment.age}</td>
                    <td>{appointment.gender}</td>
                    <td>{appointment.contact_number}</td>
                    <td>{appointment.email_address}</td>
                    <td>{appointment.medical_concern}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div className="pagination-buttons">
            {Array.from(
              { length: Math.ceil(appointments.length / itemsPerPage) },
              (v, k) => k + 1
            ).map((pageNumber) => (
              <button
                key={pageNumber}
                className={`px-3 py-1 rounded-lg ${
                  currentPage === pageNumber
                    ? "bg-blue-500 text-white font-bold"
                    : "bg-white text-blue-500"
                }`}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard
