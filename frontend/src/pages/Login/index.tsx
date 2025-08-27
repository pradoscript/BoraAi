import { useState, useContext } from "react";
import { api } from "../../services/api";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import styles from "./styles.module.css"

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("")
    const navigate = useNavigate();
    const { setToken, setUser } = useContext(AuthContext);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const { data } = await api.post("/login", { email, password });
            if (!data.token) {
                throw new Error("Token não recebido do servidor");
            }

            localStorage.setItem("token", data.token);

            if (data.user) {
                localStorage.setItem("user", JSON.stringify(data.user));
                setUser(data.user);
            }

            setToken(data.token);
            navigate("/roles");

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setMessage(error.response?.data?.message || "Erro ao realizar o Login");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className={styles.mainContainer}>
            <div className={styles.backgroundSvg}></div>

            <div className={styles.contentWrapper}>
                <div className={styles.logoContainer}>
                    <img
                        src="/Logo.png"
                        alt="Logo Roles"
                        className={styles.logo}
                    />
                </div>

                {message && (
                    <div
                        className={`${styles.messageBox} ${styles.error}
                            `}
                    >
                        {message}
                    </div>
                )}

                <form onSubmit={handleLogin} className={styles.formContainer}>
                    <div className={styles.formCard}>
                        <h2 className={styles.formTitle}>
                            Seja Bem-Vindo, Bora <span>Marcar</span> um <span>Role</span>?
                        </h2>

                        <div className={styles.inputGroup}>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className={styles.inputField}
                                required
                            />
                            <span className={styles.inputIcon}>📧</span>
                        </div>

                        <div className={styles.inputGroup}>
                            <input
                                type="password"
                                placeholder="Senha"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className={styles.inputField}
                                required
                            />
                            <span className={styles.inputIcon}>🔒</span>
                        </div>

                        <button
                            type="submit"
                            className={styles.submitButton}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className={styles.loadingSpinner}></div>
                            ) : (
                                "Entrar na Conta"
                            )}
                        </button>

                        <p className={styles.registerLink}>
                            Não tem uma conta?{" "}
                            <Link to="/register" className={styles.link}>
                                Criar conta
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </main>
    );
}