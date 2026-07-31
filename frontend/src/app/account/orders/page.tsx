"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";

// Mock data for orders
const mockOrders = [
  {
    id: "ORD-123456",
    date: "2023-10-15",
    status: "Delivered",
    total: 129.97,
    items: [
      { name: "Kingston Fury Beast DDR5 32GB", quantity: 1, price: 129.99 },
    ],
  },
  {
    id: "ORD-123457",
    date: "2023-10-10",
    status: "Shipped",
    total: 249.98,
    items: [
      { name: "Logitech G Pro X Keyboard", quantity: 1, price: 149.99 },
      { name: "Razer DeathAdder V3", quantity: 1, price: 69.99 },
    ],
  },
  {
    id: "ORD-123458",
    date: "2023-10-05",
    status: "Cancelled",
    total: 109.99,
    items: [
      { name: "Samsung 990 Pro SSD 1TB", quantity: 1, price: 109.99 },
    ],
  },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState(mockOrders);
  const [statusFilter, setStatusFilter] = useState("all");
  const { toast } = useToast();

  // Filter orders by status
  const filteredOrders = orders.filter((order) => {
    if (statusFilter === "all") return true;
    return order.status.toLowerCase() === statusFilter.toLowerCase();
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">My Orders</h1>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Orders</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">No orders found</h2>
          <Link href="/products">
            <Button className="bg-primary hover:bg-primary/90">Start Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <Card key={order.id}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold">Order #{order.id}</h2>
                    <p className="text-muted-foreground">Placed on {order.date}</p>
                  </div>
                  <div>
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-800"
                        : order.status === "Shipped"
                        ? "bg-blue-100 text-blue-800"
                        : order.status === "Cancelled"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {order.items.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>${item.price.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="flex flex-col md:flex-row justify-between items-center mt-4 pt-4 border-t">
                  <div className="font-semibold">Total: ${order.total.toFixed(2)}</div>
                  <div className="flex gap-2 mt-4 md:mt-0">
                    <Link href={`/account/orders/${order.id}`}>
                      <Button variant="outline">View Details</Button>
                    </Link>
                    {order.status === "Delivered" && (
                      <Button variant="outline">Leave a Review</Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}