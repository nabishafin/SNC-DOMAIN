import { type FormEvent, useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import { cn } from '../../lib/utils';

interface DomainSearchBarProps {
    className?: string;
    initialValue?: string;
}

const DomainSearchBar = ({ className, initialValue = '' }: DomainSearchBarProps) => {
    const [domain, setDomain] = useState(initialValue);
    const [selectedTld, setSelectedTld] = useState('.com');
    const navigate = useNavigate();

    const popularTlds = ['.com', '.net', '.org', '.io', '.co', '.ai'];

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (domain.trim()) {
            // Navigate to search page with query params
            const searchTerm = domain.trim();
            // If user typed a TLD, use it, otherwise use selected
            const query = searchTerm.includes('.') ? searchTerm : `${searchTerm}${selectedTld}`;
            navigate(`/search?q=${encodeURIComponent(query)}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={cn('relative max-w-3xl w-full mx-auto', className)}>
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                    <Search className="h-6 w-6 text-neutral-400 group-focus-within:text-primary-500 transition-colors" />
                </div>

                <input
                    type="text"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    className="block w-full rounded-xl border-0 py-5 pl-14 pr-48 text-neutral-900 shadow-soft-lg ring-1 ring-inset ring-neutral-200 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-lg sm:leading-6 transition-shadow"
                    placeholder="Find your perfect domain name..."
                />

                <div className="absolute inset-y-2 right-2 flex items-center">
                    <div className="relative h-full hidden sm:flex items-center border-l border-neutral-200 px-2 lg:px-4">
                        <select
                            value={selectedTld}
                            onChange={(e) => setSelectedTld(e.target.value)}
                            className="appearance-none bg-transparent border-0 pl-2 pr-8 text-neutral-600 font-medium focus:ring-0 cursor-pointer hover:text-primary-600 transition-colors py-2 outline-none"
                        >
                            {popularTlds.map((tld) => (
                                <option key={tld} value={tld}>
                                    {tld}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        className="hidden sm:inline-flex h-full rounded-lg px-8 text-base shadow-none hover:shadow-md"
                    >
                        Search
                    </Button>

                    <Button
                        type="submit"
                        variant="primary"
                        size="md"
                        className="sm:hidden h-full rounded-lg w-12 px-0"
                    >
                        <Search className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default DomainSearchBar;
