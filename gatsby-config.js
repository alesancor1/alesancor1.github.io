module.exports = {
  siteMetadata: {
    title: `Personal Blog`,
    siteUrl: `https://alesancor1.github.io/`,
    description: `A site for %TOPICS%`,
    topics: ['Students',' Developers', 'Researchers', 'Software Engineering'],
    menu: [
      {
        name: 'Home',
        path: '/'
      },
      {
        name: 'Posts',
        path: '/archive',
      },
      {
        name: 'Tags',
        path: '/tags',
      }
    ],
    footerMenu: [
      {
        name: 'Posts',
        path: '/archive',
      },
      {
        name: 'Tags',
        path: '/tags',
      }
    ],
    search: true,
    author: {
      name: `alesancor1`,
      description: `Welcome to my blog!`,
      social: {
        facebook: ``,
        twitter: ``,
        linkedin: `https://www.linkedin.com/in/alesancor/`,
        instagram: ``,
        youtube: ``,
        github: `https://github.com/alesancor1`,
        twitch: ``
      }
    }
  },
  plugins: [
    {
      resolve: `@nehalist/gatsby-theme-nehalem`,
      options: {
        manifest: {
          name: `alesancor1 - Personal Blog`,
          short_name: `alesancor1`,
          start_url: `/`,
          background_color: `#fafafa`,
          theme_color: `#11ABB6`,
          display: `minimal-ui`,
          icon: `${__dirname}/content/assets/images/logo.png`
        }
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/content/assets/images`
      }
    },
  ]
};
