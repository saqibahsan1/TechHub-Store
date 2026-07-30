import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function OrderConfirmationPage() {
  // In a real app, this would fetch order details from the backend
  const order = {
    id: "ORD-123456",
    date: new Date().toLocaleDateString(),
    total: 129.97,
    items: [
      { name: "Kingston Fury Beast DDR5 32GB", quantity: 1, price: 129.99 },
      { name: "Shipping", quantity: 1, price: 9.99 },
      { name: "Tax", quantity: 1, price: 12.99 },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <div className="max-w-2xl mx-auto">
        <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
        <p className="text-muted-foreground mb-8">
          Your order has been placed successfully. You will receive a confirmation email shortly.
        </p>

        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Order #{order.id}</h2>
            <p className="text-muted-foreground mb-4">Placed on {order.date}</p>

            <div className="space-y-2 mb-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span>
                    {item.name} {item.quantity > 1 ? `x ${item.quantity}` : ""}
                  </span>
                  <span>${item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/products">
            <Button variant="outline">Continue Shopping</Button>
          </Link>
          <Link href="/account/orders">
            <Button className="bg-primary hover:bg-primary/90">View Order Status</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}