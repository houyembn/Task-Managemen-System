import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';

function TaskSearchbar({ projectId, onChange },props) {
  const [value, setValue] = useState(null);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/projet/project-employee-names/${projectId}`)
      .then((response) => {
        const optionsData = Object.values(response.data).map(emp => ({ value: emp._id, label: emp.name }));
        setOptions(optionsData);
      })
      .catch((error) => console.error('Error fetching options', error));
  }, []);

  const handleChange = (selectedOptions) => {
    setValue(selectedOptions);
    console.log("Selected Employees:", selectedOptions);
    onChange(selectedOptions); 
  };

  return (
    <div style={{ height: '2vw', width: '20.5vw' }}>
      <Select
        options={options}
        defaultValue={value}
        placeholder='Inviter les employées'
        onChange={handleChange}
        isMulti
        isSearchable
        noOptionsMessage={() => "Aucune employée trouvée..."}
        styles={{
          clearIndicator: () => ({
            color: "#512da8"
          }),
          menu: provided => ({
            ...provided,
            maxHeight: '200px',
            overflowY: 'auto',
          }),
          control: (provided, state) => ({
            ...provided,
            outline: 'none',
            borderRadius: '5px',
            border: `2px solid ${state.isFocused ? '#0A1172' : 'rgba(16, 16, 183, 0.468)'}`,
            paddingLeft: '1.1vw',
            fontSize: '1vw',
            borderBottomWidth: '2px',
            '&:focus': {
              border: `2px solid #0A1172`,
            },
          }),
          input: provided => ({
            ...provided,
            outline: 'none',
          }),
        }}
      />
    </div>
  );
}

export default TaskSearchbar;
