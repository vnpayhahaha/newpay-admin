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
      label: () =>  '贷方账户号码' ,
      prop: 'credit_account_number',
      render: () => <el-input />,
          },
                {
      label: () =>  '借方账户号码' ,
      prop: 'debit_account_number',
      render: () => <el-input />,
          },
                {
      label: () =>  'IFSC代码' ,
      prop: 'ifsc_code',
      render: () => <el-input />,
          },
                        {
      label: () =>  '主机参考号码' ,
      prop: 'host_reference_number',
      render: () => <el-input />,
          },
                        {
      label: () =>  '交易状态' ,
      prop: 'transaction_status',
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
                  ]
}
