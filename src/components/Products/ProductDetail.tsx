import { Card } from 'antd';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();

  return (
    <Card title="Product Detail">
      <p>Product Detail Component - ID: {id}</p>
    </Card>
  );
};

export default ProductDetail;