import React, { useState } from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import "./Table.css";

export const Table = ({ rows, deleteRow, editRow , handleDelete }) => {

  const [deletingTaskId, setDeletingTaskId] = useState(null);

   const confirmDelete = (taskId, targetIndex) => {
    setDeletingTaskId(taskId);
    deleteRow(taskId, targetIndex);
    setDeletingTaskId(null); 
  };

  // const handleDeleteRow = (taskId, targetIndex) => {
  //   confirmDelete(taskId, targetIndex);
  // };

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>Nom</th>
            <th className="expand">Description</th>
            <th>startDate</th>
            <th>endDate</th>
            <th>Employée</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
           const statusText = (row.status && row.status.charAt(0).toUpperCase()) + (row.status && row.status.slice(1));

            return (
              <tr key={idx}>
                <td>{row.task}</td>
                <td className="expand">{row.description}</td>
                <td className="expand">{row.startDate}</td>
                <td className="expand">{row.endDate}</td>
                <td className="expand">{row.Employee}</td>
                <td>
                  <span className={`label label-${row.status}`}>
                    {statusText}
                  </span>
                </td>
                <td className="fit">
                  <span className="actions">
                    {/* <BsFillTrashFill
                      className="delete-btn"
                      onClick={() => deleteRow(row.taskId,idx)}
                    /> */}

                    {/* <BsFillTrashFill
                      className="delete-btn"
                      onClick={() => handleDeleteRow(row.taskId, idx)}
                    /> */}

                    <BsFillTrashFill
                      className="delete-btn"
                      onClick={() => confirmDelete(row.taskId, idx)}
                    />

                    <BsFillPencilFill
                      className="edit-btn"
                      title="Modifier la Tâche"
                      onClick={() => editRow(idx)}
                    />
                    
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>

        {deletingTaskId && (
          <div className="delete-dialog">
            <p>Are you sure you want to delete this task?</p>
            <button onClick={() => confirmDelete(deletingTaskId)}>Yes</button>
            <button onClick={() => setDeletingTaskId(null)}>No</button>
          </div>
        )}

      </table>
    </div>
  );
};