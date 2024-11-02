import path from 'path';
import authMiddleware from '@/middleware/auth'

const setTitle = (pageName = '') => {
  return pageName
    ? `${pageName} |CV pulsa`
    : 'Cv Pulsa'
}

export const mainRoute = [
  {
    path: '/',
    redirect: { name: 'home' },
    name: 'index'
  },
  {
    path: '/',
    name: 'home',
    meta: {
      title: setTitle()
    },
    component: () => import('@/views/home/index.vue')
  },
  {
    path:'/convert/:id',
    name:'convert',
    meta:{
      title: setTitle('convert'),
      requiresAuth: true
    },
    component: () => import('@/views/convert/index.vue')
  },
  {
    path:'/tutorial',
    name:'tutorial',
    meta:{
      title: setTitle('tutorial'),
    },
    component: () => import('@/views/tutorial/index.vue')
  },
  {
    path:'/panduan',
    name:'panduan',
    meta:{
      title: setTitle('panduan'),
    },
    component: () => import('@/views/panduan/index.vue')
  },
  // calculator
  {
    path:'/calculator',
    name:'calculator',
    meta:{
      title: setTitle('calculator'),
    },
    component: () => import('@/views/calculator/index.vue')
  },
  {
    path:'/transaksi',
    name:'transaksi',
    meta:{
      title: setTitle('transaksi'),
      requiresAuth: true
    },
    component: () => import('@/views/transaksi/index.vue')
  },
  {
    path:'/kebijakan',
    name:'kebijakan',
    meta:{
      title: setTitle('kebijakan'),

    },
    component: () => import('@/views/kebijakan/index.vue')
  },
  {
    path:'/profile',
    name:'profile',
    meta:{
      title: setTitle('profile'),
      requiresAuth: true
    },
    component: () => import('@/views/profile/index.vue')
  },
  {
    path:'/rekening',
    name:'rekening',
    meta:{
      title: setTitle('rekening'),
      requiresAuth: true

    },
    component: () => import('@/views/rekening/index.vue')
  },
  {
    path:'/prosedure',
    name:'prosedure',
    meta:{
      title: setTitle('prosedure'),
      requiresAuth: true

    },
    component: () => import('@/views/prosedure/index.vue')
  },
  {
    path:'/rekening/:id',
    name:'rekening.detail',
    meta:{
      title: setTitle('rekening.detail'),
      requiresAuth: true
    },
    component: () => import('@/views/rekening/detail.vue')
  },
  {
    path:'/rekening/tambah',
    name:'rekening.tambah',
    meta:{
      title: setTitle('rekening.tambah'),
      requiresAuth: true
    },
    component: () => import('@/views/rekening/tambah.vue')
  },
  {
    path:'/login',
    name:'login',
    meta:{
      title: setTitle('login')
    },
    component: () => import('@/views/login/index.vue')
  },
  // blox index
  {
    path:'/blog',
    name:'blog',
    meta:{
      title: setTitle('blog')
    },
    component: () => import('@/views/blog/index.vue')
  },
  {
    path:'/blog/:slug',
    name:'blog.detail',
    meta:{
      title: setTitle('blog.detail')
    },
    component: () => import('@/views/blog/detail.vue')
  },
  { 
    path:'/maintenance',
    name:'maintenance',
    meta:{
      title: setTitle('maintance')
    },
    component: () => import('@/views/maintance/index.vue')
  },
];


export const allRoutes = [
  ...mainRoute
];
