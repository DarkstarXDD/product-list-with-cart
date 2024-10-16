import styles from "./FoodItem.module.css"

import { useId } from "react"
import { useCartContext } from "../Cart/useCartContext"

import AddToCartButton from "../AddToCartButton"
import QuantitySelector from "../QuantitySelector"

export default function FoodItem({ id, name, price, category, image }) {
  const foodId = useId()

  const { itemCount, addToCart, updateItemCount } = useCartContext(id)

  const isInCart = itemCount > 0

  function onUpdateItemCount(newCount) {
    updateItemCount(id, newCount)
  }

  function onAddToCart() {
    addToCart({ id, name, itemCount: 1, price, image })
  }

  return (
    <section className={styles.foodItem} aria-labelledby={foodId}>
      <div className={styles.imageButtonWrapper}>
        <picture className={styles.foodPicture}>
          <source srcSet={image.desktop} media="(min-width: 1440px)" />
          <source srcSet={image.tablet} media="(min-width: 576px)" />
          <img
            className={`${isInCart ? styles.foodImageBorder : styles.foodImage}`}
            src={image.mobile}
            alt=""
          />
        </picture>

        {!isInCart && (
          <AddToCartButton onAddToCart={onAddToCart}>
            Add to Cart
          </AddToCartButton>
        )}

        {isInCart && (
          <QuantitySelector
            productName="Waffle with Berries"
            itemCount={itemCount}
            onUpdateItemCount={onUpdateItemCount}
          >
            {itemCount}
          </QuantitySelector>
        )}
      </div>

      <div className={styles.itemDetails}>
        <p className={styles.category}>{category}</p>
        <h2 id={foodId} className={styles.name}>
          {name}
        </h2>
        <p className={styles.price}>${price.toFixed(2)}</p>
      </div>
    </section>
  )
}
