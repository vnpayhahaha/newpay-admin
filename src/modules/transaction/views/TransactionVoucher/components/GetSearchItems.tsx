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
      label: () => t('transaction_voucher.channel_id'),
      prop: 'channel_id',
      render: () => <el-input />,
    },
    {
      label: () => t('transaction_voucher.channel_account_id'),
      prop: 'channel_account_id',
      render: () => <el-input />,
    },
    {
      label: () => t('transaction_voucher.bank_account_id'),
      prop: 'bank_account_id',
      render: () => <el-input />,
    },
    {
      label: () => t('transaction_voucher.collection_card_no'),
      prop: 'collection_card_no',
      render: () => <el-input />,
    },
    {
      label: () => t('transaction_voucher.collection_time'),
      prop: 'collection_time',
      render: () => <el-input />,
    },
    {
      label: () => t('transaction_voucher.collection_status'),
      prop: 'collection_status',
      render: () => <el-input />,
    },
    {
      label: () => t('transaction_voucher.collection_source'),
      prop: 'collection_source',
      render: () => <el-input />,
    },
    {
      label: () => t('transaction_voucher.transaction_voucher_type'),
      prop: 'transaction_voucher_type',
      render: () => <el-input />,
    },
    {
      label: () => t('transaction_voucher.order_no'),
      prop: 'order_no',
      render: () => <el-input />,
    },
    {
      label: () => t('transaction_voucher.transaction_type'),
      prop: 'transaction_type',
      render: () => <el-input />,
    },
  ]
}
