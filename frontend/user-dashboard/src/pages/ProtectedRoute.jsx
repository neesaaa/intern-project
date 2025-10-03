import { Navigate, Outlet } from "react-router-dom";
import { tokenValidAtom } from "../atoms/authAtom";
import { useAtom } from "jotai";
import { cartAtom } from "../atoms/cartAtom";
import { fetchBasket } from "../Services/BasketService";
import { tokenAtom } from "../atoms/authAtom";
import { useEffect } from "react";

export default function ProtectedRoute() {
  const [isAuthenticated] = useAtom(tokenValidAtom);
  const [token,setToken]=useAtom(tokenAtom)
  const [cart,setCart]=useAtom(cartAtom);
  useEffect(() => {
    const loadBasket = async () => {
      if (isAuthenticated && token) {
        try {
          const data = await fetchBasket(token);
          setCart(data.Items ?? []); 
        } catch (err) {
          console.error("Failed to fetch basket:", err);
        }
      }
    };

    loadBasket();
  }, [isAuthenticated, token, setCart]);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
