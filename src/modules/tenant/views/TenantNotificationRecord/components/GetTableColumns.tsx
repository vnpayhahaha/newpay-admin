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
import type { TenantNotificationRecordVo } from '~/tenant/api/TenantNotificationRecord.ts'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'

import { useMessage } from '@/hooks/useMessage.ts'
import { deleteByIds } from '~/tenant/api/TenantNotificationRecord.ts'
import { ResultCode } from '@/utils/ResultCode.ts'
import hasAuth from '@/utils/permission/hasAuth.ts'

export default function getTableColumns(dialog: UseDialogExpose, formRef: any, t: any): MaProTableColumns[] {
  const dictStore = useDictStore()
  const msg = useMessage()

  const showBtn = (auth: string | string[], row: TenantNotificationRecordVo) => {
    return hasAuth(auth)
  }

  return [
    // 多选列
    { type: 'selection', showOverflowTooltip: false, label: () => t('crud.selection') },
    // 索引序号列
    { type: 'index' },
    // 普通列
                            { label: () => t('tenant_notification_record.queue_id'), prop: 'queue_id' },
                        { label: () => t('tenant_notification_record.tenant_id'), prop: 'tenant_id' },
                        { label: () => t('tenant_notification_record.app_id'), prop: 'app_id' },
                        { label: () => t('tenant_notification_record.account_type'), prop: 'account_type' },
                        { label: () => t('tenant_notification_record.collection_order_id'), prop: 'collection_order_id' },
                        { label: () => t('tenant_notification_record.disbursement_order_id'), prop: 'disbursement_order_id' },
                        { label: () => t('tenant_notification_record.notification_type'), prop: 'notification_type' },
                        { label: () => t('tenant_notification_record.notification_url'), prop: 'notification_url' },
                        { label: () => t('tenant_notification_record.request_method'), prop: 'request_method' },
                        { label: () => t('tenant_notification_record.request_data'), prop: 'request_data' },
                        { label: () => t('tenant_notification_record.response_status'), prop: 'response_status' },
                        { label: () => t('tenant_notification_record.response_data'), prop: 'response_data' },
                        { label: () => t('tenant_notification_record.execute_count'), prop: 'execute_count' },
                        { label: () => t('tenant_notification_record.status'), prop: 'status' },
                        { label: () => t('tenant_notification_record.created_at'), prop: 'created_at' },
                        { label: () => t('tenant_notification_record.updated_at'), prop: 'updated_at' },
          
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
            show: ({ row }) => showBtn('tenant:tenant_notification_record:update', row),
            text: () => t('crud.edit'),
            onClick: ({ row }) => {
              dialog.setTitle(t('crud.edit'))
              dialog.open({ formType: 'edit', data: row })
            },
          },
          {
            name: 'del',
            show: ({ row }) => showBtn('tenant:tenant_notification_record:delete', row),
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
