
import { useState, useEffect, useContext } from "react";
import { api } from "../../services/api";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import NoRooms from "../../components/NoRooms";
import RoomCard from "../../components/Room";
import styles from "./styles.module.css";

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
}



export default function Roles() {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { token, user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserRooms();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchUserRooms = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await api.get(`/rooms/user/${user?.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });


            let roomsData: Room[] = [];

            if (Array.isArray(response.data)) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                roomsData = response.data.map((item: any) => {
                    const roomData = item.room || item;

                    return {
                        id: roomData.id || "",
                        event: roomData.event || "Evento sem nome",
                        description: roomData.description || "Sem descrição",
                        total_price: roomData.total_price || "0",
                        date: roomData.date || "",
                        start_at: roomData.start_at || "",
                        end_at: roomData.end_at || "",
                        password_room: roomData.password_room || "",
                        owner_id: roomData.owner_id || "",
                        guests: roomData.guests || ""
                    };
                });
            }

            setRooms(roomsData);

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Erro ao buscar salas do usuário:", error);

            if (error.response?.status === 401) {
                setError("Sessão expirada. Redirecionando para login...");
                setTimeout(() => navigate("/login"), 2000);
            } else if (error.response?.status === 404) {
                setRooms([]);
            } else {
                setError(error.response?.data?.message || "Erro ao carregar suas salas");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleViewDetails = (roomId: string) => {
        if (roomId) {
            navigate(`/rooms/${roomId}`);
        }
    };

    if (isLoading) {
        return (
            <main className={styles.mainContainer}>
                <div className={styles.loadingContainer}>
                    <img src="/Logo.png" alt="Logo" />
                    <p>Carregando suas salas...</p>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className={styles.mainContainer}>
                <div className={styles.errorContainer}>
                    <img src="/Logo.png" alt="Logo" />
                    <p className={styles.errorMessage}>{error}</p>
                    <button onClick={fetchUserRooms} className={styles.retryButton}>
                        Tentar Novamente
                    </button>
                </div>
            </main>
        );
    }


    if (rooms.length === 0) {
        return (
            <main className={styles.mainContainer}>
                <NoRooms />
            </main>
        );
    }

    return (
        <main className={styles.mainContainer}>
            <div className={styles.header}>
                <h1>Suas Salas ({rooms.length})</h1>
                <button onClick={fetchUserRooms} className={styles.refreshButton}>
                    Atualizar
                </button>
            </div>

            <div className={styles.roomsGrid}>
                {rooms.map((room) => (
                    <RoomCard
                        key={room.id}
                        room={room}
                        onViewDetails={handleViewDetails}
                    />
                ))}
            </div>
        </main>
    );
}