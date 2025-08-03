"use client";

import { useEffect, useState, useMemo } from "react";
import toast from "react-hot-toast";
import AddressInputs from "@/components/layout/cart-components/AddressInputs";
import SectionHeaders from "@/components/layout/SectionHeaders";
import ProductsList from "@/components/layout/cart-components/ProductsList";
import { useCartProductsStore } from "@/store/CartProductStore";
import { useUserStore } from "@/store/UserStore";

export default function CartPage() {
  const [cartProductsClient, setCartProductsClient] = useState([]);

  const cartProducts = useCartProductsStore((state) => state.cartProducts);
  const deletedFromCart = useCartProductsStore((state) => state.deletedFromCart);
  const user = useUserStore((state) => state.user);

  // Hydration fix
  useEffect(() => {
    setCartProductsClient(cartProducts);
  }, [cartProducts]);

  // Toast on failed payment
  useEffect(() => {
    if (window.location.href.includes("canceled=1")) {
      toast.error("Payment failed 😔");
    }
  }, []);

  // Subtotal calculation
  const subtotal = useMemo(() => {
    return parseFloat(
      cartProducts.reduce((acc, p) => acc + p.product_price, 0).toFixed(2)
    );
  }, [cartProducts]);

  if (cartProductsClient?.length === 0) {
    return (
      <section className="mt-8 text-center">
        <SectionHeaders mainHeader="Cart" />
        <p className="mt-4">Your shopping cart is empty 😔</p>
      </section>
    );
  }

  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Cart" />
      </div>
      <div className="flex gap-2 justify-between flex-col mt-8 md:flex-row">
        <ProductsList
          cartProductsClient={cartProductsClient}
          subtotal={subtotal}
          deletedFromCart={deletedFromCart}
        />
        <div className="bg-gray-100 p-4 rounded-lg">
          <AddressInputs
            disabled={false}
            user={user}
            total={subtotal + 5} // assuming 5 is shipping
            cartProductsClient={cartProductsClient}
          />
        </div>
      </div>
    </section>
  );
}
