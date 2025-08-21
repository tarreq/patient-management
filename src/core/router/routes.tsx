import { Route, Routes } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import Home from "../../features/home/views/Home";
import Patients from "../../features/patients/views/Patients";

const routes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="patients" element={<Patients />} />
      </Route>
    </Routes>
  );
};

export default routes;
