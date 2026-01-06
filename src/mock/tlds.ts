import { type TLD } from '../types/domain';

export const tldData: TLD[] = [
    {
        extension: '.com',
        name: 'Commercial',
        pricing: { registration: 12.99, renewal: 14.99, transfer: 12.99 },
        popular: true,
        category: 'generic',
    },
    {
        extension: '.net',
        name: 'Network',
        pricing: { registration: 13.99, renewal: 15.99, transfer: 13.99 },
        popular: true,
        category: 'generic',
    },
    {
        extension: '.org',
        name: 'Organization',
        pricing: { registration: 14.99, renewal: 16.99, transfer: 14.99 },
        popular: true,
        category: 'generic',
    },
    {
        extension: '.io',
        name: 'Input/Output',
        pricing: { registration: 39.99, renewal: 49.99, transfer: 39.99 },
        popular: true,
        category: 'country',
    },
    {
        extension: '.co',
        name: 'Company',
        pricing: { registration: 24.99, renewal: 29.99, transfer: 24.99 },
        popular: true,
        category: 'country',
    },
    {
        extension: '.ai',
        name: 'Artificial Intelligence',
        pricing: { registration: 79.99, renewal: 89.99, transfer: 79.99 },
        popular: true,
        category: 'country',
    },
    {
        extension: '.dev',
        name: 'Developer',
        pricing: { registration: 14.99, renewal: 17.99, transfer: 14.99 },
        category: 'new',
    },
    {
        extension: '.app',
        name: 'Application',
        pricing: { registration: 16.99, renewal: 19.99, transfer: 16.99 },
        category: 'new',
    },
    {
        extension: '.tech',
        name: 'Technology',
        pricing: { registration: 44.99, renewal: 54.99, transfer: 44.99 },
        category: 'new',
    },
    {
        extension: '.store',
        name: 'Store',
        pricing: { registration: 49.99, renewal: 59.99, transfer: 49.99 },
        category: 'new',
    },
    {
        extension: '.online',
        name: 'Online',
        pricing: { registration: 29.99, renewal: 39.99, transfer: 29.99 },
        category: 'new',
    },
    {
        extension: '.site',
        name: 'Website',
        pricing: { registration: 24.99, renewal: 29.99, transfer: 24.99 },
        category: 'new',
    },
];
