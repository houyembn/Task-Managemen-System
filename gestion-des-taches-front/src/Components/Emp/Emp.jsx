import React, { useState, useEffect } from 'react';
import Sidebar1 from '../Navigation/Sidebar1/Siderbar1';
import { PlusOutlined, SnippetsOutlined ,LogoutOutlined, UserOutlined, BellOutlined, ProjectOutlined, TeamOutlined, CalendarOutlined, SearchOutlined, BulbOutlined, FullscreenOutlined, UnorderedListOutlined } from '@ant-design/icons';
import user from '../../images/user.png';
import { Table } from 'antd';
import './Emp.css';

const Emp = () => {
  const [Emps, setEmps] = useState([]);

   // Added code by José

   const [username, setUsername] = useState("")
   const [userrole, setUserrole] = useState("")
 
   useEffect(() => {
     // get data from sessionStorage
     if (sessionStorage.getItem("userrole") && sessionStorage.getItem("username")){
       setUsername(sessionStorage.getItem("username"))
       setUserrole(sessionStorage.getItem("userrole"))
     }
   }, [])
   // End added code

  useEffect(() => {
    fetch('http://localhost:3001/api/emp/userListe')
      .then((response) => response.json())
      .then((data) => setEmps(data))
      .catch((error) => console.error('Error fetching Emps', error));
  }, []);

  const columns = [
    {
      title: 'Nom',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'role',
      dataIndex: 'role',
    },
    // Add other columns as needed
  ];

  return (
    <div className='home'>
      <div className="page-container">
        <Sidebar1/>

        <div className="navbar">
          <div className="wrapper">
            <div className="titre-menu">
              <TeamOutlined className="icon-menu"/>
              <span> Liste des Employées</span>
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

      <div className="amplimentation">
        <div className='table_centre' style={{ height: "500px", overflowY: "auto" , marginTop:"20px"}}>
          <Table  rowKey={(record) => record._id} columns={columns} dataSource={Emps} />
        </div>
      </div> 
    </div>
  );
};

export default Emp;
