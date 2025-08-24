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
import type { BankDisbursementBillBandhanVo } from '~/transaction/api/BankDisbursementBillBandhan.ts'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'

import { useMessage } from '@/hooks/useMessage.ts'
import { deleteByIds } from '~/transaction/api/BankDisbursementBillBandhan.ts'
import { ResultCode } from '@/utils/ResultCode.ts'
import hasAuth from '@/utils/permission/hasAuth.ts'

export default function getTableColumns(dialog: UseDialogExpose, formRef: any, t: any): MaProTableColumns[] {
  const dictStore = useDictStore()
  const msg = useMessage()

  const showBtn = (auth: string | string[], row: BankDisbursementBillBandhanVo) => {
    return hasAuth(auth)
  }

  return [
    // 多选列
    { type: 'selection', showOverflowTooltip: false, label: () => t('crud.selection') },
    // 索引序号列
    { type: 'index' },
    // 普通列
                  { label: () =>  '自增id' , prop: 'bill_id' },
                        { label: () =>  '核心参考号' , prop: 'core_ref_number' },
                        { label: () =>  '状态' , prop: 'status' },
                        { label: () =>  '执行时间' , prop: 'execution_time' },
                        { label: () =>  '错误代码' , prop: 'error_code' },
                        { label: () =>  '付款日期' , prop: 'payment_date' },
                        { label: () =>  '付款类型' , prop: 'payment_type' },
                        { label: () =>  '客户参考号' , prop: 'customer_ref_number' },
                        { label: () =>  '源账户号码' , prop: 'source_account_number' },
                        { label: () =>  '源账户说明' , prop: 'source_narration' },
                        { label: () =>  '目标账户号码' , prop: 'destination_account_number' },
                        { label: () =>  '币种' , prop: 'currency' },
                        { label: () =>  '金额' , prop: 'amount' },
                        { label: () =>  '目标账户说明' , prop: 'destination_narration' },
                        { label: () =>  '目标银行' , prop: 'destination_bank' },
                        { label: () =>  '目标银行路由代码' , prop: 'destination_bank_routing_code' },
                        { label: () =>  '受益人名称' , prop: 'beneficiary_name' },
                        { label: () =>  '受益人代码' , prop: 'beneficiary_code' },
                        { label: () =>  '受益人账户类型' , prop: 'beneficiary_account_type' },
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
            show: ({ row }) => showBtn('transaction:bank_disbursement_bill_bandhan:update', row),
            text: () => t('crud.edit'),
            onClick: ({ row }) => {
              dialog.setTitle(t('crud.edit'))
              dialog.open({ formType: 'edit', data: row })
            },
          },
          {
            name: 'del',
            show: ({ row }) => showBtn('transaction:bank_disbursement_bill_bandhan:delete', row),
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
