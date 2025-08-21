import type { ResponseStruct } from "#/global";

export interface BankDisbursementDownloadVo {
  // 主键ID
  id: number;
  // 资源ID
  attachment_id: number;
  // 文件名
  file_name: string;
  // 下载地址
  path: string;
  // 文件hash
  hash: string;
  // 数据大小（M）
  file_size: string;
  // 条数
  record_count: string;
  // 创建者
  created_by: string;
  // 创建时间
  created_at: string;
}

// bank_disbursement_upload查询
export function page(
  params: BankDisbursementDownloadVo
): Promise<ResponseStruct<BankDisbursementDownloadVo[]>> {
  return useHttp().get("/admin/transaction/bank_disbursement_upload/list", {
    params,
  });
}

// bank_disbursement_upload新增
export function create(
  data: BankDisbursementDownloadVo
): Promise<ResponseStruct<null>> {
  return useHttp().post("/admin/transaction/bank_disbursement_upload", data);
}

// bank_disbursement_upload编辑
export function save(
  id: number,
  data: BankDisbursementDownloadVo
): Promise<ResponseStruct<null>> {
  return useHttp().put(
    `/admin/transaction/bank_disbursement_upload/${id}`,
    data
  );
}

// bank_disbursement_upload删除
export function deleteByIds(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().delete("/admin/transaction/bank_disbursement_upload", {
    data: ids,
  });
}

export function downloadById(id: number): Promise<ResponseStruct<Blob>> {
  return useHttp().request({
    url: `/admin/transaction/bank_disbursement_upload/download/${id}`,
    method: "post",
    timeout: 60 * 1000,
    responseType: "blob",
  });
}
