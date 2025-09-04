import type { PageList, ResponseStruct } from "#/global";

export interface countVo {
  count: number;
  yesterday: number;
  growth: number;
  chartData: Array<{
    x: string;
    y: number;
    name: string;
  }>;
}

export function collectionOrderNum(): Promise<ResponseStruct<countVo>> {
  return useHttp().get("/admin/analysis/weekOrder/collection_order_num");
}

export function disbursementOrderNum(): Promise<ResponseStruct<countVo>> {
  return useHttp().get("/admin/analysis/weekOrder/disbursement_order_num");
}

export function disbursementSuccessfulNum(): Promise<ResponseStruct<countVo>> {
  return useHttp().get("/admin/analysis/weekOrder/disbursement_successful_num");
}

export function collectionSuccessfulNum(): Promise<ResponseStruct<countVo>> {
  return useHttp().get("/admin/analysis/weekOrder/collection_successful_num");
}

export function collectionSuccessfulAmount(): Promise<ResponseStruct<countVo>> {
  return useHttp().get(
    "/admin/analysis/weekOrder/collection_successful_amount"
  );
}

export function disbursementSuccessfulAmount(): Promise<
  ResponseStruct<countVo>
> {
  return useHttp().get(
    "/admin/analysis/weekOrder/disbursement_successful_amount"
  );
}

export function collectionSuccessfulRate(): Promise<ResponseStruct<countVo>> {
  return useHttp().get("/admin/analysis/weekOrder/collection_successful_rate");
}

export function disbursementSuccessfulRate(): Promise<ResponseStruct<countVo>> {
  return useHttp().get(
    "/admin/analysis/weekOrder/disbursement_successful_rate"
  );
}
