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
      label: () =>  '渠道ID' ,
      prop: 'channel_id',
      render: () => <el-input />,
          },
                        {
      label: () =>  '提取变量名' ,
      prop: 'variable_name',
      render: () => <el-input />,
          },
                        {
      label: () =>  '状态：1启用 0禁用' ,
      prop: 'status',
      render: () => <el-input />,
          },
                                  ]
}
