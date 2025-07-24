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
import type { TransactionVoucherVo } from '~/transaction/api/TransactionVoucher.ts'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'

import { useMessage } from '@/hooks/useMessage.ts'
import { deleteByIds } from '~/transaction/api/TransactionVoucher.ts'
import { ResultCode } from '@/utils/ResultCode.ts'
import hasAuth from '@/utils/permission/hasAuth.ts'

export default function getTableColumns(dialog: UseDialogExpose, formRef: any, t: any): MaProTableColumns[] {
  const dictStore = useDictStore()
  const msg = useMessage()

  const showBtn = (auth: string | string[], row: TransactionVoucherVo) => {
    return hasAuth(auth)
  }

  return [
    // 多选列
    { type: 'selection', showOverflowTooltip: false, label: () => t('crud.selection') },
    // 索引序号列
    { type: 'index' },
    // 普通列
    { label: () => t('transaction_voucher.channel_id'), prop: 'channel_id' },
    { label: () => t('transaction_voucher.channel_account_id'), prop: 'channel_account_id' },
    { label: () => t('transaction_voucher.bank_account_id'), prop: 'bank_account_id' },
    { label: () => t('transaction_voucher.collection_card_no'), prop: 'collection_card_no' },
    { label: () => t('transaction_voucher.collection_amount'), prop: 'collection_amount' },
    { label: () => t('transaction_voucher.collection_fee'), prop: 'collection_fee' },
    { label: () => t('transaction_voucher.collection_time'), prop: 'collection_time' },
    { label: () => t('transaction_voucher.collection_status'), prop: 'collection_status' },
    { label: () => t('transaction_voucher.collection_source'), prop: 'collection_source' },
    { label: () => t('transaction_voucher.transaction_voucher'), prop: 'transaction_voucher' },
    { label: () => t('transaction_voucher.transaction_voucher_type'), prop: 'transaction_voucher_type' },
    { label: () => t('transaction_voucher.order_no'), prop: 'order_no' },
    { label: () => t('transaction_voucher.content'), prop: 'content' },
    { label: () => t('transaction_voucher.operation_admin_id'), prop: 'operation_admin_id' },
    { label: () => t('transaction_voucher.created_at'), prop: 'created_at' },
    { label: () => t('transaction_voucher.transaction_type'), prop: 'transaction_type' },

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
            show: ({ row }) => showBtn('transaction:transaction_voucher:update', row),
            text: () => t('crud.edit'),
            onClick: ({ row }) => {
              dialog.setTitle(t('crud.edit'))
              dialog.open({ formType: 'edit', data: row })
            },
          },
          {
            name: 'del',
            show: ({ row }) => showBtn('transaction:transaction_voucher:delete', row),
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
