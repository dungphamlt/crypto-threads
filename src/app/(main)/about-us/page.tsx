import Header from '@/components/header';
import { Footer } from '@/components/footer';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn more about Crypto Threads – our mission, team and how we empower the community with trustworthy crypto insights.',
};

const stats = [
  { label: 'Articles Published', value: '1.2K+' },
  { label: 'Contributors', value: '80+' },
  { label: 'Monthly Readers', value: '250K+' },
  { label: 'Communities Served', value: '24' },
];

const pillars = [
  {
    title: 'Transparent Research',
    description:
      'We translate on-chain signals, macro narratives and regulatory updates into plain language.',
  },
  {
    title: 'Community First',
    description:
      'Readers, creators and partners collaborate with us to shape the next wave of content formats.',
  },
  {
    title: 'Actionable Education',
    description:
      'Deep dives, explainers and workshops help both beginners and pros make confident decisions.',
  },
];

const timeline = [
  {
    year: '2021',
    title: 'Crypto Threads launches',
    description: 'Started as a weekend newsletter to curate crypto macro reads.',
  },
  {
    year: '2022',
    title: 'Studio & research pods',
    description: 'Produced documentary-style explainers and data-backed case studies.',
  },
  {
    year: '2023',
    title: 'Community accelerators',
    description: 'Brought in active contributors across TradFi, DeFi and regulation.',
  },
  {
    year: '2024',
    title: 'Global contributor network',
    description: 'Operating hubs in APAC, US, and EU with localized content.',
  },
];

const team = [
  { name: 'Lauren Park', role: 'Editor-in-Chief' },
  { name: 'Nate Alvarez', role: 'Head of Research' },
  { name: 'Maya Pham', role: 'Creative Director' },
  { name: 'Ethan Roy', role: 'Growth Lead' },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Header />
      <main className="flex-1">
        <section className="container mx-auto px-4 py-16 lg:py-24">
          <div className="max-w-4xl space-y-6">
            <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">About us</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight text-foreground">
              We amplify trustworthy crypto voices and help readers navigate what happens next.
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              From daily briefings to deep dives, we combine smart editorial taste with transparent
              data to translate complex trends into practical takeaways for investors, founders and
              curious readers alike.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium hover:opacity-80 transition"
              >
                Partner with us
              </Link>
              <Link
                href="/studio"
                className="inline-flex items-center justify-center rounded-full border border-foreground/20 px-6 py-3 text-sm font-medium text-foreground hover:border-foreground/40 transition"
              >
                Explore the studio
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-background-dark/40 py-12">
          <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-semibold text-foreground">{stat.value}</div>
                <div className="text-sm uppercase tracking-wide text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 py-16 space-y-10">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold text-foreground">What drives us</h2>
            <p className="text-muted-foreground mt-3">
              We sit at the intersection of journalism, research, and community-building. These
              pillars keep us grounded as the market cycles through hype and winter alike.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-2xl border border-foreground/10 bg-background-light/40 p-6 space-y-3"
              >
                <h3 className="text-xl font-semibold">{pillar.title}</h3>
                <p className="text-sm text-muted-foreground">{pillar.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 py-16 space-y-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold text-foreground">Our story so far</h2>
            <p className="text-muted-foreground mt-3">
              Milestones that shaped the way we cover crypto, TradFi and the frontier.
            </p>
          </div>
          <div className="relative border-l border-foreground/10 pl-6 space-y-8">
            {timeline.map((event) => (
              <div key={event.year} className="relative">
                <span className="w-3 h-3 rounded-full bg-foreground absolute -left-[30px] top-2" />
                <div className="text-sm uppercase tracking-wide text-muted-foreground">
                  {event.year}
                </div>
                <h3 className="text-xl font-semibold text-foreground mt-1">{event.title}</h3>
                <p className="text-sm text-muted-foreground">{event.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 py-16 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-semibold text-foreground">Team snapshots</h2>
              <p className="text-muted-foreground mt-2 max-w-2xl">
                Editors, researchers, motion designers and strategists spanning three time zones.
              </p>
            </div>
            <Link
              href="/our-team"
              className="text-sm font-medium text-foreground underline underline-offset-4 hover:text-foreground/80"
            >
              Meet everyone
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="rounded-2xl border border-foreground/10 bg-background-light/40 p-5 space-y-2"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-foreground/10 to-foreground/30 flex items-center justify-center text-lg font-semibold text-foreground">
                  {member.name
                    .split(' ')
                    .map((part) => part[0])
                    .join('')}
                </div>
                <div className="text-lg font-semibold">{member.name}</div>
                <div className="text-sm text-muted-foreground">{member.role}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

