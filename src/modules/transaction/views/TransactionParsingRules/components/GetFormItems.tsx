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
import type { TransactionParsingRulesVo } from '~/transaction/api/TransactionParsingRules.ts'

export default function getFormItems(formType: 'add' | 'edit' = 'add', t: any, model: TransactionParsingRulesVo): MaFormItem[] {
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
      label:  '渠道ID' ,
      prop: 'channel_id',
      render: () => <el-input />,
                },
                    {
      label:  '正则表达式' ,
      prop: 'regex',
      render: () => <el-input />,
                },
                    {
      label:  '提取变量名' ,
      prop: 'variable_name',
      render: () => <el-input />,
                },
                    {
      label:  '示例数据' ,
      prop: 'example_data',
      render: () => <el-input />,
                },
                    {
      label:  '状态：1启用 0禁用' ,
      prop: 'status',
      render: () => <el-input />,
                },
                                          ]
}
