import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext";
import styles from "./styles.module.css"

export default function NoRooms() {

    const { user } = useContext(AuthContext);

    return (
        <div className={styles.mainContainer}>
            <section className={styles.moldura}>
                <div><img className={styles.sadFace} src="/sadFace.png" alt="" /></div>
                <div>
                    <h2>
                        Parece que você ainda não marcou nenhum <span>rolê</span> {user ? user.name : ""}...
                    </h2>
                </div>
            </section>
        </div>
    )
}