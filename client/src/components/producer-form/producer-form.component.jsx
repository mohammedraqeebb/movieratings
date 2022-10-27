import React from 'react';
import Forminput from '../form-input/form-input.component';

import './producer-form.styles.scss';

const ProducerForm = ({
  producerFormFields,
  producerFieldsChangeHandler,
  handleCreateProducerSubmit,
}) => {
  const { name, gender, dob, bio } = producerFormFields;
  return (
    <div className="producer-form-container">
      <h3>Create Producer</h3>
      <form onSubmit={handleCreateProducerSubmit}>
        <Forminput
          type="text"
          label="name"
          name="name"
          value={name}
          required
          onChange={producerFieldsChangeHandler}
        />
        <Forminput
          type="date"
          label="date of birth"
          name="dob"
          value={dob}
          required
          onChange={producerFieldsChangeHandler}
        />
        <Forminput
          type="text"
          required
          label="bio"
          name="bio"
          value={bio}
          onChange={producerFieldsChangeHandler}
        />
        <select
          name="gender"
          label="gender"
          value={gender}
          required
          onChange={producerFieldsChangeHandler}
        >
          <option value="">Please choose an option</option>
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
        <button>submit</button>
      </form>
    </div>
  );
};

export default ProducerForm;
