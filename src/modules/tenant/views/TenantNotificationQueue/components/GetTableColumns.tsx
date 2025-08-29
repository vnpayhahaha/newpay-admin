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
                            { label: () =>  '租户编号' , prop: 'tenant_id' },
                        { label: () =>  '应用ID' , prop: 'app_id' },
                        { label: () =>  '账户变动类型（继承tenant_account类型1-收款账户 2-付款账户）' , prop: 'account_type' },
                        { label: () =>  '收款订单ID' , prop: 'collection_order_id' },
                        { label: () =>  '付款订单ID' , prop: 'disbursement_order_id' },
                        { label: () =>  '通知类型:1-系统通知 2-订单通知 3-账单通知' , prop: 'notification_type' },
                        { label: () =>  '通知地址' , prop: 'notification_url' },
                        { label: () =>  '请求方式' , prop: 'request_method' },
                        { label: () =>  '请求数据' , prop: 'request_data' },
                        { label: () =>  '执行状态:0-待执行 1-执行中 2-成功 3-失败' , prop: 'execute_status' },
                        { label: () =>  '执行次数' , prop: 'execute_count' },
                        { label: () =>  '下次执行时间' , prop: 'next_execute_time' },
                        { label: () =>  '最后执行时间' , prop: 'last_execute_time' },
                        { label: () =>  '错误信息' , prop: 'error_message' },
                        { label: () =>  '' , prop: 'created_at' },
                                  { label: () =>  '最大尝试次数' , prop: 'max_retry_count' },
                        { label: () =>  '乐观锁版本号' , prop: 'lock_version' },
          
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
