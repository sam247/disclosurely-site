import React from 'react';

const config = {
  logo: <span>Disclosurely Documentation</span>,
  project: {
    link: 'https://github.com/sam247/disclosurely-site',
  },
  docsRepositoryBase: 'https://github.com/sam247/disclosurely-site/tree/main/content',
  footer: {
    text: 'Disclosurely Documentation © 2025',
  },
  primaryHue: 217, // Blue color
  primarySaturation: 100,
  useNextSeoProps() {
    return {
      titleTemplate: '%s – Disclosurely',
    };
  },
  search: {
    placeholder: 'Search documentation...',
  },
};

export default config;

