import styles from "./styles.module.css";
import { Link, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { slide as Menu } from "react-burger-menu";

export default function Header() {
    const { user, logout } = useContext(AuthContext);
    const location = useLocation();

    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        setMenuOpen(false);
    };

    const handleStateChange = (state: { isOpen: boolean | ((prevState: boolean) => boolean); }) => {
        setMenuOpen(state.isOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <div id="outer-container">
            <header className={styles.header}>
                <nav className={styles.nav}>
                    <div className={styles.logoContainer}>
                        <Link to="/roles">
                            <img className={styles.logoHeader} src="/Logo.png" alt="Logo" />
                        </Link>
                    </div>

                    <section className={styles.desktopMenu}>
                        <Link
                            className={`${styles.linkStyles} ${location.pathname === "/criar-role" ? styles.activeLink : ""
                                }`}
                            to="/criar-role"
                        >
                            Criar Role
                        </Link>
                        <Link
                            className={`${styles.linkStyles} ${location.pathname === "/entrar" ? styles.activeLink : ""
                                }`}
                            to="/entrar"
                        >
                            Entrar em Role
                        </Link>

                        <div className={styles.userSection}>
                            <div className={styles.userInfo}>
                                <div className={styles.userAvatar}>
                                    <img src="/Logged.png" alt="Avatar" />
                                    <div className={styles.onlineIndicator}></div>
                                </div>
                                <p className={styles.userName}>{user?.name}</p>
                            </div>

                            {user && (
                                <button
                                    onClick={handleLogout}
                                    className={styles.logoutButton}
                                    title="Sair da conta"
                                >
                                    Sair
                                </button>
                            )}
                        </div>
                    </section>

                    <div className={styles.mobileMenuWrapper}>
                        <button
                            type="button"
                            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
                            aria-expanded={menuOpen}
                            aria-controls="bm-menu"
                            className={`${styles.burgerButton} ${menuOpen ? styles.open : ""}`}
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            <span className={styles.burgerLine} />
                            <span className={styles.burgerLine} />
                            <span className={styles.burgerLine} />
                        </button>

                        <Menu
                            right
                            width={"100%"}
                            isOpen={menuOpen}
                            onStateChange={handleStateChange}
                            styles={burgerMenuStyles}
                            pageWrapId={"page-wrap"}
                            outerContainerId={"outer-container"}
                            customBurgerIcon={false}
                            customCrossIcon={false}
                            id={"bm-menu"}
                        >
                            <div className={styles.mobileMenuContent}>
                                <Link
                                    className={`${styles.mobileLink} ${location.pathname === "/criar-role"
                                        ? styles.activeMobileLink
                                        : ""
                                        }`}
                                    to="/criar-role"
                                    onClick={closeMenu}
                                >
                                    Criar Role
                                </Link>
                                <Link
                                    className={`${styles.mobileLink} ${location.pathname === "/entrar"
                                        ? styles.activeMobileLink
                                        : ""
                                        }`}
                                    to="/entrar"
                                    onClick={closeMenu}
                                >
                                    Entrar em Role
                                </Link>

                                <div className={styles.mobileUserSection}>
                                    <div className={styles.userInfo}>
                                        <div className={styles.userAvatar}>
                                            <img src="/Logged.png" alt="Avatar" />
                                            <div className={styles.onlineIndicator}></div>
                                        </div>
                                        <p className={styles.mobileUserName}>{user?.name}</p>
                                    </div>

                                    {user && (
                                        <button
                                            onClick={handleLogout}
                                            className={styles.mobileLogoutButton}
                                            title="Sair da conta"
                                        >
                                            <span className={styles.logoutIcon}>⎋</span>
                                            Sair
                                        </button>
                                    )}
                                </div>
                            </div>
                        </Menu>
                    </div>
                </nav>
            </header>

            <main id="page-wrap"></main>
        </div>
    );
}

const burgerMenuStyles = {
    bmMenuWrap: {
        position: "fixed",
        height: "100vh",
        top: "0",
        right: "0",
        width: "100%",
        zIndex: "1100",

    },
    bmMenu: {
        background: "linear-gradient(to bottom, #170030, #320068, #511691)",
        padding: "2rem 1.5rem",
        fontSize: "1.15em",
        overflow: "hidden",
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    bmItemList: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
        width: "100%",
        height: "auto",
    },
    bmItem: {
        display: "flex",
        justifyContent: "center",
        width: "100%",
    },
    bmOverlay: {
        background: "rgba(0, 0, 0, 0.7)",
        top: "0",
        left: "0",
        zIndex: "1099",
    },
    bmCrossButton: {
        display: "none",
    },
};