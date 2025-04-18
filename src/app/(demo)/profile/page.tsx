"use client";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Phone,
  Mail,
  Building,
  CreditCard,
  User,
  Home,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getVendorProfileApi } from "@/services/api/VendorApi";
import { VendorProfile } from "@/schema/VendorSchema";
import { useGetVendorProfile } from "@/services/queries/vendorQueries";

export default function ProfilePage() {
  // const [vendor, setVendor] = useState<VendorProfile | null>(null);
  // const [loading, setLoading] = useState(true);
  // const [activeTab, setActiveTab] = useState("business");

  // useEffect(() => {
  //   const fetchVendorData = async () => {
  //     try {
  //       const profile = await getVendorProfileApi();
  //       setVendor(profile);
  //     } catch (error) {
  //       console.error("Failed to fetch vendor profile:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchVendorData();
  // }, []);

  // const getInitials = (name: string): string =>
  //   name
  //     .split(" ")
  //     .map((word) => word[0])
  //     .join("")
  //     .toUpperCase();

  // if (loading) {
  //   return (
  //     <ContentLayout title="Vendor Profile">
  //       <div className="p-6 text-muted-foreground">Loading...</div>
  //     </ContentLayout>
  //   );
  // }

  // if (!vendor) {
  //   return (
  //     <ContentLayout title="Vendor Profile">
  //       <div className="p-6 text-red-600">Failed to load profile.</div>
  //     </ContentLayout>
  //   );
  // }

  const { data: vendor, isLoading, isError } = useGetVendorProfile();
  const [activeTab, setActiveTab] = useState("business");

  const getInitials = (name: string): string =>
    name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();

  if (isLoading) {
    return (
      <ContentLayout title="Vendor Profile">
        <div className="p-6 text-muted-foreground">Loading...</div>
      </ContentLayout>
    );
  }

  if (isError || !vendor) {
    return (
      <ContentLayout title="Vendor Profile">
        <div className="p-6 text-red-600">Failed to load profile.</div>
      </ContentLayout>
    );
  }

  return (
    <ContentLayout title="Vendor Profile">
      {/* Profile Overview */}
      <Card className="md:col-span-3">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-shrink-0">
              <Avatar className="h-24 w-24 text-2xl font-bold">
                <div className="bg-primary text-primary-foreground h-full w-full flex items-center justify-center rounded-full">
                  {getInitials(vendor.business_name || "User")}
                </div>
              </Avatar>
            </div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                <div>
                  <h2 className="text-2xl font-bold">
                    {vendor.business_name || "Business Name"}
                  </h2>
                  <p className="text-muted-foreground">
                    {vendor.legal_name || "Legal Name"}
                  </p>
                </div>
                <div className="mt-2 md:mt-0">
                  {vendor.onboarding_completed ? (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                      Onboarding Complete
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="bg-amber-100 text-amber-800 hover:bg-amber-100"
                    >
                      <AlertCircle className="mr-1 h-3 w-3" />
                      Onboarding Incomplete
                    </Badge>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-y-2 mt-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{vendor.email || "No email"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{vendor.phone || "No phone"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <span>Commission: {vendor.commission_rate ?? 0}%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs Section */}
      <div className="md:col-span-3 mt-6">
        <Tabs
          defaultValue="business"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="business">Business Details</TabsTrigger>
            <TabsTrigger value="bank">Bank Details</TabsTrigger>
            <TabsTrigger value="warehouse">Warehouse</TabsTrigger>
          </TabsList>

          {/* Business Tab */}
          <TabsContent value="business" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
                <CardDescription>
                  Your registered business and tax details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Business Name</Label>
                    <div>{vendor.business_name || "Not provided"}</div>
                  </div>
                  <div className="space-y-2">
                    <Label>Legal Name</Label>
                    <div>{vendor.legal_name || "Not provided"}</div>
                  </div>
                  <div className="space-y-2">
                    <Label>GSTIN</Label>
                    <div>{vendor.gstin || "Not provided"}</div>
                  </div>
                  <div className="space-y-2">
                    <Label>PAN</Label>
                    <div>{vendor.pan || "Not provided"}</div>
                  </div>
                  <div className="space-y-2">
                    <Label>Role</Label>
                    <div>{vendor.role || "Not provided"}</div>
                  </div>
                  <div className="space-y-2">
                    <Label>Registration Date</Label>
                    <div>
                      {vendor.created_at
                        ? new Date(vendor.created_at).toLocaleDateString()
                        : "Not available"}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bank Tab */}
          <TabsContent value="bank" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Bank Details</CardTitle>
                <CardDescription>Your banking information</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Account Name</Label>
                  <div>
                    {vendor.bank_details?.account_name || "Not provided"}
                  </div>
                </div>
                <div>
                  <Label>Account Number</Label>
                  <div>
                    {vendor.bank_details?.account_number || "Not provided"}
                  </div>
                </div>
                <div>
                  <Label>IFSC Code</Label>
                  <div>{vendor.bank_details?.ifsc_code || "Not provided"}</div>
                </div>
                <div>
                  <Label>Bank Name</Label>
                  <div>{vendor.bank_details?.bank_name || "Not provided"}</div>
                </div>
                <div>
                  <Label>Branch Name</Label>
                  <div>
                    {vendor.bank_details?.branch_name || "Not provided"}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Label>Status</Label>
                  <Badge
                    className={
                      vendor.bank_details?.is_verified
                        ? "bg-green-200 text-green-900"
                        : "bg-red-200 text-red-800"
                    }
                  >
                    {vendor.bank_details?.is_verified
                      ? "Verified"
                      : "Not Verified"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Warehouse Tab */}
          <TabsContent value="warehouse" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Warehouse</CardTitle>
                <CardDescription>Your warehouse information</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Address</Label>
                  <div>{vendor.warehouse?.address || "Not provided"}</div>
                </div>
                <div>
                  <Label>City</Label>
                  <div>{vendor.warehouse?.city || "Not provided"}</div>
                </div>
                <div>
                  <Label>State</Label>
                  <div>{vendor.warehouse?.state || "Not provided"}</div>
                </div>
                <div>
                  <Label>Country</Label>
                  <div>{vendor.warehouse?.country || "Not provided"}</div>
                </div>
                <div>
                  <Label>Pincode</Label>
                  <div>{vendor.warehouse?.pincode || "Not provided"}</div>
                </div>
                <div>
                  <Label>Contact Person</Label>
                  <div>
                    {vendor.warehouse?.contact_person || "Not provided"}
                  </div>
                </div>
                <div>
                  <Label>Phone</Label>
                  <div>{vendor.warehouse?.contact_phone || "Not provided"}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Label>Status</Label>
                  <Badge
                    className={
                      vendor.warehouse?.verification_status === "VERIFIED"
                        ? "bg-green-200 text-green-900"
                        : "bg-yellow-200 text-yellow-900"
                    }
                  >
                    {vendor.warehouse?.verification_status || "Not Verified"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ContentLayout>
  );
}
