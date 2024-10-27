import React, { useState, useEffect} from 'react';
import { Input, Button, Steps, Divider  } from 'antd';
import Sidebar1 from '../../Navigation/Sidebar1/Siderbar1';
import Widgettask from '../Widgettask/Widgettask';
import "./TasksProjet.css";
import user from '../../../images/user.png';
import { LogoutOutlined, UserOutlined, BellOutlined, ProjectOutlined, TeamOutlined, CalendarOutlined, SearchOutlined, BulbOutlined, FullscreenOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { PlusOutlined, SnippetsOutlined } from '@ant-design/icons';
import { Box, Stepper, Step, StepLabel, Typography, StepContent, Paper } from '@mui/material';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import ReplyIcon from '@mui/icons-material/Reply';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CheckIcon from '@mui/icons-material/Check';
import Afficher from '../../Afficher/Afficher';

const TasksProjet = () => {
  const [text, setText] = useState('');
  const [current, setCurrent] = useState(0);
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [projectId, setProjectId] = useState('');

  // Added code by José

  const [username, setUsername] = useState("")
  const [userrole, setUserrole] = useState("")

  // useEffect(() => {
  //   // get data from sessionStorage
  //   if (sessionStorage.getItem("userrole") && sessionStorage.getItem("username")){
  //     setUsername(sessionStorage.getItem("username"))
  //     setUserrole(sessionStorage.getItem("userrole"))
  //   }
  // }, [])
  // // End added code

  useEffect(() => {
    // Récupérer les valeurs de l'URL
    const searchParams = new URLSearchParams(window.location.search);
    const username = searchParams.get('username') || '';
    console.log('Username from URL:', username);
    // const role = searchParams.get('role') || '';
    const projectId = searchParams.get('projectId') || '';

    // Mettre à jour les états
    setUserName(username);
    // setUserRole(role);
    setProjectId(projectId); 
  }, []);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleClear = () => {
    setText('');
  };

  const handleModifierClick = () => {
    // setIsModalVisible(false);
  };

  const handleSupprimerClick = () => {
    // setIsModalVisible(false);
  };

  const steps = [
    {
      title: 'Step 1',
      description: 'This is a description.',
    },
    {
      title: 'Step 2',
      description: 'This is a description.',
    },
    {
      title: 'Step 3',
      description: 'This is a description.',
    },
  ];

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const onChange = (value) => {
    console.log('onChange:', value);
    setCurrent(value);
  };

  return (
    <div className='home'>
      <div className="page-container">
        <Sidebar1 />
        <div className="navbar">
          <div className="wrapper">
            <div className="titre-menu">
              <SnippetsOutlined className="icon-menu"/>
              <span> Mes Tâches</span>
            </div>
            
            <div className="items">
              <div className="item">
                <span className='nom_prenom_user'>{userName}</span>
              </div> 

              <div className="item">
                <img  src={user} alt="PlaniPro Logo" className="imageuser"/>  
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="amplimentation" >
        <div className="centrework">
          <Widgettask projectId={projectId}/>
        </div>

        <div className="widget1">
          <div className="todo">
          < Afficher/>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default TasksProjet;
