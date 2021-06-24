import React, { useEffect, useState, useMemo } from "react";
import {
  Table,
  Button,
  Card,
  Row,
  Col,
  Form,
  Input,
  Select,
  Modal,
} from "antd";
import "./index.less";
import { ColumnProps } from "antd/lib/table";
import { TablePaginationConfig } from "antd/lib/table/index";
import { PlusOutlined } from "@ant-design/icons";
import { ModalForm } from "./components//modal-form";

interface Pager {
  pageSize: number;
  pageIndex: number;
}

//查询所传表单属性参数
interface SearchFormData {
  categoryId?: number;
  ppn?: string;
  type?: number;
}

//table数据属性
export interface ListItem {
  key?: React.Key;
  categoryId: number;
  categoryName: string;
  ppn: string;
  ppnId: number;
  type: number;
}

//modal中表单的属性
interface FormData {
  groupName: string;
}

const BaseTable: React.FC = () => {
  const [data, setData] = useState<ListItem[]>([]);
  const [total, setTotal] = useState(0);
  const [pager, setPager] = useState<Pager>({ pageIndex: 1, pageSize: 20 });
  const [formData, setFormData] = useState<SearchFormData>({});
  const [createVisible, setCreateVisible] = useState(false);
  const [modelInitData, setModelInitData] = useState<FormData>();

  const [form] = Form.useForm();

  //查询获取列表数据
  const searchListData = () => {
    let searchParams = {
      ...pager,
      pageIndex: pager.pageIndex - 1,
      ...formData,
    };
    //获取搜索数据
    // Apis.searchCategory(searchParams).then((res: any) => {
    //   setData(res.data)
    //   setTotal(res.totalCount)
    // })
  };

  //改变页数的处理
  const pageChange = (pagination: TablePaginationConfig) => {
    setPager({
      pageIndex: pagination.current!,
      pageSize: pagination.pageSize!,
    });
  };

  //重置数据
  const reset = () => {
    form.resetFields();
    setFormData({});
    setPager({ pageIndex: 1, pageSize: 20 });
  };

  //提交表单
  const submit = () => {
    form.validateFields().then((res) => {
      setFormData(res);
      setPager({ pageIndex: 1, pageSize: 20 });
    });
  };

  useEffect(() => {
    searchListData();
  }, [pager]);

  const columns: ColumnProps<ListItem>[] = [
    {
      title: "品类",
      dataIndex: "categoryName",
      align: "center",
      width: 200,
    },
    {
      title: "属性名称",
      dataIndex: "ppn",
      align: "center",
      width: 200,
    },
    {
      title: "属性分类",
      dataIndex: "type",
      align: "center",
      width: 400,
    },
  ];

  //存在modal
  const addForm = useMemo(
    () => (
      <ModalForm
        title="新增"
        onConfirm={(formData) => setCreateVisible(false)}
        initData={modelInitData}
        visible={createVisible}
        onCancel={() => setCreateVisible(false)}
      />
    ),
    [createVisible]
  );
  return (
    <Card>
      <Form
        className="serchBar"
        form={form}
        layout="horizontal"
        onFinish={submit}
      >
        <Form.Item label="品类" name="categoryId">
          <Select placeholder={"请选择品类"}>
            <Select.Option value={"手机"} key={1}>
              {"手机"}
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="属性名称" name="ppn">
          <Input placeholder={"请输入属性名称"} />
        </Form.Item>
        <Form.Item label="属性分类" name="type">
          <Select placeholder={"请选择属性分类"}>
            <Select.Option value={"维修项"} key={1}>
              {"维修项"}
            </Select.Option>
          </Select>
        </Form.Item>
        <Button onClick={submit} type="primary">
          查询
        </Button>
        <Button onClick={reset} type="primary">
          重置
        </Button>
      </Form>
      <Row style={{ marginBottom: 10 }}>
        <Col>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setCreateVisible(true);
            }}
          >
            新增
          </Button>
        </Col>
      </Row>
      {addForm}
      <Table
        bordered
        columns={columns}
        dataSource={data}
        scroll={{ x: 800 }}
        onChange={pageChange}
        pagination={{
          current: pager.pageIndex,
          pageSize: pager.pageSize,
          total: total,
          showQuickJumper: true,
          showSizeChanger: true,
          showTotal: (total) =>
            `共 ${total} 条记录 第 ${pager.pageIndex} / ${Math.ceil(
              total / pager.pageSize
            )} 页`,
        }}
      />
    </Card>
  );
};

export default BaseTable;
