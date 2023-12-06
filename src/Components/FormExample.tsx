import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import "./Secondpage.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface FormValues {
  name: string;
  phoneNumber: string;
  email: string;
  enterDetailText: boolean;
}

const FormExample: React.FC<FormValues> = (props) => {
  const { enterDetailText, setEnterDetailText } = props;

  const handleClose = () => {
    setEnterDetailText(false);
  };
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
    setEnterDetailText(false);
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
      navigate("/datagridpage");
    }
  };
  const [existingUser, setExistingUser] = useState(false);
  useEffect(() => {
    const storedData = localStorage.getItem("formData");
    console.log("storedata", storedData);
    if (storedData) {
      setExistingUser(true);
    }
  }, []);
  return (
    <div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div>{enterDetailText && "Please Enter Details"}</div>

          <TextField
            label="Name"
            variant="outlined"
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            name="phoneNumber"
            value={formValues.phoneNumber}
            onChange={handleInputChange}
            error={!isValidPhone}
            helperText={
              !isValidPhone ? "Please enter a valid phone number" : ""
            }
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
            margin="normal"
          />
          <div className="button-div">
            {" "}
            <Button
              type="submit"
              disabled={!isValidEmail}
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
            {existingUser && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/sec")}
              >
                Continue with Exsting User
              </Button>
            )}
          </div>
        </form>
      </div>

      <Dialog
        open={enterDetailText}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Warning"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please enter user details before proceeding to another page!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormExample;
