import React from 'react';

const Form = ({ formData, onChange, onAdd }) => {
  return (
    <div className='container'>
      <label htmlFor="yourname">What's your name? </label>
      <input 
        type='text' 
        id='yourname'
        name='yourname'
        value={formData.yourname}
        onChange={onChange} 
      />
      <br/> <br/>
      
      <label htmlFor="assignmenttype">Assignment Type: </label>
      <select 
        name="assignmenttype" 
        id="assignmenttype" 
        value={formData.assignmenttype} 
        onChange={onChange}
      >
        <option value="">--Please choose an option--</option>
        <option value="hw">hw</option>
        <option value="quiz">quiz</option>
        <option value="test">test</option>
        <option value="project">project</option>
      </select>
      <br/><br/>
      
      <label htmlFor="gradeletter">Letter Grade: </label>
      <select 
        name="gradeletter" 
        id="gradeletter" 
        value={formData.gradeletter}
        onChange={onChange}
      >
        <option value="">--Please choose an option--</option>
        <option value="a">a</option>
        <option value="b">b</option>
        <option value="c">c</option>
        <option value="d">d</option>
      </select>
      <br/><br/>
      
      <label htmlFor="cmts">Any comments? </label>
      <textarea 
        id="cmts" 
        name="cmts" 
        value={formData.cmts}
        onChange={onChange}
      ></textarea>
      <br/><br/>
      
      <button onClick={onAdd}>add</button>
    </div>
  );
};

export default Form
