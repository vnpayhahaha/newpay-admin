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
      label: () => '租户编号',
      prop: 'tenant_id',
      render: () => <ma-remote-select />,
    },
    {
      label: () => '用户名',
      prop: 'username',
      render: () => <el-input />,
    },
    {
      label: () => '手机号码',
      prop: 'phone',
      render: () => <el-input />,
    },
    {
      label: () => '状态(1正常 2停用)',
      prop: 'status',
      render: () => <el-switch />,
    },
    {
      label: () => 'google验证(1正常 2停用)',
      prop: 'is_enabled_google',
      render: () => <ma-dict-radio />,
    },
    {
      label: () => '备注',
      prop: 'remark',
      render: () => <el-input />,
    },
  ]
}
