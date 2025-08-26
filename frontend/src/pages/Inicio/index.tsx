import styles from "./styles.module.css";
import { Link } from "react-router-dom";

export default function Inicio() {
    return (
        <main className={styles.mainContainer}>
            <div className={styles.contentWrapper}>
                <div className={styles.logoContainer}>
                    <img
                        src="/Logo.png"
                        alt="Logo Roles"
                        className={styles.logo}
                    />
                </div>

                <div className={styles.textContent}>
                    <h2 className={styles.subtitle}>
                        Chega da confusão na hora de marcar os encontros!
                    </h2>
                    <h1 className={styles.title}>
                        <span>Crie</span> Salas, <span>Convide</span> os Amigos e <span>Aproveite!</span>
                    </h1>
                </div>

                <section className={styles.buttonsContainer}>
                    <article className={styles.buttonCard}>
                        <Link to="/register" className={styles.primaryButton}>
                            <span className={styles.buttonText}>Cadastrar-se</span>
                            <div className={styles.buttonGlow}></div>
                        </Link>
                    </article>
                    <article className={styles.buttonCard}>
                        <Link to="/login" className={styles.secondaryButton}>
                            <span className={styles.buttonText}>Acessar</span>
                            <div className={styles.buttonGlow}></div>
                        </Link>
                    </article>
                </section>

                <div className={styles.decorativeElements}>
                    <div className={styles.floatingCircle1}></div>
                    <div className={styles.floatingCircle2}></div>
                    <div className={styles.floatingCircle3}></div>
                </div>
            </div>
        </main>
    );
}