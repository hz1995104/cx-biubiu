import React, { useEffect } from "react";
import { Modal, ModalProps, Form, Input, Select } from "antd";

//modal中表单的属性
interface FormData {
  ppn: string;
  type: string;
}

interface ModaFormProps extends ModalProps {
  onConfirm: (formData: FormData) => void;
  initData?: FormData;
}

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

export const ModalForm: React.FC<ModaFormProps> = (props) => {
  const [form] = Form.useForm();

  const { visible, onConfirm, onCancel, title, initData } = props;

  useEffect(() => {
    if (initData) {
      form.setFieldsValue(initData);
    }
  }, [initData]);

  const handleSubmit = () => {
    form.validateFields().then((res) => {
      const formData: FormData = res;
      onConfirm(formData);
    });
  };

  return (
    <Modal
      destroyOnClose={true}
      title={title}
      visible={visible}
      onOk={handleSubmit}
      onCancel={onCancel}
    >
      <Form preserve={false} form={form} {...formItemLayout}>
        <Form.Item
          label="属性名称"
          name="ppn"
          rules={[{ required: true, message: "请输入属性名称" }]}
        >
          <Input placeholder={"请输入属性名称"} />
        </Form.Item>
        <Form.Item
          label="属性分类"
          name="type"
          rules={[{ required: true, message: "请选择属性分类" }]}
        >
          <Select placeholder={"请选择属性分类"}>
            <Select.Option value={"维修项"} key={1}>
              {"维修项"}
            </Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
