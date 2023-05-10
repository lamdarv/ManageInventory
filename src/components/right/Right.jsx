import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ModalCreate from '../modal/ModalCreate';

const Right = () => {
  const [isClickedCreate, setIsClickedCreate] = useState(false);
  const [isHoveredCreate, setIsHoveredCreate] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => {
    setShowModal(false);
    document.body.classList.remove('overflow-hidden');
  }
  
  //Create Hover
  const handleMouseOverCreate = () => {
    setIsHoveredCreate(true);
  };

  const handleMouseLeaveCreate = () => {
    setIsHoveredCreate(false);
  };

  const handleClickCreate = () => {
    setIsClickedCreate(true);
    setShowModal(true);
    document.body.classList.add('overflow-hidden');
  };

  useEffect(() => {
    if (window.location.pathname === "/posts") {
      setIsClickedCreate(false);
    } 
  }, []);

  return (
    <div>
      <nav className=" bg-custom-green-4">
        <li className={`list-none ml-10 rounded-tl-[40px] rounded-tr-[0] rounded-br-0 rounded-bl-[40px] ${isClickedCreate ? 'bg-white' : 'bg-white hover:bg-custom-gray-3'} hover:drop-shadow-xl items-center`}>
          <Link className="flex items-center py-20 px-5" onClick={handleClickCreate}>
            <img src={`${isClickedCreate ? process.env.PUBLIC_URL+'/assets/create_icon.svg' : (isHoveredCreate ? process.env.PUBLIC_URL+'/assets/create_icon_active.svg' : process.env.PUBLIC_URL+'/assets/create_icon.svg')}`}  alt="Delete_icon" className="w-16 h-10" />
          </Link>
        </li>
      </nav>
      {showModal && (
        <ModalCreate isOpen={true} onRequestClose={handleModalClose} className="fixed inset-0 bg-gray-700 opacity-75 blur z-50"/>
      )}
    </div>
  )
}

export default Right;
