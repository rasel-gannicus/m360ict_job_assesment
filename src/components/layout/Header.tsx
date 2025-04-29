import { BellOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Input, Layout, Menu, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Header: AntHeader } = Layout;
const { Search } = Input;

const Header = () => {
  const navigate = useNavigate();

  const menuItems = [
    { key: 'products', label: 'Products' },
    { key: 'categories', label: 'Categories' },
    { key: 'orders', label: 'Orders' },
    { key: 'customers', label: 'Customers' },
  ];

  return (
    <AntHeader 
      style={{ 
        background: '#fff', 
        padding: '0 24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      }}
    >
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img 
            src="https://m360ict.com/assets/imgs/logo/site-logo-white-2.png"
            alt="M360 ICT"
            style={{ 
              height: '40px',
              marginRight: 48,
              cursor: 'pointer',
              filter: 'brightness(0) saturate(100%) invert(48%) sepia(57%) saturate(2849%) hue-rotate(195deg) brightness(103%) contrast(101%)'
            }}
            onClick={() => navigate('/')}
          />
          <Menu
            mode="horizontal"
            items={menuItems}
            style={{ border: 'none' }}
            onClick={({ key }) => navigate(`/${key}`)}
          />
        </div>

        <Space 
          size="large" 
          style={{ 
            height: '64px', 
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Search
              placeholder="Search..."
              style={{ 
                width: 250,
                margin: '0',
                transform: 'translateY(0)'  
              }}
              onSearch={(value) => console.log(value)}
            />
          </div>
          <Space>
            <Button 
              type="text" 
              icon={<BellOutlined />} 
              style={{
                backgroundColor: '#f0f5ff',
                color: '#1890ff'
              }}
            />
            <Avatar icon={<UserOutlined />} />
          </Space>
        </Space>
      </div>
    </AntHeader>
  );
};

export default Header;