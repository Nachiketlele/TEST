import { Stack } from "@chakra-ui/react";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import RequiredAuth from "../hoc/RequiredAuth";
import Edit from "./Edit";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";

const MainRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequiredAuth>
            <Stack direction="row">
              <Sidebar/>
              <Home />
            </Stack>
          </RequiredAuth>
        }
      ></Route>
       <Route
        path="/task/:id"
        element={
          <RequiredAuth>
            <Stack direction="row">
              <Sidebar/>
              <Edit />
            </Stack>
          </RequiredAuth>
        }
      ></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
    </Routes>
  );
};

export default MainRoutes;
