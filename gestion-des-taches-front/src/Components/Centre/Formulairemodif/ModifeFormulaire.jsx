import React, { useState, useEffect } from 'react';
import { Modal,notification} from 'antd';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import Searchbar from '../Searchbar/Searchbar';
import axios from 'axios';
import { DatePicker } from 'antd';
import moment from 'moment';

const ModifeFormulaire = ({ visible, onClose, onAddProjet, selectedProjet}) => {
    const [projetName, setProjectName] = useState('');
    const [projetDescription, setProjectDescription] = useState('');
    const [projetDate, setProjetDate] = useState([null, null]);
    const [projetStatus, setProjetStatus] = useState('');
    const [employees, setEmployees] = useState([]);
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [employeeNames, setEmployeeNames] = useState([]);
    const [optionsData, setOptionsData] = useState([]);
    const [projects, setProjects] = useState([]); 

    const openSuccessNotification = () => {
        notification.success({
          message: 'Tâche modifier avec succès',
          description: 'La tâche a été modifiée avec succès.',
        });
    };

    useEffect(() => {
        if (selectedProjet) {
            // console.log('Selected Projet:', selectedProjet);
            const projetDate = selectedProjet?.projetDate;
            // console.log('Projet Date:', projetDate);
            
            const startDate = moment(projetDate?.startDate, 'YYYY-MM-DD');
            const endDate = moment(projetDate?.endDate, 'YYYY-MM-DD');

            if (startDate && endDate) {
                // console.log("Formatted startDate:", startDate.format('YYYY-MM-DD'));
                setProjetDate([startDate, endDate]);
              } else {
                console.error('startDate or endDate is undefined');
            }
            setProjectName(selectedProjet.projetName || '');
            setProjectDescription(selectedProjet.projetDescription || '');
            setProjetStatus(selectedProjet.projetStatus || ''); 

            console.log("id emp:",selectedProjet.employees);
            // const employeeNamesEndpoint = `http://localhost:3001/api/emp/employerName/${selectedProjet.employees}`;
            // axios
            //     .get(employeeNamesEndpoint)
            //     .then((response) => {
            //     const emplname = response.data.map((emp) => ({ value: emp._id, label: emp.name }));
            //     setOptions(emplname);
            //     // setEmployeeNamesLoaded(true);
            //     console.log("employer name:", emplname);
                
            //     })
            //     .catch((error) => console.error('Erreur lors de la récupération des noms des employés', error));

            const employeeNamesEndpoint = `http://localhost:3001/api/projet/project-employee-names/${selectedProjet._id}`;
            axios
                .get(employeeNamesEndpoint)
                .then((response) => {
                    const optionsData = Object.values(response.data).map(emp => ({ value: emp._id, label: emp.name }));
                    setOptions(optionsData);
                // setEmployeeNamesLoaded(true);
                console.log("employer name:", optionsData);
                
                })
                .catch((error) => console.error('Erreur lors de la récupération des noms des employés', error));
        }
          
    }, [selectedProjet]);
    
    const handleUpdateProjet = (e) => {
        e.preventDefault();
        const requestData = {
            projetName: projetName,
            projetDescription: projetDescription,
            projetStatus: projetStatus,
            projetDate: projetDate.map(date => date.format('YYYY-MM-DD')),
            employees: employees.map(empl => empl.value),
        };
        // console.log(JSON.stringify(requestData));

       // console.log(formData);
        fetch(`http://localhost:3001/api/projet/update-projet/${selectedProjet._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        })
          .then((res) => res.json())
          .then((data) => {
            // console.log(data, 'userUpdate');
            // alert(data.msg);

            openSuccessNotification();
            onClose();
            //  onAddProjet(formData);

            const updatedProjects = projects.map((project) => {
                if (project._id === selectedProjet._id) {
                    return data.updatedProject;
                }
                return project;
            });

            setProjects(updatedProjects);
            // if (data.status === 'ok') {

            //     openSuccessNotification();
            //     onClose();
            //     //  onAddProjet(formData);

            //     const updatedProjects = projects.map((project) => {
            //         if (project._id === selectedProjet._id) {
            //             return data.updatedProject;
            //         }
            //         return project;
            //     });

            //     setProjects(updatedProjects);
            // }

            window.location.reload();
        })
        .catch((error) => {
            console.error('Error during modification:', error);
            alert('Une erreur s\'est produite lors de la modification. Veuillez consulter la console pour plus d\'informations.');
          })
          .finally(() => {
            setLoading(false);
        });
    };

    return (
        <Modal
        //   title="Modifier Le projet"

        title={<span style={{ marginBottom:'20px'}}>Modifier le projet</span>}
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
                    <Searchbar style={{ width: '30vw' }} value={optionsData} onChange={(value) => setEmployees(value)} options={optionsData} />
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
        </form>
        </Modal>
    );
}

export default ModifeFormulaire;