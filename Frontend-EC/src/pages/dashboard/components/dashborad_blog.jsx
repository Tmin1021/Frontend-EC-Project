import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const BLOGS_PER_ROW = 4

const Dashboard_Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [startIdx, setStartIdx] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
      fetch('/assets/blog.json')
        .then(res => res.json())
        .then(data => setBlogs(data))
        .catch(err => console.error('Failed to load blogs:', err));
    }, []);

    //console.log(blogs);

    const getVisibleBlogs = () => {
        if (!blogs.length) return [];
        if (blogs.length <= BLOGS_PER_ROW) { // In the case blog have < blog per row
          return blogs;
        }
        let visible = [];
        for (let i = 0; i < BLOGS_PER_ROW; i++) {
            visible.push(blogs[(startIdx + i) % blogs.length]);
        }
        return visible;
    };

    const slugify = (title) => {
      return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    };

    const truncateTitle = (title) => {
      return title.length > 40 ? title.slice(0, 37) + '...' : title;
    };

    const handleNext = () => {
        setStartIdx((prev) => (prev + 1) % blogs.length);
    };

    const handlePrev = () => {
    setStartIdx((prev) => (prev - 1 + blogs.length) % blogs.length); // make sure non negative
    };
  return (
    <div className="bg-gray-50 w-full flex flex-col gap-4 pt-4 px-4 md:px-8 lg:px-16 md:pt-10 pb-4">
      <p className='font-semibold text-xl md:text-2xl lg:text-4xl text-green-700'>Blogging</p>

      {/* List Blog */}
      <div className="flex w-full overflow-auto no-scrollbar justify-between gap-4 lg:gap-8 pl-2 items-center transition-all">
        {getVisibleBlogs().map(blog => (
          blog && (
            <div key={blog.id} className="relative flex-none mb-4 w-[320px] h-[440px] md:w-[360px] md:h-[520px] shadow-gray-500 overflow-hidden rounded-3xl shadow-md hover:shadow-lg transition-all">
              <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />

              <div className='absolute top-5 left-5'>
                <p className="text-lg text-gray-100 font-semibold">{blog.date}</p>
                <p className="text-4xl text-white font-semibold">{truncateTitle(blog.title)}</p>
              </div>

              <div className="absolute bottom-5 right-5 p-2 rounded-full bg-white/60 backdrop-blur-lg hover:bg-white/90 transition-all"
                   onClick={() => navigate(`/blog/${slugify(blog.title)}`)}>
                <Plus className='w-7 h-7 text-gray-700'/>
              </div>
          </div>
          )
        ))}
      </div>

      {/* Arrows */}
      <div className='w-full flex justify-end gap-4'>
        <div className={`{${blogs.length <= BLOGS_PER_ROW ? 'pointer-events-none' : ''} rounded-full bg-gray-200 shadow-gray-400 shadow-sm hover:shadow-md transition-all`} onClick={handlePrev}>
          <ChevronLeft className='w-10 h-10 text-gray-700'/>
        </div>

        <div className={`{${blogs.length <= BLOGS_PER_ROW ? 'pointer-events-none' : ''} rounded-full bg-gray-200 shadow-gray-400 shadow-sm hover:shadow-md transition-all`} onClick={handleNext}>
          <ChevronRight className='w-10 h-10 text-gray-700'/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard_Blog