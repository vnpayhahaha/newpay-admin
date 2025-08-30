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
import type { TenantNotificationQueueVo } from '~/tenant/api/TenantNotificationQueue.ts'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'

import { useMessage } from '@/hooks/useMessage.ts'
import { deleteByIds } from '~/tenant/api/TenantNotificationQueue.ts'
import { ResultCode } from '@/utils/ResultCode.ts'
import hasAuth from '@/utils/permission/hasAuth.ts'

export default function getTableColumns(dialog: UseDialogExpose, formRef: any, t: any): MaProTableColumns[] {
  const dictStore = useDictStore()
  const msg = useMessage()

  const showBtn = (auth: string | string[], row: TenantNotificationQueueVo) => {
    return hasAuth(auth)
  }

  return [
    // 多选列
    { type: 'selection', showOverflowTooltip: false, label: () => t('crud.selection') },
    // 索引序号列
    { type: 'index' },
    // 普通列
                            { label: () => t('tenant_notification_queue.tenant_id'), prop: 'tenant_id' },
                        { label: () => t('tenant_notification_queue.app_id'), prop: 'app_id' },
                        { label: () => t('tenant_notification_queue.account_type'), prop: 'account_type' },
                        { label: () => t('tenant_notification_queue.collection_order_id'), prop: 'collection_order_id' },
                        { label: () => t('tenant_notification_queue.disbursement_order_id'), prop: 'disbursement_order_id' },
                        { label: () => t('tenant_notification_queue.notification_type'), prop: 'notification_type' },
                        { label: () => t('tenant_notification_queue.notification_url'), prop: 'notification_url' },
                        { label: () => t('tenant_notification_queue.request_method'), prop: 'request_method' },
                        { label: () => t('tenant_notification_queue.request_data'), prop: 'request_data' },
                        { label: () => t('tenant_notification_queue.execute_status'), prop: 'execute_status' },
                        { label: () => t('tenant_notification_queue.execute_count'), prop: 'execute_count' },
                        { label: () => t('tenant_notification_queue.next_execute_time'), prop: 'next_execute_time' },
                        { label: () => t('tenant_notification_queue.last_execute_time'), prop: 'last_execute_time' },
                        { label: () => t('tenant_notification_queue.error_message'), prop: 'error_message' },
                        { label: () => t('tenant_notification_queue.created_at'), prop: 'created_at' },
                                  { label: () => t('tenant_notification_queue.max_retry_count'), prop: 'max_retry_count' },
                        { label: () => t('tenant_notification_queue.lock_version'), prop: 'lock_version' },
          
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
            show: ({ row }) => showBtn('tenant:tenant_notification_queue:update', row),
            text: () => t('crud.edit'),
            onClick: ({ row }) => {
              dialog.setTitle(t('crud.edit'))
              dialog.open({ formType: 'edit', data: row })
            },
          },
          {
            name: 'del',
            show: ({ row }) => showBtn('tenant:tenant_notification_queue:delete', row),
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
