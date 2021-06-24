import React from 'react'
import { Modal, ModalProps, Form, Input, Select } from 'antd'

//modal中form表单属性
interface FormData {
    groupName: string
  }

interface ModaFormProps extends ModalProps {
  onConfirm: (formData: FormData) => void
  initData?: FormData
}

export const ModalForm: React.FC<ModaFormProps> = (props) => {
  const [form] = Form.useForm()

  const { visible, onConfirm, onCancel, title, initData } = props
  // 为什么不用initialValue https://github.com/ant-design/ant-design/issues/26433
  // <Modal /> 和 Form 一起配合使用时，设置 destroyOnClose 也不会在 Modal 关闭时销毁表单字段数据，需要设置 <Form preserve={false} />
  if (initData) form.setFieldsValue(initData)

  const handleSubmit = () => {
    form.validateFields().then((res) => {
      const formData: FormData = res
      onConfirm(formData)
    })
  }

  return (
    <Modal
    destroyOnClose={true}
    title={title}
    visible={visible}
    onOk={handleSubmit}
    onCancel={onCancel}
  >
    <Form
      preserve={false}
      form={form}
      labelCol={{ span: 6, offset: 1 }}
      wrapperCol={{ span: 18 }}
      layout="horizontal"
    >
      <Form.Item
        name="groupName"
        label="ABTest组名称"
        rules={[{ required: true, message: '请输入ABTest组名称' }]}
      >
        <Input placeholder={'请输入ABTest组名称'} />
      </Form.Item>
    </Form>
  </Modal>
  )
}

