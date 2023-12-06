import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

interface FormValues {
  name: string;
  phoneNumber: string;
  email: string;
  enterDetailText: boolean;
}

const FormExample: React.FC<FormValues> = (props) => {
  const { enterDetailText } = props;
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState<FormValues>({
    name: "",
    phoneNumber: "",
    email: "",
  });
  const [isValidPhone, setIsValidPhone] = useState<boolean>(true);
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });

    if (name === "phoneNumber") {
      const phonePattern = /^[0-9]{10}$/;
      const isValid = phonePattern.test(value);
      setIsValidPhone(isValid);
    }

    if (name === "email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValid = emailPattern.test(value);
      setIsValidEmail(isValid);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      formValues.name === "" ||
      formValues.email === "" ||
      formValues.phoneNumber === ""
    ) {
      window.alert("please enter all the fields");
    } else {
      console.log("Submitted:", formValues);
      localStorage.setItem("formData", JSON.stringify(formValues));
      navigate("/sec");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>{enterDetailText && "Please Enter Details"}</div>

      <TextField
        label="Name"
        variant="outlined"
        name="name"
        value={formValues.name}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Phone Number"
        variant="outlined"
        name="phoneNumber"
        value={formValues.phoneNumber}
        onChange={handleInputChange}
        error={!isValidPhone}
        helperText={!isValidPhone ? "Please enter a valid phone number" : ""}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        variant="outlined"
        name="email"
        value={formValues.email}
        onChange={handleInputChange}
        error={!isValidEmail}
        helperText={!isValidEmail ? "Please enter a valid email" : ""}
        fullWidth
        margin="normal"
      />
      <Button
        type="submit"
        disabled={!isValidEmail}
        variant="contained"
        color="primary"
      >
        Submit
      </Button>
    </form>
  );
};

export default FormExample;
