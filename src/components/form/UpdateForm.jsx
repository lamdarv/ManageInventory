import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';

const UpdateForm = () => {
    const [nama, setNama] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [tgl_kepemilikan, setTglKepemilikan] = useState("");
    const [status, setStatus] = useState("");
    const [peminjam, setPeminjam] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();
    

    useEffect(() => {
      getPostById();
    }, [id]);

    const getPostById = async () => {
      const response = await axios.get(`http://localhost:5000/api/post/${id}`)
      setNama(response.data.nama);
      setDeskripsi(response.data.deskripsi);
      setTglKepemilikan(new Date(response.data.tgl_kepemilikan)); // use Date constructor to parse the date string
      setStatus(response.data.status);
      setPeminjam(response.data.list_peminjam);
    };
   
    const updatePost = async (event) => {
      event.preventDefault();

      const data = { 
        nama,
        deskripsi, 
        tgl_kepemilikan: tgl_kepemilikan.toISOString(), // convert date object to ISO string
        status, 
        list_peminjam: peminjam      
      };
      try {
        const response = await axios.patch(`http://localhost:5000/api/post/${id}`, data);
        console.log('Note updated successfully!');
        navigate("/posts");
      } catch (error) {
        console.error('Error updating note:', error);
      }
    };

    const options = [
      { value: 'Tidak ada', label: 'Tidak ada'},
      { value: '201524049 - Lamda Richo Vanjaya Sumaryadi', label: '201524049 - Lamda Richo Vanjaya Sumaryadi' },
      { value: '201524045 - Fiora Berliana Putri', label: '201524045 - Fiora Berliana Putri' },
      { value: '201524055 - Nauval Ozora Mahadri', label: '201524055 - Nauval Ozora Mahadri'},
    ];
  
    return (
      <div className="flex items-center justify-center mt-10">
      <div className="bg-white rounded-lg shadow-md p-6 w-max">
          <form onSubmit={updatePost} className=" w-full ">
            <div className='flex place-content-around'>
              {/* Left Column */}
              <div className="left">
                {/* Nama Inventaris */}
                <div className="mb-6 w-96">
                  <label className="font-quicksand block font-semibold text-black mb-2" htmlFor="nama">
                  Nama Inventaris
                  </label>
                  <input
                  className="rounded-lg text-sm font-montserrat block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-1 leading-tight focus:outline-none"
                  id="nama"
                  type="text"
                  maxLength="20"
                  placeholder="Masukkan data inventaris"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  required="true"
                  />
                  <p className="text-gray-500 text-sm ml-1 mt-0">Maximal Character : 20</p>
                </div>
                {/* Tanggal Kepemilikan */}
                <div className="mb-6 relative">
                  <label
                    className="font-quicksand block font-semibold text-black mb-2"
                    htmlFor="tgl_kepemilikan"
                  >
                    Tanggal Kepemilikan
                  </label>
                  <DatePicker
                    selected={tgl_kepemilikan}
                    onChange={(date) => setTglKepemilikan(date)}
                    className="rounded-lg text-sm font-montserrat block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-1 leading-tight focus:outline-none"
                    id="tgl_kepemilikan"
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Masukkan tanggal kepemilikan"
                    required
                    showPopperArrow={false}
                  />
                </div>
                {/* Status Ketersediaan */}
                <div className="mb-6 w-96">
                  <label className="font-quicksand block font-semibold text-black mb-2" htmlFor="status">
                    Status Ketersediaan
                  </label>
                  <select
                    id="status"
                    className="rounded-lg text-sm font-montserrat block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-1 leading-tight focus:outline-none"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                  >
                    <option value="Tersedia">Tersedia</option>
                    <option value="Tidak Tersedia">Tidak Tersedia</option>
                  </select>
                </div>
              </div>
              {/* Right Column */}
              <div className="ml-6 right">
                {/* List Peminjam */}
                <div className="mb-6 w-96">
                  <label className="font-quicksand block font-semibold text-black mb-2" htmlFor="status">
                    List Peminjam
                  </label>
                  <Select
                    options={options}
                    value={peminjam.map((p) => ({ label: p, value: p }))}
                    onChange={(selectedOptions) => setPeminjam(selectedOptions.map(option => option.value))}
                    placeholder="Cari atau pilih peminjam"
                    isSearchable={true}
                    isMulti={true}
                    className="rounded-lg text-sm font-montserrat block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-1 leading-tight focus:outline-none"
                  />
                </div>

                {/* Deskripsi */}
                <div className=" mb-6 w-96">
                  <label className="font-quicksand block font-semibold text-black mb-2" htmlFor="deskripsi">
                  Deskripsi
                  </label>
                  <textarea
                  className="rounded-lg text-sm font-montserrat block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-1 leading-tight focus:outline-none"
                  id="deskripsi"
                  placeholder="Describe here..."
                  maxLength="40"
                  rows="4"
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  required="true"
                  />
                  <p className="text-gray-500 text-sm ml-1 mt-0">Maximal Character : 40</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end">
                <button
                  className="font-quicksand bg-custom-green-1 hover:bg-custom-green-2 text-white font-bold py-1 px-7 rounded-40 focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                <a>Update</a>
                </button>
            </div>
          </form>
      </div>
  </div>
  )
}

export default UpdateForm
