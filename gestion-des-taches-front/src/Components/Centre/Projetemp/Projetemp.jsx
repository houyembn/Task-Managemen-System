import React, { useState,useEffect, useRef } from 'react';
import { Input, Button,Modal,Popconfirm, message } from 'antd';
import Sidebar1 from '../../Navigation/Sidebar1/Siderbar1';
import Widget from '../Widget/Widget';
import axios from 'axios';
import user from '../../../images/user.png';
import Searchbar from '../Searchbar/Searchbar';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import Formulairemodif from '../Formulairemodif/Formulairemodif';
import ModifeFormulaire from '../Formulairemodif/ModifeFormulaire';
import { Row, Col } from 'antd';
import { QuestionCircleOutlined,PlusOutlined, SnippetsOutlined ,DeleteOutlined, FormOutlined, LogoutOutlined, UserOutlined, BellOutlined, ProjectOutlined, TeamOutlined, CalendarOutlined, SearchOutlined, BulbOutlined, FullscreenOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { useLocation , useHistory} from 'react-router-dom';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useUser } from '../../Authentification/Login/UserContext';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import "./Projetemp.css";

const Projetemp = ({username}) => {
    const [userId, setUserId] = useState('');
    const { userName, userRole, updateUser } = useUser();
    const [role, setUserRole] = useState("");
    const [text, setText] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('en cours');
    const [deadline, setDeadline] = useState('');
    const [projects, setProjects] = useState([]);
    // const projectEmployeesValue = project.employees; 

    useEffect(() => {
        const fetchUserId = async () => {
            try {
            const response = await fetch(`http://localhost:3001/api/emp/employerIdByName/${username}`);
        
            const data = await response.json();
            const userIdValue = data.id; 
            setUserId(userIdValue);
            console.log('User ID:', userIdValue);

            const fetchProjects = async () => {
                try {
                    const response = await axios.get(`http://localhost:3001/api/projet/projects-by-user/${userIdValue}`);
                    setProjects(response.data);
                } catch (error) {
                    console.error('Error fetching projects:', error);
                }
            };
            fetchProjects();
            } catch (error) {
                console.error('Error:', error.message);
            }
        }
        fetchUserId();  
    }, [username]);

    // const location=useLocation();
    // const userName = location.state ? location.state.name : '';
    // const userrole = location.state ? location.state.role : '';


    // const searchParams = new URLSearchParams(window.location.search);
    // const username = searchParams.get('name') || '';
    // const userrole = searchParams.get('role') || '';

    // const [selectedProjet, setSelectedProjet] = useState(null);
    // const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
    // const showUpdateModal = () => {
    //   setIsUpdateModalVisible(true);
    // };

    // const handleChange = (e) => {
    //     setText(e.target.value);
    // };

    // const handleConfirm = (projectId) => {
    //     handleDeleteProject(projectId);
    //     message.success('Task deleted successfully');
    // };

    // const handleCancel = () => {
    //     message.info('Task deletion canceled');
    // };

    // const handleClear = () => {
    //     setText('');
    // };

    // const [showModal, setShowModal] = useState(false);
    // const handleModifyClick = () => {
    //     setShowModal(true);
    // };

    // Added code by José

    // const [username, setUsername] = useState("")
    // const [userrole, setUserrole] = useState("")

    // End of added code

    // useEffect(() => {

    //     const searchParams = new URLSearchParams(window.location.search);
    //     const usernameVal = searchParams.get('name') || '';
    //     const userroleVal = searchParams.get('role') || '';

    //     setUsername(usernameVal)
    //     setUserrole(userroleVal)
    //     //ce code la 
    //     sessionStorage.setItem("username", usernameVal)
    //     sessionStorage.setItem("userrole", userroleVal)

    //     const fetchProjects = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:3001/api/projet/all-projets');
    //         setProjects(response.data);
    //     } catch (error) {
    //         console.error('Error fetching projects:', error);
    //     }
    //     };

    //     fetchProjects();
    // }, []);

    // useEffect(() => {
    //     if (sessionStorage.getItem("userrole") && sessionStorage.getItem("username")){
    //       setUsername(sessionStorage.getItem("username"))
    //       setUserrole(sessionStorage.getItem("userrole"))
    //     }
    // }, [])

  return (
    <div className="" >
        <div className="widget-container" >
           
           {projects.map((project) => (
               <div key={project._id} className="widget" >
                   <div className="left">
                       {/* <span className="title">{project.projetName}</span> */}
                       <span className={`titleemp ${userRole === 'Employée' ? 'employee-title' : ''}`}>
                           {project.projetName}
                       </span>
                       <span className="descp">{project.projetDescription}</span>
                       <span className="status">{project.projetStatus ? 'Actif' : 'Terminé'}</span>
                   </div>

                    <div className="right">
                       <AttachFileIcon className="iconemp"/> 
                    </div>
               </div>
           ))}   
       </div>
    </div>
   
  )
}

export default Projetemp;
