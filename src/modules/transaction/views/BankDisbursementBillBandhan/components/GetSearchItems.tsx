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
      label: () =>  '核心参考号' ,
      prop: 'core_ref_number',
      render: () => <el-input />,
          },
                {
      label: () =>  '状态' ,
      prop: 'status',
      render: () => <el-input />,
          },
                                {
      label: () =>  '付款日期' ,
      prop: 'payment_date',
      render: () => <el-input />,
          },
                {
      label: () =>  '付款类型' ,
      prop: 'payment_type',
      render: () => <el-input />,
          },
                        {
      label: () =>  '源账户号码' ,
      prop: 'source_account_number',
      render: () => <el-input />,
          },
                        {
      label: () =>  '目标账户号码' ,
      prop: 'destination_account_number',
      render: () => <el-input />,
          },
                                                        {
      label: () =>  '受益人名称' ,
      prop: 'beneficiary_name',
      render: () => <el-input />,
          },
                {
      label: () =>  '受益人代码' ,
      prop: 'beneficiary_code',
      render: () => <el-input />,
          },
                {
      label: () =>  '受益人账户类型' ,
      prop: 'beneficiary_account_type',
      render: () => <el-input />,
          },
                {
      label: () =>  '创建时间' ,
      prop: 'created_at',
      render: () => <el-input />,
          },
                        {
      label: () =>  '订单号' ,
      prop: 'order_no',
      render: () => <el-input />,
          },
                        {
      label: () =>  '上传源文件hash' ,
      prop: 'file_hash',
      render: () => <el-input />,
          },
                {
      label: () =>  '拒绝原因' ,
      prop: 'rejection_reason',
      render: () => <el-input />,
          },
          ]
}
