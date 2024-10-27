import React, { useState, useEffect } from 'react';
import Sidebar1 from '../../Navigation/Sidebar1/Siderbar1';
import user from '../../../images/user.png';
import { useUser, UserProvider } from '../../Authentification/Login/UserContext';
import './List.css';
import axios from 'axios';
import AttachFileIcon from '@mui/icons-material/AttachFile';

import { PlusOutlined, SnippetsOutlined } from '@ant-design/icons';

const List = ({ username }) => {
  const [tasks, setTasks] = useState([]);
  const [userId, setUserId] = useState('');
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/emp/employerIdByName/${username}`);

        if (response.ok) {
          const data = await response.json();
          const userIdValue = data.id;
          setUserId(userIdValue);

          const responseTasks = await fetch(`http://localhost:3001/api/task/emptask/${userIdValue}`);

          if (responseTasks.ok) {
            const tasksDataByProject = await responseTasks.json();

            // Convert the tasksByProject object to an array of projects
            const projectsArray = Object.entries(tasksDataByProject).map(([projectName, tasks]) => ({
              projectName,
              tasks,
            }));

            setProjects(projectsArray);
            console.log('Projects:', projectsArray);
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

    fetchData();
  }, [username]);

  const handleCheckboxChange = async (taskId, currentTaskStatus) => {
    try {
      // Determine the new task status based on the current status
      const newTaskStatus = !currentTaskStatus;
  
      // Make a PUT request to update task status
      const response = await axios.put(`http://localhost:3001/api/task/${taskId}`, { taskStatus: newTaskStatus });
  
      // Handle the updated task data as needed
      console.log('Updated Task:', response.data);
  
      // Update the local state to reflect the change
      setProjects((prevProjects) =>
        prevProjects.map((project) => ({
          ...project,
          tasks: project.tasks.map((task) =>
            task.taskId === taskId ? { ...task, taskStatus: newTaskStatus } : task
          ),
        }))
      );
    } catch (error) {
      console.error('Error updating task status:', error.message);
      // Handle error (e.g., show an error message to the user)
    }
  };
  
  return (
    <div style={{ height: "580px", overflowY: "auto"  , marginTop:"190px"}}>
    {projects.map((project) => (
      <div className='taskempdo' key={project.projectName}>
        <h3 className='tachenamedo'><span style={{ textDecoration: 'underline' }}><AttachFileIcon className="iconemp" style={{color: '#512da8', fontSize: '20px ' }}/></span> {project.projectName}</h3>
        {project.tasks.map((task) => (
          <div key={task.taskId} className={`task-container ${task.taskStatus ? '' : 'completed'}`}>
            <input
              type="checkbox"
              id={`checkboxstatut-${task.taskId}`}
              className="checkboxstatut"
              checked={!task.taskStatus}
              onChange={() => handleCheckboxChange(task.taskId, task.taskStatus)}
            />
            <label className='labelprojet' htmlFor={`checkboxstatut-${task.taskId}`}>
              <span>{task.taskName}:</span> {task.taskDescription}
            </label>
          </div>
        ))}
      </div>
    ))}
  </div>
  
  );
};

export default List;
