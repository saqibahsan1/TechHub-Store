"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

// Mock data for coupon
const couponOptions = [
  { code: "SAVE10", discount: 10 },
  { code: "SAVE20", discount: 20 },
  { code: "FREESHIP", discount: 0, freeShipping: true },
];

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  // Handle apply coupon
  const handleApplyCoupon = () => {
    // In a real app, this would validate the coupon with the backend
    alert("Coupon applied!");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
          <Link href="/products">
            <Button className="bg-primary hover:bg-primary/90">Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="w-full lg:w-2/3">
            {cart.map((item) => {
              const price = item.product.discount
                ? item.product.price * (1 - item.product.discount / 100)
                : item.product.price;
              const itemTotal = price * item.quantity;

              return (
                <Card key={item.product._id} className="mb-4">
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="relative h-32 w-32 flex-shrink-0">
                        <Image
                          src={item.product.images[0]?.url || '/placeholder-product.jpg'}
                          alt={item.product.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.product.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          ${price.toFixed(2)} each
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <Input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.product._id, parseInt(e.target.value))}
                            className="w-16 text-center"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="ml-auto"
                            onClick={() => removeFromCart(item.product._id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center font-semibold">
                        ${itemTotal.toFixed(2)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            <div className="flex justify-between mt-4">
              <Link href="/products">
                <Button variant="outline">Continue Shopping</Button>
              </Link>
              <Button variant="outline" onClick={() => alert("Cart cleared!")}>
                Clear Cart
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span>$10.00</span>
                </div>

                <div className="flex justify-between mb-4">
                  <span>Tax</span>
                  <span>${(cartTotal * 0.1).toFixed(2)}</span>
                </div>

                <div className="border-t pt-4 mb-4">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${(cartTotal + 10 + cartTotal * 0.1).toFixed(2)}</span>
                  </div>
                </div>

                {/* Coupon Code */}
                <div className="mb-4">
                  <h3 className="font-medium mb-2">Coupon Code</h3>
                  <div className="flex gap-2">
                    <Input placeholder="Enter coupon code" />
                    <Button onClick={handleApplyCoupon}>Apply</Button>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Try: {couponOptions.map((coupon) => coupon.code).join(", ")}
                  </div>
                </div>

                <Link href="/checkout">
                  <Button className="w-full bg-primary hover:bg-primary/90">Proceed to Checkout</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}