/* eslint-disable react/prop-types */

import { BiLogoInstagram, BiLogoTwitter } from 'react-icons/bi'
import Link from './Link'

const Footer = () => {
  return (
    <footer className="flex items-end justify-between p-4">
      <img src="/src/assets/esrb.png" />

      {/* End Section */}
      <div className="flex gap-4 items-end">
        {/* Social Media */}
        <ul className="flex gap-6">
          <li>
            <Link LeadingIcon={BiLogoTwitter} href="#" target="_blank">
              Twitter
            </Link>
          </li>
          <li>
            <Link LeadingIcon={BiLogoInstagram} href="#" target="_blank">
              Instagram
            </Link>
          </li>
          <p>
            Publicado por: <span className="sr-only">GameXP</span>
          </p>
        </ul>

        {/* Logo */}
        <img src="/src/assets/compact-logo.svg" />
      </div>
    </footer>
  )
}

export default Footer
