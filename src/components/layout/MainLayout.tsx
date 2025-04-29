import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Content style={{ padding: '24px' }}>
        <Outlet />
      </Layout.Content>
    </Layout>
  );
};

export default MainLayout;