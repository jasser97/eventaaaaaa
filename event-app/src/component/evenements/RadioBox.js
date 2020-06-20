import React, { useState } from "react";
import { Collapse, Radio } from "antd";

const { Panel } = Collapse;

const RadioBox = (props) => {
  const [Value, setValue] = useState(0);
  const renderRadioBox = () =>
    props.Start_date &&
    props.Start_date.map((value) => (
      <Radio key={value._id} value={`${value._id}`}>
        {value.name}
      </Radio>
    ));
  const handleChange = (e) => {
    setValue(e.target.value);
    props.handlefiltres(e.target.value);
  };
  return (
    <div>
      <Collapse defaultActiveKey={["0"]}>
        <Panel header="Date" key="1">
          <Radio.Group onChange={handleChange} value={Value}>
            {renderRadioBox()}
          </Radio.Group>
        </Panel>
      </Collapse>
    </div>
  );
};

export default RadioBox;
