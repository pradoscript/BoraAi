
export interface User {
    id: string;
    name: string;
    email: string;
}

export interface JWTPayload {
    sub?: string;
    name?: string;
    email?: string;
    exp?: number;
    iat?: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

export const decodeJWT = (token: string): JWTPayload | null => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Erro ao decodificar JWT:', error);
        return null;
    }
};

export const getUserFromToken = (token: string): User | null => {
    const payload = decodeJWT(token);
    if (!payload) return null;

    return {
        id: payload.sub || '',
        name: payload.name || '',
        email: payload.email || ''
    };
};