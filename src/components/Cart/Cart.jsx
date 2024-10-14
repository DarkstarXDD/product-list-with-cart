import styles from "./Cart.module.css"

import { useRef } from "react"
import { useCartContext } from "./useCartContext"

import EmptyCart from "../EmptyCart"
import CartItem from "./CartItem"
import CarbonNeutral from "../CarbonNeutral"
import Button from "../Button"
import ConfirmModal from "../ConfirmModal"

export default function Cart() {
  const dialogRef = useRef()
  const { cart, removeFromCart, resetCart } = useCartContext()
  const itemCountInCart = cart.length
  let cartTotal = 0

  for (let i = 0; i < itemCountInCart; i++) {
    cartTotal += cart[i].itemCount * cart[i].price
  }

  function onRemove(id) {
    removeFromCart(id)
  }

  function openConfirmation() {
    dialogRef.current.showModal()
  }

  function closeConfirmation() {
    dialogRef.current.close()
    resetCart()
  }

  if (itemCountInCart === 0) {
    return (
      <div className={styles.cart}>
        <h2 className={styles.heading}>Your Cart (0)</h2>
        <EmptyCart />
      </div>
    )
  }

  return (
    <div className={styles.cart}>
      <h2 className={styles.heading}>Your Cart ({itemCountInCart})</h2>

      <ul className={styles.items}>
        {cart.map((item) => (
          <CartItem key={item.id} {...item} onRemove={onRemove} />
        ))}
      </ul>

      <p className={styles.totalPriceWrapper}>
        <span className={styles.totalPriceText}>Order Total</span>
        <span className={styles.totalPrice}>${cartTotal.toFixed(2)}</span>
      </p>

      <CarbonNeutral />
      <Button onClick={openConfirmation}>Confirm Order</Button>

      <ConfirmModal
        dialogRef={dialogRef}
        cart={cart}
        cartTotal={cartTotal}
        onClose={closeConfirmation}
      />
    </div>
  )
}
