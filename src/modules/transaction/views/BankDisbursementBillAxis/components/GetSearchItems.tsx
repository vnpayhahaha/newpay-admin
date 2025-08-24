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
      label: () =>  '支付方式/Payment Method' ,
      prop: 'payment_method',
      render: () => <el-input />,
          },
                                {
      label: () =>  '借记账号/Debit Account Number' ,
      prop: 'debit_account_no',
      render: () => <el-input />,
          },
                        {
      label: () =>  '收款人账号/Beneficiary Account Number' ,
      prop: 'beneficiary_account_no',
      render: () => <el-input />,
          },
                        {
      label: () =>  '收款人姓名/Beneficiary Name' ,
      prop: 'beneficiary_name',
      render: () => <el-input />,
          },
                {
      label: () =>  '付款人姓名/Payee Name' ,
      prop: 'payee_name',
      render: () => <el-input />,
          },
                                {
      label: () =>  '交易状态/Transaction Status' ,
      prop: 'transaction_status',
      render: () => <el-input />,
          },
                        {
      label: () =>  '支付日期/Paid Date' ,
      prop: 'paid_date',
      render: () => <el-input />,
          },
                {
      label: () =>  'UTR/RBI参考号/核心参考号/UTR/RBI Reference No./Core Ref No.' ,
      prop: 'utr_reference_no',
      render: () => <el-input />,
          },
                        {
      label: () =>  '原因/Reason' ,
      prop: 'reason',
      render: () => <el-input />,
          },
                {
      label: () =>  '备注/Remarks' ,
      prop: 'remarks',
      render: () => <el-input />,
          },
                                                {
      label: () =>  '支付模式/Payout Mode' ,
      prop: 'payout_mode',
      render: () => <el-input />,
          },
                        {
      label: () =>  'IFSC代码/MICR代码/IIN/IFSC Code/MICR Code/IIN' ,
      prop: 'ifsc_code',
      render: () => <el-input />,
          },
                        {
      label: () =>  '账号/Account Number' ,
      prop: 'account_number',
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
      label: () =>  '上传ID' ,
      prop: 'upload_id',
      render: () => <el-input />,
          },
                {
      label: () =>  '上传源文件hash' ,
      prop: 'file_hash',
      render: () => <el-input />,
          },
                {
      label: () =>  '创建时间/Create Time' ,
      prop: 'created_at',
      render: () => <el-input />,
          },
                  ]
}
