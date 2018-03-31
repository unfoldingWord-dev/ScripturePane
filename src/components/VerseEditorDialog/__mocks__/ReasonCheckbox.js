import React from 'react';

const mockCheckboxRender = jest.fn((props) => {
  const {reason, label, selectedReasons, onCheck} = props;
  return (
    <div>
      <input type="checkbox"
             onChange={onCheck}
             checked={selectedReasons.includes(reason)}
             name={reason}/> {label}
    </div>
  );
});

const mock = jest.fn().mockImplementation((props) => {
  return {
    render: mockCheckboxRender.bind(null, props)
  };
});

export default mock;
