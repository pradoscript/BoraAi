import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import styles from "./styles.module.css";

interface User {
    name: string;
    email?: string;
}

interface Guest {
    is_host: boolean;
    confirmed: boolean;
    user: User;
}

interface Room {
    id: string;
    event: string;
    description: string;
    total_price: string;
    date: string;
    start_at: string;
    end_at: string;
    password_room: string;
    owner_id: string;
    created_by?: string;
    created_at?: string;
    guests?: Guest[];
}

interface RoomCardProps {
    room: Room;
    onViewDetails: (roomId: string) => void;
}

export default function RoomCard({ room, onViewDetails }: RoomCardProps) {
    const { user } = useContext(AuthContext);

    const formatCurrency = (value: string | number) => {
        const numericValue = typeof value === 'string' ? parseFloat(value) : value;
        return isNaN(numericValue) ? "R$ 0,00" : new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(numericValue);
    };

    const getConfirmedGuestsCount = () => {
        if (!room.guests || !Array.isArray(room.guests)) {
            return 1;
        }
        const confirmedCount = room.guests.filter(guest => guest.confirmed).length;
        return confirmedCount > 0 ? confirmedCount : 1;
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return "Data não informada";
        const date = new Date(dateString);
        return date.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };


    const formatTime = (timeString: string) => {
        if (!timeString) return "";
        const date = new Date(timeString);
        return date.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };


    return (
        <div className={styles.roomCard}>
            <div className={styles.roomHeader}>
                <h3>{room.event}</h3>
                <span className={styles.price}>
                    {formatCurrency(parseFloat(room.total_price) / getConfirmedGuestsCount())} /pessoa
                </span>
            </div>

            <p className={styles.description}>{room.description}</p>

            <div className={styles.roomDetails}>
                <div className={styles.detail}>
                    <span>📅</span>
                    {formatDate(room.date)}
                </div>
                <div className={styles.detail}>
                    <span>⏰</span>
                    {formatTime(room.start_at)} - {formatTime(room.end_at)}
                </div>
                <div className={styles.detail}>
                    <span>👤</span>
                    {room.owner_id === user?.id ? "Dono" : "Participante"}
                </div>
            </div>

            <button
                onClick={() => onViewDetails(room.id)}
                className={styles.detailsButton}
                disabled={!room.id}
            >
                Ver Detalhes
            </button>
        </div>
    );
}