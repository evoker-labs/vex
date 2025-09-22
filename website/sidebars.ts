import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Welcome to VEX',
    },
    {
      type: 'category',
      label: '🏢 Business Solutions',
      collapsed: false,
      items: [
        'business/overview',
        'business/getting-started',
        'business/directory',
      ],
    },
    {
      type: 'category',
      label: '👥 For Users',
      collapsed: false,
      items: [
        'users/getting-started',
      ],
    },
    {
      type: 'category',
      label: '⚙️ Technical Documentation',
      collapsed: false,
      items: [
        'technical/architecture',
        'technical/api',
        'technical/sdk',
        'technical/contracts',
        'technical/examples',
      ],
    },
    {
      type: 'category',
      label: '💎 Tokenomics',
      collapsed: false,
      items: [
        'tokenomics/overview',
      ],
    },
  ],
};

export default sidebars;