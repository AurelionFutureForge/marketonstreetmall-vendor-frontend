"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  isLoading?: boolean;
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  limit,
  onPageChange,
  onLimitChange,
  isLoading = false
}: PaginationProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-2 mt-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Skeleton className="h-10 w-[120px]" />
          <Skeleton className="h-10 w-[70px]" />
        </div>
        <div>
          <Skeleton className="h-10 w-[100px]" />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-[100px]" />
          <Skeleton className="h-8 w-8" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-2 mt-4">
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <span className="text-sm text-muted-foreground whitespace-nowrap">
          Rows per page:
        </span>
        <Select
          value={limit.toString()}
          onValueChange={(value) => {
            console.log(value);
            onLimitChange(Number(value));
          }}
        >
          <SelectTrigger className="w-[70px]">
            <SelectValue placeholder={limit} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center w-full sm:w-auto justify-center">
        <span className="text-sm text-muted-foreground whitespace-nowrap">
          {(() => {
            const start = (currentPage - 1) * limit + 1;
            const end = Math.min(currentPage * limit, totalItems);
            return `${start} - ${end} of ${totalItems}`;
          })()}
        </span>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || totalPages === 0}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm whitespace-nowrap">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
