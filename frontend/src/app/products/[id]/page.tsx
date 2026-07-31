"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Star, Heart, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import ProductAPI from "@/lib/api/products";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";

// Mock data for related products
const relatedProducts = [
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

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { toast } = useToast();
  const { user } = useAuth();

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await ProductAPI.getProductById(id as string);
        setProduct(response.data);
        setSelectedImage(0);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch product details.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Handle quantity change
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= (product?.stock || 1)) {
      setQuantity(value);
    }
  };

  // Handle add to cart
  const handleAddToCart = () => {
    if (!user) {
      toast({
        title: "Not logged in",
        description: "Please login to add items to your cart.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Added to cart",
      description: `${product?.name} has been added to your cart.`,
    });
  };

  // Handle add to wishlist
  const handleAddToWishlist = () => {
    if (!user) {
      toast({
        title: "Not logged in",
        description: "Please login to add items to your wishlist.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Added to wishlist",
      description: `${product?.name} has been added to your wishlist.`,
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8 animate-pulse">
          <div className="w-full lg:w-1/2">
            <div className="h-96 w-full bg-gray-200 rounded-md mb-4"></div>
            <div className="flex gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-20 w-20 bg-gray-200 rounded-md"></div>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="h-8 bg-gray-200 rounded-md mb-4"></div>
            <div className="h-4 bg-gray-200 rounded-md mb-2"></div>
            <div className="h-4 bg-gray-200 rounded-md mb-4 w-3/4"></div>
            <div className="h-20 bg-gray-200 rounded-md mb-4"></div>
            <div className="h-10 bg-gray-200 rounded-md"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return <div className="container mx-auto px-4 py-8">Product not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Images */}
        <div className="w-full lg:w-1/2">
          <div className="relative h-96 w-full mb-4 rounded-md overflow-hidden">
            <Image
              src={product.images[selectedImage]?.url || '/placeholder-product.jpg'}
              alt={product.name}
              fill
              className="object-contain"
            />
          </div>
          <div className="flex gap-2">
            {product.images.map((image: any, index: number) => (
              <button
                key={index}
                className={`relative h-20 w-20 rounded-md overflow-hidden border-2 ${selectedImage === index ? 'border-primary' : 'border-transparent'}`}
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={image.url}
                  alt={`${product.name} - ${index + 1}`}
                  fill
                  className="object-contain"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full lg:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-lg text-muted-foreground mb-4">by {product.brand?.name}</p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">({product.rating})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold">
              ${(product.price * (1 - (product.discount || 0) / 100)).toFixed(2)}
            </span>
            {product.discount > 0 && (
              <>
                <span className="text-lg text-muted-foreground line-through">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-lg bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  -{product.discount}%
                </span>
              </>
            )}
          </div>

          {/* Stock */}
          <div className="mb-6">
            <span className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <Label htmlFor="quantity" className="block mb-2">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={handleQuantityChange}
              className="w-20"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-4 mb-8">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleAddToWishlist}
            >
              <Heart className="mr-2 h-4 w-4" /> Wishlist
            </Button>
            <Button className="flex-1 bg-primary hover:bg-primary/90" onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
            </Button>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          {/* Specifications */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.specifications?.map((spec: any, index: number) => (
                <div key={index} className="flex justify-between">
                  <span className="text-muted-foreground">{spec.key}</span>
                  <span>{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
        {product.reviews?.length > 0 ? (
          <div className="space-y-6">
            {product.reviews.map((review: any, index: number) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="font-semibold">{review.user?.name || 'Anonymous'}</div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No reviews yet.</p>
        )}
      </div>

      {/* Related Products */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
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
                  <span className="text-lg font-bold">
                    ${(product.price * (1 - (product.discount || 0) / 100)).toFixed(2)}
                  </span>
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
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}