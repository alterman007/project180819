import React from 'react';
import { Link } from 'react-router-dom';

const Links = () => (
  <div className="links-container">
    <Link to="/">首页</Link>
    <Link to="/count">计数器</Link>
    <Link to="/hello">授权访问</Link>
  </div>
);

export default Links;
