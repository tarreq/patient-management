import { Route, Routes } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import Home from "../../features/home/views/Home";
import Patients from "../../features/patients/views/Patients";
import Login from "../../features/auth/views/Login";
import Register from "../../features/auth/views/Register";
import AuthGuard from "../providers/AuthGuard";

const routes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          <AuthGuard>
            <Layout />
          </AuthGuard>
        }
      >
        <Route path="" element={<Home />} />
        <Route path="patients" element={<Patients />} />
      </Route>
    </Routes>
  );
};

export default routes;
