/**
 * MineAdmin is committed to providing solutions for quickly building web applications
 * Please view the LICENSE file that was distributed with this source code,
 * For the full copyright and license information.
 * Thank you very much for using MineAdmin.
 *
 * @Author X.Mo<root@imoi.cn>
 * @Link   https://github.com/mineadmin
 */
import type { MaProTableColumns, MaProTableExpose } from '@mineadmin/pro-table'
import type { BankDisbursementBillAxisVo } from '~/transaction/api/BankDisbursementBillAxis.ts'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'

import { useMessage } from '@/hooks/useMessage.ts'
import { deleteByIds } from '~/transaction/api/BankDisbursementBillAxis.ts'
import { ResultCode } from '@/utils/ResultCode.ts'
import hasAuth from '@/utils/permission/hasAuth.ts'

export default function getTableColumns(dialog: UseDialogExpose, formRef: any, t: any): MaProTableColumns[] {
  const dictStore = useDictStore()
  const msg = useMessage()

  const showBtn = (auth: string | string[], row: BankDisbursementBillAxisVo) => {
    return hasAuth(auth)
  }

  return [
    // 多选列
    { type: 'selection', showOverflowTooltip: false, label: () => t('crud.selection') },
    // 索引序号列
    { type: 'index' },
    // 普通列
                  { label: () =>  '主键ID/Primary Key' , prop: 'bill_id' },
                        { label: () =>  '序号/Serial Number' , prop: 'sr_no' },
                        { label: () =>  '企业产品/Corporate Product' , prop: 'corporate_product' },
                        { label: () =>  '支付方式/Payment Method' , prop: 'payment_method' },
                        { label: () =>  '批次号/Batch Number' , prop: 'batch_no' },
                        { label: () =>  '下一工作日日期/Next Working Day Date' , prop: 'next_working_day_date' },
                        { label: () =>  '借记账号/Debit Account Number' , prop: 'debit_account_no' },
                        { label: () =>  '企业账户描述/Corporate Account Description' , prop: 'corporate_account_description' },
                        { label: () =>  '收款人账号/Beneficiary Account Number' , prop: 'beneficiary_account_no' },
                        { label: () =>  '收款人代码/Beneficiary Code' , prop: 'beneficiary_code' },
                        { label: () =>  '收款人姓名/Beneficiary Name' , prop: 'beneficiary_name' },
                        { label: () =>  '付款人姓名/Payee Name' , prop: 'payee_name' },
                        { label: () =>  '币种/Currency' , prop: 'currency' },
                        { label: () =>  '应付金额/Amount Payable' , prop: 'amount_payable' },
                        { label: () =>  '交易状态/Transaction Status' , prop: 'transaction_status' },
                        { label: () =>  'CRN编号/CRN Number' , prop: 'crn_no' },
                        { label: () =>  '支付日期/Paid Date' , prop: 'paid_date' },
                        { label: () =>  'UTR/RBI参考号/核心参考号/UTR/RBI Reference No./Core Ref No.' , prop: 'utr_reference_no' },
                        { label: () =>  '资金日期/Funding Date' , prop: 'funding_date' },
                        { label: () =>  '原因/Reason' , prop: 'reason' },
                        { label: () =>  '备注/Remarks' , prop: 'remarks' },
                        { label: () =>  '阶段/Stage' , prop: 'stage' },
                        { label: () =>  '邮箱/Email ID' , prop: 'email_id' },
                        { label: () =>  'CLG分行名称/CLG Branch Name' , prop: 'clg_branch_name' },
                        { label: () =>  '激活日期/Activation Date' , prop: 'activation_date' },
                        { label: () =>  '支付模式/Payout Mode' , prop: 'payout_mode' },
                        { label: () =>  'Finacle支票号/Finacle Cheque No' , prop: 'finacle_cheque_no' },
                        { label: () =>  'IFSC代码/MICR代码/IIN/IFSC Code/MICR Code/IIN' , prop: 'ifsc_code' },
                        { label: () =>  '银行参考号/Bank Reference No.' , prop: 'bank_reference_no' },
                        { label: () =>  '账号/Account Number' , prop: 'account_number' },
                        { label: () =>  '创建人ID' , prop: 'created_by' },
                        { label: () =>  '订单号' , prop: 'order_no' },
                        { label: () =>  '上传ID' , prop: 'upload_id' },
                        { label: () =>  '上传源文件hash' , prop: 'file_hash' },
                        { label: () =>  '创建时间/Create Time' , prop: 'created_at' },
                        { label: () =>  '更新时间/Update Time' , prop: 'updated_at' },
          
    // 操作列
    {
      type: 'operation',
      label: () => t('crud.operation'),
      width: '260px',
      operationConfigure: {
        type: 'tile',
        actions: [
          {
            name: 'edit',
            icon: 'i-heroicons:pencil',
            show: ({ row }) => showBtn('transaction:bank_disbursement_bill_axis:update', row),
            text: () => t('crud.edit'),
            onClick: ({ row }) => {
              dialog.setTitle(t('crud.edit'))
              dialog.open({ formType: 'edit', data: row })
            },
          },
          {
            name: 'del',
            show: ({ row }) => showBtn('transaction:bank_disbursement_bill_axis:delete', row),
            icon: 'i-heroicons:trash',
            text: () => t('crud.delete'),
            onClick: ({ row }, proxy: MaProTableExpose) => {
              msg.delConfirm(t('crud.delDataMessage')).then(async () => {
                const response = await deleteByIds([row.id])
                if (response.code === ResultCode.SUCCESS) {
                  msg.success(t('crud.delSuccess'))
                  await proxy.refresh()
                }
              })
            },
          },
        ],
      },
    },
  ]
}
