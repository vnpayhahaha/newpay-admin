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
import type { TransactionQueueStatusVo } from '~/transaction/api/TransactionQueueStatus.ts'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'

import { useMessage } from '@/hooks/useMessage.ts'
import { deleteByIds } from '~/transaction/api/TransactionQueueStatus.ts'
import { ResultCode } from '@/utils/ResultCode.ts'
import hasAuth from '@/utils/permission/hasAuth.ts'

export default function getTableColumns(dialog: UseDialogExpose, formRef: any, t: any): MaProTableColumns[] {
  const dictStore = useDictStore()
  const msg = useMessage()

  const showBtn = (auth: string | string[], row: TransactionQueueStatusVo) => {
    return hasAuth(auth)
  }

  return [
    // 多选列
    { type: 'selection', showOverflowTooltip: false, label: () => t('crud.selection') },
    // 索引序号列
    { type: 'index' },
    // 普通列
                            { label: () =>  '关联交易流水号' , prop: 'transaction_no' },
                        { label: () =>  '冗余业务交易类型（便于按类型调度）' , prop: 'transaction_type' },
                        { label: () =>  '队列类型:1-即时 2-延时 3-重试 4-冲正 5-定时' , prop: 'queue_type' },
                        { label: () =>  '状态:0-待处理 1-处理中 2-成功 3-失败 4-挂起 5-等待中' , prop: 'process_status' },
                        { label: () =>  '计划执行时间' , prop: 'scheduled_execute_time' },
                        { label: () =>  '下次重试时间' , prop: 'next_retry_time' },
                        { label: () =>  '重试次数' , prop: 'retry_count' },
                        { label: () =>  '乐观锁版本号' , prop: 'lock_version' },
                        { label: () =>  '错误代码' , prop: 'error_code' },
                        { label: () =>  '错误详情' , prop: 'error_detail' },
                        { label: () =>  '创建时间' , prop: 'created_at' },
                    
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
            show: ({ row }) => showBtn('transaction:transaction_queue_status:update', row),
            text: () => t('crud.edit'),
            onClick: ({ row }) => {
              dialog.setTitle(t('crud.edit'))
              dialog.open({ formType: 'edit', data: row })
            },
          },
          {
            name: 'del',
            show: ({ row }) => showBtn('transaction:transaction_queue_status:delete', row),
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
