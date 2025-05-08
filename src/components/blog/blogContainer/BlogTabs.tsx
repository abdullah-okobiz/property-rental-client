"use client";

import Tabs from './Tabs';
import BlogList from './BlogList';
import { useState } from 'react';

const BlogTabs = ({ blogs, features }: any) => {
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', ...features.map((f: any) => f.featureName)];

  const filteredBlogs =
    activeTab === 'All'
      ? blogs
      : blogs.filter((blog: any) => blog.feature?.featureName === activeTab);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      <BlogList blogs={filteredBlogs} />
    </div>
  );
};

export default BlogTabs;
