import CourseHeader from "../components/CourseDetailsPage/CourseHeader";
import { useAtom, useAtomValue } from "jotai";
import { cartAtom, cartCountAtom, cartTotalAtom } from "../atoms/cartAtom";
import CartCard from "../components/CartPage/CartCard";

const CartPage = () => {
  const [cart, setCart] = useAtom(cartAtom);
  const cartCount = useAtomValue(cartCountAtom);
  const total = useAtom(cartTotalAtom);
  return (
    <main className="flex flex-col md:flex-row px-6 lg:px-20 py-9 gap-8 text-black justify-between items-center">
      <div className="flex flex-col">
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
              <CartCard {...item} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col itmes-center gap-4 md:self-start">
        <div className="flex flex-col gap-4 min-w-80   lg:min-w-100">
          <h4 className="font-semibold text-[20px] leading-[1.5] tracking-[0em]">
            Order Details
          </h4>
          <div className="flex flex-col bg-gray-50 border border-gray-200 p-4 gap-4 rounded-lg h-full">
            <div className="flex flex-col gap-4 font-normal text-[16px] leading-[1.6] tracking-[0em]">
              <div className="flex justify-between items-center">
                <p>Price</p>
                <h5 className="font-semibold text-[18px] leading-[1.6] tracking-[0em] text-right">
                  {total}$
                </h5>
              </div>
              <div className="flex justify-between items-center">
                <p>Discount</p>
                <h5 className="font-semibold text-[18px] leading-[1.6] tracking-[0em] text-right">
                  0$
                </h5>
              </div>
              <div className="flex justify-between items-center">
                <p>Tax</p>
                <h5 className="font-semibold text-[18px] leading-[1.6] tracking-[0em] text-right">
                  {0.15 * total}$
                </h5>
              </div>
            </div>
            <div className="w-full h-0.5 bg-gray-200"></div>
            <div className="flex justify-between font-sans font-semibold text-[20px] leading-[1.5] tracking-[0em]">
              <p>Total</p>
              <p>{1.15 * total}$</p>
            </div>
          </div>
        </div>
        <button className="text-white w-full bg-black rounded-md py-3 px-2 text-[14px] leading-[1.6] tracking-[0em] cursor-pointer">
          procced to Checkout
        </button>
      </div>
    </main>
  );
};
export default CartPage;
