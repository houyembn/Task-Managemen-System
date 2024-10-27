import React, { useContext } from 'react';
import "./Navbar.css"
import { DarkModeContext } from "../../Context/darkModeContext";
import user from '../../../images/user.png';
import { SearchOutlined,BulbOutlined,FullscreenOutlined,BellOutlined,UnorderedListOutlined} from '@ant-design/icons';
import { Input } from 'antd';
const { Search } = Input;

export const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="navbar">
      <div className="wrapper">
        {/* <div className="search">
          <input type="text" placeholder="Search..."/>
          <SearchOutlined className="search-icon"/>
        </div> */}
        
        <div className="items">
          <div className="item">
            <BulbOutlined className="icon"
            onClick={() => dispatch({ type: "TOGGLE" })}/>
          </div>

          <div className="item">
            <FullscreenOutlined className="icon"/>
          </div>

          <div className="item">
            <BellOutlined className="icon"
            onClick={() => dispatch({ type: "TOGGLE" })}/>
            <div className="counter">1</div>
          </div>
          
          <div className="item">
            <UnorderedListOutlined className="icon"
            onClick={() => dispatch({ type: "TOGGLE" })}/>
          </div>

          <div className="item">
            <img  src={user} alt="PlaniPro Logo" className="imageuser"/>  
          </div>
        </div>
      </div>
    </div>
   
  );
}
export default Navbar;