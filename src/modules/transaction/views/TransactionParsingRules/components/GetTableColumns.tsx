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
import type { TransactionParsingRulesVo } from "~/transaction/api/TransactionParsingRules.ts";
import type { UseDialogExpose } from "@/hooks/useDialog.ts";

import { useMessage } from "@/hooks/useMessage.ts";
import { deleteByIds } from "~/transaction/api/TransactionParsingRules.ts";
import { ResultCode } from "@/utils/ResultCode.ts";
import hasAuth from "@/utils/permission/hasAuth.ts";

export default function getTableColumns(
  dialog: UseDialogExpose,
  formRef: any,
  t: any
): MaProTableColumns[] {
  const dictStore = useDictStore();
  const msg = useMessage();

  const showBtn = (auth: string | string[], row: TransactionParsingRulesVo) => {
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
      label: () => t("TransactionParsingRules.channel_id"),
      prop: "channel_id",
    },
    { label: () => t("TransactionParsingRules.regex"), prop: "regex" },
    {
      label: () => t("TransactionParsingRules.variable_name"),
      prop: "variable_name",
    },
    {
      label: () => t("TransactionParsingRules.example_data"),
      prop: "example_data",
    },
    { label: () => t("TransactionParsingRules.status"), prop: "status" },
    {
      label: () => t("TransactionParsingRules.created_at"),
      prop: "created_at",
    },
    {
      label: () => t("TransactionParsingRules.updated_at"),
      prop: "updated_at",
    },
    {
      label: () => t("TransactionParsingRules.deleted_at"),
      prop: "deleted_at",
    },

    // 操作列
    {
      type: "operation",
      label: () => t("crud.operation"),
      width: "260px",
      operationConfigure: {
        type: "tile",
        actions: [
          {
            name: "edit",
            icon: "i-heroicons:pencil",
            show: ({ row }) =>
              showBtn("transaction:transaction_parsing_rules:update", row),
            text: () => t("crud.edit"),
            onClick: ({ row }) => {
              dialog.setTitle(t("crud.edit"));
              dialog.open({ formType: "edit", data: row });
            },
          },
          {
            name: "del",
            show: ({ row }) =>
              showBtn("transaction:transaction_parsing_rules:delete", row),
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
