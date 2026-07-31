"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import ProductAPI from "@/lib/api/products";

// Mock data for categories and brands
const mockCategories = [
  { _id: "1", name: "RAM" },
  { _id: "2", name: "Mechanical Keyboards" },
  { _id: "3", name: "Gaming Mouse" },
];

const mockBrands = [
  { _id: "1", name: "Logitech" },
  { _id: "2", name: "Corsair" },
  { _id: "3", name: "Kingston" },
];

export default function AddProductPage() {
  const [categories, setCategories] = useState(mockCategories);
  const [brands, setBrands] = useState(mockBrands);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    discount: "",
    stock: "",
    specifications: [{ key: "", value: "" }],
  });
  const [images, setImages] = useState<File[]>([]);
  const { toast } = useToast();
  const router = useRouter();

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
        description: "Failed to fetch categories and brands.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchFilters();
  }, []);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle specification change
  const handleSpecChange = (index: number, field: string, value: string) => {
    setFormData((prev) => {
      const specifications = [...prev.specifications];
      specifications[index] = { ...specifications[index], [field]: value };
      return { ...prev, specifications };
    });
  };

  // Add specification
  const addSpecification = () => {
    setFormData((prev) => ({
      ...prev,
      specifications: [...prev.specifications, { key: "", value: "" }],
    }));
  };

  // Remove specification
  const removeSpecification = (index: number) => {
    setFormData((prev) => {
      const specifications = [...prev.specifications];
      specifications.splice(index, 1);
      return { ...prev, specifications };
    });
  };

  // Handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("brand", formData.brand);
      data.append("price", formData.price);
      data.append("discount", formData.discount);
      data.append("stock", formData.stock);
      data.append("specifications", JSON.stringify(formData.specifications));
      images.forEach((image) => data.append("images", image));

      await ProductAPI.createProduct(data);
      toast({
        title: "Product added",
        description: "The product has been added successfully.",
      });
      router.push("/admin/products");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add product.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Add Product</h1>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/products")}>
          Cancel
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category._id} value={category._id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="brand">Brand</Label>
                <Select
                  value={formData.brand}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, brand: value }))}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
                    {brands.map((brand) => (
                      <SelectItem key={brand._id} value={brand._id}>
                        {brand.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="discount">Discount (%)</Label>
                <Input
                  id="discount"
                  name="discount"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.discount}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                required
              />
            </div>

            <div>
              <Label>Specifications</Label>
              {formData.specifications.map((spec, index) => (
                <div key={index} className="flex gap-4 mb-2">
                  <Input
                    placeholder="Key"
                    value={spec.key}
                    onChange={(e) => handleSpecChange(index, "key", e.target.value)}
                    required
                  />
                  <Input
                    placeholder="Value"
                    value={spec.value}
                    onChange={(e) => handleSpecChange(index, "value", e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeSpecification(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addSpecification}>
                <Plus className="mr-2 h-4 w-4" /> Add Specification
              </Button>
            </div>

            <div>
              <Label htmlFor="images">Product Images</Label>
              <Input
                id="images"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                required
              />
              {images.length > 0 && (
                <div className="flex gap-2 mt-2">
                  {images.map((image, index) => (
                    <div key={index} className="relative h-20 w-20">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Preview ${index + 1}`}
                        className="object-cover rounded"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Button type="submit" className="bg-primary hover:bg-primary/90">
              Add Product
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}