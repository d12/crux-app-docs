import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Crux Climbing App - Documentation',
  tagline: 'Learn how to use the Crux Climbing App',
  favicon: 'img/favicon.ico',

  organizationName: "d12",
  projectName: "crux-app-docs",

  // Set the production url of your site here
  url: 'https://docs.cruxapp.ca',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  trailingSlash: false,

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: [
      'en',
    ],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: "/",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/d12/crux-app-docs/tree/main/',
          // sidebarCollapsible: false,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/socialcard.jpg',
    navbar: {
      title: 'Crux App - Documentation',
      logo: {
        alt: 'Crux Logo',
        src: 'img/crux.png',
      },
      items: [
        {
          label: "Crux Website",
          href: "https://www.cruxapp.ca/",
          position: "right"
        }
      ],
    },
    footer: {
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Home',
              to: '/',
            },
            {
              label: "Downloading Crux",
              to: "/downloading-crux",
            },
            {
              label: "Documentation for Climbers",
              to: "/documentation-for-climbers",
            },
            {
              label: "Documentation for Gym Staff",
              to: "/documentation-for-gym-staff",
            }
          ],
        },
        {
          title: 'Crux Website',
          items: [
            {
              label: 'Crux for Gyms',
              href: 'https://www.cruxapp.ca/',
            },
            {
              label: 'Crux for Climbers',
              href: 'https://www.cruxapp.ca/climbers',
            },
            {
              label: 'Crux for Homewalls',
              href: 'https://www.cruxapp.ca/homewalls',
            },
            {
              label: "Crux vs Stōkt",
              href: "https://www.cruxapp.ca/en/crux-vs-stokt"
            },
            {
              label: "Contact Us",
              href: "https://www.cruxapp.ca/contact"
            }
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              to: 'https://discord.com/invite/ypt6e9HBVC',
            },
            {
              label: 'Instagram',
              href: 'https://www.instagram.com/climbwithcrux/',
            },
          ],
        },
      ],
      // copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
  plugins: [
    [require.resolve('docusaurus-lunr-search'), {
      indexBaseUrl: true,
      highlightSearchTermsOnTargetPage: true,
      searchResultLimits: 10,
      searchResultContextMaxLength: 50,
      lunr: {
        tokenizerSeparator: /[\s\-]+/,
        // Adjust the boost weights here
        pipelineFunctions: [],
      },
      documents: [
        { field: "title", boost: 10 },  // Increase weight for titles
        { field: "content", boost: 1 }, // Lower weight for content
        { field: "h1", boost: 8 },      // Give H1 a high weight
        { field: "h2", boost: 5 },      // Slightly lower for H2
        { field: "h3", boost: 2 },      // Lower for H3
      ],
    },]],
};

export default config;
