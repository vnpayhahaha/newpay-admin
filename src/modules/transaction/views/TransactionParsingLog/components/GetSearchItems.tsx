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
      label: () =>  '原始数据ID' ,
      prop: 'raw_data_id',
      render: () => <el-input />,
          },
                {
      label: () =>  '规则ID' ,
      prop: 'rule_id',
      render: () => <el-input />,
          },
                        {
      label: () =>  '记录匹配变量名称' ,
      prop: 'variable_name',
      render: () => <el-input />,
          },
                {
      label: () =>  '状态：1解析成功 2失败或部分失败' ,
      prop: 'status',
      render: () => <el-input />,
          },
                                {
      label: () =>  '失败原因说明' ,
      prop: 'desc',
      render: () => <el-input />,
          },
          ]
}
