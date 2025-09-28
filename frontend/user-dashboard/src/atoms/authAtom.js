import { atom } from "jotai";
import { jwtDecode } from 'jwt-decode';

const intialToken = localStorage.getItem('token');
export const tokenAtom = atom(intialToken);

export const tokenValidAtom = atom((get) => {
    const token = get(tokenAtom);
    if (!token) return false;

    try {
        const decoded = jwtDecode(token); // { exp: 169... , iat: ... }
        const now = Date.now() / 1000;
        return decoded.exp && decoded.exp > now;
    } catch {
        return false;
    }
});