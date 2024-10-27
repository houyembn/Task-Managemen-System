import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Sidebar1 from './../Navigation/Sidebar1/Siderbar1';
import { LogoutOutlined,SnippetsOutlined, UserOutlined, BellOutlined, ProjectOutlined, TeamOutlined, CalendarOutlined, SearchOutlined, BulbOutlined, FullscreenOutlined, UnorderedListOutlined } from '@ant-design/icons';
import user from './../../images/user.png';
import Calendriechef from "../Calendriechef/Calendriechef";

const localizer = momentLocalizer(moment);

function Formulaire({ username }) {
  const [events, setEvents] = useState([]);
  const [userId, setUserId] = useState('');

  // useEffect(() => {
  //    if (sessionStorage.getItem("userrole") && sessionStorage.getItem("username")){
  //     setUsername(sessionStorage.getItem("username"))
  //     setUserrole(sessionStorage.getItem("userrole"))
  //   }

  //   fetch(`http://localhost:3001/api/task/emptask/${userIdValue}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const formattedEvents = data.map((event, index) => ({
  //         ...event,
  //         title: event.taskName,
  //         start: new Date(event.taskDate.startDate), // Use new Date() only if startDate is a string
  //         end: new Date(event.taskDate.endDate),   // Use new Date() only if endDate is a string
  //         color: getColorByIndex(index),  // Assign a color based on the event's index
  //       }));
  //       setEvents(formattedEvents);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching events:", error);
  //     });
  // }, []);

  useEffect(() => {
  //   if (sessionStorage.getItem("userrole") && sessionStorage.getItem("username")){
  //    setUsername(sessionStorage.getItem("username"))
  //    setUserrole(sessionStorage.getItem("userrole"))
  //  }

    const fetchUserId = async () => {
      try {
      const response = await fetch(`http://localhost:3001/api/emp/employerIdByName/${username}`);

      const data = await response.json();
      const userIdValue = data.id; 
      setUserId(userIdValue);
      console.log('User ID:', userIdValue);

      fetch(`http://localhost:3001/api/task/calenemp/${userIdValue}`)
        .then((response) => response.json())
        .then((data) => {
          const formattedEvents = data.map((event, index) => ({
            ...event,
            title: event.taskName,
            start: new Date(event.taskDate.startDate), 
            end: new Date(event.taskDate.endDate),  
            color: getColorByIndex(index), 
          }));
          setEvents(formattedEvents);
        })
        .catch((error) => {
          console.error("Error fetching events:", error);
        });
      } catch (error) {
        console.error('Error:', error.message);
      }
    }
    fetchUserId();

  }, []);

  const getColorByIndex = (index) => {
    // Define an array of colors and return the color based on the index
    const colors = ["#e27396", "#ffc857", "#ff9770", "#90be6d", "#7fc8f8", "#9ff70", "#77bfa3", "#82c0cc", "#aeb8fe", "#a4243b"];
    return colors[index % colors.length];  // Use modulo to loop through colors if there are more events than colors
  };

  // // Added code by José
  // const [username, setUsername] = useState("")
  // const [userrole, setUserrole] = useState("")

  return (
    <div className="App" style={{ padding: "14px" }}>
      <Calendar
        localizer={localizer}
        startAccessor={"start"}
        events={events}
        endAccessor={"end"}
        style={{
          height: "1000px",
        }}
        eventPropGetter={(event) => {
          return {
            style: {
              backgroundColor: event.color,
            },
          };
        }}
        onSelectEvent={(event) => alert(event.title)}
        views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
      />
    </div>


    // <div className="home">
    //   <div className="page-container">
    //     <Sidebar1 />
    //     <div className="navbar">
    //       <div className="wrapper">
    //         <div className="titre-menu">
    //           <SnippetsOutlined className="icon-menu"/>
    //           <span> Mes Tâches</span>
    //         </div>
            
    //         <div className="items">
    //           <div className="item">
    //             <span className='nom_prenom_user'>{username}</span>
    //           </div> 

    //           <div className="item">
    //             <img  src={user} alt="PlaniPro Logo" className="imageuser"/>  
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="amplimentation-calendrie" >
    //     {/* <div className="App" style={{ padding: "14px" }}> */}
    //     <div className="App" style={{ padding: "14px" }}>

    //       <Calendar
    //         localizer={localizer}
    //         startAccessor={"start"}
    //         events={events}
    //         endAccessor={"end"}
    //         style={{
    //           height: "1000px",
    //         }}
    //         eventPropGetter={(event) => {
    //           return {
    //             style: {
    //               backgroundColor: event.color,
    //             },
    //           };
    //         }}
    //         onSelectEvent={(event) => alert(event.title)}
    //         views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
    //       />
    //     </div>
    //   </div>
    // </div>
  );
}


export default Formulaire;
