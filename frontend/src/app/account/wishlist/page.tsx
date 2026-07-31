"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from "@/context/CartContext";

// Mock data for wishlist
const mockWishlist = [
  {
    _id: "1",
    name: "Logitech G Pro X Keyboard",
    brand: { name: "Logitech" },
    price: 149.99,
    discount: 15,
    rating: 4.7,
    images: [{ url: "/placeholder-keyboard.jpg" }],
  },
  {
    _id: "2",
    name: "Razer DeathAdder V3",
    brand: { name: "Razer" },
    price: 69.99,
    discount: 20,
    rating: 4.9,
    images: [{ url: "/placeholder-mouse.jpg" }],
  },
  {
    _id: "3",
    name: "Samsung 990 Pro SSD 1TB",
    brand: { name: "Samsung" },
    price: 109.99,
    discount: 5,
    rating: 4.6,
    images: [{ url: "/placeholder-ssd.jpg" }],
  },
];

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState(mockWishlist);
  const { addToCart } = useCart();
  const { toast } = useToast();

  // Handle remove from wishlist
  const handleRemove = (productId: string) => {
    setWishlist(wishlist.filter((item) => item._id !== productId));
    toast({
      title: "Removed from wishlist",
      description: "The product has been removed from your wishlist.",
    });
  };

  // Handle add to cart
  const handleAddToCart = (product: any) => {
    addToCart(product, 1);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>

      {wishlist.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">Your wishlist is empty</h2>
          <Link href="/products">
            <Button className="bg-primary hover:bg-primary/90">Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((product) => {
            const price = product.discount
              ? product.price * (1 - product.discount / 100)
              : product.price;

            return (
              <Card key={product._id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="relative h-48 w-full mb-4">
                    <Image
                      src={product.images[0]?.url || '/placeholder-product.jpg'}
                      alt={product.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="font-semibold truncate">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.brand?.name}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-lg font-bold">${price.toFixed(2)}</span>
                    {product.discount > 0 && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${product.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleRemove(product._id)}
                    >
                      <Heart className="mr-2 h-4 w-4 fill-current" /> Remove
                    </Button>
                    <Button
                      className="flex-1 bg-primary hover:bg-primary/90"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}