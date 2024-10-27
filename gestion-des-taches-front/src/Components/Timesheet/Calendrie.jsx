import React, { useState } from 'react';
import { ScheduleComponent, Inject, Day, Week, WorkWeek, Month, Agenda } from '@syncfusion/ej2-react-schedule';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import './Timesheet.css';
import Sidebar1 from '../Navigation/Sidebar1/Siderbar1';
import user from '../../images/user.png';
import './../Formulaire/Formulaire'
import { PlusOutlined, SnippetsOutlined ,LogoutOutlined, UserOutlined, BellOutlined, ProjectOutlined, TeamOutlined, CalendarOutlined, SearchOutlined, BulbOutlined, FullscreenOutlined, UnorderedListOutlined } from '@ant-design/icons';

class Calendrie extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            taskData: {},
        };

        this.localData = {
            dataSource: [{
                EndTime: new Date(2023, 0, 11, 6, 30),
                StartTime: new Date(2023, 0, 11, 4, 0)
            }]
        };

        this.remoteData = new DataManager({
            url: 'https://js.syncfusion.com/demos/ejservices/api/Schedule/LoadData',
            adaptor: new WebApiAdaptor(),
            crossDomain: true
        });
    }

    handleSaveClick = () => {

        console.log('Task data to be saved:', this.state.taskData);
    };

    handlePopupClose = (args) => {
        if (args.type === 'QuickInfo' || args.type === 'Editor') {
          // Update taskData state with the modified data
          this.setState({
            taskData: args.data[0] // Assuming only one task is being modified
          }, () => {
            // Save the data after setting the state
            this.handleSaveClick();
          });
        }
    };

  render() {
    return (
        <div className='home'>
            <div className="page-container">
                <Sidebar1 />
                <div className="navbar">
                    <div className="wrapper">
                        <div className="titre-menu">
                        <CalendarOutlined className="icon-menu"/>
                        <span> Timesheet</span>
                        </div>
                        
                        <div className="items">
                            {/* <div className="item">
                                <BulbOutlined className="icon" />
                            </div>
                            <div className="item">
                                <FullscreenOutlined className="icon" />
                            </div>
                            <div className="item">
                                <BellOutlined className="icon" />
                                <div className="counter">1</div>
                            </div>
                            <div className="item">
                                <UnorderedListOutlined className="icon" />
                            </div> */}
                            
                            <div className="item">
                                <span className='nom_prenom_user'>Nom et Prenom</span>
                            </div> 

                            <div className="item">
                                <img  src={user} alt="PlaniPro Logo" className="imageuser"/>  
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* <div className="amplimentation-calendrie">
                <div className="timesheet-container">
                    <table>
                    <tbody>
                        <tr>
                        <td colSpan="7">
                            <ScheduleComponent currentView='Month'
                            eventSettings={{ dataSource: this.remoteData }} selectedDate={new Date(2023, 1, 1)}>
                            <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
                            </ScheduleComponent>
                        </td>
                        </tr>
                    </tbody>
                    </table>
                </div>
            </div> */}

            <div className="amplimentation-calendrie">
                <div className="timesheet-container">
                    <table>
                        <tbody>
                            <tr>
                            <td colSpan="7">
                            <ScheduleComponent
                                currentView='Month'
                                eventSettings={{ dataSource: this.remoteData }}
                                selectedDate={new Date(2023, 1, 1)}
                                actionComplete={this.handleSaveClick} // Remove the curly braces and spread operator
                                >
                                <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
                                </ScheduleComponent>
                            </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
  }
}

export default Calendrie;



// import React, { useState } from 'react';
// import { ScheduleComponent, Inject, Day, Week, WorkWeek, Month, Agenda } from '@syncfusion/ej2-react-schedule';
// import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
// import './Timesheet.css';
// import Sidebar1 from '../Navigation/Sidebar1/Siderbar1';
// import user from '../../images/user.png';
// import { CalendarOutlined, BulbOutlined, FullscreenOutlined, BellOutlined, UnorderedListOutlined } from '@ant-design/icons';

// const Calendrie = () => {
//   const [taskData, setTaskData] = useState({});
//   const localData = {
//     dataSource: [
//       {
//         EndTime: new Date(2023, 0, 11, 6, 30),
//         StartTime: new Date(2023, 0, 11, 4, 0),
//       },
//     ],
//   };

//   const remoteData = new DataManager({
//     url: 'https://js.syncfusion.com/demos/ejservices/api/Schedule/LoadData',
//     adaptor: new WebApiAdaptor(),
//     crossDomain: true,
//   });

//   const handleSaveClick = () => {
//     console.log('Task data to be saved:', taskData);
//   };

//   const handlePopupClose = (args) => {
//     if (args.type === 'QuickInfo' || args.type === 'Editor') {
//       // Update taskData state with the modified data
//       setTaskData(args.data[0]); // Assuming only one task is being modified
//       // Save the data after setting the state
//       handleSaveClick();
//     }
//   };

//   return (
//     <div className='home'>
//       <div className='page-container'>
//         <Sidebar1 />
//         <div className='navbar'>
//           <div className='wrapper'>
//             <div className='titre-menu'>
//               <CalendarOutlined className='icon-menu' />
//               <span> Timesheet</span>
//             </div>

//             <div className='items'>
//               <div className='item'>
//                 <span className='nom_prenom_user'>Nom et Prenom</span>
//               </div>

//               <div className='item'>
//                 <img src={user} alt='PlaniPro Logo' className='imageuser' />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className='amplimentation-calendrie'>
//         <div className='timesheet-container'>
//           <table>
//             <tbody>
//               <tr>
//                 <td colSpan='7'>
//                   <ScheduleComponent
//                     currentView='Month'
//                     eventSettings={{ dataSource: remoteData }}
//                     selectedDate={new Date(2023, 1, 1)}
//                     actionComplete={handleSaveClick}
//                   >
//                     <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
//                   </ScheduleComponent>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Calendrie;
