"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Mock data for addresses
const mockAddresses = [
  {
    id: "1",
    name: "Home",
    street: "123 Tech Street",
    city: "Silicon Valley",
    state: "CA",
    country: "USA",
    postalCode: "94025",
    isDefault: true,
  },
  {
    id: "2",
    name: "Work",
    street: "456 Business Ave",
    city: "San Francisco",
    state: "CA",
    country: "USA",
    postalCode: "94105",
    isDefault: false,
  },
];

export default function AddressesPage() {
  const [addresses, setAddresses] = useState(mockAddresses);
  const [isAdding, setIsAdding] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  });
  const { toast } = useToast();

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({ ...prev, [name]: value }));
  };

  // Handle add address
  const handleAddAddress = () => {
    if (!newAddress.name || !newAddress.street || !newAddress.city || !newAddress.country) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setAddresses([
      ...addresses,
      {
        id: (addresses.length + 1).toString(),
        ...newAddress,
        isDefault: false,
      },
    ]);
    setNewAddress({
      name: "",
      street: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
    });
    setIsAdding(false);
    toast({
      title: "Address added",
      description: "Your new address has been added.",
    });
  };

  // Handle remove address
  const handleRemoveAddress = (id: string) => {
    setAddresses(addresses.filter((address) => address.id !== id));
    toast({
      title: "Address removed",
      description: "The address has been removed.",
    });
  };

  // Handle set default address
  const handleSetDefault = (id: string) => {
    setAddresses(
      addresses.map((address) => ({
        ...address,
        isDefault: address.id === id,
      }))
    );
    toast({
      title: "Default address updated",
      description: "Your default address has been updated.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">My Addresses</h1>
        <Button onClick={() => setIsAdding(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Address
        </Button>
      </div>

      {/* Add Address Form */}
      {isAdding && (
        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Add New Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name (e.g., Home, Work)</Label>
                <Input
                  id="name"
                  name="name"
                  value={newAddress.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="street">Street Address</Label>
                <Input
                  id="street"
                  name="street"
                  value={newAddress.street}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={newAddress.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="state">State/Province</Label>
                <Input
                  id="state"
                  name="state"
                  value={newAddress.state}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  name="country"
                  value={newAddress.country}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input
                  id="postalCode"
                  name="postalCode"
                  value={newAddress.postalCode}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <Button onClick={handleAddAddress} className="bg-primary hover:bg-primary/90">
                Save Address
              </Button>
              <Button variant="outline" onClick={() => setIsAdding(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Addresses List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((address) => (
          <Card key={address.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold">{address.name}</h3>
                {address.isDefault && (
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    Default
                  </span>
                )}
              </div>
              <p className="text-muted-foreground mb-4">
                {address.street}
                <br />
                {address.city}, {address.state}
                <br />
                {address.country}, {address.postalCode}
              </p>
              <div className="flex gap-2">
                {!address.isDefault && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSetDefault(address.id)}
                  >
                    Set as Default
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemoveAddress(address.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}