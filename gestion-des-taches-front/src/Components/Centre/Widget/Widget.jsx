import React, { useState,useEffect  } from 'react';
import { Modal,Button, Popconfirm, message,notification } from 'antd';
import { DeleteOutlined, FormOutlined, PlusOutlined,QuestionCircleOutlined ,CloseOutlined} from '@ant-design/icons';
import './Widget.css';
import Searchbar from '../Searchbar/Searchbar';
import { DatePicker,Space} from 'antd';
import moment from 'moment';
import axios from 'axios';
import Formulairemodif from '../Formulairemodif/Formulairemodif';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

const { RangePicker } = DatePicker;

function Widget() {
  const [selectedProjet, setSelectedProjet] = useState(null);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const showUpdateModal = () => {
    setIsUpdateModalVisible(true);
  };

  const [projects, setProjects] = useState([]);
  useEffect(() => {
    // Fetch projects when the component mounts
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/projet/all-projets'); // Update the API endpoint
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const [dates] = useState([])
  const [showForm, setShowForm] = useState(false);
  const [projetName, setProjectName] = useState('');
  const [projetDescription, setProjectDescription] = useState('');
  const [projetStatus, setProjetStatus] = useState(true);
  const [projetDate, setprojetDate] = useState([]);
  const [employees, setEmployee] = useState('');

  const openSuccessNotification = () => {
    notification.success({
      message: 'Tâche créée avec succès',
      description: 'La nouvelle tâche a été ajoutée avec succès.',
    });
  };

  const openErrorNotification = (error) => {
    message.error(`Erreur lors de la création: ${error}`);
  };

  const handleButtonClick = () => {
    setShowForm(true);
    setSelectedProjet(projects);
    console.log("employer verif="+employees);

    setIsUpdateModalVisible(true);
  };

  const handleAnnulerClick = () => {
    console.log('Handling Annuler Click');
    setProjectName('');
    setProjectDescription('');
    setprojetDate([]);
    setEmployee('');
    setShowForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const employeeIds = employees.map(option => option.value).filter(value => value !== null && value !== undefined);

    console.log(JSON.stringify({
      projetName,
      projetDescription,
      projetStatus: true,
      projetDate: {
        // startDate: moment(projetDate[0]).format('YYYY-MM-DD'),
        // endDate: moment(projetDate[1]).format('YYYY-MM-DD'),
        startDate : projetDate[0].format(),
        endDate : projetDate[1],
      },
      employees: employeeIds,
    }))
    console.log("emplId"+employeeIds);

    fetch("http://localhost:3001/api/projet/add-projet", {
    method: "POST",
    crossDomain: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      projetName,
      projetDescription,
      projetStatus: true,
      projetDate: {
        startDate: projetDate[0],
        endDate: projetDate[1],
      },
      employees: employeeIds,
    }),
    
  })
  .then((res) => res.json())
  .then((data) => {
    console.log(data, "projetRegister");
    openSuccessNotification();
    // Reload the page after adding the project
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
      <form className="input-box" onSubmit={handleSubmit}>

        <div className="formulaire1">
          <div className="partie1_de_formulaire">
            <div className="partie1_de_partie1" style={{paddingBottom:'10px'}}>
              <label className="name jjjj">Nom du Projet*</label>
              <input type="text" placeholder="Entrer le nom du projet" className='input_nom_projet' onChange={(e) => setProjectName(e.target.value)}/>
            </div>

            <div className="partie2_de_partie1">
              <label className="emp jjjj">Nom des employées*</label>
              <Searchbar onChange={(value) => setEmployee(value)}/>
            </div>
          </div>

          <div className="partie2_de_formulaire">
            <div className="partie2_de_partie1">
              <label className="descrip jjjj">Description*</label>
              <textarea placeholder="Décrire le projet" className="editable-paragraph" style={{paddingTop:'1vw'}} onChange={(e) => setProjectDescription(e.target.value)}/>
            </div> 
          </div>

          <div className="partie3_de_formulaire">    
            
            <div className="partie2_de_partie1" style={{paddingBottom:'0px', width:'23vw',top:'-1vw'}}> 
              <label className="date jjjj">Date d'échéance*</label>
              {/* <Space direction="vertical"  style={{height:'45px', width: '350px', paddingBottom:'30px'}} className='space_date'><RangePicker /></Space> */}

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                {/* <DateRangePicker calendars={2} onChange={(values) => {const formattedDates = values.map(item => moment(item).format('YYYY-MM-DD'));setprojetDate(formattedDates);}}/> */}
                <DateRangePicker calendars={2} onChange={(values) => {setprojetDate(values)}}/>
              </LocalizationProvider>
            </div>

            <div className="deux_button">
              <Button className="creer" onClick={handleSubmit} icon={<PlusOutlined />}> Créer</Button>
              <Button className="Annuler" onClick={handleAnnulerClick} icon={<CloseOutlined />}> Annuler</Button>
            </div>
          </div>
        </div>

      </form>
    ) : (
      <div className="">
        <Button className="ajout1" onClick={handleButtonClick} icon={<PlusOutlined />}>
          Ajouter un Projet
        </Button>
      </div>
    )}  
  </div>
);
}

export default Widget;
