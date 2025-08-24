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
      label: () =>  '收款人名称' ,
      prop: 'receipient_name',
      render: () => <el-input />,
          },
                {
      label: () =>  '账户号码' ,
      prop: 'account_number',
      render: () => <el-input />,
          },
                {
      label: () =>  'IFSC代码' ,
      prop: 'ifsc_code',
      render: () => <el-input />,
          },
                                {
      label: () =>  '状态' ,
      prop: 'status',
      render: () => <el-input />,
          },
                {
      label: () =>  '失败原因' ,
      prop: 'failure_reason',
      render: () => <el-input />,
          },
                        {
      label: () =>  '创建人ID' ,
      prop: 'created_by',
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
