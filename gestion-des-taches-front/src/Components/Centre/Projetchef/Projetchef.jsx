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

const Projetchef = () => {
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
    <div className="">
        <div className="centrework">
            <Widget />
        </div>

        <div className="widget-container" >
           
           {projects.map((project) => (
               <div key={project._id} className="widget" style={{ marginTop:"60px"}}>
                   <div className="left" onClick={() => handleWidgetClick(project._id)}>
                       {/* <span className="title">{project.projetName}</span> */}
                       <span className={`title ${userRole === 'Employée' ? 'employee-title' : ''}`}>
                           {project.projetName}
                       </span>
                       <span className="descp">{project.projetDescription}</span>
                       <span className="status">{project.projetStatus ? 'Actif' : 'Terminé'}</span>
                   </div>

                   <div className="right">
                       {/* <Button className="modif" icon={<FormOutlined />}  onClick={handleModifierClick}/> */}                     
                       <Button
                           type="link"
                           className="modif"
                           
                           onClick={() => {
                           setSelectedProjet(project);
                           setIsUpdateModalVisible(true);
                           }}
                           icon={<FormOutlined />}
                       />

                       <Popconfirm
                           title="Confirmer la suppression de projet"
                           description="Souhaitez-vous vraiment supprimer ce projet ?"
                           // onConfirm={confirm}
                           // onConfirm={() => handleDeleteProject(project._id)}
                           onConfirm={() => confirm(project._id)}
                           onCancel={cancel}
                           okText="Oui"
                           cancelText="Non"
                       >
                           <Button className="supp" icon={<DeleteOutlined />}></Button>
                       </Popconfirm>    

                   </div>
               </div>
           ))}   

           {/* Display the Formulairemodif modal when isUpdateModalVisible is true */}
           {isUpdateModalVisible && (
           // <Formulairemodif
           //     visible={isUpdateModalVisible}
           //     onClose={() => setIsUpdateModalVisible(false)}
           //     onAddProjet={(formData) => {
           //     console.log('Callback function when adding project is triggered with data:', formData);
           //     }}
           //     selectedProjet={selectedProjet}
           // />

           <ModifeFormulaire
               visible={isUpdateModalVisible}
               onClose={() => setIsUpdateModalVisible(false)}
               onAddProjet={(formData) => {
               console.log('Callback function when adding project is triggered with data:', formData);
               }}
               selectedProjet={selectedProjet}
           />
           )}

       </div>
    </div>
   
  )
}

export default Projetchef;
