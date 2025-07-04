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
import type { TransactionRecordVo } from '~/transaction/api/TransactionRecord.ts'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'

import { useMessage } from '@/hooks/useMessage.ts'
import { deleteByIds } from '~/transaction/api/TransactionRecord.ts'
import { ResultCode } from '@/utils/ResultCode.ts'
import hasAuth from '@/utils/permission/hasAuth.ts'

export default function getTableColumns(dialog: UseDialogExpose, formRef: any, t: any): MaProTableColumns[] {
  const dictStore = useDictStore()
  const msg = useMessage()

  const showBtn = (auth: string | string[], row: TransactionRecordVo) => {
    return hasAuth(auth)
  }

  return [
    // 多选列
    { type: 'selection', showOverflowTooltip: false, label: () => t('crud.selection') },
    // 索引序号列
    { type: 'index' },
    // 普通列
    { label: () => '全局唯一交易流水号', prop: 'transaction_no' },
    { label: () => '冗余账号ID', prop: 'account_id' },
    { label: () => '冗余租户编号', prop: 'tenant_id' },
    { label: () => '交易金额（正：收入，负：支出）', prop: 'amount' },
    { label: () => '手续费金额', prop: 'fee_amount' },
    { label: () => '净额（计算列）', prop: 'net_amount' },
    { label: () => '交易前余额', prop: 'balance_before' },
    { label: () => '交易后余额', prop: 'balance_after' },
    { label: () => '账户变动类型（继承tenant_account类型）', prop: 'account_type' },
    { label: () => '业务交易类型：# 基础交易类型 (1XX)', prop: 'transaction_type' },
    { label: () => '延迟模式:1-D0(立即) 2-D(自然日) 3-T(工作日)', prop: 'settlement_delay_mode' },
    { label: () => '预计结算时间', prop: 'expected_settlement_time' },
    { label: () => '延迟天数', prop: 'settlement_delay_days' },
    { label: () => '节假日调整:0-不调整 1-顺延 2-提前', prop: 'holiday_adjustment' },
    { label: () => '实际结算时间', prop: 'actual_settlement_time' },
    { label: () => '交易对手方标识', prop: 'counterparty' },
    { label: () => '关联业务订单号', prop: 'order_no' },
    { label: () => '关联原交易流水号', prop: 'ref_transaction_no' },
    { label: () => '交易状态:0-处理中 1-成功 2-失败 3-已冲正 4-等待结算', prop: 'transaction_status' },
    { label: () => '交易备注', prop: 'remark' },
    { label: () => '创建时间', prop: 'created_at' },
    { label: () => '更新时间', prop: 'updated_at' },

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
            show: ({ row }) => showBtn('transaction:transaction_record:update', row),
            text: () => t('crud.edit'),
            onClick: ({ row }) => {
              dialog.setTitle(t('crud.edit'))
              dialog.open({ formType: 'edit', data: row })
            },
          },
          {
            name: 'del',
            show: ({ row }) => showBtn('transaction:transaction_record:delete', row),
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
