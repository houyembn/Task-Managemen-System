import React, { useState, useEffect } from 'react';
import { Modal} from 'antd';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import Searchbar from '../Searchbar/Searchbar';
import axios from 'axios';
import { DatePicker } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;
const Formulairemodif = ({ visible, onClose, onAddProjet, selectedProjet}) => {
  // const [projetDate, setProjetDate] = useState([]);
  const [projetName, setProjectName] = useState('');
  const [projetDescription, setProjectDescription] = useState('');
  const [projetStatus, setProjetStatus] = useState('');
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [projetDate, setProjetDate] = useState([null, null]);
  const [employeeNamesLoaded, setEmployeeNamesLoaded] = useState(false);

    const handleDateChange = (dates) => {
      // 'dates' is an array with two moment objects representing the start and end dates
      setProjetDate(dates);
    };

    useEffect(() => {
      if (selectedProjet) {
        console.log('Selected Projet:', selectedProjet);
        const projetDate = selectedProjet?.projetDate;
        console.log('Projet Date:', projetDate);
        
        const startDate = moment(projetDate?.startDate, 'YYYY-MM-DD');
        const endDate = moment(projetDate?.endDate, 'YYYY-MM-DD');
        
        console.log('Start Date:', startDate);
        console.log('End Date:', endDate);
    
        if (startDate && endDate) {
          console.log("Formatted startDate:", startDate.format('YYYY-MM-DD'));
          setProjetDate([startDate, endDate]);
        } else {
          console.error('startDate or endDate is undefined');
          // Handle the case where startDate or endDate is undefined
        }
    
         setProjectName(selectedProjet.projetName || '');
         setProjectDescription(selectedProjet.projetDescription || '');
         setProjetStatus(selectedProjet.projetStatus || ''); // Corrected here


        const employeesData = Array.isArray(selectedProjet.employees)
          ? selectedProjet.employees.map(emp => ({ value: emp._id, label: emp.name }))
          : [];
    
        console.log('Employees Data:', employeesData);
        setEmployees(employeesData);
      }
    }, [selectedProjet]);
    
    

  useEffect(() => {
    if (selectedProjet) {
      console.log('Selected Projet:', selectedProjet);
      
      const projetDate = selectedProjet?.projetDate;
      console.log('Projet Date:', projetDate);
      
      const startDate = moment(projetDate?.startDate, 'YYYY-MM-DD');
      const endDate = moment(projetDate?.endDate, 'YYYY-MM-DD');
      
      console.log('Start Date:', startDate);
      console.log('End Date:', endDate);
  
      if (startDate && endDate) {
        console.log("Formatted startDate:", startDate.format('YYYY-MM-DD'));
        setProjetDate([startDate, endDate]);
      } else {
        console.error('startDate or endDate is undefined');
      }

      const employee = selectedProjet?.employees;
      console.log('Employees:', employee);
  
      setProjectName(selectedProjet.projetName || '');
      setProjectDescription(selectedProjet.projetDescription || '');
      setProjetStatus(selectedProjet.projetStatus || ''); 

      const employeeNamesEndpoint = `http://localhost:3001/api/projet/project-employee-names/${selectedProjet._id}`;
      axios
        .get(employeeNamesEndpoint)
        .then((response) => {
          const emplname = response.data.map((emp) => ({ value: emp._id, label: emp.name }));
          setOptions(emplname);
          setEmployeeNamesLoaded(true);
          console.log("employer name:", emplname);
          
        })
        .catch((error) => console.error('Erreur lors de la récupération des noms des employés', error));
    }
  }, [selectedProjet]);

  const handleModifier = () => {
    console.log('Projet mis à jour');
    setIsModalVisible(false);
  };

  const handleUpdateProjet = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('Name', projetName);
    formData.append('Description', projetDescription);
    formData.append('Status', projetStatus);
    formData.append('Date', projetDate.map(date => date.format('YYYY-MM-DD')));
    // const employeeNames = employees.map((emplname) => emplname.value);
    // formData.append('employees', employees.map((empl) => empl.value).join(','));

    const employeesFormData = employees.map((empl) => empl.value).join(',');
    formData.append('employees', employeesFormData);

    fetch(`http://localhost:3001/api/projet/update-projet/${selectedProjet._id}`, {
      method: 'PUT',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, 'userUpdate');
        alert(data.msg);
        if (data.status === 'ok') {
         onClose();
         onAddProjet(formData);
        }
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error during registration:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Modal
      title="Modifier Le projet"
      visible={visible}
      onCancel={onClose}
      onOk={handleUpdateProjet}
    >
      <form onSubmit={handleUpdateProjet}>
        <div className="mb-4"> 
          <div className="partie1_de_partie1" style={{ paddingBottom: '10px' }}>
            <label className="name jjjj">Nom du Projet</label>
            <input
              type="text"
              placeholder="Entrer le nom du projet"
              className='input_nom_projet'
              value={projetName}
              onChange={(e) => setProjectName(e.target.value)}
            />

            {/* <p>{selectedProjet.employee}</p> */}
            {/* {emplname && (
              <div>
                <p>{employees.join(', ')}</p> 
                <p>{emplname.map((empl) => empl.label).join(', ')}</p>
              </div>
            )} */}
          </div>
        </div>

        <div className="mb-4">
          <div className="partie2_de_partie1">
            <label className="descrip jjjj">Description</label>
            <textarea
              placeholder="Décrire le projet"
              className="editable-paragraph"
              style={{ paddingTop: '1vw' }}
              value={projetDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-4">
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
        </div>
        
        <div className="mb-4">
          <div className="partie2_de_partie1" style={{ paddingBottom: '25px' }}>
            <label className="emp jjjj">Nom des employées</label>
            <Searchbar style={{ width: '30vw' }} value={employees} onChange={(value) => setEmployees(value)} options={options} />
          </div>
        </div>

        <div className="checkbox">
          <input
            type="checkbox"
            id="projetStatusCheckbox"
            checked={projetStatus}
            onChange={() => setProjetStatus(!projetStatus)}
          />

          <label htmlFor="projetStatusCheckbox">
            {projetStatus ? 'Active' : 'Finished'}
          </label>
        </div>

        {/* Include the button for submitting the form */}
        {/* <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Modifier
          </button>
        </div> */}
      </form>
    </Modal>
  );
};

export default Formulairemodif;

