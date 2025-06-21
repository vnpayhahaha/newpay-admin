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
import type { TenantVo } from '~/tenant/api/Tenant.ts'

export default function getFormItems(formType: 'add' | 'edit' = 'add', t: any, model: TenantVo): MaFormItem[] {
  // 新增默认值
  if (formType === 'add') {
    // todo...
  }

  // 编辑默认值
  if (formType === 'edit') {
    // todo...
  }

  return [
    {
      label: t('tenant.contactUserName'),
      prop: 'contact_user_name',
      render: () => <el-input />,
    },
    {
      label: t('tenant.contactPhone'),
      prop: 'contact_phone',
      render: () => <el-input />,
    },
    {
      label: t('tenant.companyName'),
      prop: 'company_name',
      render: () => <el-input />,
    },
    {
      label: t('tenant.licenseNumber'),
      prop: 'license_number',
      render: () => <el-input />,
    },
    {
      label: t('tenant.address'),
      prop: 'address',
      render: () => <el-input />,
    },
    {
      label: t('tenant.intro'),
      prop: 'intro',
      render: () => <el-input />,
    },
    {
      label: t('tenant.domain'),
      prop: 'domain',
      render: () => <el-input />,
    },
    {
      label: t('tenant.accountCount'),
      prop: 'account_count',
      render: () => <el-input-number />,
    },
    {
      label: t('tenant.isEnabled'),
      prop: 'is_enabled',
      render: () => <el-switch />,
    },
    {
      label: t('tenant.safeLevel'),
      prop: 'safe_level',
      render: () => <el-input />,
    },
  ]
}
