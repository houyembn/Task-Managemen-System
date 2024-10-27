import React, { useContext ,useState} from 'react';
import { Link } from 'react-router-dom';
import { DarkModeContext } from "../../Context/darkModeContext";
import favicon from '../../../images/favicon.png';
import { Modal } from 'antd';
import "./Siderbar1.css"
import { LogoutOutlined,UserOutlined,BellOutlined,ProjectOutlined,TeamOutlined,SnippetsOutlined,CalendarOutlined,SearchOutlined,BulbOutlined,FullscreenOutlined,UnorderedListOutlined} from '@ant-design/icons';

const Sidebar1 = ({username,userrole}) => {

  const { dispatch } = useContext(DarkModeContext);

  return (
    <div className="sidebar-wrapper ">
      <div className="sidebar">
        <div className="top">
          <img  src={favicon} alt="PlaniPro Logo" className="imagetop"/>            
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="logo">PlaniPro</span>
          </Link>
        </div>
        <hr />
        <div className="center">
          <ul>
            <p className="title">Tableau de bord</p>
            
            <Link to="/Projet" style={{ textDecoration: "none" }}>
              <li>
                <ProjectOutlined className="icon" />
                <span>Mes Projets</span>
              </li>
            </Link>
            <Link to="/Tasks" style={{ textDecoration: "none" }} >
              <li>
                <SnippetsOutlined className="icon"/>
                <span>Mes Tâches</span>
              </li>
            </Link>

            <Link to="/Emp" style={{ textDecoration: "none" }}>
              <li>
                <TeamOutlined className="icon"/>
                <span>Employées</span>
              </li>
            </Link>

            <Link to="/Timesheet" style={{ textDecoration: "none" }}>
              <li>
                <CalendarOutlined className="icon"/>
                <span>Timesheet</span>
              </li>
            </Link>

            {/* {userrole === 'Employée' && (
              <Link to="/Formulaire" style={{ textDecoration: 'none' }}>
                <li>
                  <CalendarOutlined className="icon" />
                  <span>Timesheet</span>
                </li>
              </Link>
            )}
            {userrole === 'Chef d\'équipe' && (
              <Link to="/Calendriechef" style={{ textDecoration: 'none' }}>
                <li>
                  <CalendarOutlined className="icon" />
                  <span>Timesheet</span>
                </li>
              </Link>
            )}
           */}
            <p className="title">UTILE</p>
            
            {/* <li>
              <BellOutlined className="icon" />
              <span>Notifications</span>
            </li> */}
            {/* <p className="title">UTILISATEUR</p>
            <li>
              <UserOutlined className="icon"/>
              <span>Profile</span>
            </li> */}

            <Link to="/idverifivation" style={{ textDecoration: "none" }}>
            <li>
              <LogoutOutlined className="icon"/>
              <span>Déconnexion</span>
            </li>
            </Link>
          </ul>
        </div>
        {/* <div className="bottom">
          <div
            className="colorOption"
            onClick={() => dispatch({ type: "LIGHT" })}
          ></div>
          <div
            className="colorOption"
            onClick={() => dispatch({ type: "DARK" })}
          ></div>
        </div> */}
      </div>
      
    </div>
    
  );
}

export default Sidebar1