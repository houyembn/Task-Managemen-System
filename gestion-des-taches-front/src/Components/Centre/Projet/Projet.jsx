import React, { useState,useEffect, useRef } from 'react';
import { Input, Button,Modal,Popconfirm, message } from 'antd';
import Sidebar1 from '../../Navigation/Sidebar1/Siderbar1';
import Widget from '../Widget/Widget';
import "./Projet.css";
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
import Projetchef from '../Projetchef/Projetchef';
import Projetemp from '../Projetemp/Projetemp';

const Projet = () => {
    //  const { username, userRole, updateUser } = UserProvider();
    const { userName, userRole, updateUser } = useUser();
    const containerRef = useRef();
    // const history = useHistory();
    const [role, setUserRole] = useState("");
    const [text, setText] = useState('');
    // const [name, setName] = useState('');
    const [name, setUserName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('en cours');
    const [deadline, setDeadline] = useState('');
    const [projects, setProjects] = useState([]);
    const [employee, setEmployer] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [popconfirmVisible, setPopconfirmVisible] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    // const projectEmployeesValue = project.employees; 

    const location=useLocation();
    // const userName = location.state ? location.state.name : '';
    // const userrole = location.state ? location.state.role : '';


    // const searchParams = new URLSearchParams(window.location.search);
    // const username = searchParams.get('name') || '';
    // const userrole = searchParams.get('role') || '';

    const [selectedProjet, setSelectedProjet] = useState(null);
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
    const showUpdateModal = () => {
      setIsUpdateModalVisible(true);
    };

    const handleChange = (e) => {
        setText(e.target.value);
    };

    const handleConfirm = (projectId) => {
        handleDeleteProject(projectId);
        message.success('Task deleted successfully');
    };

    const handleCancel = () => {
        message.info('Task deletion canceled');
    };

    const handleClear = () => {
        setText('');
    };

    const [showModal, setShowModal] = useState(false);
    const handleModifyClick = () => {
        setShowModal(true);
    };

    // Added code by José

    const [username, setUsername] = useState("")
    const [userrole, setUserrole] = useState("")

    // End of added code

    useEffect(() => {

        const searchParams = new URLSearchParams(window.location.search);
        const usernameVal = searchParams.get('name') || '';
        const userroleVal = searchParams.get('role') || '';

        setUsername(usernameVal)
        setUserrole(userroleVal)
        //ce code la 
        sessionStorage.setItem("username", usernameVal)
        sessionStorage.setItem("userrole", userroleVal)

        const fetchProjects = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/projet/all-projets');
            setProjects(response.data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
        };

        fetchProjects();
    }, []);

    useEffect(() => {
        if (sessionStorage.getItem("userrole") && sessionStorage.getItem("username")){
          setUsername(sessionStorage.getItem("username"))
          setUserrole(sessionStorage.getItem("userrole"))
        }
    }, [])

    const handleDeleteProject = (projectId) => {
        fetch(`http://localhost:3001/api/projet/delete-projet/${projectId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data); 
            setDeleteDialogOpen(false);
            window.location.reload();
          })
          .catch((error) => {
            console.error('Error:', error);
        });
    };

    const confirm = (projectId) => {
        handleDeleteProject(projectId);
        message.success('Projet supprimée avec succès');
    };
    const cancel = (e) => {
    console.log(e);
    message.error('La suppression du projet a été annulée');
    };
    
    const handleModifierClick = () => {
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
    };

    const handleModifier = () => {
        console.log('Projet mis à jour:', name, description, status, deadline,employee);
        setIsModalVisible(false);
    };

    const handleWidgetClick = (projectId) => {
        console.log('User Role:', userrole);
        if (userrole !== 'Employée') {
            const queryParams = new URLSearchParams({ projectId,username });
            window.location.href = `./TasksProjet?${queryParams.toString()}`;
        };
    };

  return (
    <div className='home'>
        <div className="page-container">
            <Sidebar1 username={username} userrole={userrole}/>

            <div className="navbar">
                <div className="wrapper">
                    <div className="titre-menu">
                        <ProjectOutlined className="icon-menu"/>
                        <span> Mes Projets</span>
                    </div>

                    <div className="items">
                        <div className="item">
                            <span className='nom_prenom_user'>{username}</span>
                        </div> 

                        <div className="item">
                            <img  src={user} alt="PlaniPro Logo" className="imageuser"/>  
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="amplimentation" style={{ height: "580px", overflowY: "auto"  , marginTop:"60px"}}>
            {/* {userrole === 'Employée' ? null : (
                <div className="centrework">
                    <Widget />
                </div>
            )} */}

            {userrole === 'Employée' ? (
            <Projetemp username={username}/>
            ) : (
            <Projetchef />
            )}

        </div>

        <Modal
            // title="Modifier le projet"
            title={<span style={{ marginBottom:'20px'}}>Modifier le projet</span>}

            open={isModalVisible}
            onCancel={handleModalClose}
            onOk={handleModifier}
            okButtonProps={{ style: { backgroundColor: '#512da8', color: '#ffffff' } }}
        >

            <div className="mb-4">
                <div className="partie1_de_partie1" style={{paddingBottom:'10px'}}>
                    <label className="name jjjj">Nom du Projet</label>
                    <input type="text" placeholder="Entrer le nom du projet" className='input_nom_projet'/>
                </div>

                {/* <Input
                    placeholder="Entrez le nom du projet"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                /> */}
            </div>

            <div className="mb-4">
                <div className="partie2_de_partie1">
                    <label className="descrip jjjj">Description</label>
                    <textarea placeholder="Décrire le projet" className="editable-paragraph" style={{paddingTop:'1vw'}}/>
                </div> 
            </div>
            
            <div className="mb-4">
                <div className="partie2_de_partie1" style={{paddingBottom:'10px', width:'30vw',top:'-2vw'}}> 
                    <label className="date jjjj">Date d'échéance</label>
                    {/* <Space direction="vertical"  style={{height:'45px', width: '350px', paddingBottom:'30px'}} className='space_date'><RangePicker /></Space> */}

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateRangePicker calendars={2} />
                    </LocalizationProvider>
                </div>
            </div>

            <div className="mb-4">
                <div className="partie2_de_partie1" style={{paddingBottom:'25px'}}>
                    <label className="emp jjjj">Nom des employées</label>
                    <Searchbar style={{width:'30vw'}}/>
                </div>

                <div className="radios">
                    <input type="radio" name="role" value="Employée" onChange={(e) => setUserRole(e.target.value)} id="employeeRadio" />
                    <label htmlFor="employeeRadio"> <span className="radio-circle"></span> Employée</label>
                    <input type="radio" name="role" value="Chef d'équipe" onChange={(e) => setUserRole(e.target.value)} id="teamLeaderRadio"/>
                    <label htmlFor="teamLeaderRadio" id="chef"> <span className="radio-circle"></span> Chef d'équipe</label>
                </div> 
            </div>

        </Modal>
    </div>
  )
}

export default Projet;
