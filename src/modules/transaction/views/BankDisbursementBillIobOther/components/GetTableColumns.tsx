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
import type { BankDisbursementBillIobOtherVo } from '~/transaction/api/BankDisbursementBillIobOther.ts'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'

import { useMessage } from '@/hooks/useMessage.ts'
import { deleteByIds } from '~/transaction/api/BankDisbursementBillIobOther.ts'
import { ResultCode } from '@/utils/ResultCode.ts'
import hasAuth from '@/utils/permission/hasAuth.ts'

export default function getTableColumns(dialog: UseDialogExpose, formRef: any, t: any): MaProTableColumns[] {
  const dictStore = useDictStore()
  const msg = useMessage()

  const showBtn = (auth: string | string[], row: BankDisbursementBillIobOtherVo) => {
    return hasAuth(auth)
  }

  return [
    // 多选列
    { type: 'selection', showOverflowTooltip: false, label: () => t('crud.selection') },
    // 索引序号列
    { type: 'index' },
    // 普通列
                  { label: () =>  '自增id' , prop: 'bill_id' },
                        { label: () =>  '序号' , prop: 's_no' },
                        { label: () =>  '姓名' , prop: 'name' },
                        { label: () =>  'IFSC代码' , prop: 'ifsc_code' },
                        { label: () =>  '类型' , prop: 'type' },
                        { label: () =>  '编号' , prop: 'number' },
                        { label: () =>  '金额' , prop: 'amount' },
                        { label: () =>  '费用' , prop: 'charges' },
                        { label: () =>  '状态' , prop: 'status' },
                        { label: () =>  '备注' , prop: 'remarks' },
                        { label: () =>  '说明' , prop: 'narration' },
                        { label: () =>  'UTR编号' , prop: 'utr_no' },
                        { label: () =>  '原因' , prop: 'reason' },
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
            show: ({ row }) => showBtn('transaction:bank_disbursement_bill_iob_other:update', row),
            text: () => t('crud.edit'),
            onClick: ({ row }) => {
              dialog.setTitle(t('crud.edit'))
              dialog.open({ formType: 'edit', data: row })
            },
          },
          {
            name: 'del',
            show: ({ row }) => showBtn('transaction:bank_disbursement_bill_iob_other:delete', row),
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
