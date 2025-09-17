import { atom } from 'jotai';

export const cartAtom = atom([]);
export const cartCountAtom = atom((get) => {
    const cart = get(cartAtom);
    return cart,length;
})
