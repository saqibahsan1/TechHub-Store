"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";

// Mock data for orders
const mockOrders = [
  {
    _id: "1",
    orderId: "ORD-123456",
    customer: "John Doe",
    date: "2023-10-15",
    total: 129.97,
    status: "Delivered",
    items: [
      { name: "Kingston Fury Beast DDR5 32GB", quantity: 1, price: 129.99 },
    ],
  },
  {
    _id: "2",
    orderId: "ORD-123457",
    customer: "Jane Smith",
    date: "2023-10-10",
    total: 249.98,
    status: "Shipped",
    items: [
      { name: "Logitech G Pro X Keyboard", quantity: 1, price: 149.99 },
      { name: "Razer DeathAdder V3", quantity: 1, price: 69.99 },
    ],
  },
  {
    _id: "3",
    orderId: "ORD-123458",
    customer: "Bob Johnson",
    date: "2023-10-05",
    total: 109.99,
    status: "Pending",
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

  // Handle status change
  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrders(
      orders.map((order) =>
        order._id === orderId ? { ...order, status: newStatus } : order
      )
    );
    toast({
      title: "Order updated",
      description: `Order status updated to ${newStatus}.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Orders</h1>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Orders</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell className="font-medium">{order.orderId}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Select
                      value={order.status}
                      onValueChange={(value) => handleStatusChange(order._id, value)}
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder={order.status} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Processing">Processing</SelectItem>
                        <SelectItem value="Shipped">Shipped</SelectItem>
                        <SelectItem value="Delivered">Delivered</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">View Details</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}