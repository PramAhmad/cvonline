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
    component: () => import('@/views/home2/index.vue')
  },
  //dyanmic route convert
{
  path:'/convert/:id',
  name:'convert',
  meta:{
    title:setTitle('convert')
  },
  component:()=>import('@/views/convert/index.vue')
}
 

];


export const allRoutes = [
  ...mainRoute,

]
