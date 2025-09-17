import { atom  } from "jotai";

const intialToken=localStorage.getItem('token');
export const tokenAtom = atom(intialToken);