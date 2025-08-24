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
      label: () =>  '序列号' ,
      prop: 'srl_no',
      render: () => <el-input />,
          },
                {
      label: () =>  '交易日期' ,
      prop: 'tran_date',
      render: () => <el-input />,
          },
                {
      label: () =>  '支票号' ,
      prop: 'chq_no',
      render: () => <el-input />,
          },
                                {
      label: () =>  '借/贷' ,
      prop: 'dr_cr',
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
