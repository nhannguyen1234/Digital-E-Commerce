import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login, Home, Accessible } from "./pages/public";
import path from "./ultils/path";
function App() {
  return (
    <div className="font-main">
      <Routes>
        <Route path={path.ACCESSIBLE} element={<Accessible />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.LOGIN} element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
