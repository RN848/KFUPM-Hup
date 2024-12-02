import PropTypes from "prop-types"; // Import PropTypes
import Form from "react-bootstrap/Form";

export function NormInput({
  setInputs,
  inputs,
  input,
  type,
  label,
  placeholder,
  

}) {
  return (
    <Form.Group className="mb-3" controlId={`control-${input}`}>
      <Form.Label className="label">{label}</Form.Label>

      <Form.Control
        className="input"
        type={type}
        placeholder={placeholder}
        value={inputs[input] || ""}
        onChange={(e) => setInputs({ ...inputs, [input]: e.target.value })}
      />
    </Form.Group>
  );
}

NormInput.propTypes = {
  setInputs: PropTypes.func.isRequired,
  inputs: PropTypes.object.isRequired,
  input: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

NormInput.defaultProps = {
  placeholder: "",
};

export function Link({ setInputs, inputs, input, type, label, placeholder }) {
  return (
    <Form.Group className="mb-3" controlId={`control-${input}`}>
      <Form.Label className="label">{label}</Form.Label>

      <Form.Control
        className="input"
        type={type}
        value={inputs[input] || ""}
        onChange={(e) => setInputs({ ...inputs, [input]: e.target.value })}
        placeholder={placeholder}
      />
    </Form.Group>
  );
}

Link.propTypes = {
  setInputs: PropTypes.func.isRequired,
  inputs: PropTypes.object.isRequired,
  input: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

Link.defaultProps = {
  placeholder: "",
};

export function Textarea({ setInputs, inputs, input, label, placeholder }) {
  return (
    <Form.Group className="mb-3" controlId={`control-${input}`}>
      <Form.Label className="label">{label}</Form.Label>

      <Form.Control
        className="input text-area"
        as="textarea"
        rows={3}
        placeholder={placeholder}
        value={inputs[input] || ""}
        onChange={(e) => setInputs({ ...inputs, [input]: e.target.value })}
      />
    </Form.Group>
  );
}

Textarea.propTypes = {
  setInputs: PropTypes.func.isRequired,
  inputs: PropTypes.object.isRequired,
  input: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

Textarea.defaultProps = {
  placeholder: "",
};

export function Radio({ inputs, setInputs, input, label, radio1, radio2 }) {
  const handleRadioChange = (value) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [input]: value,
    }));
  };

  return (
    <>
      <Form.Label className="label">{label}</Form.Label>
      <div className="mb-3">
        <Form.Check
          className={"radio"}
          inline
          label={radio1}
          name={input}
          type="radio"
          id={`inline-${input}-1`}
          checked={inputs[input] === radio1}
          onChange={() => handleRadioChange(radio1)}
        />
        <Form.Check
          className={"radio"}
          inline
          label={radio2}
          name={input}
          type="radio"
          id={`inline-${input}-2`}
          checked={inputs[input] === radio2}
          onChange={() => handleRadioChange(radio2)}
        />
      </div>
    </>
  );
}

Radio.propTypes = {
  inputs: PropTypes.object.isRequired,
  setInputs: PropTypes.func.isRequired,
  input: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  radio1: PropTypes.string.isRequired,
  radio2: PropTypes.string.isRequired,
};

export function Uplode({ setInputs, inputs, input, label, placeholder }) {
  return (
    <div className="uplode">
      <Form.Label className="label">{label}</Form.Label>
      <div>
        <Form.Control
          className={"input file"}
          disabled
          type="text"
          placeholder={inputs[input] || "No file chosen"}
        />
        <div>
          <label htmlFor="inputField" className={"inputs-btn btn btn-info"}>
            Upload
          </label>
          <input
            type="file"
            id="inputField"
            style={{ display: "none" }}
            onChange={(e) =>
              setInputs({ ...inputs, [input]: e.target.value }) // Update file path
            }
          />
        </div>
      </div>
    </div>
  );
}

Uplode.propTypes = {
  setInputs: PropTypes.func.isRequired,
  inputs: PropTypes.object.isRequired,
  input: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

Uplode.defaultProps = {
  placeholder: "",
};
