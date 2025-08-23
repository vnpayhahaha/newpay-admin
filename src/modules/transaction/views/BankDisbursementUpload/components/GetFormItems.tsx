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
import type { BankDisbursementUploadVo } from "~/transaction/api/BankDisbursementUpload.ts";
import { remote, ChannelDictVo } from "~/channel/api/Channel.ts";
import { selectStatus } from "@/modules/Common";
import { fa } from "element-plus/es/locale/index.mjs";
import { chunkUpload } from "~/base/api/attachment.ts";
export default function getFormItems(
  formType: "add" | "edit" = "add",
  t: any,
  model: BankDisbursementUploadVo
): MaFormItem[] {
  // 新增默认值
  if (formType === "add") {
    // todo...
  }

  // 编辑默认值
  if (formType === "edit") {
    // todo...
  }
  function onUploadSuccess(file: any, result: any) {
    console.log("上传成功:11", file, result);
  }

  function onSuccessAction(file: any, result: any) {
    console.log("成功操作:22", file, result);
  }
  return [
    {
      label: t("bankAccount.channel_id"),
      prop: "channel_id",
      itemProps: { required: true },
      render: () => (
        <ma-remote-select filterable disabled={formType === "edit"} />
      ),
      renderProps: {
        api: () =>
          new Promise((resolve) => resolve(remote({ channel_type: 1 }))),
        dataHandle: (response: any) => {
          return response.data?.map((item: ChannelDictVo) => {
            return { label: `${item.channel_name}`, value: item.id };
          });
        },
      },
    },
    {
      label: t("bankAccount.down_bill_template_id"),
      prop: "down_bill_template_id",
      itemProps: { required: true },
      render: () => <ma-remote-select filterable />,
      renderProps: {
        api: () =>
          new Promise((resolve) =>
            resolve(selectStatus("disbursement_order", "bill_template_list"))
          ),
        dataHandle: (response: any) => {
          return response.data?.map((item: Common.StatusOptionItem) => {
            return { label: `${item.label}`, value: item.value };
          });
        },
        multiple: false,
      },
    },
    {
      label: "",
      prop: "attachment_id",
      itemProps: { required: true, labelWidth: 1 },
      render: () => {
        return (
          <ma-upload-chunk
            ref="advancedUploadRef"
            upload-success={onUploadSuccess}
            success-action={onSuccessAction}
          />
        );
      },
      renderProps: {
        action: chunkUpload,
        multiple: false,
        chunkSize: 5 * 1024 * 1024,
        maxFiles: 1,
        autoUpload: false,
        maxFileSize: 100 * 1024 * 1024,
        concurrency: 2,
        retryCount: 5,
        allowedExtensions: ["csv", "xls", "xlsx"],
        tip: "支持大文件上传，最大100MB，仅支持CSV和Excel文件",
        successActionText: "下载",
      },
    },
  ];
}
