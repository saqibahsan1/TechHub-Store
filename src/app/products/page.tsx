"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ProductAPI from "@/lib/api/products";
import { useToast } from "@/components/ui/use-toast";

// Mock data for initial load
const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "price-low-to-high", label: "Price: Low to High" },
  { value: "price-high-to-low", label: "Price: High to Low" },
  { value: "popularity", label: "Popularity" },
];

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [filters, setFilters] = useState({
    category: [],
    brand: [],
    price: [0, 1000],
    rating: 0,
    sort: "newest",
    page: 1,
    limit: 12,
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await ProductAPI.getProducts({
        category: filters.category.join(","),
        brand: filters.brand.join(","),
        minPrice: filters.price[0],
        maxPrice: filters.price[1],
        rating: filters.rating,
        sort: filters.sort,
        page: filters.page,
        limit: filters.limit,
      });
      setProducts(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch products.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories and brands
  const fetchFilters = async () => {
    try {
      const [categoriesRes, brandsRes] = await Promise.all([
        ProductAPI.getCategories(),
        ProductAPI.getBrands(),
      ]);
      setCategories(categoriesRes.data);
      setBrands(brandsRes.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch filters.",
        variant: "destructive",
      });
    }
  };

  // Fetch data on mount and when filters change
  useEffect(() => {
    fetchProducts();
    fetchFilters();
  }, [filters]);

  // Handle filter changes
  const handleCategoryChange = (categoryId: string) => {
    setFilters((prev) => ({
      ...prev,
      category: prev.category.includes(categoryId)
        ? prev.category.filter((id) => id !== categoryId)
        : [...prev.category, categoryId],
      page: 1,
    }));
  };

  const handleBrandChange = (brandId: string) => {
    setFilters((prev) => ({
      ...prev,
      brand: prev.brand.includes(brandId)
        ? prev.brand.filter((id) => id !== brandId)
        : [...prev.brand, brandId],
      page: 1,
    }));
  };

  const handlePriceChange = (value: number[]) => {
    setFilters((prev) => ({ ...prev, price: value, page: 1 }));
  };

  const handleRatingChange = (value: number) => {
    setFilters((prev) => ({ ...prev, rating: value, page: 1 }));
  };

  const handleSortChange = (value: string) => {
    setFilters((prev) => ({ ...prev, sort: value, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="w-full lg:w-1/4">
          <div className="space-y-6">
            {/* Categories Filter */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category: any) => (
                  <div key={category._id} className="flex items-center gap-2">
                    <Checkbox
                      id={`category-${category._id}`}
                      checked={filters.category.includes(category._id)}
                      onCheckedChange={() => handleCategoryChange(category._id)}
                    />
                    <Label htmlFor={`category-${category._id}`}>{category.name}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Brands Filter */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Brands</h3>
              <div className="space-y-2">
                {brands.map((brand: any) => (
                  <div key={brand._id} className="flex items-center gap-2">
                    <Checkbox
                      id={`brand-${brand._id}`}
                      checked={filters.brand.includes(brand._id)}
                      onCheckedChange={() => handleBrandChange(brand._id)}
                    />
                    <Label htmlFor={`brand-${brand._id}`}>{brand.name}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Price Range</h3>
              <Slider
                defaultValue={filters.price}
                min={0}
                max={1000}
                step={10}
                onValueChange={handlePriceChange}
                className="mb-4"
              />
              <div className="flex justify-between text-sm">
                <span>${filters.price[0]}</span>
                <span>${filters.price[1]}</span>
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Minimum Rating</h3>
              <RadioGroup value={filters.rating.toString()} onValueChange={(value) => handleRatingChange(Number(value))}>
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center gap-2">
                    <RadioGroupItem value={rating.toString()} id={`rating-${rating}`} />
                    <Label htmlFor={`rating-${rating}`} className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="w-full lg:w-3/4">
          {/* Sorting */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">All Products</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <RadioGroup
                value={filters.sort}
                onValueChange={handleSortChange}
                className="flex gap-2"
              >
                {sortOptions.map((option) => (
                  <div key={option.value} className="flex items-center gap-2">
                    <RadioGroupItem value={option.value} id={`sort-${option.value}`} />
                    <Label htmlFor={`sort-${option.value}`}>{option.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-4">
                    <div className="h-48 w-full bg-gray-200 rounded-md mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded-md mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded-md w-3/4"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product: any) => (
                  <Link href={`/products/${product._id}`} key={product._id}>
                    <Card className="hover:shadow-lg transition-shadow">
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
                          {product.discount > 0 && (
                            <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                              -{product.discount}%
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
                          <span className="text-sm text-muted-foreground">({product.rating})</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-8">
                <div className="flex gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Button
                      key={i}
                      variant={filters.page === i + 1 ? "default" : "outline"}
                      onClick={() => handlePageChange(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}