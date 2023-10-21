import { Facebook, Github, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const SocialLink = ({
  platform,
  link,
  isShareURL = false,
}: {
  platform: string;
  link: string;
  isShareURL?: boolean;
}) => {
  const getIcon = (platform: string) => {
    switch (platform) {
      case 'facebook':
        return <Facebook size={18} />;
        break;
      case 'twitter':
        return <Twitter size={18} />;
        break;
      case 'instagram':
        return <Instagram size={18} />;
        break;
      case 'youtube':
        return <Youtube size={18} />;
        break;
      case 'linkedin':
        return <Linkedin size={18} />;
        break;
      case 'github':
        return <Github size={18} />;
    }
  };

  return <Link href={link}>
    <div className={`${isShareURL ? "py-2 px-3 bg-neutral-200 rounded-md text-neutral-600 hover:bg-neutral-800 hover:text-neutral-100 duration-100 ease-in-out transition-colors" : ""}`}>
    {getIcon(platform)}
    </div>
  </Link>;
};

export default SocialLink;
