/**
 * MineAdmin is committed to providing solutions for quickly building web applications
 * Please view the LICENSE file that was distributed with this source code,
 * For the full copyright and license information.
 * Thank you very much for using MineAdmin.
 *
 * @Author X.Mo<root@imoi.cn>
 * @Link   https://github.com/mineadmin
 */
import type { MaFormItem } from '@mineadmin/form'
import type { TenantAppVo } from '~/tenant/api/TenantApp.ts'
import type { TenantDictVo } from '~/tenant/api/Tenant.ts'
import { remote } from '~/tenant/api/Tenant.ts'

export default function getFormItems(formType: 'add' | 'edit' = 'add', t: any, model: TenantAppVo): MaFormItem[] {
  // 新增默认值
  if (formType === 'add') {
    // todo...
    model.status = true
  }

  // 编辑默认值
  if (formType === 'edit') {
    // todo...
  }

  return [
    {
      label: t('tenant.tenantId'),
      prop: 'tenant_id',
      render: () => <ma-remote-select filterable disabled={formType === 'edit'} />,
      renderProps: {
        api: () => new Promise(resolve => resolve(remote())),
        dataHandle: (response: any) => {
          return response.data?.map((item: TenantDictVo) => {
            return { label: `${item.tenant_id}`, value: item.tenant_id }
          })
        },
      },
    },
    {
      label: t('tenantApp.appName'),
      prop: 'app_name',
      render: () => <el-input />,
    },
    {
      label: t('tenantApp.description'),
      prop: 'description',
      render: () => <el-input />,
    },
    {
      label: t('tenantApp.remark'),
      prop: 'remark',
      render: () => <el-input />,
    },
    {
      label: t('tenantApp.status'),
      prop: 'status',
      render: () => <el-switch />,
    },
  ]
}
