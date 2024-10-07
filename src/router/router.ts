const setTitle = (pageName?: string) => {
  return pageName
    ? `${pageName} | Mizzle Vue - Multipurpose Bootstrap Template`
    : 'Mizzle Vue | Multipurpose Bootstrap Template'
}

const mainRoute = [
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
  }
 

];


export const allRoutes = [
  ...mainRoute,

]
