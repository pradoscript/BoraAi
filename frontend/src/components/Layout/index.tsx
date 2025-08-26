import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import styles from './styles.module.css';

function Layout() {
    return (
        <div className={styles.layout}>
            <Header />
            <div className={styles.contentWrapper}>
                <main className={styles.mainContent}>
                    <Outlet />
                </main>
            </div>
            <Footer />
        </div>
    );
}

export default Layout;