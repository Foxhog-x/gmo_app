import React from "react";
import { Routes, Route } from "react-router-dom";

import FormExample from "./Components/FormExample";

import DataGridPage from "./Components/DataGridPage";
import PageNotFound from "./Components/PageNotFound";
import TreeStructure from "./Components/TreeStructure";

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

        <Route path="/treestructure" element={<TreeStructure />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
