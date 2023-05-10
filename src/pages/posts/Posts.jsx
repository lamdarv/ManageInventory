import axios from 'axios';
import Topbar from '../../components/topbar/Topbar';
import { Link, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Modal from '../../components/modal/Modal';
import Select from 'react-select';
import NewNavbar from '../../components/navbar/NewNavbar';
import Right from '../../components/right/Right';
import Bottom from '../../components/bottom/Bottom';
import Dropdown from 'react-dropdown';
import { FaAngleDown } from 'react-icons/fa';
import ModalUpdate from '../../components/modal/ModalUpdate';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [showModal, setShowModal] = useState(false)
    const handleOnClose = () => setShowModal(false)
    const [postId, setPostId] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showModalUpdate, setShowModalUpdate] = useState(false);


    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = async () => {
        const response = await axios.get("http://localhost:5000/api/post");
        setPosts(response.data);
    };
    
    const deletePost = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/post/${id}`);
            getPosts();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeletePost = async (id) => {
        try {
            await deletePost(id);
            setPostId(id);
            getPosts();
            setShowModal(true);
        } catch (error) {
            console.log(error);
        }
    }

    const handleModalUpdateClose = () => {
      setShowModalUpdate(false);
      document.body.classList.remove('overflow-hidden');
    }

    const handleModalUpdateOpen = (e) => {
      // setIsClickedCreate(true);
      const postId = e.target.dataset.id;
      setShowModalUpdate(true);
      document.body.classList.add('overflow-hidden');
    };



    const rows = [];
    for (let i = 0; i < posts.length; i += 2) {
        rows.push(posts.slice(i, i + 2));
    }

    const options = posts.map(post => ({
      label: post.list_peminjam.map(peminjam => <li key={peminjam}>{peminjam}</li>),
      value: post.list_peminjam.map(peminjam => <li key={peminjam}>{peminjam}</li>)
    }));

    return (
      <div className='relative bg-custom-green-4'>
        <div className='w-full' id='Top'>
          <Topbar />
        </div>
        <div className="flex min-h-screen">
        
        <NewNavbar/>
          <div className="md:container md:mx-auto">
            <div className="flex flex-wrap justify-center">
              {posts.map(post => (
                <div key={post._id} className="mr-6 ml-6 mt-10 p-6 bg-white rounded-lg shadow-md w-full md:w-3/4">
                    <table>
                    <tr>
                        <td className='font-quicksand font-normal text-lg pr-6'><strong>Nama Inventaris</strong></td>
                        <td className='font-quicksand font-normal text-lg pr-6'>{post.nama}</td>
                    </tr>
                    <tr>
                        <td className='font-quicksand font-normal text-lg pr-6'><strong>Deskripsi</strong></td>
                        <td className='font-quicksand font-normal text-lg pr-6'>{post.deskripsi}</td>
                    </tr>
                    <tr>
                        <td className='font-quicksand font-normal text-lg pr-6'><strong>Tanggal Kepemilikan</strong></td>
                        <td className='font-quicksand font-normal text-lg pr-6'>{new Date(post.tgl_kepemilikan).toLocaleDateString('id-ID')}</td>
                    </tr>
                    <tr>
                        <td className='font-quicksand font-normal text-lg pr-6'><strong>Status</strong></td>
                        <td className='font-quicksand font-normal text-lg pr-6'>{post.status}</td>
                    </tr>
                    <tr>
                    </tr>
                    <tr>
                        <td className='font-quicksand font-normal text-lg pr-6'><strong>List Peminjam</strong></td>
                        <td>
                        <ul className="font-quicksand font-normal text-lg pr-6">
                            {post.list_peminjam.map((peminjam) => (
                            <li key={peminjam}>{peminjam}</li>
                            ))}
                        </ul>
                        {/* <Dropdown
                          className='list-none font-quicksand font-normal text-lg pr-6 relative'
                          options={options}
                          value={selectedOption}
                          onChange={(option) => setSelectedOption(option)}
                          placeholder="Klik di sini untuk melihat semua daftar peminjam"
                          arrowRenderer={() => <FaAngleDown />}
                        /> */}
                        </td>
                    </tr>
                    </table>
                  <ul className="flex items-center mt-6 justify-center">
                    <li className="rounded-40 bg-custom-green-1 hover:drop-shadow-xl items-center w-28">
                      <Link to={`/update/${post._id}`} onClick={handleModalUpdateOpen} className="font-quicksand font-medium text-white pr-4 pl-4 py-0.5 px-0.5 flex items-center ">
                        <img src={`${process.env.PUBLIC_URL}/assets/edit_icon.svg`} alt="Edit_icon" className="pr-3 w-7 h-7" />
                        Edit
                      </Link>
                      {/* <Link onClick={handleModalUpdateOpen} data-id={post._id} className="font-quicksand font-medium text-white pr-4 pl-4 py-0.5 px-0.5 flex items-center ">
                        <img src={`${process.env.PUBLIC_URL}/assets/edit_icon.svg`} alt="Edit_icon" className="pr-3 w-7 h-7" />
                        Edit
                      </Link> */}
                    </li>
                    <li className="ml-6 rounded-40 bg-custom-red-1 hover:drop-shadow-xl items-center w-28">
                      <Link className="font-quicksand font-medium text-white pr-4 pl-4 py-0.5 px-0.5 flex items-center " onClick={() => setShowModal(post._id)}>
                        <img src={`${process.env.PUBLIC_URL}/assets/trash_icon.svg`} alt="Delete_icon" className="pr-3 w-7 h-7" />
                        Delete
                      </Link>
                    </li>
                  </ul>
                  {showModal === post._id && (
                    <Modal visible={true} onClose={() => setShowModal(null)} postId={post._id} handleDeletePost={handleDeletePost} />
                  )}
                  {showModalUpdate && (
                    <ModalUpdate isOpen={true} onRequestClose={handleModalUpdateClose} className="fixed inset-0 bg-gray-700 opacity-75 blur z-50 "/>
                  )}
                </div>
              ))}
            </div>
            <Bottom />
          </div>
          <Right />
        </div>
      </div>
    )
    
}

export default Posts
