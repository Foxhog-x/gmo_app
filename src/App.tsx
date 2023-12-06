import React from "react";
import { Routes, Route } from "react-router-dom";

import FormExample from "./Components/FormExample";
import Sec_Comp1 from "./Components/Sec_Comp1";
import Sec from "./Components/Sec";
import Sec_Comp2 from "./Components/Sec_Comp2";

interface Sec {
  setEnterDetailText: React.Dispatch<React.SetStateAction<boolean>>;
}

const App = () => {
  const [enterDetailText, setEnterDetailText] = React.useState<boolean>(false);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<FormExample enterDetailText={enterDetailText} />}
        />
        <Route
          path="/sec"
          element={<Sec setEnterDetailText={setEnterDetailText} />}
        />
        <Route path="/sec_comp1" element={<Sec_Comp1 />} />
        <Route path="/sec_comp2" element={<Sec_Comp2 />} />
      </Routes>
    </>
  );
};

export default App;
