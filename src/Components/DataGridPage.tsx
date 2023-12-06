// AnotherComponent.tsx

import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./Secondpage.css";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface DataGridPage {
  name: string;
  phoneNumber: string;
  email: string;
  setEnterDetailText: any;
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

  const [posts, setPosts] = useState<Post[]>([]);

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
    { field: "body", headerName: "Body", width: 600, flex: 1, wrap: true },
  ];
  return (
    <>
      <NavBar formData={formData} />
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
      <div
        style={{
          height: "600px",
          width: "90%",
          margin: "30px",
          textAlign: "center",
        }}
      >
        <div className="nav-page2"></div>

        <DataGrid
          rows={posts}
          columns={columns}
          pageSize={5}
          checkboxSelection
        />
      </div>
    </>
  );
};

export default DataGridPage;
