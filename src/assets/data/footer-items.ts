import type { BSIconType } from '@/types'
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faTwitter,
  faYoutube
} from '@fortawesome/free-brands-svg-icons'
import {
  BIconBoxArrowUpRight,
  BIconFileEarmarkTextFill,
  BIconPuzzleFill,
  BIconStickiesFill
} from 'bootstrap-icons-vue'

type FooterLinkType = {
  name: string
  link?: string
  badge?: string
  icon?: BSIconType
}

export const quickLinks: FooterLinkType[] = [
  {
    name: 'About us',
    link: 'home'
  },
  
]

export const communityLinks: FooterLinkType[] = [
  {
    name: 'Documents'
  },
  {
    name: 'Supports',
    icon: BIconBoxArrowUpRight
  },
  {
    name: 'Faqs',
    link: 'home'
  },
  
]

export const followOnIcons = [
  { icon: faFacebookF, variant: 'bg-facebook' },
  { icon: faInstagram, variant: 'bg-instagram' },
  { icon: faTwitter, variant: 'bg-twitter' },
  { icon: faLinkedinIn, variant: 'bg-linkedin' },
  { icon: faYoutube, variant: 'bg-youtube' }
]

export const contactDetails = {
  address: '1421 Coburn Hollow Road Metamora, Near Center Point, IL 61548.',
  number: '(251) 854-6308',
  email: 'help@example.com',
  open: 'Mon - Fri: 09:00 - 21:00',
  close: 'Sat - Sun: Closed'
}

export const footerQuickLinks3: FooterLinkType[] = [
  {
    name: 'About us',
    link: 'about.v1'
  },
  {
    name: 'Contact us',
    link: 'home'
  },

]

export const footerCommunityLinks3 = [
  {
    title: 'Documentation',
    icon: BIconFileEarmarkTextFill,
    variant: 'bg-warning'
  },
  {
    title: 'Snippets',
    icon: BIconStickiesFill,
    variant: 'bg-success'
  },
  {
    title: 'Components',
    icon: BIconPuzzleFill,
    variant: 'bg-info'
  }
]

export const quickLinks6: FooterLinkType[] = [
  {
    name: 'About us',
    link: 'home'
  },
  {
    name: 'Contact us',
    link: 'home'
  },
  {
    name: 'Career',
    link: 'career'
  },
  {
    name: 'Career detail',
    link: 'career.single'
  },
  {
    name: 'Become a partner',
    link: 'home'
  },
  {
    name: 'Sign up',
    link: 'home'
  },
  {
    name: 'Cookie'
  }
]
