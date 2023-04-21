import React, {useState, useEffect} from 'react'
import axios from 'axios';

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return appointments.slice(startIndex, endIndex);
  };
  

  useEffect(() => {
    axios.get('/appointments')
      .then(response => {
        setAppointments(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  

  return (
    <div className="overflow-x-auto">
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
          {getPaginatedData().map((appointment) => (
            <tr key={appointment.id}>
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
          ))}
        </tbody>
      </table>
      <div className="pagination-buttons">
  {Array.from({ length: Math.ceil(appointments.length / itemsPerPage) }, (v, k) => k + 1).map(pageNumber => (
    <button
      key={pageNumber}
      className={`px-3 py-1 rounded-lg ${currentPage === pageNumber ? 'bg-blue-500 text-white font-bold' : 'bg-white text-blue-500'}`}
      onClick={() => handlePageChange(pageNumber)}
    >
      {pageNumber}
    </button>
  ))}
</div>

    </div>
  );
}

export default Dashboard
