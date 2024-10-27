import React, { useState } from 'react';
import { Button, notification,message} from 'antd';
import { DeleteOutlined, FormOutlined, PlusOutlined,CloseOutlined } from '@ant-design/icons';
import "./Widgettask.css";
import Searchbar from '../Searchbar/Searchbar';
import { DatePicker, Space } from 'antd';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import TaskSearchbar from '../TaskSearchbar/TaskSearchbar';
import axios from 'axios';
import moment from 'moment';

const { RangePicker } = DatePicker;

function Widgettask({ projectId }) {
  const [showForm, setShowForm] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskStatus, setTaskStatus] = useState('User');
  const [taskDate, settaskDate] = useState([]);
  const [employees, setEmployee] = useState('');
  const [projets, setprojets] = useState([]);

  const openSuccessNotification = () => {
    notification.success({
      message: 'Tâche créée avec succès',
      description: 'La nouvelle tâche a été ajoutée avec succès.',
    });
  };

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const handleAnnulerClick = () => {
    console.log('Handling Annuler Click');
    setTaskName('');
    setTaskDescription('');
    setTaskStatus('User');
    setShowForm(false);
    settaskDate([]);
    setprojets('');
    setEmployee('');
  };
  const openErrorNotification = (error) => {
    message.error(`Erreur lors de la création: ${error}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const employeeIds = employees.map(option => option.value).filter(value => value !== null && value !== undefined);
  
    console.log(JSON.stringify({
      taskName,
      taskDescription,
      taskStatus: true,
      taskDate: {
        startDate : taskDate[0].format(),
        endDate : taskDate[1],
      },
      projets: [projectId],
      employees: employeeIds,
    }))

    console.log("emplId"+employeeIds);
  
    fetch("http://localhost:3001/api/task/add-task", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        taskName,
        taskDescription,
        taskStatus: true,
        taskDate: {
          startDate: taskDate[0],
          endDate: taskDate[1],
        },
        employees: employeeIds,
        projets: [projectId],
      }),
      
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "taskRegister");
      openSuccessNotification();
      window.location.reload();
  
    })
    .catch((error) => {
      console.error("Erreur lors de la création:", error);
      openErrorNotification(error);
    });
  };
  
  return (
    <div>
      {showForm ? (
        <form className="input-box" onSubmit={handleSubmit} style={{marginTop:'40px'}}>
  
          <div className="formulaire2">
            <div className="partie1_de_formulaire">
              <div className="partie1_de_partie1" style={{paddingBottom:'10px'}}>
                <label className="name jjjj">Nom du Tâche*</label>
                <input type="text" placeholder="Entrer le nom du Tâche" className='input_nom_projet' onChange={(e) => setTaskName(e.target.value)}/>
              </div>

              <div className="partie2_de_partie1">
                <label className="emp jjjj">Nom des employées*</label>
              {/* <Searchbar onChange={(value) => setEmployee(value)}/> */}
              <TaskSearchbar onChange={(value) => setEmployee(value) }projectId={projectId}/>
              </div>
            </div>

            <div className="partie2_de_formulaire">
              <div className="partie2_de_partie1">
                <label className="descrip jjjj">Description*</label>
                <textarea placeholder="Décrire la Tâche" className="editable-paragraph" style={{paddingTop:'1vw'}} onChange={(e) => setTaskDescription(e.target.value)}/>
              </div>
            </div>

            <div className="partie3_de_formulaire">
              <div className="partie2_de_partie1" style={{paddingBottom:'0px', width:'23vw',top:'-1vw'}}> 
                <label className="date jjjj">Date d'échéance*</label>
                {/* <Space direction="vertical"  style={{height:'45px', width: '350px', paddingBottom:'30px'}} className='space_date'><RangePicker /></Space> */}

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateRangePicker calendars={2} onChange={(values) => {settaskDate(values)}}/>
                </LocalizationProvider>
              </div>

              <div className="deux_button">
                <Button className="creer" onClick={handleSubmit}  icon={<PlusOutlined />}> Créer</Button>
                <Button className="Annuler" onClick={handleAnnulerClick} icon={<CloseOutlined />}> Annuler</Button>
              </div>
            </div>
          </div>

        </form>
      ) : (
        <div className="">
          <Button className="ajout" onClick={handleButtonClick} icon={<PlusOutlined />}>
          Ajouter une Tâche
          </Button>
        </div>
      )}
    </div>
  );
}

export default Widgettask;
