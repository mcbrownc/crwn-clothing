import { createContext, useState, useEffect } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

import SHOP_DATA from '../shop-data.js';


export const ProductContext = createContext({
  products: [],
});

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
    };
    getCategoriesMap();
  }, []);

  const value = { products };
  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>

};