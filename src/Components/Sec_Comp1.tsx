import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import "./Secondpage.css";
import { Link } from "react-router-dom";
interface Post {
  id: number;
  title: string;
  body: string;
}

const Sec: React.FC = () => {
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
    <div
      style={{
        height: "600px",
        width: "90%",
        margin: "30px",
        textAlign: "center",
      }}
    >
      <div className="nav-page2">
        <h1>Secondpage/Component-1</h1>
        <h1>
          <Link to={"/sec_comp2"}>Component-2</Link>
        </h1>
      </div>

      <DataGrid rows={posts} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );
};

export default Sec;
