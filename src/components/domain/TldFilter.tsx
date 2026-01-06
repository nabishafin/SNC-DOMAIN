import { useState } from 'react';
import { Filter } from 'lucide-react';
import Button from '../ui/Button';

interface TldFilterProps {
    onFilterChange?: (filters: FilterOptions) => void;
    className?: string;
}

export interface FilterOptions {
    categories: string[];
    priceRange: [number, number];
}

const TldFilter = ({ onFilterChange, className = '' }: TldFilterProps) => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [priceRange] = useState<[number, number]>([0, 100]);

    const categories = [
        { id: 'generic', label: 'Generic TLDs (.com, .net, .org)' },
        { id: 'country', label: 'Country Code TLDs (.io, .co)' },
        { id: 'new', label: 'New TLDs (.app, .dev, .tech)' },
    ];

    const handleCategoryToggle = (categoryId: string) => {
        const newCategories = selectedCategories.includes(categoryId)
            ? selectedCategories.filter((id) => id !== categoryId)
            : [...selectedCategories, categoryId];

        setSelectedCategories(newCategories);
        onFilterChange?.({ categories: newCategories, priceRange });
    };

    const handleClearFilters = () => {
        setSelectedCategories([]);
        onFilterChange?.({ categories: [], priceRange: [0, 100] });
    };

    return (
        <aside className={`bg-white border border-neutral-200 rounded-lg p-5 ${className}`}>
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-neutral-900 flex items-center gap-2">
                    <Filter className="w-5 h-5" />
                    Filters
                </h3>
                {selectedCategories.length > 0 && (
                    <Button variant="ghost" size="sm" onClick={handleClearFilters}>
                        Clear
                    </Button>
                )}
            </div>

            <div className="space-y-4">
                {/* Category Filters */}
                <div>
                    <h4 className="text-sm font-medium text-neutral-700 mb-3">Category</h4>
                    <div className="space-y-2.5">
                        {categories.map((category) => (
                            <label
                                key={category.id}
                                className="flex items-start gap-2.5 cursor-pointer group"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(category.id)}
                                    onChange={() => handleCategoryToggle(category.id)}
                                    className="mt-0.5 w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-2 focus:ring-primary-500 cursor-pointer"
                                />
                                <span className="text-sm text-neutral-700 group-hover:text-neutral-900">
                                    {category.label}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Price Range Info */}
                <div>
                    <h4 className="text-sm font-medium text-neutral-700 mb-3">Price Range</h4>
                    <div className="text-sm text-neutral-600">
                        ${priceRange[0]} - ${priceRange[1]}+ per year
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default TldFilter;
