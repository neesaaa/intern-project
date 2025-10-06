import { atom } from "jotai";
import { jwtDecode } from 'jwt-decode';
import { atomWithStorage } from "jotai/utils";

const storedToken = localStorage.getItem("Admintoken");
export const tokenAtom = atomWithStorage("Admintoken", storedToken);

export const tokenValidAtom = atom((get) => {
    const token = get(tokenAtom);
    if (!token) return false;

    try {
        const decoded = jwtDecode(token); 
        const now = Date.now() / 1000;
        return decoded.exp && decoded.exp > now;
    } catch {
        return false;
    }
});
