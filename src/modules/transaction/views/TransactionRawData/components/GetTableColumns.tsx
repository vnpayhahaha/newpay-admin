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
import type { TransactionRawDataVo } from "~/transaction/api/TransactionRawData.ts";
import type { UseDialogExpose } from "@/hooks/useDialog.ts";

import { useMessage } from "@/hooks/useMessage.ts";
import { deleteByIds } from "~/transaction/api/TransactionRawData.ts";
import { ResultCode } from "@/utils/ResultCode.ts";
import hasAuth from "@/utils/permission/hasAuth.ts";
import { selectStatus } from "@/modules/Common";

export default function getTableColumns(
  dialog: UseDialogExpose,
  formRef: any,
  t: any
): MaProTableColumns[] {
  const dictStore = useDictStore();
  const msg = useMessage();

  const showBtn = (auth: string | string[], row: TransactionRawDataVo) => {
    return hasAuth(auth);
  };

  return [
    // 多选列
    {
      type: "selection",
      showOverflowTooltip: false,
      label: () => t("crud.selection"),
    },
    {
      label: () => t("TransactionRawData.content"),
      prop: "content",
      width: 100,
      type: "expand",
      cellRender: ({ row }) => {
        return row.content;
      },
    },
    // 索引序号列
    { type: "index" },
    // 普通列
    { label: () => t("TransactionRawData.hash"), prop: "hash", minWidth: 280 },
    { label: () => t("TransactionRawData.source"), prop: "source", width: 120 },
    {
      label: () => t("TransactionRawData.status"),
      width: 100,
      prop: "status",
      cellRenderTo: {
        name: "nmCellEnhance",
        props: {
          type: "tag",
          api: () =>
            new Promise((resolve) =>
              resolve(selectStatus("transaction_raw_data", "status_list"))
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
      label: () => t("TransactionRawData.repeat_count"),
      prop: "repeat_count",
      width: 100,
    },
    {
      label: () => t("TransactionRawData.created_at"),
      prop: "created_at",
      width: 180,
    },
    {
      label: () => t("TransactionRawData.updated_at"),
      prop: "updated_at",
      width: 180,
    },

    // 操作列
    {
      type: "operation",
      hide: true,
      label: () => t("crud.operation"),
      width: "260px",
      operationConfigure: {
        type: "tile",
        actions: [
          {
            name: "edit",
            icon: "i-heroicons:pencil",
            show: ({ row }) =>
              showBtn("transaction:transaction_raw_data:update", row),
            text: () => t("crud.edit"),
            onClick: ({ row }) => {
              dialog.setTitle(t("crud.edit"));
              dialog.open({ formType: "edit", data: row });
            },
          },
          {
            name: "del",
            show: ({ row }) =>
              showBtn("transaction:transaction_raw_data:delete", row),
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
