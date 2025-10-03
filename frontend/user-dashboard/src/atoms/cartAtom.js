import { atom } from 'jotai';
export const cartAtom = atom([]);

export const cartCountAtom = atom((get) => {
  const items = get(cartAtom);
  return items?items.length:0;
});

export const cartTotalAtom = atom((get) => {
  const items = get(cartAtom);
  return items.reduce((sum, item) => sum + item.Cost, 0);
});