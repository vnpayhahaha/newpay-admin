/**
 * MineAdmin is committed to providing solutions for quickly building web applications
 * Please view the LICENSE file that was distributed with this source code,
 * For the full copyright and license information.
 * Thank you very much for using MineAdmin.
 *
 * @Author X.Mo <root@imoi.cn>
 * @Link   https://github.com/mineadmin
 */

import type { MaSearchItem } from '@mineadmin/search'

export default function getSearchItems(t: any): MaSearchItem[] {
  return [
    {
      label: () => t('tenant.tenantId'),
      prop: 'tenant_id',
      render: () => <ma-remote-select />,
    },
    {
      label: () => t('tenant.contactUserName'),
      prop: 'contact_user_name',
      render: () => <el-input />,
    },
    {
      label: () => t('tenant.isEnabled'),
      prop: 'is_enabled',
      render: () => <el-switch />,
    },
  ]
}
