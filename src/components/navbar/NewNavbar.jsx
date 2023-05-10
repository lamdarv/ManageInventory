import { useEffect, useState } from 'react';

export default function NewNavbar() {
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredHome, setIsHoveredHome] = useState(false);
  const [isHoveredPosts, setIsHoveredPosts] = useState(false);
  const [isHoveredCreate, setIsHoveredCreate] = useState(false);
  const [isHoveredNotif, setIsHoveredNotif] = useState(false);
  const [isHoveredKeluar, setIsHoveredKeluar] = useState(false);

  const [isClickedHome, setIsClickedHome] = useState(false);
  const [isClickedPosts, setIsClickedPosts] = useState(false);
  const [isClickedCreate, setIsClickedCreate] = useState(false);
  const [isClickedNotif, setIsClickedNotif] = useState(false);
  const [isClickedKeluar, setIsClickedKeluar] = useState(false);

  //Home Hover atau Kegiatan Hover
  const handleMouseOverHome = () => {
    setIsHoveredHome(true);
  };

  const handleMouseLeaveHome = () => {
    setIsHoveredHome(false);
  };

  //Posts Hover atau Inventory
  const handleMouseOverPosts = () => {
    setIsHoveredPosts(true);
  };

  const handleMouseLeavePosts = () => {
    setIsHoveredPosts(false);
  };

  //Notif Hover
  const handleMouseOverNotif = () => {
    setIsHoveredNotif(true);
  };

  const handleMouseLeaveNotif = () => {
    setIsHoveredNotif(false);
  };

  //Keluar Hover
  const handleMouseOverKeluar = () => {
    setIsHoveredKeluar(true);
  };

  const handleMouseLeaveKeluar = () => {
    setIsHoveredKeluar(false);
  };

  //Create Hover
  const handleMouseOverCreate = () => {
    setIsHoveredCreate(true);
  };

  const handleMouseLeaveCreate = () => {
    setIsHoveredCreate(false);
  };

  //Home Clicked
  const handleClickHome = () => {
    setIsClickedHome(true); 
  };

  //Posts Clicked
  const handleClickPosts = () => {
    setIsClickedPosts(true); 
  };

  //Create Clicked
  const handleClickCreate = () => {
    setIsClickedCreate(true); 
  };

  //Notif Clicked
  const handleClickNotif = () => {
    setIsClickedNotif(true); 
  };

  //Keluar Clicked
  const handleClickKeluar = () => {
    setIsClickedKeluar(true); 
  };

  useEffect(() => {
    if (window.location.pathname === "/") {
      setIsClickedHome(true);
    } else if (window.location.pathname === "/posts"){
      setIsClickedPosts(true);
    } else if (window.location.pathname === "/create-post"){
      setIsClickedCreate(true);
    } else if (window.location.pathname === "/notifikasi"){
      setIsClickedNotif(true);
    } 
  }, []);

  return (
    
    <nav className="w-1/4 bg-custom-green-3 rounded-tl-0 rounded-tr-[100px] rounded-br-0 rounded-bl-0">
      <div className='p-5 ml-2 mt-3'>
        <span className='font-quicksand font-semibold text-sm text-custom-white-2'>MENU</span>
      </div>
      <ul className="mt-2">
        <li className={`mb-6 ml-5 rounded-40 ${isClickedHome ? 'bg-custom-gradient text-white' : 'text-custom-gray-2 hover:bg-custom-gradient text-white'} hover:drop-shadow-xl items-center`}>  
          <a href="/" id="home" onMouseOver={handleMouseOverHome} onMouseLeave={handleMouseLeaveHome} onClick={handleClickHome} className="font-quicksand font-medium text-sm hover:text-white pr-4 flex items-center "> 
          <img 
              src={`${isClickedHome ? process.env.PUBLIC_URL+'/assets/act_icon_active.svg' : (isHoveredHome ? process.env.PUBLIC_URL+'/assets/act_icon_active.svg' : process.env.PUBLIC_URL+'/assets/act_icon.svg')}`} 
              alt="Home_icon" 
              className="ml-0"
          /> 
          <span className='ml-2'>Kegiatan</span>
          </a>
        </li>
        <li className={`mt-6 mb-6 ml-5 rounded-40 ${isClickedPosts ? 'bg-custom-gradient text-white' : 'text-custom-gray-2 hover:bg-custom-gradient text-white'} hover:drop-shadow-xl items-center`}>
          <a href="/posts" onMouseOver={handleMouseOverPosts} onMouseLeave={handleMouseLeavePosts} onClick={handleClickPosts} className="font-quicksand font-medium text-sm hover:text-white pr-4 flex items-center "> 
          <img 
            src={`${isClickedPosts ? process.env.PUBLIC_URL+'/assets/sarpras_icon_active.svg' : (isHoveredPosts ? process.env.PUBLIC_URL+'/assets/sarpras_icon_active.svg' : process.env.PUBLIC_URL+'/assets/sarpras_icon.svg')}`} 
            alt="Posts_icon" 
            className="ml-0"
          /> 
          <span className='ml-2'>Sarana dan Prasarana</span>
          </a>
        </li>
      </ul>
      <div className='p-5 ml-2 mt-3'>
        <span className='font-quicksand font-semibold text-sm text-custom-white-2'>OTHERS</span>
      </div>
      <ul className="mt-2">
        <li className={`mb-6 ml-5 rounded-40 ${isClickedNotif ? 'bg-custom-gradient text-white' : 'text-custom-gray-2 hover:bg-custom-gradient text-white'} hover:drop-shadow-xl items-center`}>  
          <a href="/notifikasi" id="home" onMouseOver={handleMouseOverNotif} onMouseLeave={handleMouseLeaveNotif} onClick={handleClickNotif} className="font-quicksand font-medium text-sm hover:text-white pr-4 flex items-center "> 
          <img 
              src={`${isClickedNotif ? process.env.PUBLIC_URL+'/assets/notification_icon_active.svg' : (isHoveredNotif ? process.env.PUBLIC_URL+'/assets/notification_icon_active.svg' : process.env.PUBLIC_URL+'/assets/notification_icon.svg')}`} 
              alt="Home_icon" 
              className="ml-0"
          /> 
          <span className='ml-2'>Notifikasi</span>
          </a>
        </li>
        <li className={`mb-6 ml-5 rounded-40 ${isClickedKeluar ? 'bg-custom-gradient text-white' : 'text-custom-gray-2 hover:bg-custom-gradient text-white'} hover:drop-shadow-xl items-center`}>  
          <a href="/" id="home" onMouseOver={handleMouseOverKeluar} onMouseLeave={handleMouseLeaveKeluar} onClick={handleClickKeluar} className="font-quicksand font-medium text-sm hover:text-white pr-4 flex items-center "> 
          <img 
              src={`${isClickedKeluar ? process.env.PUBLIC_URL+'/assets/signout_icon_active.svg' : (isHoveredKeluar ? process.env.PUBLIC_URL+'/assets/signout_icon_active.svg' : process.env.PUBLIC_URL+'/assets/signout_icon.svg')}`} 
              alt="Signout_icon" 
              className="ml-0"
          /> 
          <span className='ml-2'>Keluar</span>
          </a>
        </li>
        {/* <li className={`ml-10 mr-10 rounded-40 ${isClickedCreate ? 'bg-custom-orange-1 text-white' : 'bg-custom-gray-3 text-custom-gray-2 hover:bg-custom-orange-1'} hover:drop-shadow-xl items-center`}>
        <a href="/create-post" onMouseOver={handleMouseOverCreate} onMouseLeave={handleMouseLeaveCreate} onClick={handleClickCreate} className="font-quicksand font-medium hover:text-white pr-4 pl-4 py-0.5 px-0.5 flex items-center "> 
          <img 
            src={`${isClickedCreate ? process.env.PUBLIC_URL+'/assets/create_icon_active.svg' : (isHoveredCreate ? process.env.PUBLIC_URL+'/assets/create_icon_active.svg' : process.env.PUBLIC_URL+'/assets/create_icon.svg')}`} 
            alt="Create_icon" 
            className="pr-3" 
          /> 
              Create
        </a>
        </li> */}
      </ul>
    </nav>
    
  );
};