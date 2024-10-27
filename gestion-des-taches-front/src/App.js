import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Idverification from './Components/Authentification/Idverification/Idverification';
import Login from './Components/Authentification/Login/Login';
import Signup from './Components/Authentification/SignUp/Signup';
import Widget from './Components/Centre/Widget/Widget';
import Home from './Components/Home/Home';
import Navbar from './Components/Navigation/Navbar/Navbar';
import Emp from './Components/Emp/Emp';
import Searchbar from './Components/Centre/Searchbar/Searchbar';
import Sidebar from './Components/Navigation/Sidebar1/Siderbar1';
import Tasks from './Components/Centre/Tasks/Tasks';
import Calendrie from './Components/Timesheet/Calendrie';
import Formulairemodif from './Components/Centre/Formulairemodif/Formulairemodif';
import Formulaire from './Components/Formulaire/Formulaire';
import Projet from './Components/Centre/Projet/Projet';
import Space from './Components/Centre/Space/Space';
import TasksProjet from './Components/Centre/TasksProjet/TasksProjet';
import TaskSearchbar from './Components/Centre/TaskSearchbar/TaskSearchbar';
import { UserProvider } from './Components/Authentification/Login/UserContext';
// import Todolist from './Components/Centre/Todolist/TodoList';
// import { Component } from 'lucide-react';
import Afficher from './Components/Afficher/Afficher';
import TaskChef from './Components/Centre/TaskChef/TaskChef';
import Calendriechef from './Components/Calendriechef/Calendriechef';
import Timesheet from './Components/Timesheet/Timesheet';
import List from './Components/Centre/List/List';

const App = () => {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  return (
    <Router>
      <UserProvider>
        <div className='App'>
          <Routes>
            <Route
              exact
              path="/"
              element={isLoggedIn === "true" ? <Signup /> : <Login />}
            />
            <Route path="/idverifivation" element={<Idverification />} />
            <Route path="/registre" element={<Signup />} />
            <Route path="/widget" element={<Widget />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Sidebar" element={<Sidebar />} />
            <Route path="/Navbar" element={<Navbar />} />
            <Route path="/Emp" element={<Emp />} />
            <Route path="/Searchbar" element={<Searchbar />} />
            <Route path="/Tasks" element={<Tasks />} />
            <Route path="/Calendrie" element={<Calendrie />} />
            <Route path="/Formulairemodif" element={<Formulairemodif />} />
            <Route path="/Formulaire" element={<Formulaire />} />
            <Route path="/Projet" element={<Projet />} />
            <Route path="/Space" element={<Space />} />
            <Route path="/TasksProjet" element={<TasksProjet />} />
            <Route path="/TaskSearchbar" element={<TaskSearchbar  />} />
            <Route path="/Afficher" element={<Afficher/>} />
            <Route path="/TaskChef" element={<TaskChef/>} />
            <Route path="/Calendriechef" element={<Calendriechef />} />
            <Route path="/Timesheet" element={<Timesheet />} />
            <Route path="/List" element={<List/>} />
            {/* <Route path="/Todolist" element={<Todolist />} /> */}

          </Routes>
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;
