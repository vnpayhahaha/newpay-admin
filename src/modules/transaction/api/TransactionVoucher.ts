import type { ResponseStruct } from '#/global'

export interface TransactionVoucherVo {
  // 收款凭证主键ID
  id: number
  // 渠道ID
  channel_id: number
  // 关联channel_account.id
  channel_account_id: number
  // 关联bank_account.id
  bank_account_id: number
  // 收款卡编号
  collection_card_no: string
  // 收款金额
  collection_amount: string
  // 收款手续费
  collection_fee: string
  // 收款时间
  collection_time: string
  // 状态(1等待核销 2已经核销 3核销失败)
  collection_status: string
  // 转账凭证来源:0未定义1人工创建2平台内部接口3平台开放下游接口4上游回调接口
  collection_source: string
  // 转账的凭证UTR/order_no/金额
  transaction_voucher: string
  // 转账凭证类型：1订单号 2utr 3金额
  transaction_voucher_type: string
  // 匹配的订单编号
  order_no: string
  // 原始内容
  content: string
  // 操作管理员
  operation_admin_id: string
  // 创建时间
  created_at: string
  // 更新时间
  updated_at: string
  // 交易类型：1代收 2代付
  transaction_type: string
}

// 交易凭证查询
export function page(params: TransactionVoucherVo): Promise<ResponseStruct<TransactionVoucherVo[]>> {
  return useHttp().get('/admin/transaction/transaction_voucher/list', { params })
}

// 交易凭证新增
export function create(data: TransactionVoucherVo): Promise<ResponseStruct<null>> {
  return useHttp().post('/admin/transaction/transaction_voucher', data)
}

// 交易凭证编辑
export function save(id: number, data: TransactionVoucherVo): Promise<ResponseStruct<null>> {
  return useHttp().put(`/admin/transaction/transaction_voucher/${id}`, data)
}

// 交易凭证删除
export function deleteByIds(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().delete('/admin/transaction/transaction_voucher', { data: ids })
}
