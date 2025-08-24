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
import type { BankDisbursementBillIcici2Vo } from '~/transaction/api/BankDisbursementBillIcici2.ts'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'

import { useMessage } from '@/hooks/useMessage.ts'
import { deleteByIds } from '~/transaction/api/BankDisbursementBillIcici2.ts'
import { ResultCode } from '@/utils/ResultCode.ts'
import hasAuth from '@/utils/permission/hasAuth.ts'

export default function getTableColumns(dialog: UseDialogExpose, formRef: any, t: any): MaProTableColumns[] {
  const dictStore = useDictStore()
  const msg = useMessage()

  const showBtn = (auth: string | string[], row: BankDisbursementBillIcici2Vo) => {
    return hasAuth(auth)
  }

  return [
    // 多选列
    { type: 'selection', showOverflowTooltip: false, label: () => t('crud.selection') },
    // 索引序号列
    { type: 'index' },
    // 普通列
                  { label: () =>  '自增id' , prop: 'bill_id' },
                        { label: () =>  '网络ID' , prop: 'network_id' },
                        { label: () =>  '贷方账户号码' , prop: 'credit_account_number' },
                        { label: () =>  '借方账户号码' , prop: 'debit_account_number' },
                        { label: () =>  'IFSC代码' , prop: 'ifsc_code' },
                        { label: () =>  '总金额' , prop: 'total_amount' },
                        { label: () =>  '主机参考号码' , prop: 'host_reference_number' },
                        { label: () =>  '交易备注' , prop: 'transaction_remarks' },
                        { label: () =>  '交易状态' , prop: 'transaction_status' },
                        { label: () =>  '交易状态备注' , prop: 'transaction_status_remarks' },
                        { label: () =>  '创建时间' , prop: 'created_at' },
                        { label: () =>  '创建人ID' , prop: 'created_by' },
                        { label: () =>  '订单号' , prop: 'order_no' },
                        { label: () =>  '上传ID' , prop: 'upload_id' },
                        { label: () =>  '上传源文件hash' , prop: 'file_hash' },
                        { label: () =>  '拒绝原因' , prop: 'rejection_reason' },
          
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
            show: ({ row }) => showBtn('transaction:bank_disbursement_bill_icici2:update', row),
            text: () => t('crud.edit'),
            onClick: ({ row }) => {
              dialog.setTitle(t('crud.edit'))
              dialog.open({ formType: 'edit', data: row })
            },
          },
          {
            name: 'del',
            show: ({ row }) => showBtn('transaction:bank_disbursement_bill_icici2:delete', row),
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
