import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export const siteName = 'Crypto Threads';
// export const baseUrl = 'https://cryptothreads.bog/';
export const baseUrl = 'http://localhost:3000/';
export const url = (path: string) => `${baseUrl}${path}`;

// Extended type for links with dropdown support
export interface NavLinkWithDropdown {
    type: 'main';
    text: string;
    url: string;
    active?: string;
    dropdown?: Array<{
        text: string;
        url: string;
    }>;
}

export const baseOptions = {
    nav: {
        title: siteName,
    },
    links: [
        {
            type: 'main',
            text: 'Home',
            url: '/',
            active: 'nested-url',
        },
        {
            type: 'main',
            text: 'Studio',
            url: '/studio',
            active: 'nested-url',
        },
        {
            type: 'main',
            text: 'Daily news',
            url: '/daily-news',
            active: 'nested-url',
            dropdown: [
                { text: 'Releases', url: '/daily-news/releases' },
                { text: 'TradFi', url: '/daily-news/tradfi' },
                { text: 'Regulations', url: '/daily-news/regulations' },
                { text: 'Markets', url: '/daily-news/markets' },
            ],
        },
        {
            type: 'main',
            text: 'Insight',
            url: '/insight',
            active: 'nested-url',
            dropdown: [
                { text: 'TradFi', url: '/insight/tradfi' },
                { text: 'Regulations', url: '/insight/regulations' },
                { text: 'Markets', url: '/insight/markets' },
            ],
        },
        {
            type: 'main',
            text: 'Learn',
            url: '/learn',
            active: 'nested-url',
            dropdown: [
                { text: 'Hidden Gems', url: '/learn/hidden-gems' },
                { text: 'Crypto Fundamental', url: '/learn/crypto-fundamental' },
                { text: 'Market', url: '/learn/market' },
            ],
        },
        {
            type: 'main',
            text: 'Trading',
            url: '/trading',
            active: 'nested-url',
            dropdown: [
                { text: 'Trading Strategy', url: '/trading/strategy' },
                { text: 'Crypto Analysis', url: '/trading/crypto-analysis' },
                { text: 'Dummies', url: '/trading/dummies' },
            ],
        },
    ],
} as BaseLayoutProps & {
    links: NavLinkWithDropdown[];
};

export const authors = [
    {
        name: 'The20 Team',
        url: 'https://the20.sg/',
    },
];

export const getAuthor = (author?: string) => {
    return authors.find((a) => a.name === author)!;
};