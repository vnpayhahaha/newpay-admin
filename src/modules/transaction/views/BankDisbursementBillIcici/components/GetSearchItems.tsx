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
      label: () =>  '支付模式(IMPS)' ,
      prop: 'pymt_mode',
      render: () => <el-input />,
          },
                {
      label: () =>  '文件序列号' ,
      prop: 'file_sequence_num',
      render: () => <el-input />,
          },
                {
      label: () =>  '借记账户号码' ,
      prop: 'debit_acct_no',
      render: () => <el-input />,
          },
                {
      label: () =>  '受益人名称' ,
      prop: 'beneficiary_name',
      render: () => <el-input />,
          },
                {
      label: () =>  '受益人账户号' ,
      prop: 'beneficiary_account_no',
      render: () => <el-input />,
          },
                {
      label: () =>  '受益人IFSC代码' ,
      prop: 'bene_ifsc_code',
      render: () => <el-input />,
          },
                        {
      label: () =>  '备注' ,
      prop: 'remark',
      render: () => <el-input />,
          },
                {
      label: () =>  '支付日期' ,
      prop: 'pymt_date',
      render: () => <el-input />,
          },
                {
      label: () =>  '状态' ,
      prop: 'status',
      render: () => <el-input />,
          },
                        {
      label: () =>  '客户编号' ,
      prop: 'customer_ref_no',
      render: () => <el-input />,
          },
                {
      label: () =>  'UTR_NO' ,
      prop: 'utr_no',
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
      label: () =>  '创建时间' ,
      prop: 'created_at',
      render: () => <el-input />,
          },
                  ]
}
