import { api } from "../../services/api";
import styles from "./styles.module.css";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Entrar() {
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    const [roomName, setRoomName] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!token) {
            alert("Você precisa estar logado para entrar em uma sala!");
            navigate("/login");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            await api.post("/rooms/join", {
                event_name: roomName,
                event_password: password
            });

            alert("Você entrou na sala com sucesso!");
            setRoomName("");
            setPassword("");

            navigate("/roles");

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Erro ao entrar na sala:", error);
            setError(error.response?.data?.message || "Erro ao entrar na sala");
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <main className={styles.mainContainer}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h2 className={styles.formTitle}>Entrar em uma Sala</h2>

                <div className={styles.formContent}>
                    <div className={styles.formGroup}>
                        <label htmlFor="roomName">Nome da Sala:</label>
                        <input
                            id="roomName"
                            type="text"
                            placeholder="Digite o nome da sala"
                            value={roomName}
                            onChange={e => setRoomName(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="password">Senha da Sala:</label>
                        <div className={styles.passwordField}>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder="Digite a senha da sala"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className={styles.passwordToggle}
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? "🔓" : "🔒"}
                            </button>
                        </div>
                    </div>

                    {error && <div className={styles.errorMessage}>{error}</div>}

                    <div className={styles.submitButtonContainer}>
                        <button
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Entrando...' : 'Entrar na Sala'}
                        </button>
                    </div>

                    <div className={styles.backLink}>
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className={styles.backButton}
                        >
                            ← Voltar
                        </button>
                    </div>
                </div>
            </form>
        </main>
    );
}