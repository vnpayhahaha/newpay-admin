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
import type { TransactionParsingRulesVo } from "~/transaction/api/TransactionParsingRules.ts";
import type { ChannelDictVo } from "~/channel/api/Channel.ts";
import { remote } from "~/channel/api/Channel.ts";
import { selectStatus } from "@/modules/Common";
import MaKeyValue from "@/components/ma-key-value/index.vue";

const resultArr = ref<{ variable_name: string; result: string | number }[]>([]);
const matchResult = ref<string[]>([]);

const runRegex = (
  newExData: string,
  newRegex: string,
  newValName: string[]
) => {
  const regex = new RegExp(newRegex);
  const match = newExData.match(regex);
  if (match) {
    // 过滤 match[0] 并过滤空值
    match.shift();
    matchResult.value = match.filter(
      (item): item is string => item !== undefined
    );

    if (newValName.length !== matchResult.value.length) {
      resultArr.value = [];
      return;
    }

    const result = Array<{ variable_name: string; result: string | number }>();
    for (let i = 0; i < newValName.length; i++) {
      result.push({
        variable_name: newValName[i],
        result: matchResult.value[i],
      });
    }
    resultArr.value = result;
  }
};
export default function getFormItems(
  formType: "add" | "edit" = "add",
  t: any,
  model: TransactionParsingRulesVo
): MaFormItem[] {
  // 新增默认值
  if (formType === "add") {
    // todo...
  }

  // 编辑默认值
  if (formType === "edit") {
    // todo...
  }
  model.parse_result = [
    {
      label: "变量名",
      value: "变量值",
    },
  ];

  return [
    {
      label: t("TransactionParsingRules.channel_id"),
      prop: "channel_id",
      cols: { md: 12, xs: 24 },
      itemProps: { required: true },
      render: () => <ma-remote-select filterable />,
      renderProps: {
        api: () =>
          new Promise((resolve) =>
            resolve(remote({ channel_type: 1, support_collection: 1 }))
          ),
        dataHandle: (response: any) => {
          return response.data?.map((item: ChannelDictVo) => {
            return { label: `${item.channel_name}`, value: item.id };
          });
        },
      },
    },
    {
      label: t("TransactionParsingRules.status"),
      prop: "status",
      cols: { md: 12, xs: 24 },
      itemProps: { required: true },
      render: () => <ma-remote-select filterable />,
      renderProps: {
        api: () =>
          new Promise((resolve) =>
            resolve(selectStatus("transaction_parsing_rules", "status_list"))
          ),
        dataHandle: (response: any) => {
          return response.data?.map((item: Common.StatusOptionItem) => {
            return { label: `${item.label}`, value: item.value };
          });
        },
        placeholder: t("TransactionParsingRules.status"),
      },
    },
    {
      label: t("TransactionParsingRules.example_data"),
      prop: "example_data",
      render: () => <el-input />,
      renderProps: {
        type: "textarea",
      },
    },
    {
      label: t("TransactionParsingRules.regex"),
      prop: "regex",
      render: () => <el-input />,
      renderSlots: {
        prefix: () => <span style="margin-left: 8px">/</span>,
        suffix: () => <span style="margin-right: 8px">/</span>,
      },
    },
    {
      label: t("TransactionParsingRules.variable_name"),
      prop: "variable_name",
      itemProps: { required: true },
      render: () => <ma-remote-select filterable />,
      renderProps: {
        api: () =>
          new Promise((resolve) =>
            resolve(
              selectStatus("transaction_parsing_rules", "variable_name_list")
            )
          ),
        dataHandle: (response: any) => {
          return response.data?.map((item: Common.StatusOptionItem) => {
            return { label: `${item.label}`, value: item.value };
          });
        },
        placeholder: t("TransactionParsingRules.variable_name"),
        multiple: true,
      },
    },
    {
      label: t("TransactionParsingRules.parse_result"),
      prop: "parse_result",
      render: () => MaKeyValue,
      renderProps: {
        fixedKey: true,
        disabled: true,
      },
    },
  ];
}
