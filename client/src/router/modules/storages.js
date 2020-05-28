/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const storageRouter = {
  path: '/storage',
  component: Layout,
  redirect: '/storage/index',
  name: 'Storage',
  meta: {
    title: 'Storage',
    icon: 'table'
  },
  children: [
    {
      path: 'Storage',
      component: () => import('@/views/storages/index'),
      name: 'Storage',
      meta: { title: 'Storage' }
    }
  ]
}
export default storageRouter
