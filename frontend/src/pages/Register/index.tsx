import { useState } from "react";
import { api } from "../../services/api";
import { useNavigate, Link } from "react-router-dom";
import styles from "./styles.module.css";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await api.post("/register", { name, email, password });
            alert("Usuário criado com sucesso!");
            navigate("/login");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            alert(error.response?.data?.message || "Erro ao criar usuário");
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

                <form onSubmit={handleRegister} className={styles.formContainer}>
                    <div className={styles.formCard}>
                        <h2 className={styles.formTitle}>
                            Cadastre-se e mergulhe nos <span>roles</span>!
                        </h2>

                        <div className={styles.inputGroup}>
                            <input
                                type="text"
                                placeholder="Nome completo"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                className={styles.inputField}
                                required
                            />
                            <span className={styles.inputIcon}>👤</span>
                        </div>

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
                                "Criar Conta"
                            )}
                        </button>

                        <p className={styles.loginLink}>
                            Já tem uma conta?{" "}
                            <Link to="/login" className={styles.link}>
                                Fazer login
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </main>
    );
}