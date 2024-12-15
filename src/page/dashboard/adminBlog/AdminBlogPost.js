import axios from 'axios';
import React, { useMemo, useState } from 'react';
import { useGlobalSkills } from '../../../context/skillContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Quill styles

const AdminBlogPost = () => {
  const { updatedArray, blogPosts } = useGlobalSkills();
  
  const headers = useMemo(
    () => ({
      Authorization: `${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    }),
    []
  );

  const [loader, setLoader] = useState(false);
  const [title, setTitle] = useState('');
  const [entries, setEntries] = useState([{ imageUrl: '', description: '' }]);
  const [addNewBlog, setAddNewBlog] = useState(false);
  const [postId, setPostId] = useState('');

  // Upload image to backend and get URL
  const uploadImage = async (file, index) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}api/blog/file`,
        formData,
        
      );

      const newEntries = [...entries];
      newEntries[index].imageUrl = response.data.imageUrl; // Set the returned image URL
      setEntries(newEntries);
    } catch (error) {
      console.error('Image upload failed:', error);
      alert('Failed to upload image. Please try again.');
    }
  };

  // Handle image selection and upload
  const handleImageChange = (index, e) => {
    const file = e.target.files[0];
    if (file && file.size <= 100 * 1024) { // Limit size to 100 KB
      uploadImage(file, index); // Call upload API
    } else {
      alert('Image size should be less than or equal to 100 KB');
    }
  };

  // Delete image from backend
  const deleteImage = async (imageUrl, index) => {
    try {
        const response = await axios.delete(
            `${process.env.REACT_APP_API_URL}api/blog/file`,
            { params: { imageUrl } }
        );

        if (response.data.message) {
           
           

            // Remove the image from entries
            const newEntries = [...entries];
            newEntries[index].imageUrl = '';  // Clear the image URL
            setEntries(newEntries);
        }
    } catch (error) {
        console.error('Failed to delete image:', error);
        alert('Failed to delete image. Please try again.');
    }
};

  const handleAddEntry = () => {
    setEntries([...entries, { imageUrl: '', description: '' }]);
  };

  const handleRemoveEntry = (index) => {
    const newEntries = entries.filter((_, i) => i !== index);
    setEntries(newEntries);
  };

  const handleCreatePost = async () => {
    setLoader(true);
    const content = entries.map(({ imageUrl, description }) => ({ imageUrl, description }));

    try {
      const url = postId
        ? `${process.env.REACT_APP_API_URL}api/blog/${postId}`
        : `${process.env.REACT_APP_API_URL}api/blog`;

      const method = postId ? 'put' : 'post';
      const response = await axios[method](url, { title, content }, { headers });
        
      if (response.status === 200 || response.status === 201) {
        const updatedBlogPosts = postId
          ? [response.data, ...blogPosts.filter((post) => post._id !== postId)]
          : [response.data, ...blogPosts];

        setLoader(false);
        resetForm();
        updatedArray('BLOG_POST', updatedBlogPosts);
      }
    } catch (error) {
      setLoader(false);
      console.error('Error creating/updating post:', error);
    }
  };

  const resetForm = () => {
    setEntries([{ imageUrl: '', description: '' }]);
    setPostId('');
    setAddNewBlog(false);
    setTitle('');
  };

  const handleEdit = (post) => {
    setAddNewBlog(true);
    setPostId(post._id);
    setTitle(post.title);

    const content = post.content.map((item) => ({
      imageUrl: item.imageUrl,
      description: item.description,
    }));
    setEntries(content);
  };

  const handleDelete = async (id) => {
    setLoader(true);
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}api/blog/${id}`, { headers });
      updatedArray('BLOG_POST', blogPosts.filter((post) => post._id !== id));
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.error('Error deleting post:', error);
    }
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
      [{ align: [] }],
      ['clean'],
    ],
  };

  const quillFormats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'link', 'align'
  ];

  return (
    <div className="pt-4 h-[100vh] overflow-auto px-28 bg-gray-100 rounded-lg  ">
      {addNewBlog ? (
        <div className="flex flex-col items-center h-screen">
          <button className="self-end border px-3 py-1 rounded" onClick={resetForm}>
            Close
          </button>
          <h2 className="text-2xl font-semibold">
            {postId ? 'Edit Blog Post' : 'Create New Blog Post'}
          </h2>

          <input
            type="text"
            placeholder="Enter Title"
            className="px-5 py-2 w-full rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {entries.map((entry, index) => (
            <div key={index} className="relative flex flex-col border pb-16 bg-white gap-4 mb-4 p-4 rounded-lg">
              <button
                className="absolute top-0 right-0 bg-red-500 px-2"
                onClick={() => handleRemoveEntry(index)}
              >
                ✕
              </button>

              <div className="flex flex-col gap-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(index, e)}
                />
                {entry.imageUrl && (
                  <div className="relative">
                    <img
                      src={entry.imageUrl}
                      alt="Blog"
                      className="w-48 h-32 object-cover rounded"
                    />
                   <button
                    className="delete-btn"
                    onClick={() => deleteImage(entry.imageUrl, index)}
                >
                    ❌
                </button>
                  </div>
                )}
              </div>

              <ReactQuill
                theme="snow"
                value={entry.description}
                onChange={(value) => {
                  const newEntries = [...entries];
                  newEntries[index].description = value;
                  setEntries(newEntries);
                }}
                modules={quillModules}
                formats={quillFormats}
              />
            </div>
          ))}

          <button onClick={handleAddEntry} className="bg-green-500 text-white px-4 py-2 rounded">
            Add Another Entry
          </button>

          <button onClick={handleCreatePost} className="bg-purple-700 text-white px-4 py-2 rounded">
            {postId ? 'Save Post' : 'Create Post'}
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <button onClick={() => setAddNewBlog(true)} className="bg-red-300 border-red-600 px-3 py-1 rounded">
            Add New Blog
          </button>

          {blogPosts && blogPosts.blogs.map((post) => (
            <div key={post._id} className="border p-4 rounded mb-4 ">
              <div className="flex justify-between">
                <div>
                  {post.content.map((entry, idx) => (
                    <div key={idx} className='flex gap-5'>
                      <div className='w-[250px] h-[200px]'>

                      {entry.imageUrl && <img className='w-full rounded h-full object-cover' src={entry.imageUrl} alt={`Blog ${idx}`} />}
                      </div>
                      {/* <div dangerouslySetInnerHTML={{ __html: entry.description }} /> */}
                      <p className='tetx-2xl'> {post.title}  </p>
                    </div>
                  ))}
                </div>

                <div>
                  <button onClick={() => handleEdit(post)} className="text-green-500 text-2xl font-semibold text-shadow-sm border px-2 rounded mr-2">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(post._id)} className="text-red-500 border px-2 rounded font-semibold text-shadow-sm">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminBlogPost;
