import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext.jsx';
import { Title } from './Title.jsx';

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount, hasDiscount, getFinalPrice } = useContext(ShopContext);

  const baseSubtotal = getCartAmount(); // original subtotal without discount
  const discountedSubtotal = hasDiscount
    ? getCartAmount(true) // pass flag to calculate with getFinalPrice()
    : baseSubtotal;

  const discountAmount = baseSubtotal - discountedSubtotal;

  const total = (discountedSubtotal === 0 ? 0 : discountedSubtotal + delivery_fee);

  return (
    <div className="w-full">
      <div>
        <Title text1="Cart" text2="Total" textSize="text-2xl" />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        {/* Subtotal */}
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>{currency}{baseSubtotal.toFixed(2)}</p>
        </div>

        {/* Discount line only if applied */}
        {hasDiscount && (
          <>
            <div className="flex justify-between text-green-600">
              <p>Discount (5%)</p>
              <p>- {currency}{discountAmount.toFixed(2)}</p>
            </div>
          </>
        )}

        <hr />

        {/* Shipping */}
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>{currency}{delivery_fee.toFixed(2)}</p>
        </div>

        <hr />

        {/* Final total */}
        <div className="flex justify-between">
          <b>Total</b>
          <b>{currency}{total.toFixed(2)}</b>
        </div>
      </div>
    </div>
  )
}

export default CartTotal;
