import React from 'react';
import Forminput from '../form-input/form-input.component';
import './actor-form.styles.scss';

const ActorForm = ({
  actorFormFields,
  actorFieldsChangeHandler,
  handleCreateActorSubmit,
}) => {
  const { name, gender, dob, bio } = actorFormFields;
  console.log(actorFormFields);
  return (
    <div className="actor-form-container">
      <h3>create actor</h3>
      <form onSubmit={handleCreateActorSubmit}>
        <Forminput
          type="text"
          label="name"
          name="name"
          value={name}
          required
          onChange={actorFieldsChangeHandler}
        />
        <Forminput
          type="date"
          label="date of birth"
          name="dob"
          value={dob}
          required
          onChange={actorFieldsChangeHandler}
        />
        <Forminput
          type="text"
          required
          label="bio"
          name="bio"
          value={bio}
          onChange={actorFieldsChangeHandler}
        />
        <select
          name="gender"
          label="gender"
          value={gender}
          required
          onChange={actorFieldsChangeHandler}
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

export default ActorForm;
