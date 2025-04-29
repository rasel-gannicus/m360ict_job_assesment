import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const MainLayout = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />
      <Layout.Content style={{ 
        padding: '24px',
        maxWidth: '1200px',
        width: '100%',
        margin: '0 auto',
      }}>
        <Outlet />
      </Layout.Content>
    </Layout>
  );
};

export default MainLayout;