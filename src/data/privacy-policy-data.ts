export interface PrivacySection {
  title: string;
  subsections?: PrivacySubsection[];
  content?: string;
  items?: string[];
}

export interface PrivacySubsection {
  title: string;
  content?: string;
  items?: string[];
  subItems?: {
    title: string;
    content?: string;
    items?: string[];
  }[];
}

export interface PrivacyPolicyData {
  header: {
    title: string;
    effectiveDate: string;
  };
  introduction: string[];
  sections: PrivacySection[];
}

export const privacyPolicyData = {
  header: {
    title: "PRIVACY POLICY",
    effectiveDate: "March 31, 2025",
  },
  introduction: [
    "Thank you for visiting Crypto Threads. This Privacy Policy applies to personal and customer information obtained through our website, cryptothreads.blog. Please note that websites linked from this site are not covered by this Privacy Policy, and we encourage you to read the privacy statements of other sites you visit.",
    "This Privacy Policy details how we collect, use, maintain, and disclose information obtained from users of our service. By using our service, you consent to the data practices described in this policy. We may revise this Privacy Policy from time to time to reflect changes in the law, our data collection practices, the features of our service, or advances in technology.",
  ],
  sections: [
    {
      title: "TYPES OF INFORMATION WE OBTAIN",
      subsections: [
        {
          title: "1.1. Non-personal Information",
          content:
            "When you visit cryptothreads.blog, we automatically obtain information about your website usage through means such as web server logs, JavaScript, and similar technologies.",
        },
        {
          title: "1.2. Personal Information",
          subItems: [
            {
              title:
                "1.2.1 We may obtain your personal data from the following sources:",
              items: [
                "a) Directly from you (via our website or online forms).",
                "b) From third parties, service providers assisting with our services, or from social network accounts you use to sign in.",
              ],
            },
            {
              title:
                "1.2.2 By voluntarily providing us with personal information...",
              content:
                "By voluntarily providing us with personal information, you agree to its use according to this Privacy Policy, and acknowledge that such information may be transferred to our website's servers or authorized third parties.",
              items: [
                "a) Contact information.",
                "b) Your IP address and unique mobile device identification numbers (e.g., device ID, advertising ID, MAC address).",
                "c) Data about your device (e.g., manufacturer, operating system, browser type, and language).",
                "d) Broad location data.",
                "e) Precise geolocation data.",
                "f) Data collected with cookies and similar technologies.",
                "g) Data received if a third-party tool is linked with the Service (e.g., Facebook or Google).",
                "h) Data for advertising and analytics purposes.",
                "i) Your messages to the Services (e.g., feedback submitted about your experience).",
                "j) Information on the use of our website (e.g., pages visited, geographical location, time spent on the website, online transactions).",
                "k) Preferences regarding online marketing.",
                "l) Other data you choose to give us.",
              ],
            },
          ],
        },
        {
          title: "1.3. Additional Information",
          items: [
            "1.3.1 We reserve the right to obtain information about legal entities visiting our website through their representatives.",
            "1.3.2 The types of information we may obtain about legal entities include: website, name, contact information (business emails), country of incorporation, and ICO link.",
          ],
        },
        {
          title: "1.4. Web Browser Extension",
          content:
            "We may use a web browser extension to obtain information. This extension only accesses explicitly granted permissions and does not track your browsing history.",
        },
      ],
    },
    {
      title: "HOW WE USE THE INFORMATION WE OBTAIN?",
      subsections: [
        {
          title: "1.1. We use non-personal information for the following purposes:",
          items: [
            "(a) To prevent users from seeing unnecessary advertisements or being required to re-enter information on the Website.",
            "(b) To calculate the aggregate number of visitors and identify the most popular parts of the Website.",
            "(c) To improve and customize the content and layout of web pages.",
            "(d) To deliver requested information from the Website, such as articles, news, reviews, or analysis.",
          ],
        },
        {
          title:
            "1.2. Areas in which we may use your personal information include, but are not limited to:",
          content:
            "Providing email newsletters, feedback, and the ability to comment on articles and interactive forms. If you provide an email address, you may receive periodic promotional emails from our service and carefully selected partners (with your consent). You may also receive informational emails related to administrative notices about the Website's operation. You can withdraw your consent for electronic advertising emails by sending a withdrawal notice to \"Crypto Threads\" or by clicking an \"unsubscribe button\" in any email from \"Crypto Threads\".",
        },
        {
          title:
            "1.3. We may share your information with the following types of third parties:",
          items: [
            "a) Technical support providers who assist with the website and infrastructure.",
            "b) Third-party software providers who host relevant personal data on our service's behalf.",
            "c) Professional advisers such as solicitors, accountants, tax advisors, auditors, and insurance brokers.",
            "d) Providers that help generate and collate reviews related to goods and services.",
            "e) Advertising and promotional agencies carrying out marketing campaigns on our service's behalf and advertising their own products or services of interest to you.",
            "f) Service providers that assist in providing services.",
          ],
        },
        {
          title:
            "1.4. We may share your information with Law enforcement or government bodies:",
          content:
            "Personal data may be disclosed as permitted by law to investigate, prevent, or take action regarding illegal activities, suspected fraud, violation of intellectual property rights, situations involving potential threats to physical safety, violation of agreements, or as otherwise required by law.",
        },
      ],
    },
    {
      title: "COOKIES",
      subsections: [
        {
          title:
            "1.1. Cookies are files with a small amount of data that may include an anonymous unique identifier.",
          content:
            "Cookies are sent to your browser from the Website and stored on your computer's hard drive.",
        },
        {
          title: "1.2. Like many websites. We use \"cookies\" to collect information.",
          content:
            "Cookies are used to collect data about visits, allow navigation, count visits, and identify popular areas and features of the Website. This helps gather feedback to constantly improve the Website and better serve customers. Cookies do not gather any personal information about you and generally do not store personal information provided by you.",
        },
        {
          title: "1.3. You can control and/or delete cookies if you wish.",
          content:
            "You can delete all cookies already on your computer and set most browsers to prevent them from being stored. However, if this is done, some services and functionalities of the Website may not work.",
        },
      ],
    },
    {
      title: "HOW WE PROTECT PERSONAL INFORMATION",
      subsections: [
        {
          title:
            "1.1. We maintain administrative, technical and physical safeguards designed to protect the personal information we have about you against accidental, unlawful or unauthorized destruction, loss, alteration, access, disclosure or use.",
        },
        {
          title:
            "1.2. We have put in place appropriate security measures to prevent your data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.",
          items: [
            "Access to your data is limited to employees, agents, contractors, and other third parties who have a business need to know.",
            "These parties will only process your data on our instructions and are subject to a duty of confidentiality.",
            "We have procedures in place to deal with any suspected data breach, and we will notify you and the competent regulator where we are legally required to do so.",
          ],
        },
      ],
    },
    {
      title: "THIRD-PARTY LINKS",
      content:
        "Our website may include third-party products or services with separate privacy policies. We have no responsibility or liability for these linked services but seek to protect the integrity of our site and welcome feedback.",
    },
    {
      title: "CHANGES TO THE PRIVACY POLICY",
      content:
        "We may update this Privacy Policy periodically without prior notice. For significant changes, we will notify you by a prominent privacy policy posting on our website, indicating the most recent update date at the top.",
    },
    {
      title: "YOUR RIGHTS",
      items: [
        "You have the right to obtain information on how your personal data is handled, view copies of your data, and request amendments, corrections, or deletions.",
        "You can also limit, restrict, or object to data processing.",
        "We clarify that no decision-making is based solely on automated processing, including profiling.",
        "You can withdraw your consent at any time, but we may still rely on prior consent for processing before withdrawal.",
        "You can object to data use based on legitimate business interests.",
      ],
    },
    {
      title: "RIGHTS OF USE",
      content:
        "By accessing and using our website, you agree to download content (text, pictures, graphics, video, audio, software) only for personal non-commercial use. You may not copy, reproduce, duplicate, broadcast, download, store, transmit, resell, show, play in public, adapt, or modify content for any other purpose without written permission from \"Crypto Threads.\" All intellectual property rights, including copyright, belong to \"Crypto Threads,\" and all rights are reserved.",
    },
    {
      title: "DISCLAIMER",
      items: [
        '"Crypto Threads" is provided "as is" without any warranty. We disclaim all warranties, express or implied, including merchantability, fitness for a particular purpose, and non-infringement of proprietary rights.',
        "You are solely responsible for any damage to your computer or mobile device, loss of use, or loss of user content.",
        "You are responsible for your actions and submitted information, and \"Crypto Threads\" will not be held legally liable for user content or actions that infringe the law or third-party rights.",
      ],
    },
  ],
} satisfies PrivacyPolicyData;

