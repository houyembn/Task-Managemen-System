import React, { useState, useEffect } from 'react';
import { Badge, Table } from 'antd';
import axios from 'axios';
import moment from 'moment-timezone';

const TaskChef = () => {
  const [projects, setProjects] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/projet/');
        console.log(response.data);  // Log the raw API response
  
        const mappedData = response.data.projects.map((project, index) => {
          return {
            key: index.toString(),
            projetName: project.projetName,
            projetDescription: project.projetDescription,
            projetStatus: project.projetStatus,
            startDate: project.projetDate.startDate.split('T')[0],  // Extract date part
            endDate: project.projetDate.endDate.split('T')[0],      // Extract date part
            tasks: project.tasks,
          };
        });
        
  
        setData(mappedData);
        console.log(mappedData);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
  
    fetchProjects();
  }, []);

  const expandedRowRender = (record) => {
    const columns = [
      {
        title: 'Task Name',
        dataIndex: 'taskName',
        key: 'taskName',
      },
      {
        title: 'Task Description',
        dataIndex: 'taskDescription',
        key: 'taskDescription',
      },
      {
        title: 'Start Date',
        dataIndex: 'startDate',
        key: 'startDate',
      },
      {
        title: 'End Date',
        dataIndex: 'endDate',
        key: 'endDate',
      },
    ];

    const tasksData = record.tasks.map((task, index) => ({
      key: index.toString(),
      taskName: task.taskName,
      taskDescription: task.taskDescription,
      startDate: task.taskDate.startDate.split('T')[0],  // Extract date part
      endDate: task.taskDate.endDate.split('T')[0],      // Extract date part
    }));


    return <Table columns={columns} dataSource={tasksData} pagination={false} />;
  };

  const columns = [
    {
      title: 'Project Name',
      dataIndex: 'projetName',
      key: 'projetName',
    },
    {
      title: 'Project Description',
      dataIndex: 'projetDescription',
      key: 'projetDescription',
    },
    {
      title: 'status',
      key: 'status',
     // render: () => <Badge status="Active" text="Terminée" />,
     render: (_, record) => (
      <Badge
        status={record.projetStatus ? 'success' : 'error'}
        text={record.projetStatus ? 'Active' : 'Terminée'}
      />
    ),
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
    },
  ];

  return (
    <div className="" style={{ height: "500px", overflowY: "auto" , marginTop:"120px"}}>
    <>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender,
        }}
        dataSource={data}
      />
    </>
    </div>
  );
};

export default TaskChef;
