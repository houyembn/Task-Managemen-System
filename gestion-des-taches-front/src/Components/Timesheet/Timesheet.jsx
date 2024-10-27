import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Sidebar1 from './../Navigation/Sidebar1/Siderbar1';
import { LogoutOutlined,SnippetsOutlined, UserOutlined, BellOutlined, ProjectOutlined, TeamOutlined, CalendarOutlined, SearchOutlined, BulbOutlined, FullscreenOutlined, UnorderedListOutlined } from '@ant-design/icons';
import user from './../../images/user.png';
import Calendriechef from "../Calendriechef/Calendriechef";
import Formulaire from "../Formulaire/Formulaire";

const localizer = momentLocalizer(moment);

function Timesheet() {
  const [events, setEvents] = useState([]);
  const [userId, setUserId] = useState('');

    // Added code by José
    const [username, setUsername] = useState("")
    const [userrole, setUserrole] = useState("")

  useEffect(() => {
    if (sessionStorage.getItem("userrole") && sessionStorage.getItem("username")){
     setUsername(sessionStorage.getItem("username"))
     setUserrole(sessionStorage.getItem("userrole"))
    }
  }, []);

  return (
    <div className="home">
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
                            <span className='nom_prenom_user'>{username}</span>
                        </div> 

                        <div className="item">
                            <img  src={user} alt="PlaniPro Logo" className="imageuser"/>  
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="amplimentation-calendrie" style={{ height: "500px", overflowY: "auto" }}>
            {userrole === 'Employée' ? (
            <Formulaire username={username}/>
            ) : (
            <Calendriechef />
            )}
        </div>
    </div>
  );
}


export default Timesheet;
