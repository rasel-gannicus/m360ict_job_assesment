import { Form, Input, InputNumber, Select, Button, Card, Space, message, Rate } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProductQuery, useUpdateProductMutation } from '../../Redux/features/products/api/productApi';
import type { Product } from '../../Redux/features/products/types/product.types';



const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, isLoading } = useGetProductQuery(Number(id));
  const [updateProduct, { data }] = useUpdateProductMutation();
  console.log(data);
  
  const onFinish = async (values: Partial<Product>) => {
    try {
      await updateProduct({ id: Number(id), ...values }).unwrap();
      message.success('Product updated successfully');
      navigate(-1);
    } catch (error: unknown) {
      console.error('Update failed:', error);
      message.error('Failed to update product');
    }
  };

  if (isLoading) return <Card loading={true} />;

  return (
    <Card title="Edit Product">
      <Form
        layout="vertical"
        initialValues={product}
        onFinish={onFinish}
      >
        <Form.Item label="Title" name="title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Description" name="description" rules={[{ required: true }]}>
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item label="Price" name="price" rules={[{ required: true }]}>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label="Stock" name="stock" rules={[{ required: true }]}>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label="Category" name="category" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="smartphones">Smartphones</Select.Option>
            <Select.Option value="laptops">Laptops</Select.Option>
            {/* Add more categories */}
          </Select>
        </Form.Item>

        <Form.List name="reviews">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Card 
                  key={key} 
                  size="small" 
                  style={{ marginBottom: 16 }}
                  extra={
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  }
                >
                  <Form.Item
                    {...restField}
                    name={[name, 'rating']}
                    label="Rating"
                    rules={[{ required: true, message: 'Rating is required' }]}
                  >
                    <Rate />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, 'reviewerName']}
                    label="Reviewer Name"
                    rules={[{ required: true, message: 'Name is required' }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, 'comment']}
                    label="Comment"
                    rules={[{ required: true, message: 'Comment is required' }]}
                  >
                    <Input.TextArea rows={2} />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, 'date']}
                    label="Date"
                    rules={[{ required: true, message: 'Date is required' }]}
                    initialValue={new Date().toISOString()}
                  >
                    <Input disabled />
                  </Form.Item>
                </Card>
              ))}

              <Form.Item>
                <Button 
                  type="dashed" 
                  onClick={() => add()} 
                  block 
                  icon={<PlusOutlined />}
                >
                  Add Review
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Space>
          <Button type="primary" htmlType="submit">
            Update Product
          </Button>
          <Button onClick={() => navigate(-1)}>
            Cancel
          </Button>
        </Space>
      </Form>
    </Card>
  );
};

export default ProductEdit;