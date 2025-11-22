import Header from '@/components/header';
import { Footer } from '@/components/footer';
import { privacyPolicyData } from '@/data/privacy-policy-data';
import type { PrivacySubsection } from '@/data/privacy-policy-data';
 

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Header />
      <main className="flex-1">
        <section className="mx-auto px-4 pt-12 sm:pt-20 lg:pt-16 max-w-4xl">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase text-foreground mb-4">
              {privacyPolicyData.header.title}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Effective Date: {privacyPolicyData.header.effectiveDate}
            </p>
          </div>

          {/* Introduction */}
          <div className="mb-12 space-y-4">
            {privacyPolicyData.introduction.map((paragraph, index) => (
              <p
                key={index}
                className="text-sm sm:text-base text-muted-foreground leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Sections */}
          {privacyPolicyData.sections.map((section, sectionIndex) => (
            <section key={sectionIndex} className="mb-12 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold uppercase text-foreground">
                {section.title}
              </h2>

              {/* Section with content only */}
              {section.content && !section.subsections && (
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {section.content}
                </p>
              )}

              {/* Section with items only */}
              {section.items && !section.subsections && (
                <div className="space-y-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {section.items.map((item: string, itemIndex: number) => (
                    <p key={itemIndex}>{item}</p>
                  ))}
                </div>
              )}

              {/* Section with subsections */}
              {section.subsections?.map((subsection: PrivacySubsection, subsectionIndex: number) => (
                <div key={subsectionIndex} className="space-y-3">
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground">
                    {subsection.title}
                  </h3>

                  {/* Subsection content */}
                  {subsection.content && (
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {subsection.content}
                    </p>
                  )}

                  {/* Subsection items */}
                  {subsection.items && (
                    <div className="space-y-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {subsection.items.map((item: string, itemIndex: number) => (
                        <p key={itemIndex}>{item}</p>
                      ))}
                    </div>
                  )}

                  {/* Subsection with subItems (nested) */}
                  {subsection.subItems?.map((subItem, subItemIndex: number) => (
                    <div key={subItemIndex} className="space-y-3 ml-4">
                      <h4 className="text-base sm:text-lg font-medium text-foreground">
                        {subItem.title}
                      </h4>
                      {subItem.content && (
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                          {subItem.content}
                        </p>
                      )}
                      {subItem.items && (
                        <ul className="list-none space-y-2 text-sm sm:text-base text-muted-foreground leading-relaxed ml-4">
                          {subItem.items.map((item: string, itemIndex: number) => (
                            <li key={itemIndex}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </section>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}
