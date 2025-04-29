import { Card } from 'antd';
import { useParams } from 'react-router-dom';

const ProductEdit = () => {
  const { id } = useParams();

  return (
    <Card title="Edit Product">
      <p>Product Edit Component - ID: {id}</p>
    </Card>
  );
};

export default ProductEdit;