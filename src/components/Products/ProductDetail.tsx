import { Card, Descriptions, Image, Rate, Space, Tag, Typography, Row, Col, Button } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import { useGetProductQuery } from '../../Redux/features/products/api/productApi';

const { Title, Text } = Typography;

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, isLoading } = useGetProductQuery(Number(id));

  if (isLoading) {
    return <Card loading={true} />;
  }

  if (!product) {
    return <Card><Text type="danger">Product not found</Text></Card>;
  }

  return (
    <Card
      style={{
        background: 'linear-gradient(to bottom, #ffffff, #f0f2f5)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
      }}
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Button 
          icon={<LeftOutlined />} 
          onClick={() => navigate(-1)}
          style={{
            background: '#1890ff',
            color: 'white'
          }}
          ghost
        >
          Back to Products
        </Button>

        <Row gutter={[24, 24]}>
          <Col xs={24} sm={24} md={8} lg={8}>
            <Card
              style={{
                background: '#fafafa',
                borderRadius: '12px',
                overflow: 'hidden'
              }}
            >
              <Image
                src={product.thumbnail}
                alt={product.title}
                style={{ 
                  width: '100%', 
                  borderRadius: '8px', 
                  maxHeight: '400px', 
                  objectFit: 'cover',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
              />
              <Space direction="vertical" style={{ marginTop: 16, width: '100%' }}>
                <Rate disabled defaultValue={product.rating} allowHalf />
                <Space wrap>
                  <Text type="secondary">Stock: {product.stock}</Text>
                  {product.stock <= 10 && (
                    <Tag color="red">Low Stock</Tag>
                  )}
                </Space>
              </Space>
            </Card>
          </Col>
          
          <Col xs={24} sm={24} md={16} lg={16}>
            <Title level={2} style={{ 
              fontSize: '1.8rem', 
              marginBottom: '1rem',
              color: '#1890ff'
            }}>
              {product.title}
            </Title>
            <Descriptions 
              column={{ xs: 1, sm: 1, md: 1, lg: 1 }}
              labelStyle={{ 
                padding: '12px 0',
                color: '#666',
                fontWeight: 600,
                borderBottom: '1px solid #f0f0f0'
              }}
              contentStyle={{ 
                padding: '12px 0',
                color: '#333',
                borderBottom: '1px solid #f0f0f0'
              }}
              bordered={false}
              style={{
                background: '#fff',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}
            >
              <Descriptions.Item label="Brand">{product.brand}</Descriptions.Item>
              <Descriptions.Item label="Category">
                <Tag color="blue">{product.category}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Price">
                <Text strong>${product.price}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="SKU">{product.sku}</Descriptions.Item>
              <Descriptions.Item label="Description">
                {product.description}
              </Descriptions.Item>
              <Descriptions.Item label="Tags">
                <Space size={[0, 8]} wrap>
                  {product.tags.map(tag => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </Space>
              </Descriptions.Item>
              
              {/* New description items */}
              <Descriptions.Item label="Discount">
                <Tag color="green">{product.discountPercentage}% OFF</Tag>
              </Descriptions.Item>
              
              <Descriptions.Item label="Shipping Info">
                <Text>{product.shippingInformation}</Text>
              </Descriptions.Item>
              
              <Descriptions.Item label="Warranty">
                <Text>{product.warrantyInformation}</Text>
              </Descriptions.Item>

              <Descriptions.Item label="Dimensions">
                <Space>
                  <Text>W: {product.dimensions.width}cm</Text>
                  <Text>H: {product.dimensions.height}cm</Text>
                  <Text>D: {product.dimensions.depth}cm</Text>
                </Space>
              </Descriptions.Item>

              <Descriptions.Item label="Return Policy">
                <Text>{product.returnPolicy}</Text>
              </Descriptions.Item>
            </Descriptions>

            {/* Add Reviews Section */}
            <div style={{ marginTop: 24 }}>
              <Title level={4} style={{ color: '#1890ff' }}>
                Customer Reviews
              </Title>
              <Space direction="vertical" style={{ width: '100%' }}>
                {product.reviews.map((review, index) => (
                  <Card 
                    key={index} 
                    style={{ 
                      marginTop: 16, 
                      width: '100%',
                      background: index % 2 === 0 ? '#f6f8fa' : '#fff',
                      borderLeft: '4px solid #1890ff'
                    }} 
                    size="small"
                  >
                    <Space direction="vertical" style={{ width: '100%' }}>
                      <Space wrap>
                        <Rate disabled defaultValue={review.rating} />
                        <Text strong>{review.reviewerName}</Text>
                      </Space>
                      <Text>{review.comment}</Text>
                      <Text type="secondary">
                        {new Date(review.date).toLocaleDateString()}
                      </Text>
                    </Space>
                  </Card>
                ))}
              </Space>
            </div>
          </Col>
        </Row>
      </Space>
    </Card>
  );
};

export default ProductDetail;