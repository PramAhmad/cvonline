import type { PricingType, StatisticType, TestimonialType } from '@/types'

import avatar1 from '@/assets/images/avatar/01.jpg'
import avatar2 from '@/assets/images/avatar/02.jpg'
import avatar3 from '@/assets/images/avatar/03.jpg'
import avatar4 from '@/assets/images/avatar/04.jpg'
import avatar5 from '@/assets/images/avatar/05.jpg'
import avatar7 from '@/assets/images/avatar/07.jpg'
import avatar8 from '@/assets/images/avatar/08.jpg'
import avatar10 from '@/assets/images/avatar/10.jpg'
import avatar11 from '@/assets/images/avatar/11.jpg'
import { BIconCheckLg } from 'bootstrap-icons-vue'

export const statData: StatisticType[] = [
  {
    title: 'Total Downloads',
    number: 15,
    suffix: 'M+'
  },
  {
    title: 'Total Followers',
    number: 22,
    suffix: 'M+'
  },
  {
    title: 'Total Reviews',
    number: 2300,
    suffix: '+'
  },
  {
    title: 'Total Countries',
    number: 107,
    suffix: '+'
  }
]

export const pricingData: PricingType[] = [
  {
    duration: 'month',
    plans: [
      {
        badge: 'Boss Mode',
        price: 45,
        features: [
          { icon: BIconCheckLg, title: 'Up to 05 users monthly' },
          { icon: BIconCheckLg, title: 'Free 5 host domain' },
          { icon: BIconCheckLg, title: 'Google docs style editors' },
          { icon: BIconCheckLg, title: 'Support for 30+ languages' },
          { icon: BIconCheckLg, title: 'Landing pages Web widgets' },
          { icon: BIconCheckLg, title: '24/7 dedicated Support' }
        ]
      },
      {
        badge: 'Enterprise Mode',
        price: 175,
        features: [
          { icon: BIconCheckLg, title: 'Up to 05 users monthly' },
          { icon: BIconCheckLg, title: 'Free 5 host domain' },
          { icon: BIconCheckLg, title: 'Google docs style editors' },
          { icon: BIconCheckLg, title: 'Support for 30+ languages' },
          { icon: BIconCheckLg, title: 'Landing pages Web widgets' },
          { icon: BIconCheckLg, title: '24/7 dedicated Support' }
        ]
      }
    ]
  },
  {
    duration: 'year',
    plans: [
      {
        badge: 'Boss Mode',
        price: 56,
        features: [
          { icon: BIconCheckLg, title: 'Up to 05 users monthly' },
          { icon: BIconCheckLg, title: 'Free 5 host domain' },
          { icon: BIconCheckLg, title: 'Google docs style editors' },
          { icon: BIconCheckLg, title: 'Support for 30+ languages' },
          { icon: BIconCheckLg, title: 'Landing pages Web widgets' },
          { icon: BIconCheckLg, title: '24/7 dedicated Support' }
        ]
      },
      {
        badge: 'Enterprise Mode',
        price: 199,
        features: [
          { icon: BIconCheckLg, title: 'Up to 05 users monthly' },
          { icon: BIconCheckLg, title: 'Free 5 host domain' },
          { icon: BIconCheckLg, title: 'Google docs style editors' },
          { icon: BIconCheckLg, title: 'Support for 30+ languages' },
          { icon: BIconCheckLg, title: 'Landing pages Web widgets' },
          { icon: BIconCheckLg, title: '24/7 dedicated Support' }
        ]
      }
    ]
  }
]
export const testimonials: TestimonialType[] = [
  {
    user: {
      avatar: avatar1,
      firstName: 'Mas ',
      lastName: 'Heri Official'
    },
    comment: 'terimakasih aplikasi ini sangat membantu buat kalian yang mau convert pulsa ke no rekening kalian ,amanah,terpercaya sukses selalu',
    rating: 5
  },
  {
    user: {
      avatar: avatar2,
      firstName: 'Olivia',
      lastName: 'Pratiwi'
    },
    comment:
      "SET SAT SETTTTT!!! keren cpt bgt ga sampe 10menit lebih bahkan",
    rating: 4.5
  },
  {
    user: {
      avatar: avatar3,
      firstName: 'Marvin ',
      lastName: 'Sohilait'
    },
    comment: 'Aman dan amanah proses cepat dan admin ramah',
    rating: 4.5
  },
  {
    user: {
      avatar: avatar5,
      firstName: 'Teguh',
      lastName: 'Gama'
    },
    comment:
      'Aplikasi tepercaya Tidak ada penundaan, geng. Pertama kali mencoba dan wuuuuussshhhh sudah berhasil. Terima kasih',
    rating: 5
  },
  {
    user: {
      avatar: avatar7,
      firstName: 'Ari ',
      lastName: 'Prasetio Official  '
    },
    comment:
      "Respon cepat dan terpercaya, ngak usah ragu convert pulsa disini,amanah banget",
    rating: 4.5
  },
 
]
