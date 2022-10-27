import './form-input.styles.scss';

const Forminput = ({ label, ...otherProps }) => {
  return (
    <div className="group">
      {label && (
        <label
          className={`${
            otherProps.value !== '' ? 'shrink' : ''
          } form_input_label`}
        >
          {label}
        </label>
      )}
      <input className="form_input" {...otherProps} />
    </div>
  );
};
export default Forminput;
