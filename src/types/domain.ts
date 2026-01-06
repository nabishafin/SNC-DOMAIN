export interface TLD {
    extension: string;
    name: string;
    pricing: {
        registration: number;
        renewal: number;
        transfer: number;
    };
    popular?: boolean;
    category?: 'generic' | 'country' | 'new';
}

export interface DomainResult {
    domain: string;
    tld: string;
    available: boolean;
    price: number;
    premium?: boolean;
}

export interface Domain {
    id: string;
    name: string;
    tld: string;
    status: 'active' | 'pending' | 'expired' | 'expiring-soon';
    registrationDate: string;
    expirationDate: string;
    autoRenew: boolean;
    nameservers: string[];
}
