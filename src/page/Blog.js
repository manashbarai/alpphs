import React from 'react';
import Navbar from '../components/Navbar';
import { useGlobalSkills } from '../context/skillContext';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';

const Blog = () => {
    const { blogPosts } = useGlobalSkills();

    const navigate = useNavigate();

    const blogs = blogPosts?.blogs || [];

    if (blogs.length === 0) return <p className="text-center mt-10">No blogs available.</p>;

    const [latestBlog, ...otherBlogs] = blogs;

    // Handle "Read More" button click
    const handleReadMore = (id) => {
        navigate(`/blog/${id}`);
    };

    return (
        <>
            <Navbar />
            <div className="px-5 md:px-28 lg:px-52 min-h-screen">
                {/* Latest Blog Section */}

                {/* Other Blog Posts */}
                <div className="container mx-auto mt-10">
                    <h2 className="text-center text-5xl text-shadow-sm  font-semibold my-5   border-gray-700">Our Blogs</h2>
                    <hr className='w-28 m-auto border-black mb-5'/>

                    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2   gap-10 ">
                        {blogPosts && blogPosts.blogs && blogPosts.blogs.map((post) => (
 
                           
                            <div className='hover:scale-110 transition-all duration-100  flex flex-col gap-2 shadow  shadow-[#6b3b3a] p-2 cursor-pointer rounded  key={post.id}' onClick={()=>navigate(`/blog/${post._id}`)} >
                                <div className='w-full h-[200px]'>

                                <img className='w-full h-full rounded shadow-md' src={post.content[0].imageUrl} alt="" />
                                </div>
                                <div className='py-1 px-2 rounded shadow-md'>

                               <h1 className='text-lg flex'>{post.title.slice(0,50)}</h1>
                                </div>


                                
                            </div>
                           
                            
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Blog;
