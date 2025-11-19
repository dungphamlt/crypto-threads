import { url, getAuthor } from '@/app/layout.config';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Script from 'next/script';

export default async function Page({
    params,
}: {
    params: Promise<{ articleSlug: string }>;
}) {
    const { articleSlug } = await params;
    const Body = {}
    const goBackUrl = '/';

    if (!Body) {
        return notFound();
    }

    // Create the JSON-LD data
    // const jsonLd = {
    //     '@context': 'https://schema.org',
    //     '@type': 'Article',
    //     headline: article?.data.title,
    //     datePublished: article?.data.date.toISOString(),
    //     author: {
    //         '@type': 'Person',
    //         name: author.name,
    //     },
    //     publisher: {
    //         '@type': 'Organization',
    //         name: 'OpenPanel',
    //         logo: {
    //             '@type': 'ImageObject',
    //             url: url('/logo.png'),
    //         },
    //     },
    //     mainEntityOfPage: {
    //         '@type': 'WebPage',
    //         '@id': url(article.url),
    //     },
    //     image: {
    //         '@type': 'ImageObject',
    //         url: url(article.data.cover),
    //     },
    // };

    return (
        <div>
            <Script
                strategy="beforeInteractive"
                id="article-schema"
                type="application/ld+json"
                // dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <article className="container max-w-5xl col">
                <div className="py-16">
                    <Link
                        href={goBackUrl}
                        className="flex items-center gap-2 mb-4 text-muted-foreground"
                    >
                        <ArrowLeftIcon className="w-4 h-4" />
                        <span>Back to all articles</span>
                    </Link>
                    <div className="flex-col-reverse col md:row gap-8">
                        {/* content */}
                    </div>
                </div>
            </article>
        </div>
    );
}