import { api } from "../../services/api"
import styles from "./styles.module.css"
import { useState, useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import { useNavigate } from "react-router-dom"

export default function Criar() {
    const { token } = useContext(AuthContext)
    const navigate = useNavigate()

    const [event, setEvent] = useState("")
    const [description, setDescription] = useState("")
    const [password, setPassword] = useState("")
    const [date, setDate] = useState("")
    const [start, setStart] = useState("")
    const [finish, setFinish] = useState("")
    const [value, setValue] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!token) {
            setError("Você precisa estar logado para criar uma sala!")
            setTimeout(() => navigate("/login"), 2000)
            return;
        }

        setIsLoading(true);
        setError("");
        setSuccess("");

        try {
            await api.post("rooms/create", {
                name_event: event,
                description,
                total_price: parseFloat(value),
                date: date,
                start_at: start,
                end_at: finish,
                password_room: password
            })

            setSuccess("Sala criada com sucesso!")


            setEvent("")
            setDescription("")
            setPassword("")
            setDate("")
            setStart("")
            setFinish("")
            setValue("")


            setTimeout(() => navigate("/roles"), 6000)

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Erro ao criar sala:", error);

            if (error.response?.status === 401) {
                setError("Sessão expirada. Faça login novamente.")
                setTimeout(() => navigate("/login"), 2000)
            } else {
                const errorMessage = error.response?.data?.message || "Erro ao criar sala"
                setError(errorMessage)
            }
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    return (
        <main className={styles.mainContainer}>
            <div className={styles.messagesContainer}>
                {error && <div className={styles.errorMessage}>{error}</div>}
                {success && <div className={styles.successMessage}>{success}</div>}
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formContent}>
                    <div className={styles.formGroup}>
                        <label htmlFor="role">Nome do Role:</label>
                        <input
                            id="event"
                            type="text"
                            placeholder="Ex: Churrasco na Praia"
                            value={event}
                            onChange={e => setEvent(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="descricao">Descrição do Role:</label>
                        <textarea
                            id="description"
                            placeholder="Descreva o que vai rolar no role..."
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    <div className={styles.dataSenhaGroup}>
                        <div className={styles.formGroup}>
                            <label htmlFor="data">Data:</label>
                            <input
                                type="date"
                                id="date"
                                placeholder="DD/MM/YYYY"
                                value={date}
                                onChange={e => setDate(e.target.value)}
                                min={new Date().toISOString().split("T")[0]}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="senha">Senha da Sala:</label>
                            <div className={styles.passwordField}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password_room"
                                    placeholder="Digite a senha"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                    minLength={4}
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
                    </div>

                    <div className={styles.horarioGroup}>
                        <div className={styles.formGroup}>
                            <label htmlFor="inicio">Inicia:</label>
                            <input
                                type="time"
                                id="inicio"
                                placeholder="17:00"
                                value={start}
                                onChange={e => setStart(e.target.value)}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="fim">Finaliza:</label>
                            <input
                                type="time"
                                id="fim"
                                placeholder="22:00"
                                value={finish}
                                onChange={e => setFinish(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="valor">Valor Total:</label>
                        <input
                            type="number"
                            id="valor"
                            placeholder="0,00"
                            value={value}
                            onChange={e => setValue(e.target.value)}
                            step="0.01"
                            min="0"
                            required
                        />
                    </div>

                    <div className={styles.submitButtonContainer}>
                        <button
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Criando...' : 'Criar Role'}
                        </button>
                    </div>
                </div>
            </form>
        </main>
    )
}