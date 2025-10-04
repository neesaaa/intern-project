import CourseHeader from "../components/CourseDetailsPage/CourseHeader";
import { useAtom, useAtomValue } from "jotai";
import { cartAtom, cartCountAtom, cartTotalAtom } from "../atoms/cartAtom";
import CartCard from "../components/CartPage/CartCard";
import { Link } from "react-router-dom";
import Invoice from "../components/CartPage/Invoice";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { tokenAtom } from "../atoms/authAtom";
import { UpdateToBasket } from "../Services/BasketService";

const CartPage = () => {
  const [token, SetToken] = useAtom(tokenAtom);
  const [cart, setCart] = useAtom(cartAtom);
  const cartCount = useAtomValue(cartCountAtom);
  const total = useAtomValue(cartTotalAtom);


  async function HandleDeleteCart(courseId) {
    const updatedCart = cart.filter((item) => item.Id !== courseId);

    const orderObject = {
      Id: 12,
      Items: updatedCart,
    };


    try {
      const response = await UpdateToBasket(token, orderObject);
      setCart(response.Items);
      toast.success("Item removed from basket");
    } catch {
      toast.error("Failed to update basket");
    }
  }

  return (
    <main className="flex flex-col md:flex-row px-3 lg:px-20 py-9 gap-8 text-black justify-between items-center flex-1 ">
      <div className="flex flex-col w-full self-start">
        <div className=" flex gap-3 md:gap-9 items-end">
          <h2 className="font-semibold text-xl lg:text-[32px] leading-[130%] tracking-[0em]">
            Shopping Cart
          </h2>
          <CourseHeader
            level1="Courses"
            level2="Details"
            CourseName="Shopping Cart"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <p className="font-normal text-[14px] leading-[150%] tracking-[0em]">
            {cartCount} Courses in cart
          </p>
          <div className="w-full h-0.5 bg-border_color"></div>
          <div className="flex flex-col gap-4 py-[4.5px]">
            {cart.map((item) => (
              <CartCard {...item} key={item.Id} handelDelete={HandleDeleteCart} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col itmes-center gap-4 md:self-start">
        <div className="flex flex-col gap-4  sm:min-w-100 md:min-w-70  lg:min-w-60 xl:min-w-140">
          <h4 className="font-semibold text-[20px] leading-[1.5] tracking-[0em]">
            Order Details
          </h4>
          <Invoice total={total} />
        </div>
        <Link to="/Checkout">
          <button disabled={cart.length==0} className="text-white w-full  bg-black disabled:bg-gray-500  rounded-md py-3 px-2 text-[14px] leading-[1.6] tracking-[0em] cursor-pointer">
            procced to Checkout
          </button>
        </Link>
      </div>
    </main>
  );
};
export default CartPage;
