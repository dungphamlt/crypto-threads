import Header from '@/components/header';
import { Footer } from '@/components/footer';
import { TeamIntroSlider } from '@/components/team/team-intro-slider';
import Image from 'next/image';
import Link from 'next/link';
import { authorService } from '@/services/authors-service';
import { getAuthor } from '@/app/layout.config';


const teamIntroImages = [
  {
    src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    alt: 'Team collaboration',
  },
  {
    src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
    alt: 'Team meeting',
  },
  {
    src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80',
    alt: 'Team workspace',
  },
  {
    src: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80',
    alt: 'Team discussion',
  },
  {
    src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
    alt: 'Team brainstorming',
  },
];

export default async function OurTeamPage() {
  const authors = await authorService.getListAuthors();

  console.log('Authors:', authors);

  const displayAuthors = [...authors];
  const email = getAuthor('The20 Team').email;

  return (
    <div>
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Hero Slider */}
        <section className="w-full mb-8 mt-16">
          <TeamIntroSlider images={teamIntroImages} />
        </section>

        {/* OUR TEAM / AUTHOR Section */}
        {/* <section className="mx-auto px-4 pt-6 border-t">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h1 className="text-1xl sm:text-2xl md:text-3xl font-bold uppercase text-foreground">
              OUR TEAM
            </h1>
            <div className="max-w-2xl">
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Crypto Threads is your go-to platform for the latest news, insights, and analysis in
                the ever-evolving world of cryptocurrency and blockchain technology. We cut through
                the noise to deliver clear, concise, and impactful content that keeps you informed
                and ahead of the curve.
              </p>
            </div>
            <h2 className="text-1xl sm:text-2xl md:text-3xl font-bold uppercase text-foreground">
              AUTHOR
            </h2>
          </div>
        </section> */}

        {/* Team Members Grid */}
        <section className=" mx-auto pb-4 sm:py-12">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 justify-items-center">
            {displayAuthors.map((member) => (
              <Link
                key={member.id}
                href={member.name === 'COMING SOON' ? '#' : `/author/${member.id}`}
                className="flex flex-col gap-4 group"
              >
                <div className="w-32 h-32 sm:w-64 sm:h-64 rounded-xl bg-muted overflow-hidden flex items-center justify-center">
                  {member.avatarUrl ? (
                    <Image
                      src={member.avatarUrl}
                      alt={member.name || 'Team member'}
                      width={256}
                      height={256}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted/60 flex items-center justify-center bg-gray-200 dark:bg-gray-600">
                      <span className="text-xs text-muted-foreground">Coming Soon</span>
                    </div>
                  )}
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-foreground text-center uppercase group-hover:text-primary transition-colors">
                  {member.name?.toUpperCase() || 'COMING SOON'}
                </h3>
              </Link>
            ))}
          </div>
        </section>

        {/* WORK WITH US Section */}
        <section className="container mx-auto px-4 py-12 border-t border-border">
          <div className="max-w-2xl mx-auto text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground font-funnel">
              Work with us
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-medium">
              For all inquiries regarding partnerships, advertisements, or questions, please email to{' '}
              <Link
                href={`mailto:${email}`}
                className="text-foreground hover:underline font-semibold"
              >
                {email}
              </Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
