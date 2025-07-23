import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

// const defaultBlogs = [
//   {
//     id: 1,
//     title: "123456789 123456789 123456789 123456789 123456789",
//     date: "June 12, 2025",
//     image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
//     description: "Learn about the birth flowers for June and their meanings."
//   },
//   {
//     id: 2,
//     title: "Gardenia Plant Care Guide",
//     date: "May 25, 2025",
//     image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=400&q=80",
//     description: "Tips and tricks for keeping your gardenias healthy and blooming."
//   },
//   {
//     id: 3,
//     title: "Gardenia Plant Care Guide",
//     date: "May 25, 2025",
//     image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=400&q=80",
//     description: "Tips and tricks for keeping your gardenias healthy and blooming."
//   }, 
//   {
//     id: 4,
//     title: "How to Arrange Flowers Like a Pro",
//     date: "April 10, 2025",
//     image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
//     description: "Step-by-step guide to creating beautiful flower arrangements at home."
//   },
//   {
//     id: 5,
//     title: "The Meaning Behind Popular Flowers",
//     date: "March 18, 2025",
//     image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=400&q=80",
//     description: "Discover the symbolism and stories behind your favorite flowers."
//   }
// ];

const BLOGS_PER_ROW = 3

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
        if (blogs.length <= BLOGS_PER_ROW) {
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
    setStartIdx((prev) => (prev - 1 + blogs.length) % blogs.length);
    };
  return (
    <div className="bg-gray-100 py-10 mt-12">
      <h1 className="text-3xl font-bold text-center mb-8">Blogging</h1>
      <div className="flex flex-wrap justify-center gap-8 items-center">
        {/* Left arrow */}
        <button 
          className="p-2 rounded-full bg-white shadow" 
          onClick={handlePrev}
          disabled={blogs.length <= BLOGS_PER_ROW}  
        >
          <span className="text-2xl">{'<'}</span>
        </button>
        {getVisibleBlogs().map(blog => (
          blog && (
            <div key={blog.id} className="bg-white rounded-xl shadow-lg p-6 w-[300px] md:w-[350px]">
            <img src={blog.image} alt={blog.title} className="w-full h-64 object-cover rounded-lg" />
            <h2 className="h-[50px] mt-6 text-2xl font-bold text-green-700">
              {truncateTitle(blog.title)}
            </h2>
            <p className="text-gray-600 mt-4 text-lg">{blog.date}</p>
            <button 
              className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold text-lg"
              onClick={() => navigate(`/blog/${slugify(blog.title)}`)}
            >
              VIEW POST
            </button>
          </div>
          )
        ))}
        {/* Right arrow */}
        <button
          className="p-2 rounded-full bg-white shadow flex items-center justify-center h-10 w-10 ml-2"
          onClick={handleNext}
          disabled={blogs.length <= BLOGS_PER_ROW}  
        >
          <span className="text-2xl">{'>'}</span>
        </button>
      </div>
    </div>
  )
}

export default Dashboard_Blog