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
      label: () =>  '收款人姓名/Beneficiary Name' ,
      prop: 'beneficiary_name',
      render: () => <el-input />,
          },
                {
      label: () =>  '收款人账号/Beneficiary Account Number' ,
      prop: 'beneficiary_account_number',
      render: () => <el-input />,
          },
                {
      label: () =>  'IFSC代码' ,
      prop: 'ifsc',
      render: () => <el-input />,
          },
                {
      label: () =>  '交易类型/Transaction Type' ,
      prop: 'transaction_type',
      render: () => <el-input />,
          },
                {
      label: () =>  '借记账号/Debit Account No' ,
      prop: 'debit_account_no',
      render: () => <el-input />,
          },
                {
      label: () =>  '交易日期/Transaction Date' ,
      prop: 'transaction_date',
      render: () => <el-input />,
          },
                                {
      label: () =>  '收款人邮箱/Beneficiary Email ID' ,
      prop: 'beneficiary_email_id',
      render: () => <el-input />,
          },
                        {
      label: () =>  'UTR编号/UTR Number' ,
      prop: 'utr_number',
      render: () => <el-input />,
          },
                {
      label: () =>  '状态/Status' ,
      prop: 'status',
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
