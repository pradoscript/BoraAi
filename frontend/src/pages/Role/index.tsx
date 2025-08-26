import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
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

interface RoomDetails {
    event: string;
    description: string;
    total_price: string;
    date: string;
    start_at: string;
    end_at: string;
    guests: Guest[];
}

export default function Room() {
    const { roomId } = useParams<{ roomId: string }>();
    const navigate = useNavigate();
    const [room, setRoom] = useState<RoomDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { token, user } = useContext(AuthContext);
    const [isLeaving, setIsLeaving] = useState(false);

    useEffect(() => {
        if (roomId) {
            fetchRoomDetails();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roomId]);

    const fetchRoomDetails = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await api.get(`/rooms/${roomId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setRoom(response.data);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Erro ao buscar detalhes da sala:", error);
            setError(error.response?.data?.message || "Erro ao carregar detalhes da sala");
        } finally {
            setIsLoading(false);
        }
    };

    const getCurrentGuest = () => {
        if (!room || !user) return null;
        return room.guests.find(guest => guest.user.email === user.email);
    };

    const toggleConfirmation = async () => {
        try {
            const currentGuest = getCurrentGuest();
            if (!currentGuest || !roomId) return;

            const newConfirmedStatus = !currentGuest.confirmed;

            await api.patch(`/rooms/${roomId}/confirmation`, {
                confirmed: newConfirmedStatus
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setRoom(prevRoom => {
                if (!prevRoom) return null;

                return {
                    ...prevRoom,
                    guests: prevRoom.guests.map(guest =>
                        guest.user.email === currentGuest.user.email
                            ? { ...guest, confirmed: newConfirmedStatus }
                            : guest
                    )
                };
            });

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Erro ao atualizar confirmação:", error);
            setError(error.response?.data?.message || "Erro ao atualizar confirmação");
        }
    };

    const leaveRoom = async () => {
        if (!roomId) return;

        try {
            setIsLeaving(true);

            await api.delete(`/rooms/leave/${roomId}`,)


            navigate("/roles");

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Erro ao sair da sala:", error);
            setError(error.response?.data?.message || "Erro ao sair da sala");
            setIsLeaving(false);
        }
    };

    const formatCurrency = (value: string | number) => {
        const numericValue = typeof value === 'string' ? parseFloat(value) : value;
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(numericValue);
    };

    const formatDate = (dateString: string) => {
        return dateString || "Data não informada";
    };

    const getConfirmedGuestsCount = () => {
        return room?.guests.filter(guest => guest.confirmed).length || 0;
    };

    const getTotalGuestsCount = () => {
        return room?.guests.length || 0;
    };

    if (isLoading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
                <p>Carregando detalhes da sala...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.errorContainer}>
                <p className={styles.errorMessage}>{error}</p>
                <button onClick={fetchRoomDetails} className={styles.retryButton}>
                    Tentar Novamente
                </button>
                <button onClick={() => navigate(-1)} className={styles.backButton}>
                    Voltar
                </button>
            </div>
        );
    }

    if (!room) {
        return (
            <div className={styles.errorContainer}>
                <p>Sala não encontrada</p>
                <button onClick={() => navigate(-1)} className={styles.backButton}>
                    Voltar
                </button>
            </div>
        );
    }

    const currentGuest = getCurrentGuest();

    return (
        <div className={styles.container}>
            <div className={styles.contentWrapper}>
                <div className={styles.header}>
                    <button onClick={() => navigate(-1)} className={styles.backButton}>
                        ← Voltar
                    </button>
                    <h1>{room.event}</h1>
                    <div className={styles.priceBadge}>
                        {formatCurrency(room.total_price)}
                    </div>
                </div>


                {currentGuest && (
                    <div className={styles.confirmationSection}>
                        <button
                            onClick={toggleConfirmation}
                            className={`${styles.confirmationButton} ${currentGuest.confirmed ? styles.confirmedButton : styles.pendingButton
                                }`}
                        >
                            {currentGuest.confirmed ? 'Cancelar Confirmação' : 'Confirmar Participação'}
                        </button>
                        <p className={styles.confirmationStatus}>
                            Status atual: {currentGuest.confirmed ? 'Confirmado' : 'Pendente'}
                        </p>
                    </div>
                )}


                {currentGuest && (
                    <div className={styles.leaveSection}>
                        <button
                            onClick={leaveRoom}
                            disabled={isLeaving}
                            className={styles.leaveButton}
                        >
                            {isLeaving ? 'Saindo...' : 'Sair da Sala'}
                        </button>
                        <p className={styles.leaveWarning}>
                            ⚠️ Ao sair da sala, você perderá acesso a este evento
                        </p>
                    </div>
                )}

                <div className={styles.roomInfo}>
                    <div className={styles.infoCard}>
                        <h2>Descrição</h2>
                        <p>{room.description}</p>
                    </div>

                    <div className={styles.detailsGrid}>
                        <div className={styles.detailItem}>
                            <span className={styles.icon}>📅</span>
                            <div>
                                <h3>Data</h3>
                                <p>{formatDate(room.date)}</p>
                            </div>
                        </div>

                        <div className={styles.detailItem}>
                            <span className={styles.icon}>⏰</span>
                            <div>
                                <h3>Horário</h3>
                                <p>{room.start_at} - {room.end_at}</p>
                            </div>
                        </div>

                        <div className={styles.detailItem}>
                            <span className={styles.icon}>👥</span>
                            <div>
                                <h3>Participantes</h3>
                                <p>{getConfirmedGuestsCount()}/{getTotalGuestsCount()} confirmados</p>
                            </div>
                        </div>

                        <div className={styles.detailItem}>
                            <span className={styles.icon}>💰</span>
                            <div>
                                <h3>Valor Total</h3>
                                <p>{formatCurrency(room.total_price)}</p>
                            </div>
                        </div>
                    </div>
                </div>


                <div className={styles.participantsSection}>
                    <h2>Participantes ({room.guests.length})</h2>

                    <div className={styles.participantsList}>
                        {room.guests.map((guest, index) => (
                            <div key={index} className={styles.participantCard}>
                                <div className={styles.participantInfo}>
                                    <div className={styles.avatar}>
                                        {guest.user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className={styles.participantDetails}>
                                        <h4>
                                            {guest.user.name}
                                            {guest.is_host && (
                                                <span className={styles.hostBadge}>👑 Anfitrião</span>
                                            )}
                                        </h4>
                                        <p className={styles.status}>
                                            {guest.confirmed ? (
                                                <span className={styles.confirmed}>✅ Confirmado</span>
                                            ) : (
                                                <span className={styles.pending}>⏳ Pendente</span>
                                            )}
                                        </p>
                                    </div>
                                </div>
                                <div></div>
                                {!guest.is_host && (
                                    <div className={styles.participantActions}>
                                        <span className={styles.role}>
                                            {guest.confirmed ? 'Participante' : 'Convite pendente'}
                                        </span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>


                <div className={styles.stats}>
                    <div className={styles.statCard}>
                        <h3>Total de Convidados</h3>
                        <p className={styles.statNumber}>{getTotalGuestsCount()}</p>
                    </div>
                    <div className={styles.statCard}>
                        <h3>Confirmados</h3>
                        <p className={styles.statNumber}>{getConfirmedGuestsCount()}</p>
                    </div>
                    <div className={styles.statCard}>
                        <h3>Valor por Pessoa</h3>
                        <p className={styles.statNumber}>
                            {formatCurrency(parseFloat(room.total_price) / (getConfirmedGuestsCount() || 1))}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}