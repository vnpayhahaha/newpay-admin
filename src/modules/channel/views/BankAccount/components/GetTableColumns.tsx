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
import type { BankAccountVo } from '~/channel/api/BankAccount.ts'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'

import { useMessage } from '@/hooks/useMessage.ts'
import { deleteByIds, save } from '~/channel/api/BankAccount.ts'
import { ResultCode } from '@/utils/ResultCode.ts'
import hasAuth from '@/utils/permission/hasAuth.ts'

export default function getTableColumns(dialog: UseDialogExpose, formRef: any, t: any): MaProTableColumns[] {
  const dictStore = useDictStore()
  const msg = useMessage()

  const showBtn = (auth: string | string[], row: BankAccountVo) => {
    return hasAuth(auth)
  }

  return [
    // 多选列
    { type: 'selection', showOverflowTooltip: false, label: () => t('crud.selection') },
    // 索引序号列
    { type: 'index' },
    // 普通列
    { label: () => t('bankAccount.channel_id'), prop: 'channel_id' },
    { label: () => t('bankAccount.branch_name'), prop: 'branch_name' },
    { label: () => t('bankAccount.account_holder'), prop: 'account_holder' },
    { label: () => t('bankAccount.account_number'), prop: 'account_number' },
    { label: () => t('bankAccount.bank_code'), prop: 'bank_code' },
    { label: () => t('bankAccount.account_type'), prop: 'account_type' },
    { label: () => t('bankAccount.balance'), prop: 'balance' },
    {
      label: () => t('bankAccount.float_amount_enabled'), prop: 'float_amount_enabled',
      width: 80,
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          type: 'switch',
          prop: 'float_amount_enabled',
          props: {
            size: 'small',
            activeValue: true,
            inactiveValue: false,
            on: {
              change: (value: boolean, row: any, proxy: MaProTableExpose) => {
                console.log('value', value)
                save(row.id, {
                  ...row,
                  float_amount_enabled: value,
                }).then((res) => {
                  if (res.code === ResultCode.SUCCESS) {
                    msg.success(t('crud.updateSuccess'))
                    proxy.refresh()
                  }
                  else {
                    msg.error(t('crud.updateError'))
                  }
                })
              },
            },
          },
        },
      },
    },
    { label: () => t('bankAccount.daily_max_receipt'), prop: 'daily_max_receipt' },
    { label: () => t('bankAccount.daily_max_payment'), prop: 'daily_max_payment' },
    { label: () => t('bankAccount.daily_max_receipt_count'), prop: 'daily_max_receipt_count' },
    { label: () => t('bankAccount.daily_max_payment_count'), prop: 'daily_max_payment_count' },
    { label: () => t('bankAccount.max_receipt_per_txn'), prop: 'max_receipt_per_txn' },
    { label: () => t('bankAccount.max_payment_per_txn'), prop: 'max_payment_per_txn' },
    { label: () => t('bankAccount.min_receipt_per_txn'), prop: 'min_receipt_per_txn' },
    { label: () => t('bankAccount.min_payment_per_txn'), prop: 'min_payment_per_txn' },
    { label: () => t('bankAccount.security_level'), prop: 'security_level' },
    { label: () => t('bankAccount.last_used_time'), prop: 'last_used_time' },
    { label: () => t('bankAccount.upi_id'), prop: 'upi_id' },
    { label: () => t('bankAccount.used_quota'), prop: 'used_quota' },
    { label: () => t('bankAccount.limit_quota'), prop: 'limit_quota' },
    { label: () => t('bankAccount.today_receipt_count'), prop: 'today_receipt_count' },
    { label: () => t('bankAccount.today_payment_count'), prop: 'today_payment_count' },
    { label: () => t('bankAccount.today_receipt_amount'), prop: 'today_receipt_amount' },
    { label: () => t('bankAccount.today_payment_amount'), prop: 'today_payment_amount' },
    { label: () => t('bankAccount.stat_date'), prop: 'stat_date' },
    {
      label: () => t('channelAccount.status'), prop: 'status',
      width: 80,
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          type: 'switch',
          prop: 'status',
          props: {
            size: 'small',
            activeValue: true,
            inactiveValue: false,
            on: {
              change: (value: boolean, row: any, proxy: MaProTableExpose) => {
                console.log('value', value)
                save(row.id, {
                  ...row,
                  status: value,
                }).then((res) => {
                  if (res.code === ResultCode.SUCCESS) {
                    msg.success(t('crud.updateSuccess'))
                    proxy.refresh()
                  }
                  else {
                    msg.error(t('crud.updateError'))
                  }
                })
              },
            },
          },
        },
      },
    },
    {
      label: () => t('channelAccount.support_collection'), prop: 'support_collection',
      width: 80,
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          type: 'switch',
          prop: 'support_collection',
          props: {
            size: 'small',
            activeValue: true,
            inactiveValue: false,
            on: {
              change: (value: boolean, row: any, proxy: MaProTableExpose) => {
                console.log('value', value)
                save(row.id, {
                  ...row,
                  support_collection: value,
                }).then((res) => {
                  if (res.code === ResultCode.SUCCESS) {
                    msg.success(t('crud.updateSuccess'))
                    proxy.refresh()
                  }
                  else {
                    msg.error(t('crud.updateError'))
                  }
                })
              },
            },
          },
        },
      },
    },
    {
      label: () => t('channelAccount.support_disbursement'), prop: 'support_disbursement',
      width: 80,
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          type: 'switch',
          prop: 'support_disbursement',
          props: {
            size: 'small',
            activeValue: true,
            inactiveValue: false,
            on: {
              change: (value: boolean, row: any, proxy: MaProTableExpose) => {
                console.log('value', value)
                save(row.id, {
                  ...row,
                  support_disbursement: value,
                }).then((res) => {
                  if (res.code === ResultCode.SUCCESS) {
                    msg.success(t('crud.updateSuccess'))
                    proxy.refresh()
                  }
                  else {
                    msg.error(t('crud.updateError'))
                  }
                })
              },
            },
          },
        },
      },
    },

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
            show: ({ row }) => showBtn('channel:bank_account:update', row),
            text: () => t('crud.edit'),
            onClick: ({ row }) => {
              dialog.setTitle(t('crud.edit'))
              dialog.open({ formType: 'edit', data: row })
            },
          },
          {
            name: 'del',
            show: ({ row }) => showBtn('channel:bank_account:delete', row),
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
