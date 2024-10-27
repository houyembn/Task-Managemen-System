import { useEffect,useState } from "react";
import "./Afficher.css";
import { Table } from "../Table/Table";
import { Modal } from "../Modal/Modal";
import axios from "axios";

function Afficher() {
  const [projectId, setProjectId] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingTaskId, setDeletingTaskId] = useState(null);

  const onTaskUpdate = (updatedTask) => {
    console.log("Task updated:", updatedTask);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const idFromUrl = searchParams.get('projectId') || '';
    setProjectId(idFromUrl);
    console.log("Project ID from URL:", idFromUrl);
  
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/task/${idFromUrl}`);
        if (response.ok) {
          const data = await response.json();

          const formattedData = data.map(item => ({
            taskId: item._id,
            task: item.taskName,
            description: item.taskDescription,
            status: item.taskStatus ? "Active" : "Terminée", // Adjust as needed
            startDate: new Date(item.taskDate.startDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            }),

            endDate: new Date(item.taskDate.endDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            }),
            Employee: item.employees.length > 0 ? item.employees[0].name : "", // Access the name directly
          }));
  
          setRows(formattedData);
          console.log(formattedData);
        } else {
          console.error("Failed to fetch data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [projectId]);

  const confirmDelete = (taskId, targetIndex) => {
    setDeletingTaskId(taskId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteRow = (taskId, targetIndex) => {
    console.log('taskid pour le supprimer:', taskId);
    fetch(`http://localhost:3001/api/task/delete-task/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setDeleteDialogOpen(false);
        setRows(rows => rows.filter((_, idx) => idx !== targetIndex));
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error:', error);
        setDeleteDialogOpen(false);
      });
  };
  

  // const handleDeleteRow = (taskId,targetIndex) => {
  //   console.log('taskid pour le supprimer:',taskId)
  //   fetch(`http://localhost:3001/api/task/delete-task/${taskId}`, {
  //     method: 'DELETE',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data); 
  //       setDeleteDialogOpen(false);
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //   });
  // };
  
  const handleEditRow = (idx) => {
    setRowToEdit(idx);

    setModalOpen(true);
  };

  const handleSubmit = (newRow) => {
    rowToEdit === null
    ? setRows([...rows, newRow])
    : setRows(
      rows.map((currRow, idx) => {
        if (idx !== rowToEdit) return currRow;

        return newRow;
      })
    );
  };

  return (
    <div className="Afficher">
      <Table rows={rows}
      deleteRow={(taskId, targetIndex) => handleDeleteRow(taskId, targetIndex)}
       editRow={handleEditRow} />

      {modalOpen && (
        <Modal
        closeModal={() => {
          setModalOpen(false);
          setRowToEdit(null);
        }}
        onSubmit={handleSubmit}
        defaultValue={rowToEdit !== null && rows[rowToEdit]}
        onTaskUpdate={onTaskUpdate}
      />
      )}
    </div>
  );
}

export default Afficher;