
const Invoice = ({total}) => {
  return (
    <div className="flex flex-col bg-gray-50 border border-gray-200 p-4 gap-4 rounded-lg max-h-500">
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
  )
}

export default Invoice
