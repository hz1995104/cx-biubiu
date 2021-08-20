import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Card,
  Row,
  Col,
  Form,
  Input,
  Select,
  message,
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

//查询项参数
interface SearchFormData {
  ppn?: string;
  type?: string;
}

//table数据属性
export interface ListItem {
  key?: React.Key;
  ppn: string;
  type: string;
}

//modal中表单的属性
interface FormData {
  ppn: string;
  type: string;
}

//初始modal数据
const modalInitData: FormData = {
  ppn: "",
  type: "",
};

//模拟数据
const mockData = [
  {
    ppn: "cx",
    type: "维修项",
  },
];

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
}

const BaseTable: React.FC = () => {
  const [data, setData] = useState<ListItem[]>(mockData);
  const [total, setTotal] = useState(0);
  const [pager, setPager] = useState<Pager>({ pageIndex: 1, pageSize: 20 });
  const [formData, setFormData] = useState<SearchFormData>({}); //查询项数据
  const [createVisible, setCreateVisible] = useState(false); //展示modal框
  const [modelInitData, setModelInitData] = useState<FormData>(modalInitData); //modal框表单初始数据
  const [flag, setFlag] = useState(""); //modal的标识，目前是新增或者编辑

  const [form] = Form.useForm();

  //查询获取列表数据
  const searchListData = () => {
    let searchParams = {
      ...pager,
      pageIndex: pager.pageIndex - 1,
      ...formData,
    };
    //获取搜索数据
    // Apis.searchData(searchParams).then((res: any) => { 
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

  //新增或者修改数据处理
  const updateOrAdd = (formData: FormData) => {
    searchListData();
    setCreateVisible(false);
    setModelInitData(modalInitData);
    // const ApiFunc = {
    //   编辑: Apis.appMarketAdd
    //   新增: Apis.appMarketUpdate
    // };
    // ApiFunc[flag]({ ...formData, id: modelInitData?.id }).then((v) => {
    //   flag && message.success(flag === "编辑" ? "修改成功" : "新增成功");
    //   searchListData();
    //   setCreateVisible(false);
    //   setModelInitData(modalInitData);
    // });
  };

  useEffect(() => {
    searchListData();
  }, [pager]);

  const columns: ColumnProps<ListItem>[] = [
    {
      title: "属性名称",
      dataIndex: "ppn",
      align: "center",
    },
    {
      title: "属性分类",
      dataIndex: "type",
      align: "center",
    },
    {
      title: "操作",
      dataIndex: "operation",
      align: "center",
      render: (text: string, record: ListItem) => {
        return (
          <span>
            <Button
              type="link"
              onClick={() => {
                setCreateVisible(true);
                setModelInitData(record);
                setFlag("编辑");
              }}
            >
              编辑
            </Button>
          </span>
        );
      },
    },
  ];

  return (
    <>
      <Card style={{marginBottom:20}}>
        <Form
          className="serchBar"
          form={form}
          {...formItemLayout}
          onFinish={submit}
        >
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
      </Card>
      <Card>
        <Row style={{ marginBottom: 10 }}>
          <Col>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setCreateVisible(true);
                setFlag("新增");
              }}
            >
              新增
            </Button>
          </Col>
        </Row>
        <Table
          rowKey={() => Math.random().toString()}
          bordered
          columns={columns}
          dataSource={data}
          scroll={{ x: 1000 }}
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
      <ModalForm
        title={flag || ""}
        onConfirm={(formData) => updateOrAdd(formData)}
        visible={createVisible}
        initData={modelInitData}
        onCancel={() => {
          setCreateVisible(false);
          setModelInitData(modalInitData);
        }}
      />
    </>
  );
};

export default BaseTable;
