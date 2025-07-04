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
      label: () =>  '关联交易流水号' ,
      prop: 'transaction_no',
      render: () => <el-input />,
          },
                {
      label: () =>  '冗余业务交易类型（便于按类型调度）' ,
      prop: 'transaction_type',
      render: () => <el-input />,
          },
                {
      label: () =>  '队列类型:1-即时 2-延时 3-重试 4-冲正 5-定时' ,
      prop: 'queue_type',
      render: () => <el-input />,
          },
                {
      label: () =>  '状态:0-待处理 1-处理中 2-成功 3-失败 4-挂起 5-等待中' ,
      prop: 'process_status',
      render: () => <el-input />,
          },
                                                                          ]
}
