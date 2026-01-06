import { type Domain } from '../types/domain';

export const mockDomains: Domain[] = [
    {
        id: '1',
        name: 'mybusiness',
        tld: '.com',
        status: 'active',
        registrationDate: '2023-01-15',
        expirationDate: '2026-01-15',
        autoRenew: true,
        nameservers: ['ns1.example.com', 'ns2.example.com'],
    },
    {
        id: '2',
        name: 'myportfolio',
        tld: '.io',
        status: 'active',
        registrationDate: '2023-06-20',
        expirationDate: '2025-06-20',
        autoRenew: true,
        nameservers: ['ns1.example.com', 'ns2.example.com'],
    },
    {
        id: '3',
        name: 'startup',
        tld: '.dev',
        status: 'expiring-soon',
        registrationDate: '2024-02-10',
        expirationDate: '2025-02-10',
        autoRenew: false,
        nameservers: ['ns1.example.com', 'ns2.example.com'],
    },
    {
        id: '4',
        name: 'myshop',
        tld: '.store',
        status: 'active',
        registrationDate: '2023-09-05',
        expirationDate: '2026-09-05',
        autoRenew: true,
        nameservers: ['ns1.example.com', 'ns2.example.com'],
    },
];
