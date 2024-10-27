import React, { useState } from 'react';
import { Modal, DatePicker, Input } from 'antd';

const Modifier = ({ visible, onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('en cours');
  const [deadline, setDeadline] = useState('');

  const handleModifier = () => {
    // Ajoutez la logique de mise à jour du projet ici
    console.log('Projet mis à jour:', name, description, status, deadline);
    // Fermez la fenêtre modale
    onClose();
  };

  return (
    <Modal
      title="Modifier le projet"
      visible={visible}
      onCancel={onClose}
      onOk={handleModifier}
    >
      <div className="mb-3">
        <label>Nom du projet</label>
        <Input
          placeholder="Entrez le nom du projet"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label>Description</label>
        <Input.TextArea
          placeholder="Entrez la description du projet"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label>Status</label>
        <Input
          placeholder="Entrez le statut du projet"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label>Date limite</label>
        <DatePicker
          className="form-control"
          placeholder="Sélectionnez la date limite"
          value={deadline}
          onChange={(date, dateString) => setDeadline(dateString)}
        />
      </div>
    </Modal>
  );
};

export default Modifier;

///*******
// <div className='widget-container'>
//      {/* Display projects */}
//      {projects.map((project) => (
//         <div key={project._id} className="widget">
//           <div className="left">
//             <span className="title">{project.projetName}</span>
//             <span className="descp">{project.projetDescription}</span>
//             {/* <span className="emp">
            //   Start Date: {moment(project.projetDate.startDate).format('YYYY-MM-DD')} | 
            //   End Date: {moment(project.projetDate.endDate).format('YYYY-MM-DD')}
            // </span> */}
            // <span className="ll">{project.employees}</span>

//             <span className="status">{project.projetStatus ? 'Actif' : 'Terminé'}</span>

//           </div>
//           <div className="right">
//            {/* Inside your project mapping */}
//            <Popconfirm
//       title="Delete the task"
//       description="Are you sure to delete this task?"
//       icon={
//         <QuestionCircleOutlined
//           style={{
//             color: 'red',
//           }}
//         />
//       }
//       onConfirm={handleConfirm}
//       okText="Yes"
//       cancelText="No"
//     >
//     <Button className="supp" icon={<DeleteOutlined />} onClick={() => handleDeleteProject(project._id)}/>
//     </Popconfirm>

//     <Button
//                 type="link"
//                 className="modif"
//                 onClick={() => {
//                   setSelectedProjet(project);
//                   setIsUpdateModalVisible(true);
//                 }}
//                 icon={<FormOutlined />}
//               />
//           </div>
//         </div>
//       ))}

// {/* Display the Formulairemodif modal when isUpdateModalVisible is true */}
//         {isUpdateModalVisible && (
//           <Formulairemodif
//             visible={isUpdateModalVisible}
//             onClose={() => setIsUpdateModalVisible(false)}
//             onAddProjet={(formData) => {
//               // Handle the callback logic if needed
//               console.log('Callback function when adding project is triggered with data:', formData);
//             }}
//             selectedProjet={selectedProjet} // Pass the actual selected project data here
//           />
//         )}

//         {/* ... rest of your component code ... */}


//       </div>

//     </div>
//   );




// import React, { useState } from 'react';
// import { Modal,DatePicker } from 'antd';

// const Modifier = ({ visible, onClose, onAddPatient }) => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [telephone, setTelephone] = useState('');
//   const [dataNaissance, setNaissance] = useState('');
//   const [imageFile, setImageFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setImageFile(file);
//   };
//   const handleAddPatient = (e) => {
//     e.preventDefault();

//     console.log(name, email, password, telephone,dataNaissance); 
//        setError(null);
//        setLoading(true);

//     const formData = new FormData();
//     formData.append('name', name);
//     formData.append('email', email);
//     formData.append('password', password);
//     formData.append('datanaissance', dataNaissance);
//     formData.append('telephone', telephone);
//     formData.append('photo', imageFile);

//     fetch('http://localhost:3001/routes/api/patient/ajouterPatient', {
//       method: 'POST',
//       body: formData,
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data, 'userRegister');
//         alert(data.msg);
//         if (data.status === 'ok') {
//          // Close the modal
//          onClose();


//          // Update the table by calling the onAddPatient function
//          onAddPatient();
//         }

//       })
//       .catch((error) => {
//         console.error('Error during registration:', error);
//       })
//       .finally(() => {
//         setLoading(false);

//       });

//   };

//   return (
//     <Modal
//       title="Ajouter un patient"
//       visible={visible}
//       onCancel={onClose}
      
//     >
//          <form onSubmit={handleAddPatient}>
         
        
//           <div className="mb-3">
//             <label>Nom</label>
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Entrer Votre Nom"
//               onChange={(e) => setName(e.target.value)}
//             />
//           </div>
//           <div className="mb-3">
//             <label>@ Email</label>
//             <input
//               type="email"
//               className="form-control"
//               placeholder="Entrer Votre Email"
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//           <div className="mb-3">
//             <label>Mot De Passe</label>
//             <input
//               type="password"
//               className="form-control"
//               placeholder="Entrer Votre Mot De Passe"
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
         
//               <div className="mb-3">
//                 <label>Téléphone</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Entrer Votre Téléphone"
//                   onChange={(e) => setTelephone(e.target.value)}
//                 />
//               </div>
//               <div className="mb-3">
//                <label>Date de Naissance</label>
//                <DatePicker className="form-control"
//                  placeholder="Sélectionnez la date de naissance"
//                    onChange={(date, dateString) => setNaissance(dateString)}
//                />
//               </div>
//               <div className="mb-3">
//                 <label>Photo</label>
//                  <input
//                      type="file"
//                      name="image"
//                      onChange={handleImageChange}
//                  />
//              </div>
//              <div className="d-grid">
//                <button type="submit" className="btn btn-primary">
//                  Ajouter
//                </button>
//             </div>

//         </form>
      
//     </Modal>
//   );
// };


// export default Modifier;


// import React, { useState } from 'react';
// import { Modal,DatePicker } from 'antd';

// const Modifier = ({ visible, onClose, onAddPatient }) => {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [telephone, setTelephone] = useState('');
//     const [dataNaissance, setNaissance] = useState('');
//     const [imageFile, setImageFile] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);


//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         setImageFile(file);
//     };
//     const handleAddPatient = (e) => {
//         e.preventDefault();

//     console.log(name, email, password, telephone,dataNaissance); 
//        setError(null);
//        setLoading(true);

//     const formData = new FormData();
//     formData.append('name', name);
//     formData.append('email', email);
//     formData.append('password', password);
//     formData.append('datanaissance', dataNaissance);
//     formData.append('telephone', telephone);
//     formData.append('photo', imageFile);

//     fetch('http://localhost:3001/routes/api/patient/ajouterPatient', {
//       method: 'POST',
//       body: formData,
//     })
//     .then((res) => res.json())
//     .then((data) => {
//         console.log(data, 'userRegister');
//         alert(data.msg);
//         if (data.status === 'ok') {
//             // Close the modal
//             onClose();

//             // Update the table by calling the onAddPatient function
//             onAddPatient();
//         }

//     })
//     .catch((error) => {
//         console.error('Error during registration:', error);
//     })
    
//     .finally(() => {
//         setLoading(false);

//     });
// };

// return (
//     <Modal
//       title="Ajouter un patient"
//       visible={visible}
//       onCancel={onClose}
      
//     >
//     <form onSubmit={handleAddPatient}> 
        
//         <div className="mb-3">
//             <label>Nom</label>
//             <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Entrer Votre Nom"
//                 onChange={(e) => setName(e.target.value)}
//             />
//         </div>
//         <div className="mb-3">
//             <label>@ Email</label>
//             <input
//                 type="email"
//                 className="form-control"
//                 placeholder="Entrer Votre Email"
//                 onChange={(e) => setEmail(e.target.value)}
//             />
//         </div>
//         <div className="mb-3">
//             <label>Mot De Passe</label>
//             <input
//                 type="password"
//                 className="form-control"
//                 placeholder="Entrer Votre Mot De Passe"
//                 onChange={(e) => setPassword(e.target.value)}
//             />
//         </div>
         
//               <div className="mb-3">
//                 <label>Téléphone</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Entrer Votre Téléphone"
//                   onChange={(e) => setTelephone(e.target.value)}
//                 />
//               </div>
//               <div className="mb-3">
//                <label>Date de Naissance</label>
//                <DatePicker className="form-control"
//                  placeholder="Sélectionnez la date de naissance"
//                    onChange={(date, dateString) => setNaissance(dateString)}
//                />
//               </div>
//               <div className="mb-3">
//                 <label>Photo</label>
//                  <input
//                      type="file"
//                      name="image"
//                      onChange={handleImageChange}
//                  />
//              </div>
//              <div className="d-grid">
//                <button type="submit" className="btn btn-primary">
//                  Ajouter
//                </button>
//             </div>


              
       
         
//         </form>
      
//     </Modal>
//   );
// };


// export default Modifier;





// AddPatientCard.js

/*import React, { useState } from 'react';
import { Modal, Form, Input, Button, Upload,DatePicker } from 'antd';
import {UploadOutlined} from '@ant-design/icons';
const AddPatientCard = ({ visible, onClose, onAddPatient }) => {
  const [form] = Form.useForm();

  const handleAddPatient = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        onAddPatient(values);
      })
      .catch((errorInfo) => {
        console.error('Validation failed:', errorInfo);
      });
  };

  return (
    <Modal
      title="Ajouter un patient"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Annuler
        </Button>,
        <Button key="submit" type="primary" onClick={handleAddPatient}>
          Ajouter
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
      <Form.Item label="Image" name="image" rules={[{ required: true, message: 'Veuillez sélectionner une image' }]}>
          <Upload>
            <Button icon={<UploadOutlined />}>Sélectionner une image</Button>
          </Upload>
        </Form.Item>
        <Form.Item label="Nom" name="name" rules={[{ required: true, message: 'Veuillez entrer le nom du patient' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email" rules={[{ type: 'email', message: 'Veuillez entrer une adresse email valide' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Mot de Passe" name="mdp" rules={[{ type: 'mdp', message: 'Veuillez entrer une adresse mot de passe valide' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Télephone" name="telephone" rules={[{ type: 'telephone', message: 'Veuillez entrer une valeur valide' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Date de Naissance" name="birthdate">
          <DatePicker className="form-control" placeholder="Sélectionnez la date de naissance" />
        </Form.Item>

        
      </Form>
    </Modal>
  );
};

export default AddPatientCard;*/


// AddPatientCard.js

// import React, { useState } from 'react';
// import { Modal,DatePicker } from 'antd';
// const AddPatientCard = ({ visible, onClose, onAddPatient }) => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [telephone, setTelephone] = useState('');
//   const [dataNaissance, setNaissance] = useState('');
//   const [imageFile, setImageFile] = useState(null);


//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setImageFile(file);
//   };
//   const handleAddPatient = (e) => {
//     e.preventDefault();

//     console.log(name, email, password, telephone,dataNaissance); 
     

//     const formData = new FormData();
//     formData.append('name', name);
//     formData.append('email', email);
//     formData.append('password', password);
//     formData.append('datanaissance', dataNaissance);
//     formData.append('telephone', telephone);
//     formData.append('photo', imageFile);




//     fetch('http://localhost:3001/routes/api/patient/ajoutPatient', {
//       method: 'POST',
//       body: formData,
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data, 'userRegister');
//         alert(data.msg);
//         if (data.status === 'ok') {
//           // Rediriger vers la page de connexion
//         }


//       })
//       .catch((error) => {
//         console.error('Error during registration:', error);
//       });


//   };
   

//   return (
//     <Modal
//       title="Ajouter un patient"
//       visible={visible}
//       onCancel={onClose}
      
//     >
//          <form onSubmit={handleAddPatient}>
         
        
//           <div className="mb-3">
//             <label>Nom</label>
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Entrer Votre Nom"
//               onChange={(e) => setName(e.target.value)}
//             />
//           </div>
//           <div className="mb-3">
//             <label>@ Email</label>
//             <input
//               type="email"
//               className="form-control"
//               placeholder="Entrer Votre Email"
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//           <div className="mb-3">
//             <label>Mot De Passe</label>
//             <input
//               type="password"
//               className="form-control"
//               placeholder="Entrer Votre Mot De Passe"
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
         
//               <div className="mb-3">
//                 <label>Téléphone</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Entrer Votre Téléphone"
//                   onChange={(e) => setTelephone(e.target.value)}
//                 />
//               </div>
//               <div className="mb-3">
//                <label>Date de Naissance</label>
//                <DatePicker className="form-control"
//                  placeholder="Sélectionnez la date de naissance"
//                    onChange={(date, dateString) => setNaissance(dateString)}
//                />
//               </div>
//               <div className="mb-3">
//                 <label>Photo</label>
//                  <input
//                      type="file"
//                      name="image"
//                      onChange={handleImageChange}
//                  />
//              </div>

              
       
         
//         </form>
      
//     </Modal>
//   );
// };

// export default AddPatientCard;



// import React, { useState, useEffect } from "react";
// import { Input, Button, Flex,Tooltip, Space} from 'antd';
// import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

// import "./liste.css";
// import AddPatientCard from "./AddPatientCard";
// import EditPatientForm from "./EditPatientForm";
// const PatientListe = () =>{
//     const [patients, setpatients] = useState([]) 
//     const [input, setInput] = useState("")
//     const [isAddPatientModalVisible, setIsAddPatientModalVisible] = useState(false)    /*partie card ajout */
//     const [editedPatient, setEditedPatient] = useState(null);
//     const [isEditFormVisible, setIsEditFormVisible] = useState(false);

    
//     const handleAddPatient = (patientData) => {
//       // Handle the logic to add a new patient using the provided data
//       console.log('Adding new patient:', patientData);
  
  
//       // Close the modal after adding the patient
//       setIsAddPatientModalVisible(false);

//     };

//    //partie search
//    const fetchData = (value) => {
//     let apiUrl = 'http://localhost:3001/routes/api/patient/patientListe';
//      // If the search value is provided, append it to the API URL
//       if (value && value.trim() !== "") {
//       apiUrl += ?search=${encodeURIComponent(value)};
//        }
    
//     fetch(apiUrl)

//     .then((Response) => Response.json())
//     .then((json) => {
//         setpatients(json); // Update the state with the fetched data

//         })
        
//       .catch((error) => console.error('Error fetching patients', error));


// };
// const handleChange = (value) => {
//   setInput(value);
//   fetchData(value);
// }
   

   
   
   
   
//     useEffect(() => {
//        fetch("http://localhost:3001/routes/api/patient/patientListe")
//        .then(Response => Response.json())
//        .then(data => setpatients(data))
//        .catch(error => console.error('Error fetching patients', error));

//     } , []);

//     /* partie supprimer */

//     const handleDelete = (patientId) => {
//       // Make a DELETE request to your server to delete the patient
//       fetch(http://localhost:3001/routes/api/patient/supprimer/${patientId}, {
//         method: "DELETE",
//       })
//         .then((response) => 
//           response.json())
//         .then((data) => {
//           // Update the state with the new list of patients after deletion
//           setpatients(data);
//         })
//         .catch((error) => console.error('Error deleting patient', error));
//     };
  

//      /*partie modifier*/
//      const handleEdit = (patient) => {
//       setEditedPatient(patient);
//       setIsEditFormVisible(true);

//       };

//       const handleSaveEditedPatient = (id, editedData) => {
//         fetch(http://localhost:3001/routes/api/patient/modifier/${id}, {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(editedData),
//         })
//           .then((response) => response.json())
//           .then((data) => {
//             // Update the state with the new list of patients after modification
//             setpatients(data);
//             setEditedPatient(null); // Hide the edit form
//           })
//           .catch((error) => console.error('Error updating patient', error));
//       };
      
      
    

//     return (
//     <div className="maindiv">
//       <h1>Liste des patients</h1>

//       <div className="partie1">

//         <div className='input-wrapper'> 
//            <Input placeholder="Chercher..."
//            value={input}
//            onChange={(e) => handleChange(e.target.value)} />
//         </div>
//         <div className="btAjouter">
   
//            <Flex wrap="wrap" gap="small">
//            <Tooltip title="Patient">
//                <Button type="primary"  onClick={() => setIsAddPatientModalVisible(true)} > Ajouter  </Button>
//             </Tooltip>
//            </Flex>
//         </div>
       
         
//       </div>

//       <div className="table-responsive">
//       <table>
//         <thead>
//           <tr>
//           <th>Photo</th>

//             <th>Nom</th>
//             <th>Email</th>
//             <th>Téléphone</th>
//             <th>Date de Naissance</th>
//             <th>Actions</th>



//             {/* Autres colonnes */}
//           </tr>
//         </thead>
//         <tbody>
            

//           {patients.length > 0 ? (
//           patients.map(patient => (
//             <tr key={patient._id}>
//               <td className="image">          
//               <img src={`http://localhost:3001/${patient.image}`} alt={patient.name} className="patient-photo" />
//               </td>
//               <td>{patient.name}</td>
//               <td>{patient.email}</td>
//               <td>{patient.telephone}</td>
//               <td>{patient.DateNaissance}</td>

//               <td className="deuxbutton">
//                 <Space>
//                  <Button type="link" onClick={() =>  handleEdit(patient)} icon={<EditOutlined />} />
//                  <Button type="link" onClick={() => handleDelete(patient._id)} icon={<DeleteOutlined />} />
//                 </Space>
//               </td>
          
//             </tr>
//           ))
//         ) : (
//           <tr className="msgNotData">
//             <td colSpan="5">Aucun patient...</td> 
//           </tr>
//         )}

//              {/* Render the edit form for the selected patient */}
//             {editedPatient && (
//              <tr>
//                <td colSpan="5">
//                 <EditPatientForm
//                    editedPatient={editedPatient}
//                    onSave={(id, editedData) => handleSaveEditedPatient(id, editedData)}
//                    onCancel={() => {
//                      setEditedPatient(null);
//                      setIsEditFormVisible(false);
//                    }}
//                  />
//                </td>
//              </tr>
//          )}    



//         </tbody>
//       </table>
//       </div>
//       <AddPatientCard
//         visible={isAddPatientModalVisible}
//         onClose={() => setIsAddPatientModalVisible(false)}
//         onAddPatient={handleAddPatient}
//       />




      
//     </div>
//     )
// }

// export default PatientListe;