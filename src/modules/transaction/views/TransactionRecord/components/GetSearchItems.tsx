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
      label: () => '全局唯一交易流水号',
      prop: 'transaction_no',
      render: () => <el-input />,
    },
    {
      label: () => '账户变动类型（继承tenant_account类型）',
      prop: 'account_type',
      render: () => <el-input />,
    },
    {
      label: () => '业务交易类型：# 基础交易类型 (1XX)',
      prop: 'transaction_type',
      render: () => <el-input />,
    },
    {
      label: () => '延迟模式:1-D0(立即) 2-D(自然日) 3-T(工作日)',
      prop: 'settlement_delay_mode',
      render: () => <el-input />,
    },
    {
      label: () => '节假日调整:0-不调整 1-顺延 2-提前',
      prop: 'holiday_adjustment',
      render: () => <el-input />,
    },
    {
      label: () => '交易状态:0-处理中 1-成功 2-失败 3-已冲正 4-等待结算',
      prop: 'transaction_status',
      render: () => <el-input />,
    },
  ]
}
