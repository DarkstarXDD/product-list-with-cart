import styles from "./Cart.module.css"

import { useRef, useState, useEffect } from "react"
import { useCartContext } from "./useCartContext"

import EmptyCart from "../EmptyCart"
import CartItem from "../CartItem"
import CarbonNeutral from "../CarbonNeutral"
import Button from "../Button"
import ConfirmModal from "../ConfirmModal"

export default function Cart() {
  const dialogRef = useRef()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { cart, removeFromCart, resetCart } = useCartContext()
  let itemCountInCart = 0
  let cartTotal = 0

  for (let i = 0; i < cart.length; i++) {
    itemCountInCart += cart[i].itemCount
    cartTotal += cart[i].itemCount * cart[i].price
  }

  function onRemove(id) {
    removeFromCart(id)
  }

  function openConfirmation() {
    setIsModalOpen(true)
  }

  function closeConfirmation() {
    dialogRef.current.close()
    resetCart()
    setIsModalOpen(false)
  }

  useEffect(() => {
    if (isModalOpen && dialogRef.current) {
      dialogRef.current.showModal()
    }
  }, [isModalOpen])

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

      {isModalOpen && (
        <ConfirmModal
          dialogRef={dialogRef}
          cart={cart}
          cartTotal={cartTotal}
          onClose={closeConfirmation}
        />
      )}
    </div>
  )
}
