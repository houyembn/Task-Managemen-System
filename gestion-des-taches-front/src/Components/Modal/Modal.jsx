import React, { useState, useEffect } from "react";
import Searchbar from "../Centre/Searchbar/Searchbar";
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import moment from 'moment';
import "./Model.css";

export const Modal = ({ closeModal, onSubmit, defaultValue, item, onTaskUpdate  }) => {
  const [optionsData, setOptionsData] = useState([]);
  const [projetDate, setProjetDate] = useState([null, null]);
  const [projetName, setProjectName] = useState('');
    const [projetDescription, setProjectDescription] = useState('');
    const [projetStatus, setProjetStatus] = useState('');
    const [employees, setEmployees] = useState([]);
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [employeeNames, setEmployeeNames] = useState([]);
    const [projects, setProjects] = useState([]); 

  const [formState, setFormState] = useState(
    defaultValue || {
      task: "",
      description: "",
      status: "",
      startDate: "",
      endDate: "",
      Employee:"",
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.task  && formState.description && formState.status) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setFormState({
      ...formState,
      [name]: value,
    });
  }; 

  const handleSubmit = (e) => {
    e.preventDefault();

    // if (!validateForm()) return;
    if (!validateForm() || !item || !item._id) {
      console.error('Invalid form or item:', formState, item);
      return;
    }

    setLoading(true);

    console.log('Updating task with ID:', item._id);
    
    fetch(`http://localhost:3001/api/task/update-task/${item._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        taskName: formState.task,
        taskDescription: formState.description,
        taskStatus: formState.status,
        taskDate: {
          startDate: formState.startDate,
          endDate: formState.endDate,
        },
        projets: null,
        employees: formState.Employee,
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data, 'taskUpdate');
      alert(data.message);

      if (data.success) {
        onTaskUpdate(formState); 
        closeModal();
      }
      window.location.reload();
    })
    .catch((error) => {
      console.error('Error during task update:', error);
    })
    .finally(() => {
      setLoading(false); 
    });
   // Convert date strings to Date objects
   const startDate = new Date(formState.startDate);
   const endDate = new Date(formState.endDate);

   // Format date objects to strings
   const formattedStartDate = startDate.toLocaleDateString("en-US", {
     year: "numeric",
     month: "2-digit",
     day: "2-digit",
   });

   const formattedEndDate = endDate.toLocaleDateString("en-US", {
     year: "numeric",
     month: "2-digit",
     day: "2-digit",
   });

   // Submit the form with the formatted date strings
   onSubmit({
     ...formState,
     startDate: formattedStartDate,
     endDate: formattedEndDate,
   });

   closeModal();
 };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const requestData = {
  //     taskName: task,
  //     taskDescription: description,
  //     taskStatus: status,
  //     taskDate: projetDate.map(date => date.format('YYYY-MM-DD')),
  //     employees: employees.map(empl => empl.value),
  //   };

  //   // if (!validateForm()) return;
  //   if (!validateForm() || !item || !item._id) {
  //     console.error('Invalid form or item:', formState, item);
  //     return;
  //   }

  //   setLoading(true);

  //   console.log('Updating task with ID:', item._id);
    
  //   fetch(`http://localhost:3001/api/task/update-task/${item._id}`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       taskName: formState.task,
  //       taskDescription: formState.description,
  //       taskStatus: formState.status,
  //       taskDate: {
  //         startDate: formState.startDate,
  //         endDate: formState.endDate,
  //       },
  //       projets: null,
  //       employees: formState.Employee,
  //     }),
  //   })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log(data, 'taskUpdate');
  //     alert(data.message);

  //     if (data.success) {
  //       onTaskUpdate(formState); 
  //       closeModal();
  //     }
  //   })
  //   .catch((error) => {
  //     console.error('Error during task update:', error);
  //   })
  //   .finally(() => {
  //     setLoading(false); 
  //   });
  // // Convert date strings to Date objects
  // const startDate = new Date(formState.startDate);
  // const endDate = new Date(formState.endDate);

  // // Format date objects to strings
  // const formattedStartDate = startDate.toLocaleDateString("en-US", {
  //   year: "numeric",
  //   month: "2-digit",
  //   day: "2-digit",
  // });

  // const formattedEndDate = endDate.toLocaleDateString("en-US", {
  //   year: "numeric",
  //   month: "2-digit",
  //   day: "2-digit",
  // });

  // // Submit the form with the formatted date strings
  // onSubmit({
  //   ...formState,
  //   startDate: formattedStartDate,
  //   endDate: formattedEndDate,
  // });

  // closeModal();
  // };
  

  const formatDateForInput = (dateString) => {
    const [month, day, year] = dateString.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  };

  return (
    <div
      title="Modifier La Tâche"
      className="modal-container"
      onCancel={closeModal}
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div className="modal">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <div className="partie1_de_partie1">
              <label  className="name jjjj" htmlFor="page">Nom du Tâche</label>
              <input className='input_nom_projet' name="page" onChange={handleChange} value={formState.task} />
            </div>
          </div>

          <div className="mb-4">
            <div className="partie2_de_partie1">
              <label className="descrip jjjj" htmlFor="description">Description</label>
              <textarea
                placeholder="Décrire la Tâche"
                className="editable-paragraph"
                style={{ paddingTop: '1vw' }}
                name="description"
                onChange={handleChange}
                value={formState.description}
              />
            </div>
          </div>

          <div className="mb-4">
            <div className="partie2_de_partie1">
              <label className="descrip jjjj " htmlFor="status">Status</label>
              <select
                className='input_nom_projet statustask'
                name="status"
                onChange={handleChange}
                value={formState.status}
              >
                <option value="live">Active</option>
                <option value="error">Terminée</option>
              </select>
            </div>
          </div>

          {/* <div className="mb-4">
            <div className="partie2_de_partie1" style={{ paddingBottom: '10px', width: '30vw', top: '-2vw' }}>
              <label className="date jjjj">Date d'échéance</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateRangePicker
                  calendars={2}
                  value={projetDate}
                  onChange={(newValue) => setProjetDate(newValue)}
              />
              </LocalizationProvider>
            </div>
          </div> */}

          <div className="mb-4">
            <div className="partie2_de_partie1">
              <label className="descrip jjjj" htmlFor="startDate">Start Date</label>
              <input
               className='input_nom_projet'
                type="date"
                name="startDate"
                onChange={handleChange}
                value={formState.startDate ? formatDateForInput(formState.startDate) : ""}
              />
            </div>
          </div>

          <div className="mb-4">
            <div className="partie2_de_partie1">
              <label className="descrip jjjj" htmlFor="endDate">End Date</label>
              <input
                className='input_nom_projet'
                type="date"
                name="endDate"
                onChange={handleChange}
                value={formState.endDate ? formatDateForInput(formState.endDate) : ""}
              />
            </div>
          </div>

          <div className="mb-4">
            <div className="partie2_de_partie1">
              <label htmlFor="selectedEmployee">Select Employee</label>
              {/* <Searchbar style={{ width: '30vw' }} value={formState.Employee} onChange={handleChange} options={optionsData} /> */}
              <input className='input_nom_projet' name="Employee" onChange={handleChange} value={formState.Employee} />
            </div>
          </div>

          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <button type="submit" className="btn"  disabled={loading}>
          {loading ? 'Enregistrement...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};
