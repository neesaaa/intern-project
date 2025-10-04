import CourseHeader from "../components/CourseDetailsPage/CourseHeader";
import LoginInput from "../components/login/LoginInput";
import visa from "../assets/CheckoutPage/d22c87d4f7b241eb7ec4e4f3c418511aa601796c.png";
import paypal from "../assets/CheckoutPage/87a5b35207b4f7595331a24f7484e764e5dc527e.png";
import icon from "../assets/CheckoutPage/Icon.png";
import { useAtom, useAtomValue } from "jotai";
import { cartAtom, cartCountAtom, cartTotalAtom } from "../atoms/cartAtom";
import CourseSec from "../components/CheckoutPage/CourseSec";
import Invoice from "../components/CartPage/Invoice";
import { z } from "zod";
import { useState, Fragment } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { tokenAtom } from "../atoms/authAtom";
const checkoutSchema = z
  .object({
    country: z
      .string()
      .min(2, "Country must be at least 2 characters")
      .max(50, "Country name too long"),
    state: z
      .string()
      .min(2, "State/Union Territory must be at least 2 characters")
      .max(50, "State name too long"),

    paymentMethod: z.enum(["credit-debit", "paypal"], {
      required_error: "Please select a payment method",
    }),

    cardName: z.string().min(2, "Cardholder name is required").optional(),
    cardNumber: z
      .string()
      .regex(/^[0-9]{16}$/, "Card number must be 16 digits")
      .optional(),
    expiryDate: z
      .string()
      .regex(/^(0[1-9]|1[0-2])\/\d{4}$/, "Expiry date must be in MM/YY format")
      .optional(),
    cvc: z
      .string()
      .regex(/^[0-9]{3,4}$/, "CVC must be 3 or 4 digits")
      .optional(),
  })
  .refine(
    (data) => {
      if (data.paymentMethod === "credit-debit") {
        return !!(
          data.cardName &&
          data.cardNumber &&
          data.expiryDate &&
          data.cvc
        );
      }
      return true;
    },
    {
      message:
        "All card details are required when paying with Credit/Debit Card",
      path: ["cardName"],
    }
  );

const Checkoutpage = () => {
  const [cart, setCart] = useAtom(cartAtom);
  const [token, _] = useAtom(tokenAtom);
  const cartTot = useAtomValue(cartCountAtom);
  const totalcost = useAtomValue(cartTotalAtom);
  const [errors, setError] = useState({});
  const navigation = useNavigate();

  const mutation = useMutation({
    mutationFn: async (data) => {
      const res = await fetch("https://localhost:7031/api/Order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          Address: {
            Country: data.country,
            State: data.state,
          },
          BasketId: 2,
        }),
      });
      console.log(JSON.stringify({
          Address: {
            Country: data.country,
            State: data.state,
          },
          BasketId: 2,
        }));
      if (!res.ok) throw new Error("Failed to place order");
      return res.json();
    },
    onError: () => {
      toast.error("failed to make the order");
    },
    onSuccess: () => {
      navigation("/done");
      setCart([]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const parsed = checkoutSchema.safeParse(data);
    if (!parsed.success) {
      const issues = parsed.error.issues;
      const errors = {};

      for (const issue of issues) {
        const field = issue.path[0];
        if (!errors[field]) errors[field] = issue.message;
      }
      setError(errors);
    }
    setError({});
    mutation.mutate(data);
  };
  return (
    <main className="text-black px-20 py-8  flex gap-10">
      <div className="flex flex-col gap-6 w-full">
        <div className=" flex gap-3 md:gap-9 items-end">
          <h2 className="font-semibold text-xl lg:text-[32px] leading-[130%] tracking-[0em]">
            Checkout Page
          </h2>
          <CourseHeader
            level1="Details"
            level2="Shopping Cart"
            CourseName="Checkout"
          />
        </div>
        <form
          onSubmit={handleSubmit}
          id="checkout-form"
          className="px-4 py-3 flex gap-4 flex-col border border-border_color rounded-xl w-full"
        >
          <div className="flex gap-4 ">
            <div className="flex flex-col w-full gap-2">
              <LoginInput
                labelText={"Country"}
                placeholder={"Enter Country"}
                name="country"
              />
              {errors.country && (
                <p className="text-red-600 text-sm mt-1">{errors.country}</p>
              )}
            </div>
            <div className="flex flex-col w-full gap-2">
              <LoginInput
                name="state"
                labelText={"State/Union Territory"}
                placeholder={"Enter State"}
              />
              {errors.state && (
                <p className="text-red-600 text-sm mt-1">{errors.state}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2 ">
            <h5 className="font-sans font-semibold text-[18px] leading-[1.6]">
              Payment Method
            </h5>
            <div className="flex flex-col py-4 px-2 gap-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between">
                <div className="flex gap-3 items-center">
                  <input
                    type="radio"
                    id="credit-debit"
                    name="paymentMethod"
                    value="credit-debit"
                    className="w-4 h-4"
                  />
                  <h5
                    htmlFor="credit-debit"
                    className="font-sans font-semibold text-[18px] leading-[1.6]"
                  >
                    Credit / Debit Card
                  </h5>
                </div>
                <img src={visa} alt="" className="w-20 object-contain" />
              </div>
              <LoginInput
                name="cardName"
                labelText={"Name of Card"}
                placeholder={"Name of Card"}
              />
              {errors.cardName && (
                <p className="text-red-600 text-sm mt-1">{errors.cardName}</p>
              )}
              <LoginInput
                name="cardNumber"
                labelText={"Card Number"}
                placeholder={"Card Number"}
              />
              {errors.cardNumber && (
                <p className="text-red-600 text-sm mt-1">{errors.cardNumber}</p>
              )}
              <div className="flex gap-4 ">
                <div className="flex flex-col w-full gap-2">
                  <LoginInput
                    name="expiryDate"
                    labelText={"Expiry Date"}
                    placeholder={"Enter Country"}
                  />
                  {errors.expiryDate && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.expiryDate}
                    </p>
                  )}
                </div>
                <div className="flex flex-col w-full gap-2">
                  <LoginInput
                    name="cvc"
                    labelText={"CVC/CVV"}
                    placeholder={"Enter Country"}
                  />
                  {errors.cvc && (
                    <p className="text-red-600 text-sm mt-1">{errors.cvc}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex py-6 justify-between  px-2 bg-gray-50 rounded-lg">
              <div className="flex gap-3 items-center">
                <input
                  type="radio"
                  id="paypal"
                  name="paymentMethod"
                  value="paypal"
                  className="w-4 h-4"
                />
                <h5
                  htmlFor="paypal"
                  className="font-sans font-semibold text-[18px] leading-[1.6]"
                >
                  Credit / Debit Card
                </h5>
              </div>
              <img src={paypal} alt="" className="w-20 object-contain" />
            </div>
          </div>
        </form>
      </div>
      <div className="flex flex-col gap-4 min-w-100 ">
        <h4 className="font-sans font-semibold text-[20px] leading-[1.5]">
          Order Details ({cartTot})
        </h4>
        <div className="flex flex-col gap-3 bg-gray-50 px-4 py-3 rounded-lg border border-slate-100">
          {cart.map((item, idx) => (
            <Fragment key={item.Id}>
              <CourseSec text={item.CourseName} />
              {idx != cartTot - 1 && (
                <div
                  className="w-full h-0.5 bg-slate-200 "
                  key={idx + "a"}
                ></div>
              )}
            </Fragment>
          ))}
        </div>
        <div className="flex gap-2 bg-gray-50 px-2 py-4 rounded-lg border border-slate-100">
          <img src={icon} alt="" className="w-6 h-6 object-contain " />
          <p className="font-sans font-normal text-sm leading-[1.5]">
            APPLY COUPON CODE
          </p>
        </div>
        <Invoice total={totalcost} />
        <button
          type="submit"
          form="checkout-form"
          disabled={cart.length==0}
          className="text-white w-full bg-black disabled:bg-gray-400 rounded-md py-3 px-2 text-[14px] leading-[1.6] tracking-[0em] cursor-pointer"
        >
          procced to Checkout
        </button>
      </div>
    </main>
  );
};

export default Checkoutpage;
