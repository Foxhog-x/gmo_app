import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import FormExample from "./Components/FormExample";
import DataGridPage from "./Components/DataGridPage";
import PageNotFound from "./Components/PageNotFound";
import TreeStructure from "./Components/TreeStructure";

const App: React.FC = () => {
  const [enterDetailText, setEnterDetailText] = useState<boolean>(false);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <FormExample
              enterDetailText={enterDetailText}
              setEnterDetailText={setEnterDetailText}
              formValues={{
                name: "",
                phoneNumber: "",
                email: "",
              }}
              name={""}
              phoneNumber={""}
              email={""}
            />
          }
        />

        <Route
          path="/datagridpage"
          element={
            <DataGridPage
              setEnterDetailText={setEnterDetailText}
              name={""}
              phoneNumber={""}
              email={""}
            />
          }
        />
        <Route
          path="/treestructure"
          element={<TreeStructure department={""} sub_departments={[]} />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
