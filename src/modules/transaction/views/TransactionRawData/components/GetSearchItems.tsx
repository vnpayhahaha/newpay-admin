/**
 * MineAdmin is committed to providing solutions for quickly building web applications
 * Please view the LICENSE file that was distributed with this source code,
 * For the full copyright and license information.
 * Thank you very much for using MineAdmin.
 *
 * @Author X.Mo <root@imoi.cn>
 * @Link   https://github.com/mineadmin
*/

import type { MaSearchItem } from '@mineadmin/search'

export default function getSearchItems(t: any): MaSearchItem[] {
  return [
                            {
      label: () =>  '内容' ,
      prop: 'content',
      render: () => <el-input />,
          },
                {
      label: () =>  '来源' ,
      prop: 'source',
      render: () => <el-input />,
          },
                {
      label: () =>  '状态：0未解析 1解析成功 2解析失败' ,
      prop: 'status',
      render: () => <el-input />,
          },
                                  ]
}
