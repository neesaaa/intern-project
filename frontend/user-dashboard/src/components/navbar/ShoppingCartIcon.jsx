import cartIcon from "../../assets/navbar/shopping-cart.png";
import { useAtomValue } from "jotai";
import { cartCountAtom } from "../../atoms/cartAtom";
import { Link } from "react-router-dom";

function ShoppingCartIcon() {
  const globalCount = useAtomValue(cartCountAtom);

  return (
    <div className="relative inline-block cusrosr-pointer hover:scale-110">
      <Link to="/cart">
        <img src={cartIcon} className="w-5 opacity-50" />

        {globalCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full flex items-center justify-center font-semibold w-4 h-4 text-sm">
            {globalCount > 99 ? "99+" : globalCount}
          </span>
        )}
      </Link>
    </div>
  );
}

export default ShoppingCartIcon;
