import { BellOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Input, Layout, Space } from 'antd';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../../Redux/features/products/productSlice';

const { Header: AntHeader } = Layout;
const { Search } = Input;

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (value: string) => {
    setSearchValue(value);
    dispatch(setSearchQuery(value));
  };

  return (
    <AntHeader 
      style={{ 
        background: '#fff', 
        padding: '0 16px',
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
        <img 
          src="https://m360ict.com/assets/imgs/logo/site-logo-white-2.png"
          alt="M360 ICT"
          style={{ 
            height: '40px',
            cursor: 'pointer',
            filter: 'brightness(0) saturate(100%) invert(48%) sepia(57%) saturate(2849%) hue-rotate(195deg) brightness(103%) contrast(101%)'
          }}
          onClick={() => navigate('/')}
        />

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
              placeholder="Search products..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onSearch={handleSearch}
              style={{ 
                width: '250px',
                margin: 0,
                transform: 'translateY(0)'
              }}
              className="header-search"
              allowClear
            />
          </div>
          <Space align="center">
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