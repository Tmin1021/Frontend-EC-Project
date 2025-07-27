import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const slugify = (title) => {
    return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
};

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetch('/assets/blog.json')
      .then(res => res.json())
      .then(data => {
        const found = data.find(item => slugify(item.title) === slug);
        setBlog(found);
      });
  }, [slug]);

  if (!blog) {
    return <div className="text-center mt-20 text-xl">Blog not found.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      {/* Tags */}
      <div className="flex flex-wrap gap-4 mt-8 mb-4">
        {blog.tags && blog.tags.map(tag => (
          <span
            key={tag}
            className="uppercase tracking-wider text-green-700 font-semibold text-sm border-b-2 border-green-700 pb-1"
          >
            {tag}
          </span>
        ))}
      </div>
      {/* Title */}
      <h1 className="text-4xl font-bold mb-2 text-center">{blog.title}</h1>
      {/* Date */}
      <div className="italic text-gray-500 mb-6 text-center">{blog.date}</div>
      {/* Main Image */}
      <img
        src={blog.image}
        alt={blog.title}
        className="max-w-2xl w-full rounded-lg shadow-lg mb-6 object-cover"
      />
      {/* Blog Content Blocks */}
      <div className="w-full max-w-2xl flex flex-col gap-4">
        {blog.content && blog.content.map((block, idx) => (
          <div key={idx} className="">
            {block.type === "paragraph" && (
              <p className="text-lg text-gray-800">
                {block.content.split('\n').map((line, index) => (
                  <span key={index}>
                    {line}
                    {index < block.content.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </p>
            )}
            {block.type === "image" && (
              <div className="flex justify-center">
                <img
                  src={block.content}
                  alt={`Blog content ${idx}`}
                  className="max-h-96 p-4 object-contain"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogDetail;