import type { MegaMenuType, MenuItemType, ResourceMenuType } from '@/helpers/menu'
import {
  BIconBasket,
  BIconBell,
  BIconBlockquoteRight,
  BIconBoxes,
  BIconBriefcase,
  BIconBullseye,
  BIconCalendar3Week,
  BIconChatLeft,
  BIconEmojiSunglasses,
  BIconEnvelope,
  BIconFileEarmarkText,
  BIconFileText,
  BIconHeart,
  BIconLock,
  BIconMask,
  BIconPerson,
  BIconQuestionCircle,
  BIconRocket,
  BIconShieldLock,
  BIconStar,
  BIconStickies,
  BIconTrash,
  BIconWallet
} from 'bootstrap-icons-vue'

import slackImg from '@/assets/images/elements/slack.svg'
import webflowImg from '@/assets/images/elements/webflow.svg'
import mailchimpImg from '@/assets/images/elements/mailchimp.svg'
import redditImg from '@/assets/images/elements/reddit.svg'
import blogImg2 from '@/assets/images/blog/4by4/02.jpg'
import blogImg1 from '@/assets/images/blog/4by4/01.jpg'
import blogImg3 from '@/assets/images/blog/4by4/03.jpg'
import blog2 from '@/assets/images/blog/02.jpg'

export const ACCOUNT_VERTICAL_MENU_ITEMS: MenuItemType[] = [
  {
    key: 'account-profile',
    label: 'My Profile',
    route: { name: 'account.profile' },
    parentKey: 'pages-account',
    icon: BIconPerson
  },
  {
    key: 'account-security',
    label: 'Security',
    route: { name: 'account.security' },
    parentKey: 'pages-account',
    icon: BIconShieldLock
  },
  {
    key: 'account-notifications',
    label: 'Notifications',
    route: { name: 'account.notifications' },
    parentKey: 'pages-account',
    icon: BIconBell
  },
  {
    key: 'account-projects',
    label: 'Projects',
    route: { name: 'account.projects' },
    parentKey: 'pages-account',
    icon: BIconBriefcase
  },
  {
    key: 'account-payment-details',
    label: 'Payment Details',
    route: { name: 'account.payment-details' },
    parentKey: 'pages-account',
    icon: BIconWallet
  },
  {
    key: 'account-order-history',
    label: 'Order History',
    route: { name: 'account.order-history' },
    parentKey: 'pages-account',
    icon: BIconBasket
  },
  {
    key: 'account-wishlist',
    label: 'Wishlist',
    route: { name: 'account.wishlist' },
    parentKey: 'pages-account',
    icon: BIconHeart
  },
  {
    key: 'account-delete-profile',
    label: 'Delete Profile',
    route: { name: 'account.delete-profile' },
    parentKey: 'pages-account',
    icon: BIconTrash
  }
]

export const APP_MENU_ITEMS: MenuItemType[] = [
  {
    key: 'home',
    label: 'Home',
    route: { name: 'home' },
    children: [
      {
        key: 'home',
        label: 'Home',
        route: { name: 'home' }
      },
      {
        key: 'home',
        label: 'Home',
        route: { name: 'home' }
      },
      {
        key: 'home',
        label: 'Home',
        route: { name: 'home' }
      }],
  },

]

export const MEGA_MENU_ITEMS: MegaMenuType = {
  usefulLinks: [
    'Market Research',
    'Advertising',
    'Consumer behavior',
    'Digital marketing',
    'Marketing ethics',
    'Social media marketing'
  ],
  company: [
    {
      icon: BIconBoxes,
      title: 'About us',
      description: 'Learn about our story, our mission statement and roadmap.'
    },
    {
      icon: BIconRocket,
      title: 'Career',
      badge: '3 Jobs',
      description: "We're always looking for talented people. Join our team!"
    },
    {
      icon: BIconEmojiSunglasses,
      title: 'Customer stories',
      description: 'Learn how our customer are making big changes to their tech stack'
    }
  ],
  integration: [
    {
      logo: slackImg,
      name: 'Slack'
    },
    {
      logo: webflowImg,
      name: 'Webflow'
    },
    {
      logo: mailchimpImg,
      name: 'Mailchimp'
    },
    {
      logo: redditImg,
      name: 'Reddit'
    }
  ],
  recentBlogs: [
    {
      image: blogImg2,
      title: '10 things you need to know about Mizzle',
      link: '/blog/single/v1'
    },
    {
      image: blogImg1,
      title: 'The Power of Gratitude: Cultivating Joy and Abundance',
      link: '/blog/single/v2'
    },
    {
      image: blogImg3,
      title: 'Effortless Web Development with Mizzle',
      link: '/blog/single/v1'
    }
  ]
}

export const RESOURCES_MENU_ITEMS: ResourceMenuType = {
  usefulLinks: [
    { icon: BIconFileText, name: 'Guides' },
    { icon: BIconChatLeft, name: 'Supports' },
    { icon: BIconCalendar3Week, name: 'Community & events' },
    { icon: BIconBlockquoteRight, name: 'Blogs' },
    { icon: BIconLock, name: 'Security' },
    { icon: BIconStar, name: 'Tutorials' },
    { icon: BIconQuestionCircle, name: 'Help center' },
    { icon: BIconEnvelope, name: 'Developer newsletter' }
  ],
  keyFeatures: [
    {
      title: 'Documentation',
      description: 'Using documentation you can easily develop projects',
      icon: BIconFileEarmarkText
    },
    {
      title: 'Snippets',
      description: 'Development guides for building projects with Mizzle',
      icon: BIconStickies
    },
    {
      title: 'Changelog',
      description: 'Recent feature release and announcement. See how changes are made.',
      icon: BIconBullseye
    },
    {
      title: 'Playwright tips',
      description: 'Tips and In-depth guide for headless browser automation',
      icon: BIconMask
    }
  ],
  featureResource: {
    title: 'Featured title here',
    description: 'Departure defective arranging rapturous did believe him all had supported.',
    image: blog2
  }
}
