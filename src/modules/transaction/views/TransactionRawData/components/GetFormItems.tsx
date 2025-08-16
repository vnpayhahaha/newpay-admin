/**
 * MineAdmin is committed to providing solutions for quickly building web applications
 * Please view the LICENSE file that was distributed with this source code,
 * For the full copyright and license information.
 * Thank you very much for using MineAdmin.
 *
 * @Author X.Mo<root@imoi.cn>
 * @Link   https://github.com/mineadmin
 */
import type { MaFormItem } from "@mineadmin/form";
import type { TransactionRawDataVo } from "~/transaction/api/TransactionRawData.ts";

export default function getFormItems(
  formType: "add" | "edit" = "add",
  t: any,
  model: TransactionRawDataVo
): MaFormItem[] {
  // 新增默认值
  if (formType === "add") {
    // todo...
  }

  // 编辑默认值
  if (formType === "edit") {
    // todo...
  }

  return [
    {
      label: t("TransactionRawData.content"),
      prop: "content",
      render: () => <el-input />,
    },
    {
      label: t("TransactionRawData.source"),
      prop: "source",
      render: () => <el-input />,
    },
    {
      label: t("TransactionRawData.status"),
      prop: "status",
      render: () => <el-input />,
    },
  ];
}
