import { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { token } = useContext(AuthContext);
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        setIsChecking(false);
    }, [token]);

    if (isChecking) {
        return <div>Carregando...</div>;
    }

    return token ? <>{children}</> : <Navigate to="/login" replace />;
};