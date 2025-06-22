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
import type { TenantUserVo } from '~/tenant/api/TenantUser.ts'

export default function getFormItems(formType: 'add' | 'edit' = 'add', t: any, model: TenantUserVo): MaFormItem[] {
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
      label:  '租户编号' ,
      prop: 'tenant_id',
      render: () => <ma-remote-select />,
                },
                    {
      label:  '用户名' ,
      prop: 'username',
      render: () => <el-input />,
                },
                              {
      label:  '手机号码' ,
      prop: 'phone',
      render: () => <el-input />,
                },
                    {
      label:  '头像' ,
      prop: 'avatar',
      render: () => <ma-upload-image />,
                },
                                        {
      label:  '状态(1正常 2停用)' ,
      prop: 'status',
      render: () => <el-switch />,
                },
                    {
      label:  'google验证(1正常 2停用)' ,
      prop: 'is_enabled_google',
      render: () => <ma-dict-radio />,
                },
                                                                                                    {
      label:  'IP白名单' ,
      prop: 'ip_whitelist',
      render: () => <el-input />,
                },
                    {
      label:  '备注' ,
      prop: 'remark',
      render: () => <el-input />,
                },
            ]
}
