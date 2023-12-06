// AnotherComponent.tsx

import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./style.css";

import NavBar from "./NavBar";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
interface FormData {
  name: string;
  phoneNumber: string;
  email: string;
  // ... other properties
}
interface DataGridPage {
  name: string;
  phoneNumber: string;
  email: string;
  setEnterDetailText: (value: boolean) => void;
}

const DataGridPage: React.FC<DataGridPage> = (props) => {
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
    navigate("/");
  };

  const [posts, setPosts] = useState<DataGridPage[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) =>
        console.error("something wrong at fetching data:", error)
      );
  }, []);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Title", width: 300 },
    { field: "body", headerName: "Body", width: 600, flex: 1 },
  ];
  return (
    <>
      <NavBar formData={formData || { name: "", phoneNumber: "", email: "" }} />

      <div className="main-container">
        <div className="nav-page2">
          <Typography variant="h4">Stored Form Data</Typography>
        </div>

        {formData ? (
          <div>
            <p>Name: {formData?.name}</p>
            <p>Phone Number: {formData?.phoneNumber}</p>
            <p>Email: {formData?.email}</p>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        ) : (
          <p>No form data found</p>
        )}
      </div>
      <div
        style={{
          height: "600px",
          width: "90%",
          margin: "30px",
          textAlign: "center",
        }}
      >
        <div className="nav-page2"></div>

        <DataGrid rows={posts} columns={columns} checkboxSelection />
      </div>
    </>
  );
};

export default DataGridPage;
