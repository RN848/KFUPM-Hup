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
        type={type}
        placeholder={placeholder}
        value={inputs[input]}
        onChange={(e) => setInputs({ ...inputs, [input]: e.target.value })}
      />
    </Form.Group>
  );
}

export function Textarea({ setInputs, inputs, input, label, placeholder }) {
  return (
    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
      <div>
        <Form.Label className="label">{label}</Form.Label>

        <Form.Control
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
