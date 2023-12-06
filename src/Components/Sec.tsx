// AnotherComponent.tsx

import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./Secondpage.css";
import { Link } from "react-router-dom";

interface Sec_Comp1Props {
  name: string;
  phoneNumber: string;
  email: string;
  setEnterDetailText: any;
}

const Sec_Comp1: React.FC<Sec_Comp1Props> = (props) => {
  const { setEnterDetailText } = props;

  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("formData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      console.log("parseddata", parsedData);
      setFormData(parsedData);
    } else {
      console.log("success");
      setEnterDetailText(true);
      navigate("/");
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("formData");
    setFormData(null);
  };

  return (
    <div className="main-container">
      <div className="nav-page2">
        <h1>Stored Form Data</h1>
        <h1>
          <Link to="/Sec_Comp1">Second-Page/component-1</Link>
        </h1>
      </div>

      {formData ? (
        <div>
          <p>Name: {formData.name}</p>
          <p>Phone Number: {formData.phoneNumber}</p>
          <p>Email: {formData.email}</p>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      ) : (
        <p>No form data found</p>
      )}
    </div>
  );
};

export default Sec_Comp1;
