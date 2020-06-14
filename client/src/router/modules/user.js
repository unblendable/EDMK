/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const userRouter = {
  path: '/user',
  component: Layout,
  redirect: '/users/index',
  name: 'Users',
  meta: {
    title: 'Users',
    icon: 'peoples'
  },
  children: [
    {
      path: 'Users',
      component: () => import('@/views/users/index'),
      name: 'Users',
      meta: { title: 'Users' }
    }
  ]
}
export default userRouter
