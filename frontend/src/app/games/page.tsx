"use client";

import { useState, useEffect } from "react";
import {
  Card,
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  InputNumber,
  message,
  Popconfirm,
  Tag,
  Statistic,
  Row,
  Col,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import {
  getGameList,
  createGame,
  updateGame,
  deleteGame,
  getGameStats,
  type Game,
  type GameStats,
} from "@/services/game";

export default function GamesPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [stats, setStats] = useState<GameStats | null>(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingGame, setEditingGame] = useState<Game | null>(null);
  const [form] = Form.useForm();

  // 加载游戏列表
  const loadGames = async () => {
    setLoading(true);
    try {
      const data = await getGameList({
        page,
        page_size: pageSize,
        search: search || undefined,
      });
      setGames(data.list);
      setTotal(data.total);
    } catch (error) {
      message.error("加载游戏列表失败");
    } finally {
      setLoading(false);
    }
  };

  // 加载统计信息
  const loadStats = async () => {
    try {
      const data = await getGameStats();
      setStats(data);
    } catch (error) {
      console.error("加载统计信息失败", error);
    }
  };

  useEffect(() => {
    loadGames();
  }, [page, pageSize]);

  useEffect(() => {
    loadStats();
  }, []);

  // 打开新增/编辑对话框
  const openModal = (game?: Game) => {
    setEditingGame(game || null);
    if (game) {
      form.setFieldsValue(game);
    } else {
      form.resetFields();
    }
    setModalVisible(true);
  };

  // 提交表单
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (editingGame) {
        await updateGame(editingGame.id, values);
        message.success("更新成功");
      } else {
        await createGame(values);
        message.success("创建成功");
      }

      setModalVisible(false);
      loadGames();
      loadStats();
    } catch (error) {
      console.error("提交失败", error);
    }
  };

  // 删除游戏
  const handleDelete = async (id: number) => {
    try {
      await deleteGame(id);
      message.success("删除成功");
      loadGames();
      loadStats();
    } catch (error) {
      message.error("删除失败");
    }
  };

  // 搜索
  const handleSearch = () => {
    setPage(1);
    loadGames();
  };

  const columns: ColumnsType<Game> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "游戏名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "作者",
      dataIndex: "author",
      key: "author",
      render: (author) => <Tag color="blue">{author}</Tag>,
    },
    {
      title: "价格",
      dataIndex: "price",
      key: "price",
      render: (price) => `¥${price}`,
    },
    {
      title: "发布时间",
      dataIndex: "pub_time",
      key: "pub_time",
    },
    {
      title: "操作",
      key: "action",
      width: 180,
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => openModal(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这个游戏吗？"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1 style={{ marginBottom: 24 }}>游戏管理</h1>

        {stats && (
          <Row gutter={16} style={{ marginBottom: 24 }}>
            <Col span={12}>
              <Card>
                <Statistic
                  title="游戏总数"
                  value={stats.total_games}
                  suffix="个"
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card>
                <Statistic
                  title="作者总数"
                  value={stats.total_authors}
                  suffix="位"
                />
              </Card>
            </Col>
          </Row>
        )}

        <Card>
          <Space style={{ marginBottom: 16 }}>
            <Input.Search
              placeholder="搜索游戏名称或作者"
              allowClear
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onSearch={handleSearch}
              style={{ width: 300 }}
              enterButton={<SearchOutlined />}
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => openModal()}
            >
              新增游戏
            </Button>
            <Button icon={<ReloadOutlined />} onClick={loadGames}>
              刷新
            </Button>
          </Space>

          <Table
            columns={columns}
            dataSource={games}
            rowKey="id"
            loading={loading}
            pagination={{
              current: page,
              pageSize: pageSize,
              total: total,
              showSizeChanger: true,
              showTotal: (total) => `共 ${total} 条`,
              onChange: (page, pageSize) => {
                setPage(page);
                setPageSize(pageSize);
              },
            }}
          />
        </Card>

        <Modal
          title={editingGame ? "编辑游戏" : "新增游戏"}
          open={modalVisible}
          onOk={handleSubmit}
          onCancel={() => setModalVisible(false)}
          okText="确定"
          cancelText="取消"
        >
          <Form form={form} layout="vertical">
            <Form.Item
              label="游戏名称"
              name="name"
              rules={[{ required: true, message: "请输入游戏名称" }]}
            >
              <Input placeholder="请输入游戏名称" />
            </Form.Item>

            <Form.Item
              label="作者"
              name="author"
              rules={[{ required: true, message: "请输入作者" }]}
            >
              <Input placeholder="请输入作者" />
            </Form.Item>

            <Form.Item
              label="价格"
              name="price"
              rules={[
                { required: true, message: "请输入价格" },
                { type: "number", min: 0, max: 999.99, message: "价格范围 0-999.99" },
              ]}
            >
              <InputNumber
                style={{ width: "100%" }}
                placeholder="请输入价格"
                precision={2}
                min={0}
                max={999.99}
              />
            </Form.Item>
          </Form>
        </Modal>
    </div>
  );
}
