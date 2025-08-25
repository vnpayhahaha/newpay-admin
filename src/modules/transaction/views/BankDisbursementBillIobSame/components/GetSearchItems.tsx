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
      label: () => t('bank_disbursement_bill_iob_same.s_no'),
      prop: 's_no',
      render: () => <el-input />,
          },
                {
      label: () => t('bank_disbursement_bill_iob_same.name'),
      prop: 'name',
      render: () => <el-input />,
          },
                {
      label: () => t('bank_disbursement_bill_iob_same.ifsc_code'),
      prop: 'ifsc_code',
      render: () => <el-input />,
          },
                {
      label: () => t('bank_disbursement_bill_iob_same.type'),
      prop: 'type',
      render: () => <el-input />,
          },
                {
      label: () => t('bank_disbursement_bill_iob_same.number'),
      prop: 'number',
      render: () => <el-input />,
          },
                                {
      label: () => t('bank_disbursement_bill_iob_same.status'),
      prop: 'status',
      render: () => <el-input />,
          },
                {
      label: () => t('bank_disbursement_bill_iob_same.remarks'),
      prop: 'remarks',
      render: () => <el-input />,
          },
                {
      label: () => t('bank_disbursement_bill_iob_same.narration'),
      prop: 'narration',
      render: () => <el-input />,
          },
                {
      label: () => t('bank_disbursement_bill_iob_same.utr_no'),
      prop: 'utr_no',
      render: () => <el-input />,
          },
                {
      label: () => t('bank_disbursement_bill_iob_same.reason'),
      prop: 'reason',
      render: () => <el-input />,
          },
                {
      label: () => t('bank_disbursement_bill_iob_same.created_at'),
      prop: 'created_at',
      render: () => <el-input />,
          },
                        {
      label: () => t('bank_disbursement_bill_iob_same.order_no'),
      prop: 'order_no',
      render: () => <el-input />,
          },
                        {
      label: () => t('bank_disbursement_bill_iob_same.file_hash'),
      prop: 'file_hash',
      render: () => <el-input />,
          },
                {
      label: () => t('bank_disbursement_bill_iob_same.rejection_reason'),
      prop: 'rejection_reason',
      render: () => <el-input />,
          },
          ]
}
