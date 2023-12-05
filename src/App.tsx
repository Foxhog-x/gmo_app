import React from "react";
import { Routes, Route } from "react-router-dom";
import Secondpage from "./Components/Secondpage";
import FormExample from "./Components/FormExample";

interface Secondpage {
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
          path="/secondpage"
          element={<Secondpage setEnterDetailText={setEnterDetailText} />}
        />
      </Routes>
    </>
  );
};

export default App;
