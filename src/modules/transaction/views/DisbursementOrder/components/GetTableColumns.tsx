/**
 * MineAdmin is committed to providing solutions for quickly building web applications
 * Please view the LICENSE file that was distributed with this source code,
 * For the full copyright and license information.
 * Thank you very much for using MineAdmin.
 *
 * @Author X.Mo<root@imoi.cn>
 * @Link   https://github.com/mineadmin
 */
import type { MaProTableColumns, MaProTableExpose } from "@mineadmin/pro-table";
import type { DisbursementOrderVo } from "~/transaction/api/DisbursementOrder.ts";
import type { UseDialogExpose } from "@/hooks/useDialog.ts";

import { useMessage } from "@/hooks/useMessage.ts";
import { deleteByIds } from "~/transaction/api/DisbursementOrder.ts";
import { ResultCode } from "@/utils/ResultCode.ts";
import hasAuth from "@/utils/permission/hasAuth.ts";
import MaCopy from "@/components/ma-copy/index.vue";
import tool from "@/utils/tool.ts";
import { selectStatus } from "@/modules/Common";
import { trim } from "lodash-es";
export default function getTableColumns(
  dialog: UseDialogExpose,
  formRef: any,
  t: any
): MaProTableColumns[] {
  const dictStore = useDictStore();
  const msg = useMessage();

  const showBtn = (auth: string | string[], row: DisbursementOrderVo) => {
    return hasAuth(auth);
  };

  return [
    // 多选列
    {
      type: "selection",
      showOverflowTooltip: false,
      label: () => t("crud.selection"),
    },
    // 索引序号列
    { type: "index" },
    // 普通列
    {
      label: () => t("disbursement_order.channel"),
      prop: "channel",
      width: 220,
      cellRender: ({ row }) => {
        return (
          <div
            class="text-align-left"
            style={{ display: "flex", alignItems: "center" }}
          >
            <el-avatar shape="square" src={row.channel?.channel_icon || ""} />
            {row.disbursement_channel_id > 0 ? (
              <div class="ml-5" style={{ flex: 1, minWidth: 0 }}>
                <p>
                  <el-text class="mx-1" type="primary">
                    {row.channel?.channel_code || ""}
                  </el-text>
                </p>
                <p>
                  <el-text class="mx-1" truncated>
                    {row.channel?.channel_name || ""}
                  </el-text>
                </p>
                {row.bank_account?.branch_name && (
                  <p>
                    <el-text class="mx-1" truncated>
                      {row.bank_account?.branch_name}
                    </el-text>
                  </p>
                )}
                {row.channel_account?.merchant_id && (
                  <p>
                    <el-text class="mx-1" truncated>
                      {row.channel_account?.merchant_id || ""}
                    </el-text>
                  </p>
                )}
              </div>
            ) : (
              <div class="ml-5" style={{ flex: 1, minWidth: 0 }}>
                <p>
                  <el-text class="mx-1" type="primary">
                    {t("disbursement_order.undistributed")}
                  </el-text>
                </p>
              </div>
            )}
          </div>
        );
      },
    },
    {
      label: () => t("disbursement_order.disbursement_channel_id"),
      prop: "disbursement_channel_id",
      minWidth: "120px",
      hide: true,
    },
    {
      label: () => t("disbursement_order.bank_account_id"),
      prop: "bank_account_id",
      minWidth: "120px",
      hide: true,
    },
    {
      label: () => t("disbursement_order.channel_account_id"),
      prop: "channel_account_id",
      minWidth: "120px",
      hide: true,
    },
    {
      label: () => t("disbursement_order.order_no"),
      prop: "order_no",
      type: "merge",
      minWidth: "260px",
      cellRender: ({ row }) => {
        return (
          <div
            class="text-align-left"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <p>{t("disbursement_order.platform_order_no")}:</p>
              <p class="ml-2">
                <MaCopy class="color-blue" content={row.platform_order_no} />
              </p>
              <p>{t("disbursement_order.tenant_order_no")}:</p>
              <p class="ml-2">
                <MaCopy class="color-green" content={row.tenant_order_no} />
              </p>
              <p>{t("disbursement_order.upstream_order_no")}:</p>
              <p class="ml-2">
                <MaCopy class="color-red" content={row.upstream_order_no} />
              </p>
            </div>
          </div>
        );
      },
    },
    {
      label: () => t("disbursement_order.platform_order_no"),
      prop: "platform_order_no",
      minWidth: "260px",
      hide: true,
    },
    {
      label: () => t("disbursement_order.tenant_order_no"),
      prop: "tenant_order_no",
      minWidth: "220px",
      hide: true,
    },
    {
      label: () => t("disbursement_order.upstream_order_no"),
      prop: "upstream_order_no",
      minWidth: "220px",
      hide: true,
    },
    {
      label: () => t("disbursement_order.status"),
      prop: "status",
      minWidth: 120,
      cellRenderTo: {
        name: "nmCellEnhance",
        props: {
          type: "tag",
          api: () =>
            new Promise((resolve) =>
              resolve(selectStatus("disbursement_order", "status_list"))
            ),
          dataHandle: (response: any) => {
            return response.data?.map((item: Common.StatusOptionItem) => {
              if (item.value === 20) {
                return {
                  label: `${item.label}`,
                  value: item.value,
                  color: "success",
                };
              }
              return { label: `${item.label}`, value: item.value };
            });
          },
          props: {
            effect: "dark",
          },
        },
      },
    },
    {
      label: () => t("disbursement_order.amount"),
      prop: "amount",
      minWidth: "100px",
    },
    {
      label: () => t("disbursement_order.fee"),
      prop: "fee",
      minWidth: "220px",
      cellRender: ({ row }) => {
        return (
          <div
            class="text-align-left"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <p>
                {t("disbursement_order.fixed_fee")}:{" "}
                <MaCopy content={tool.formatMoney(row.fixed_fee)} />
              </p>
              <p>
                {t("disbursement_order.rate_fee")}:{" "}
                <MaCopy content={tool.formatMoney(row.rate_fee) + "%"} /> *{" "}
                <MaCopy
                  class="color-red"
                  content={tool.formatMoney(row.amount)}
                />
              </p>
              <p>
                {t("disbursement_order.total_fee")}:{" "}
                <MaCopy
                  class="color-blue"
                  content={tool.formatMoney(row.total_fee)}
                />
              </p>
            </div>
          </div>
        );
      },
    },
    {
      label: () => t("disbursement_order.fixed_fee"),
      prop: "fixed_fee",
      width: "120px",
      hide: true,
    },
    {
      label: () => t("disbursement_order.rate_fee"),
      prop: "rate_fee",
      width: "120px",
      hide: true,
    },
    {
      label: () => t("disbursement_order.total_fee"),
      prop: "total_fee",
      width: "120px",
      hide: true,
    },
    {
      label: () => t("disbursement_order.settlement_amount"),
      prop: "settlement_amount",
      minWidth: "120px",
      cellRender: ({ row }) => {
        return tool.formatMoney(row.settlement_amount);
      },
    },
    {
      label: () => t("disbursement_order.upstream_settlement_info"),
      prop: "upstream_settlement_info",
      minWidth: "120px",
      cellRender: ({ row }) => {
        return (
          <div
            class="text-align-left"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <p>
                <MaCopy
                  content={tool.formatMoney(row.upstream_settlement_amount)}
                />
              </p>
              {trim(row.upstream_fee) && (
                <p>
                  {t("disbursement_order.fee")}:
                  {tool.formatMoney(row.upstream_fee)}
                </p>
              )}
            </div>
          </div>
        );
      },
    },
    {
      label: () => t("disbursement_order.upstream_settlement_amount"),
      prop: "upstream_settlement_amount",
      width: "120px",
      hide: true,
    },
    {
      label: () => t("disbursement_order.upstream_fee"),
      prop: "upstream_fee",
      width: "120px",
      hide: true,
    },
    {
      label: () => t("disbursement_order.paid_info"),
      prop: "paid_info",
      minWidth: "180px",
      cellRender: ({ row }) => {
        return (
          <div
            class="text-align-left"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <p>{row.pay_time}</p>
              {trim(row.utr) != "" && (
                <p>
                  UTR: <MaCopy content={row.utr} class="color-blue" />
                </p>
              )}
            </div>
          </div>
        );
      },
    },
    {
      label: () => t("disbursement_order.pay_time"),
      prop: "pay_time",
      width: "180px",
      hide: true,
    },
    {
      label: () => t("disbursement_order.utr"),
      prop: "utr",
      minWidth: 120,
      hide: true,
    },
    {
      label: () => t("disbursement_order.cancel_info"),
      prop: "cancel_info",
      minWidth: "180px",
      cellRender: ({ row }) => {
        return (
          <div
            class="text-align-left"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <p>{row.cancelled_at}</p>
              {row.cancel_operator?.id && (
                <p>
                  {row.cancel_operator?.nickname}:{" "}
                  <MaCopy
                    content={row.cancel_operator?.username}
                    class="color-blue"
                  />
                </p>
              )}
            </div>
          </div>
        );
      },
    },
    {
      label: () => t("disbursement_order.cancelled_at"),
      prop: "cancelled_at",
      width: "180px",
      hide: true,
    },
    {
      label: () => t("disbursement_order.cancelled_by"),
      prop: "cancelled_by",
      minWidth: 100,
      hide: true,
    },
    {
      label: () => t("disbursement_order.expire_time"),
      prop: "expire_time",
      width: "180px",
    },
    {
      label: () => t("disbursement_order.order_source"),
      prop: "order_source",
      width: "120px",
      cellRender: ({ row }) => {
        return (
          <div
            class="text-align-left"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <p>
                <MaCopy content={row.order_source} />
              </p>
              <p>
                <MaCopy content={row.tenant_id} />
              </p>
            </div>
          </div>
        );
      },
    },
    {
      label: () => t("disbursement_order.tenant_id"),
      prop: "tenant_id",
      width: 100,
      hide: true,
    },
    {
      label: () => t("disbursement_order.app_id"),
      prop: "app_id",
      width: 100,
      hide: true,
    },
    {
      label: () => t("disbursement_order.payment_type"),
      prop: "payment_type",
      minWidth: "120px",
      cellRenderTo: {
        name: "nmCellEnhance",
        props: {
          type: "tag",
          api: () =>
            new Promise((resolve) =>
              resolve(selectStatus("disbursement_order", "payment_type_list"))
            ),
          dataHandle: (response: any) => {
            return response.data?.map((item: Common.StatusOptionItem) => {
              return { label: `${item.label}`, value: item.value };
            });
          },
          props: {
            effect: "dark",
          },
        },
      },
    },
    {
      label: () => t("disbursement_order.notify_url"),
      prop: "notify_url",
      minWidth: 150,
      hide: true,
    },
    {
      label: () => t("disbursement_order.notify_count"),
      prop: "notify_count",
      width: 100,
    },
    {
      label: () => t("disbursement_order.notify_status"),
      prop: "notify_status",
      minWidth: "120px",
      cellRenderTo: {
        name: "nmCellEnhance",
        props: {
          type: "tag",
          api: () =>
            new Promise((resolve) =>
              resolve(selectStatus("disbursement_order", "notify_status_list"))
            ),
          dataHandle: (response: any) => {
            return response.data?.map((item: Common.StatusOptionItem) => {
              return { label: `${item.label}`, value: item.value };
            });
          },
          props: {
            effect: "dark",
          },
        },
      },
    },
    {
      label: () => t("disbursement_order.payee_info"),
      prop: "payee_info",
      minWidth: 240,
      cellRender: ({ row }) => {
        return (
          <div
            class="text-align-left"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <p>
                {t("disbursement_order.payee_bank_name")}:{" "}
                <MaCopy content={row.payee_bank_name} />
              </p>
              <p>
                {t("disbursement_order.payee_bank_code")}:{" "}
                <MaCopy content={row.payee_bank_code} />
              </p>
              <p>
                {t("disbursement_order.payee_account_name")}:{" "}
                <MaCopy content={row.payee_account_name} />
              </p>
              <p>
                {t("disbursement_order.payee_account_no")}:{" "}
                <MaCopy content={row.payee_account_no} />
              </p>
              <p>
                {t("disbursement_order.payee_upi")}:{" "}
                <MaCopy content={row.payee_upi} />
              </p>
            </div>
          </div>
        );
      },
    },
    {
      label: () => t("disbursement_order.payee_bank_name"),
      prop: "payee_bank_name",
      minWidth: 150,
      hide: true,
    },
    {
      label: () => t("disbursement_order.payee_bank_code"),
      prop: "payee_bank_code",
      minWidth: 150,
      hide: true,
    },
    {
      label: () => t("disbursement_order.payee_account_name"),
      minWidth: 150,
      hide: true,
      prop: "payee_account_name",
    },
    {
      label: () => t("disbursement_order.payee_account_no"),
      prop: "payee_account_no",
      minWidth: 150,
      hide: true,
    },
    {
      label: () => t("disbursement_order.payee_upi"),
      prop: "payee_upi",
      minWidth: 150,
      hide: true,
    },
    {
      label: () => t("disbursement_order.description"),
      prop: "description",
      minWidth: 150,
      hide: true,
    },
    {
      label: () => t("disbursement_order.channel_transaction_no"),
      prop: "channel_transaction_no",
      minWidth: 150,
      hide: true,
    },
    {
      label: () => t("disbursement_order.error_code"),
      prop: "error_code",
      minWidth: 100,
      hide: true,
    },
    {
      label: () => t("disbursement_order.error_message"),
      prop: "error_message",
      minWidth: 150,
      hide: true,
    },
    {
      label: () => t("disbursement_order.request_id"),
      prop: "request_id",
      minWidth: 200,
      hide: true,
    },
    {
      label: () => t("disbursement_order.created_at"),
      prop: "created_at",
      minWidth: 180,
      hide: true,
    },

    // 操作列
    {
      type: "operation",
      label: () => t("crud.operation"),
      width: "160px",
      operationConfigure: {
        type: "tile",
        actions: [
          {
            name: "edit",
            icon: "i-heroicons:pencil",
            show: ({ row }) =>
              showBtn("transaction:disbursement_order:update", row),
            text: () => t("crud.edit"),
            onClick: ({ row }) => {
              dialog.setTitle(t("crud.edit"));
              dialog.open({ formType: "edit", data: row });
            },
          },
          {
            name: "del",
            show: ({ row }) =>
              showBtn("transaction:disbursement_order:delete", row),
            icon: "i-heroicons:trash",
            text: () => t("crud.delete"),
            onClick: ({ row }, proxy: MaProTableExpose) => {
              msg.delConfirm(t("crud.delDataMessage")).then(async () => {
                const response = await deleteByIds([row.id]);
                if (response.code === ResultCode.SUCCESS) {
                  msg.success(t("crud.delSuccess"));
                  await proxy.refresh();
                }
              });
            },
          },
        ],
      },
    },
  ];
}
