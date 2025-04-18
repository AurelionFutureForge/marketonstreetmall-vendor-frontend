"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterSelectProps {
  onFilterChange: (value: string) => void;
  options: FilterOption[];
  placeholder?: string;
  className?: string;
  defaultValue?: string;
}

export function FilterSelect({
  onFilterChange,
  options,
  placeholder = "Filter by...",
  className = "",
  defaultValue,
}: FilterSelectProps) {
  return (
    <Select onValueChange={onFilterChange} defaultValue={defaultValue}>
      <SelectTrigger className={`w-full ${className}`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}