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
      label: () =>  '记录参考号' ,
      prop: 'record_ref_no',
      render: () => <el-input />,
          },
                {
      label: () =>  '文件参考号' ,
      prop: 'file_ref_no',
      render: () => <el-input />,
          },
                {
      label: () =>  '电子银行参考号' ,
      prop: 'ebanking_ref_no',
      render: () => <el-input />,
          },
                {
      label: () =>  '合同参考号' ,
      prop: 'contract_ref_no',
      render: () => <el-input />,
          },
                {
      label: () =>  '记录状态' ,
      prop: 'record_status',
      render: () => <el-input />,
          },
                {
      label: () =>  '状态代码' ,
      prop: 'status_code',
      render: () => <el-input />,
          },
                {
      label: () =>  '状态描述' ,
      prop: 'status_description',
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
