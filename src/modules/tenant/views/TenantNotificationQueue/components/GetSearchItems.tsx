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
      label: () =>  '租户编号' ,
      prop: 'tenant_id',
      render: () => <el-input />,
          },
                {
      label: () =>  '应用ID' ,
      prop: 'app_id',
      render: () => <el-input />,
          },
                {
      label: () =>  '账户变动类型（继承tenant_account类型1-收款账户 2-付款账户）' ,
      prop: 'account_type',
      render: () => <el-input />,
          },
                                {
      label: () =>  '通知类型:1-系统通知 2-订单通知 3-账单通知' ,
      prop: 'notification_type',
      render: () => <el-input />,
          },
                                {
      label: () =>  '请求数据' ,
      prop: 'request_data',
      render: () => <el-input />,
          },
                {
      label: () =>  '执行状态:0-待执行 1-执行中 2-成功 3-失败' ,
      prop: 'execute_status',
      render: () => <el-input />,
          },
                {
      label: () =>  '执行次数' ,
      prop: 'execute_count',
      render: () => <el-input />,
          },
                {
      label: () =>  '下次执行时间' ,
      prop: 'next_execute_time',
      render: () => <el-input />,
          },
                {
      label: () =>  '最后执行时间' ,
      prop: 'last_execute_time',
      render: () => <el-input />,
          },
                                                  ]
}
