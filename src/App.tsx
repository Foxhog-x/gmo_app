import React from "react";
import { Routes, Route } from "react-router-dom";

import FormExample from "./Components/FormExample";
import Sec_Comp1 from "./Components/Sec_Comp1";

import Sec_Comp2 from "./Components/Sec_Comp2";
import DataGridPage from "./Components/DataGridPage";
import PageNotFound from "./Components/PageNotFound";

// import { DataGrid } from "@mui/x-data-grid";
// import NavBar from "./Components/NavBar";

const App = () => {
  const [enterDetailText, setEnterDetailText] = React.useState<boolean>(false);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <FormExample
              enterDetailText={enterDetailText}
              setEnterDetailText={setEnterDetailText}
            />
          }
        />
        <Route
          path="/datagridpage"
          element={<DataGridPage setEnterDetailText={setEnterDetailText} />}
        />
        <Route
          path="/sec_comp1"
          element={<Sec_Comp1 setEnterDetailText={setEnterDetailText} />}
        />
        <Route path="/sec_comp2" element={<Sec_Comp2 />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
