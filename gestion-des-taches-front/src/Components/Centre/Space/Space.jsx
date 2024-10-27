import React from 'react';
import { DatePicker, Space as AntdSpace } from 'antd';
const { RangePicker } = DatePicker;

const CustomSpace = () => {
  return (
    <div>
      <AntdSpace direction="vertical" size={60} style={{ borderColor: '#ff0000' }}>
        <RangePicker />
      </AntdSpace>
    </div>
  );
}

export default CustomSpace;
