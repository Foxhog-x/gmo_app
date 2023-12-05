// AnotherComponent.tsx

import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

interface SecondpageProps {
  name: string;
  phoneNumber: string;
  email: string;
  setEnterDetailText: any;
}

const Secondpage: React.FC<SecondpageProps> = (props) => {
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
    <div>
      <h2>Stored Form Data</h2>
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

export default Secondpage;
