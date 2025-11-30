"use client";
import React, { useState, useEffect } from 'react';
import { Checkbox } from '@/components/ui/checkbox'; // Assuming shadcn checkbox path
import { Label } from '@/components/ui/label';   // Assuming shadcn label path

interface CategoriesFilterProps {
    categories: string[];
    onSelectionChange: (selectedCategories: string[]) => void;
    initialSelected?: string[];
}

export function CategoriesFilterDropdownMenu({
    categories,
    onSelectionChange,
    initialSelected = [],
}: CategoriesFilterProps) {
    const [selectedCategories, setSelectedCategories] = useState<string[]>(initialSelected);

    useEffect(() => {
        onSelectionChange(selectedCategories);
    }, [selectedCategories, onSelectionChange]);

    const handleCheckedChange = (category: string, isChecked: boolean) => {
        setSelectedCategories((prevSelected) => {
            if (isChecked) {
                return [...prevSelected, category];
            } else {
                return prevSelected.filter((item) => item !== category);
            }
        });
    };

    return (
        <div className="grid gap-2">
            {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                        id={category}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={(checked) => handleCheckedChange(category, !!checked)}
                    />
                    <Label htmlFor={category}>{category}</Label>
                </div>
            ))}
        </div>
    );
}
