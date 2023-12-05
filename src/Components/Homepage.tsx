import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface FormData {
  name: string;
  phoneNumber: string;
  email: string;
}

const Homepage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phoneNumber: "",
    email: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Form Data:", formData);

    setFormData({
      name: "",
      phoneNumber: "",
      email: "",
    });
  };

  return (
    <form>
      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        name="name"
        value={formData.name}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        label="Phone Number"
        variant="outlined"
        fullWidth
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Store Data
      </Button>
    </form>
  );
};

export default Homepage;
