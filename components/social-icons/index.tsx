import Mail from './mail.svg';
import Gitlab from './gitlab.svg';
import Github from './github.svg';
import Youtube from './youtube.svg';
import Linkedin from './linkedin.svg';
import Twitter from './twitter.svg';
import PropTypes from 'prop-types';

// Icons taken from: https://simpleicons.org/

const components = {
  mail: Mail,
  gitlab: Gitlab,
  github: Github,
  youtube: Youtube,
  linkedin: Linkedin,
  twitter: Twitter,
};

const SocialIcon = ({ kind, href, size }) => {
  if (!href) return null;

  const SocialSvg = components[kind];

  return (
    <a
      className="text-sm text-gray-500 transition hover:text-gray-600"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      <span className="sr-only">{kind}</span>
      <SocialSvg
        className={`fill-current text-gray-700 dark:text-gray-200 hover:text-blue-500 
        dark:hover:text-blue-400 h-6 w-6`}
      />
    </a>
  );
};

SocialIcon.propTypes = {
  href: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  kind: PropTypes.string.isRequired,
};

export default SocialIcon;
