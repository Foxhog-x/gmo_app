import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import "./Secondpage.css";
import NavBar from "./NavBar";

interface Post {
  id: number;
  title: string;
  body: string;
  setEnterDetailText: any;
}

const Sec_Comp1: React.FC<Post> = (props) => {
  const { setEnterDetailText } = props;
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

export default Sec_Comp1;
