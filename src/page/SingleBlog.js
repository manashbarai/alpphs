// SingleBlog.jsx
import './Blog.css';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { handleCopyLink, handleShareFacebook, handleShareWhatsApp } from '../util/blogPost';
import { useGlobalSkills } from '../context/skillContext';
import Footer from '../components/Footer';
import parse from 'html-react-parser';
import ReactQuill from 'react-quill';
import { FaFacebookSquare, FaWhatsappSquare, FaCopy } from 'react-icons/fa';
import Navbar from '../components/Navbar';

const SingleBlog = () => {
    const { blogPosts } = useGlobalSkills();
    const navigate = useNavigate();
    const { id } = useParams();
    const [post, setPost] = useState(null);

    const formatDateAndTime = (createdAt) => {
        const date = new Date(createdAt);
        const options = { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'Asia/Kolkata' };
        const formattedDate = date.toLocaleDateString('en-IN', options);
        const parts = formattedDate.split(' ');
        const rearrangedDate = `${parts[1]} ${parts[0]}, ${parts[2]}`;
        return rearrangedDate;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}api/blog/${id}`);
                setPost(response.data);
            } catch (error) {
                console.error('Error fetching blog post:', error);
            }
        };

        fetchData();
    }, [id]);

    return (
        <>
        <Navbar/>
            <div className="px-4 md:px-10 lg:px-52 py-5">
                <div className="container mx-auto flex flex-col md:flex-row gap-10">
                    <div className="md:w-2/3">
                        <div className="single-blog-pos py-5">
                            <h1 className="text-2xl md:text-3xl font-bold">{post && post.title}</h1>
                            <div className="mb-5 mt-2">
                                {post && post.content.map((p, i) => (
                                    <div key={i} className="mb-8">
                                        <div className="flex justify-center">
                                            {p.imageUrl && (
                                                <img className="w-full md:w-1/2 h-auto" src={p.imageUrl} alt="" />
                                            )}
                                        </div>
                                        <div className="mt-3">
                                            <ReactQuill
                                                theme="snow"
                                                value={p.description}
                                                readOnly={true}
                                                modules={{ toolbar: false }}
                                                style={{ border: 'none', outline: 'none' }}
                                            />
                                        </div>
                                        {post.updatedAt && (
                                            <p className="text-gray-500 text-sm mt-2">
                                                <span>Last Modified:</span> {new Date(post.updatedAt).toLocaleDateString('en-IN')}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {post && (
                                <div className="flex gap-4 items-center mt-5">
                                    <button
                                        className="border text-2xl px-2 py-1 bg-transparent"
                                        onClick={() =>
                                            handleShareFacebook(`${process.env.REACT_APP_API2}singleBlogPost/${post._id}`)
                                        }
                                    >
                                        <FaFacebookSquare color="blue" />
                                    </button>
                                    <button
                                        className="border text-2xl px-2 py-1 bg-transparent"
                                        onClick={() =>
                                            handleShareWhatsApp(`${process.env.REACT_APP_API2}singleBlogPost/${post._id}`)
                                        }
                                    >
                                        <FaWhatsappSquare color="green" />
                                    </button>
                                    <button
                                        className="border text-2xl px-2 py-1 bg-transparent"
                                        onClick={() =>
                                            handleCopyLink(`${process.env.REACT_APP_API2}singleBlogPost/${post._id}`)
                                        }
                                    >
                                        <FaCopy />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Recent Posts Section */}
                    <div className="sticky top-20 md:w-1/3 mt-5 md:mt-0">
                        <h4 className="bg-dark text-3xl font-semibold border-b pb-2">Recent Posts</h4>
                        <div className="flex flex-col gap-5 mt-5">
                            {blogPosts?.blogs?.slice(0, 4).map((e, i) => (
                                <div
                                    key={e._id + i}
                                    className="bg-red-100 border rounded p-3 cursor-pointer"
                                    onClick={() => navigate(`/blog/${e._id}`)}
                                >
                                    <h6 className="font-bold border-b">{e.title}</h6>
                                    <div className="flex justify-between items-end mt-2">
                                        <div>
                                            <p className="text-gray-500 text-xs">
                                                <span className="mr-1">Posted On:</span>
                                                {e.createdAt && formatDateAndTime(e.createdAt)}
                                            </p>
                                            <p className="text-gray-500 text-xs">
                                                <span className="mr-1">Last Modified:</span>
                                                {e.updatedAt && formatDateAndTime(e.updatedAt)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default SingleBlog;