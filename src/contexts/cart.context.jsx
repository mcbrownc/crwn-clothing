import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)

  if (existingCartItem) {
    return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem)
  }
  return [...cartItems, {...productToAdd, quantity: 1}];
}

const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);


  if (existingCartItem.quantity <= 1) {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem)

}



export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => null, 
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  cartTotal: 0,
});

export const CartProvider = ({children}) => {
  const [ isCartOpen, setIsCartOpen ] = useState(false);
  const [ cartItems, setCartItems ] = useState([]);
  const [ cartTotal, setCartTotal ] = useState(0);

  useEffect(() => {
    const newCartTotal = cartItems.reduce((total, cartItem) => {
      return total += cartItem.quantity
    }, 0)
    setCartTotal(newCartTotal);
  }, [cartItems])

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  }

  const removeItemFromCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  }

  const value = { isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, cartItems, cartTotal };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};