import React, { useState } from 'react';
import { Input, Button, Steps, Divider  } from 'antd';
import Sidebar1 from '../../Navigation/Sidebar1/Siderbar1';
import Widgettask from '../Widgettask/Widgettask';
import "./Tasks.css";
import user from '../../../images/user.png';
import { LogoutOutlined, UserOutlined, BellOutlined, ProjectOutlined, TeamOutlined, CalendarOutlined, SearchOutlined, BulbOutlined, FullscreenOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { PlusOutlined, SnippetsOutlined } from '@ant-design/icons';
import { Box, Stepper, Step, StepLabel, Typography, StepContent, Paper } from '@mui/material';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import ReplyIcon from '@mui/icons-material/Reply';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CheckIcon from '@mui/icons-material/Check';
import { useUser ,UserProvider } from '../../Authentification/Login/UserContext';
import { useEffect } from 'react';
import './Tasks.css';
import axios from 'axios';
import List from '../List/List';
import TaskChef from '../TaskChef/TaskChef';

const Tasks = () => {
  const [text, setText] = useState('');
  const [current, setCurrent] = useState(0);
  const { userName, userRole } = useUser();
  const [userId, setUserId] = useState('');
  const [tasks, setTasks] = useState([]);


 // Added code by José
 const [username, setUsername] = useState("")
 const [userrole, setUserrole] = useState("")

  useEffect(() => {
    // get data from sessionStorage
    if (sessionStorage.getItem("userrole") && sessionStorage.getItem("username")){
      setUsername(sessionStorage.getItem("username"))
      setUserrole(sessionStorage.getItem("userrole"))
    }

    const fetchUserId = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/emp/employerIdByName/${username}`);
  
        if (response.ok) {
          const data = await response.json();
          const userIdValue = data.id; 
          setUserId(userIdValue);
          console.log('User ID:', userIdValue);

          const responseTasks = await fetch(`http://localhost:3001/api/task/emptask/${userIdValue}`);
  
          if (responseTasks.ok) {
            const tasksData = await responseTasks.json();
            setTasks(tasksData);
            console.log('Tasks:', tasksData);
          } else {
            throw new Error(`Failed to get tasks: ${responseTasks.status}`);
          }
        } else {
          throw new Error(`Failed to get user ID: ${response.status}`);
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };
  
    fetchUserId();
  
    // const fetchUserId = async () => {
    //   try {
    //     const response = await fetch(`http://localhost:3001/api/emp/employerIdByName/${username}`);
        
    //     if (response.ok) {
    //       const data = await response.json();
    //       setUserId(data.id);
    //       console.log('User ID:', data.id);
    //     } else {
    //       throw new Error(`Failed to get user ID: ${response.status}`);
    //     }
    //   } catch (error) {
    //     console.error('Error:', error.message);
    //   }
    // };
    // fetchUserId();

    // const fetchTasks = async () => {
    //   try {
    //     const response = await fetch(`http://localhost:3001/api/task/emptask/${userId}`);
        
    //     if (response.ok) {
    //       const tasksData = await response.json();
    //       setTasks(tasksData);
    //       console.log('Tasks:', tasksData);
    //     } else {
    //       throw new Error(`Failed to get tasks: ${response.status}`);
    //     }
    //   } catch (error) {
    //     console.error('Error:', error.message);
    //   }
    // };
    // fetchTasks();


  }, [username])
  // End added code

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

  // const getUserIdByUsername = async (username) => {
  //   try {
  //     const response = await fetch(`http://localhost:3001/api/emp/employerIdByName/${username}`);
  //     const data = await response.json();
  
  //     if (response.ok) {
  //       return data.id;
  //     } else {
  //       throw new Error(data.error || 'Failed to get user ID');
  //     }
  //   } catch (error) {
  //     console.error('Error:', error.message);
  //     throw error;
  //   }
  // };
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
  };

  const handleToggle = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
    };

    const handleCheckboxChange = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
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
                {/* <span className='nom_prenom_user'>{userName}</span> */}
                <span className='nom_prenom_user'>{username}</span>
              </div> 

              <div className="item">
                <img  src={user} alt="PlaniPro Logo" className="imageuser"/>  
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="amplimentation" >
          <div className='table_centre'>
            {userrole === 'Employée' ? (
                <List username={username}/>
                ) : (
                <TaskChef />
                )}
          </div>
      </div>
    </div>
  )




// useEffect(() => {
//   // get data from sessionStorage
//   if (sessionStorage.getItem("userrole") && sessionStorage.getItem("username")){
//     setUsername(sessionStorage.getItem("username"))
//     setUserrole(sessionStorage.getItem("userrole"))
//   }

//   const fetchUserId = async () => {
//     try {
//       const response = await fetch('http://localhost:3001/api/emp/employerIdByName/${username}');

//       if (response.ok) {
//         const data = await response.json();
//         const userIdValue = data.id; 
//         setUserId(userIdValue);
//         console.log('User ID:', userIdValue);

//         const responseTasks = await fetch('http://localhost:3001/api/task/emptask/${userIdValue}');

//         if (responseTasks.ok) {
//           const tasksData = await responseTasks.json();
//           setTasks(tasksData);
//           console.log('Tasks:', tasksData);
//         } else {
//           throw new Error('Failed to get tasks: ${responseTasks.status}');
//         }
//       } else {
//         throw new Error('Failed to get user ID: ${response.status}');
//       }
//     } catch (error) {
//       console.error('Error:', error.message);
//     }
//   };

//   fetchUserId();

//   // const fetchUserId = async () => {
//   //   try {
//   //     const response = await fetch(http://localhost:3001/api/emp/employerIdByName/${username});
      
//   //     if (response.ok) {
//   //       const data = await response.json();
//   //       setUserId(data.id);
//   //       console.log('User ID:', data.id);
//   //     } else {
//   //       throw new Error(Failed to get user ID: ${response.status});
//   //     }
//   //   } catch (error) {
//   //     console.error('Error:', error.message);
//   //   }
//   // };
//   // fetchUserId();

//   // const fetchTasks = async () => {
//   //   try {
//   //     const response = await fetch(http://localhost:3001/api/task/emptask/${userId});
      
//   //     if (response.ok) {
//   //       const tasksData = await response.json();
//   //       setTasks(tasksData);
//   //       console.log('Tasks:', tasksData);
//   //     } else {
//   //       throw new Error(Failed to get tasks: ${response.status});
//   //     }
//   //   } catch (error) {
//   //     console.error('Error:', error.message);
//   //   }
//   // };
//   // fetchTasks();


// }, [username])



// return (
//   <div>
//     <h2>Your Tasks</h2>
//     <ul>
//       {tasks.map((task) => (
//         <li key={task._id}>
//           {task.taskName}: {task.taskDescription}
//         </li>
//       ))}
//     </ul>
//   </div>
// );
};


export default Tasks;
