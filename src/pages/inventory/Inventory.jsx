import axios from "../../axiosConfig";
import Topbar from "../../components/topbar/Topbar";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
// import Modal from "../../components/modal/ModalDeleteInventory";
import ModalDeleteInventory from "../../components/modal/ModalDeleteInventory";
import ModalUpdateInventory from "../../components/modal/ModalUpdateInventory";
// import Select from "react-select";
import NewNavbar from "../../components/navbar/NewNavbar";
import Right from "../../components/right/Right";
// import Bottom from "../../components/bottom/Bottom";
import { useAuthContext } from "../../hooks/useAuthContext";

const Inventory = () => {
  const [inventories, setInventories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [inventoryId, setInventoryId] = useState(null);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  // const { post, dispatch } = usePostContext();
  const { user } = useAuthContext();
  // const [error, setError] = useState(null);

  useEffect(() => { 
    if (user) {
      getInventory();
    }
  }, [user]);

  const getInventory = async () => {
    try {
      const response = await axios.get("/api/inventory", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (response.status === 200) {
        console.log(response.data);
        const imageUrl = response.data.url;
        setImageUrl(imageUrl);
        setInventories(response.data);
      } else {
        console.error("Failed to get inventory:", response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteInventory = async (id) => {
    try {
      const response = await axios.delete(`/api/inventory/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (response.status === 200) {
        window.alert("Invetaris berhasil dihapus!");
        getInventory();
      } else {
        console.error("Failed to delete inventory:", response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteInventory = async (id) => {
    try {
      await deleteInventory(id);
      setInventoryId(id);
      getInventory();
      setShowModal(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id) => {
    setInventoryId(id);
    setShowModalUpdate(true);
  };

  const handleModalUpdateClose = () => {
    setShowModalUpdate(false);
    document.body.classList.remove("overflow-hidden");
  };

  return (
    <div className="relative bg-main-blue-3">
      <Topbar />
      <div className="flex min-h-screen">
        <NewNavbar />
        <div className="md:container md:mx-auto">
          <div className="flex flex-wrap justify-center">
            {inventories.length === 0 ? (
              <div className="md:container md:mx-auto">
                <div id="inventory" className="flex justify-center h-screen">
                  <div className="mr-6 mb-10 bg-white rounded-lg shadow-md">
                    <p className="font-quicksand text-3xl font-bold mb-4 text-center">
                      Inventaris Belum Tersedia!
                    </p>
                    <p className="font-quicksand font-normal text-gray-600 text-lg text-center">
                      Mohon maaf, inventaris belum tersedia. Silakan tambahkan
                      inventaris terlebih dahulu ya!
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              inventories.map((inventory) => (
                <div
                  key={inventory._id}
                  className="mb-5 p-6 bg-white rounded-lg shadow-md w-full md:w-3/4"
                >
                  <div className="flex">
                    <div className="w-[200px] flex items-center justify-center">
                      <img
                        src={inventory.gambar}
                        alt="Inventory Image"
                        className="w-[130px] rounded-md drop-shadow-md"
                      />
                    </div>
                    <div className="">
                      <table>
                        <tbody>
                          <tr>
                            <td className="font-quicksand font-normal text-md">
                              <strong>Nama Inventaris</strong>
                            </td>
                            <td className="font-quicksand font-normal text-md">
                              {inventory.nama_inventaris}
                            </td>
                          </tr>
                          <tr>
                            <td className="font-quicksand font-normal text-md pr-6">
                              <strong>Deskripsi</strong>
                            </td>
                            <td className="font-quicksand font-normal text-md pr-6">
                              {inventory.deskripsi}
                            </td>
                          </tr>
                          <tr>
                            <td className="font-quicksand font-normal text-md pr-6">
                              <strong>Tanggal Kepemilikan</strong>
                            </td>
                            <td className="font-quicksand font-normal text-md pr-6">
                              {new Date(
                                inventory.tgl_kepemilikan
                              ).toLocaleDateString("id-ID")}
                            </td>
                          </tr>
                          <tr>
                            <td className="font-quicksand font-normal text-md pr-6">
                              <strong>Status</strong>
                            </td>
                            <td className="font-quicksand font-normal text-md pr-6">
                              {inventory.status}
                            </td>
                          </tr>
                          <tr>
                            <td className="font-quicksand font-normal text-md pr-6">
                              <strong>List Peminjam</strong>
                            </td>
                            <td>
                              <ul className="font-quicksand font-normal text-md pr-6">
                                {inventory.list_peminjam &&
                                  inventory.list_peminjam.map(
                                    (peminjam, index) => (
                                      <div key={index}>
                                        {peminjam.nim_peminjam} - {peminjam.nama_peminjam}
                                      </div>
                                    )
                                  )}
                              </ul>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <ul className="flex items-center mt-6 justify-center">
                    <li className="rounded-40 bg-custom-green-1 hover:drop-shadow-xl items-center w-28">
                      <Link
                        onClick={() => handleEdit(inventory._id)}
                        data-id={inventory._id}
                        className="font-quicksand font-medium text-white pr-4 pl-4 py-0.5 px-0.5 flex items-center "
                      >
                        <img
                          src={`${process.env.PUBLIC_URL}/assets/edit_icon.svg`}
                          alt="Edit_icon"
                          className="pr-3 w-7 h-7"
                        />
                        Edit
                      </Link>
                    </li>
                    <li className="ml-6 rounded-40 bg-custom-red-1 hover:drop-shadow-xl items-center w-28">
                      <Link
                        className="font-quicksand font-medium text-white pr-4 pl-4 py-0.5 px-0.5 flex items-center "
                        onClick={() => setShowModal(inventory._id)}
                      >
                        <img
                          src={`${process.env.PUBLIC_URL}/assets/trash_icon.svg`}
                          alt="Delete_icon"
                          className="pr-3 w-7 h-7"
                        />
                        Delete
                      </Link>
                    </li>
                  </ul>
                  {showModal === inventory._id && (
                    <ModalDeleteInventory
                      visible={true}
                      onClose={() => setShowModal(null)}
                      inventoryId={inventory._id}
                      handleDeleteInventory={handleDeleteInventory}
                    />
                  )}
                  {showModalUpdate && (
                    <ModalUpdateInventory
                      isOpen={true}
                      onRequestClose={handleModalUpdateClose}
                      inventoryId={inventoryId}
                      className=""
                    />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
        <Right />
      </div>
    </div>
  );
};

export default Inventory;
