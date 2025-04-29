import { Table, Button, Card, Space, Image, Tag, Rate, Typography } from 'antd';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetProductsQuery } from '../../Redux/features/products/api/productApi';
import type { Product } from '../../Redux/features/products/types/product.types';
import { generatePath } from '../../routes/routes';

const { Text } = Typography;

const ProductList: FC = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetProductsQuery({ limit: 10, skip: 0 });

  const columns = [
    {
      title: 'Image',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      width: 80,
      render: (thumbnail: string) => (
        <Image src={thumbnail} alt="product" width={50} height={50} />
      ),
    },
    {
      title: 'Product Info',
      dataIndex: 'title',
      key: 'title',
      render: (_: string, record: Product) => (
        <Space direction="vertical" size="small">
          <Text strong>{record.title}</Text>
          <Text type="secondary">SKU: {record.sku}</Text>
          <Space size={[0, 8]}>
            {record.tags.map(tag => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </Space>
        </Space>
      ),
    },
    {
      title: 'Brand & Category',
      dataIndex: 'brand',
      key: 'brand',
      render: (_: string, record: Product) => (
        <Space direction="vertical">
          <Text>{record.brand}</Text>
          <Tag color="blue">{record.category}</Tag>
        </Space>
      ),
    },
    {
      title: 'Price & Stock',
      key: 'price',
      render: (_: string, record: Product) => (
        <Space direction="vertical">
          <Text strong>${record.price}</Text>
          <Text type="secondary">
            Stock: {record.stock}
            {record.stock <= 10 && (
              <Tag color="red" style={{ marginLeft: 8 }}>
                Low Stock
              </Tag>
            )}
          </Text>
        </Space>
      ),
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating: number) => (
        <Rate disabled defaultValue={rating} allowHalf />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 150,
      render: (_: undefined, record: Product) => (
        <Space>
          <Button
            type="primary"
            onClick={() => navigate(generatePath.productDetail(record.id))}
          >
            View
          </Button>
          <Button
            onClick={() => navigate(generatePath.productEdit(record.id))}
          >
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Card>
      <Typography.Title level={3}>Products</Typography.Title>
      <Table
        columns={columns}
        dataSource={data?.products}
        loading={isLoading}
        rowKey="id"
        pagination={{
          total: data?.total,
          pageSize: 10,
          onChange: (page) => {
          },
        }}
      />
    </Card>
  );
};

export default ProductList;