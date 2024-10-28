import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export function NormInput({
  setInputs,
  inputs,
  input,
  type,
  label,
  placeholder,
}) {
  return (
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <Form.Label className="label">{label}</Form.Label>

      <Form.Control
        className="input"
        type={type}
        placeholder={placeholder}
        value={inputs[input]}
        onChange={(e) => setInputs({ ...inputs, [input]: e.target.value })}
      />
    </Form.Group>
  );
}

export function Link({ setInputs, inputs, input, type, label, placeholder }) {
  return (
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <Form.Label className="label">{label}</Form.Label>

      <Form.Control className="input" type={type} value={inputs[input]} />
    </Form.Group>
  );
}

export function Textarea({ setInputs, inputs, input, label, placeholder }) {
  return (
    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
      <div>
        <Form.Label className="label">{label}</Form.Label>

        <Form.Control
          className="input , text-area"
          as="textarea"
          rows={3}
          placeholder={placeholder}
          value={inputs[input]}
          onChange={(e) => setInputs({ ...inputs, [input]: e.target.value })}
        />
      </div>
    </Form.Group>
  );
}

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
          className={"rodio"}
          inline
          label={radio1}
          name={input}
          type="radio"
          id={`inline-${input}-1`}
          checked={inputs[input] == radio1}
          onChange={() => handleRadioChange(radio1)}
        />
        <Form.Check
          className={"rodio"}
          inline
          label={radio2}
          name={input}
          type="radio"
          id={`inline-${input}-2`}
          checked={inputs[input] == radio2}
          onChange={() => handleRadioChange(radio2)}
        />
      </div>
    </>
  );
}

// export function Radio({ setInputs, inputs, input, label, placeholder }) {
//     return (

//     );
//   }

export function Uplode({ setInputs, inputs, input, label, placeholder }) {
  return (
    <div className="uplode">
      <Form.Label className="label">{label}</Form.Label>
      <div>
        <div>
          <Form.Control
            className={"input file"}
            disabled
            type="text"
            placeholder={inputs[input]}
          />
        </div>
        <div>
          <label for="inputField" className={"inputs-btn btn btn-info"}>
            Upload
          </label>
          <input
            type="file"
            id="inputField"
            style={{ display: "none" }}
            onChange={(e) => setInputs({ ...inputs, [input]: e.target.value })} // file
          ></input>
        </div>
      </div>
    </div>
  );
}
