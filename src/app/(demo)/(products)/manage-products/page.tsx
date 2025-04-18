"use client";

import { useState } from "react";
import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

// Dummy data for products
const dummyProducts = [
  {
    id: 1,
    sku: "SKU001",
    product_title: "Classic T-Shirt",
    type_product: "SIMPLE"
  },
  {
    id: 2,
    sku: "SKU002",
    product_title: "Designer Jeans",
    type_product: "WITH_VARIANTS"
  },
  {
    id: 3,
    sku: "SKU003",
    product_title: "Smart Watch",
    type_product: "WITH_SUBVARIANTS"
  },
  {
    id: 4,
    sku: "SKU004",
    product_title: "Running Shoes",
    type_product: "SIMPLE"
  },
  {
    id: 5,
    sku: "SKU005",
    product_title: "Leather Wallet",
    type_product: "WITH_VARIANTS"
  }
];

export default function ManageProductsPage() {
  const [products, setProducts] = useState(dummyProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    sku: "",
    product_title: "",
    type_product: "SIMPLE"
  });

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.product_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setNewProduct((prev) => ({ ...prev, type_product: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add the new product to the state
    const productToAdd = {
      id: products.length + 1,
      ...newProduct
    };
    
    setProducts((prev) => [...prev, productToAdd]);
    setNewProduct({
      sku: "",
      product_title: "",
      type_product: "SIMPLE"
    });
    setIsDialogOpen(false);
  };

  return (
    <ContentLayout title="Manage Products">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Manage Products</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Input
                    id="sku"
                    name="sku"
                    value={newProduct.sku}
                    onChange={handleInputChange}
                    placeholder="Enter SKU"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product_title">Product Title</Label>
                  <Input
                    id="product_title"
                    name="product_title"
                    value={newProduct.product_title}
                    onChange={handleInputChange}
                    placeholder="Enter product title"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type_product">Product Type</Label>
                  <Select
                    value={newProduct.type_product}
                    onValueChange={handleSelectChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select product type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SIMPLE">Simple</SelectItem>
                      <SelectItem value="WITH_VARIANTS">With Variants</SelectItem>
                      <SelectItem value="WITH_SUBVARIANTS">With Subvariants</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Add Product</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Products List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-2 text-left font-medium">SKU</th>
                    <th className="px-4 py-2 text-left font-medium">Product Title</th>
                    <th className="px-4 py-2 text-left font-medium">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="border-b">
                      <td className="px-4 py-2">{product.sku}</td>
                      <td className="px-4 py-2">{product.product_title}</td>
                      <td className="px-4 py-2">
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800">
                          {product.type_product.replace(/_/g, ' ')}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </ContentLayout>
  );
}
