
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "../components/ProtectedRoutes";
import { PublicRoute } from "../components/PublicRoutes";
import { Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Inicio from "../pages/Inicio";
import Roles from "../pages/Roles";
import Layout from "../components/Layout";
import Criar from "../pages/Criar";
import Room from "../pages/Role";
import Entrar from "../pages/Entrar";

export const AppRoutes = () => {
    return (
        <Routes>

            <Route
                path="/"
                element={
                    <PublicRoute>
                        <Inicio />
                    </PublicRoute>
                }
            />
            <Route
                path="/register"
                element={
                    <PublicRoute>
                        <Register />
                    </PublicRoute>
                }
            />
            <Route
                path="/login"
                element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                }
            />




            <Route path="*" element={<Navigate to="/" replace />} />

            <Route element={<Layout />}>

                <Route
                    path="/roles"
                    element={
                        <ProtectedRoute>
                            <Roles />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/criar-role"
                    element={
                        <ProtectedRoute>
                            <Criar />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/rooms/:roomId"
                    element={
                        <ProtectedRoute>
                            <Room />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/entrar"
                    element={
                        <ProtectedRoute>
                            <Entrar />
                        </ProtectedRoute>
                    }
                />
            </Route>


        </Routes>
    );
};