export interface SiteConfig {
    siteName: string;
    description: string;
    currentlyAt: string;
    socialLinks: {
      twitter: string;
      youtube: string;
      github: string;
      linkedin: string;
      instagram: string;
    };
}

const siteConfig: SiteConfig = {
  siteName: 'Explorer',
  description: 'A minimal and lovely travel blog which shares experiences and stories of a traveller.',
  currentlyAt: 'Budapest, Hungary',
  socialLinks: {
    twitter: 'https://twitter.com/mikeliu',
    youtube: 'https://www.youtube.com/@gejyuve',
    github: 'https://github.com/mikeliu',
    linkedin: 'https://www.linkedin.com/in/mikeliu/',
    instagram: 'https://www.instagram.com/mikeliu/',
  },
};
export default siteConfig;