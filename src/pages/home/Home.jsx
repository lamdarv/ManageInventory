import Topbar from "../../components/topbar/Topbar";
import Navbar from "../../components/navbar/Navbar";
import NewNavbar from "../../components/navbar/NewNavbar";

export default function Home() {
  return (
    <div className='relative bg-custom-green-4'>
      <div className='w-full' id='Top'>
        <Topbar />
      </div>
      <div className="flex min-h-screen">
        <NewNavbar />
        {/* <div className="md:container md:mx-auto">
            <div className="flex flex-wrap justify-center">
                <div className="mr-6 ml-6 mt-40 p-6 bg-white rounded-lg shadow-md w-full md:w-3/4">
                  Mohon maaf, fitur ini belum tersedia dan memang tidak akan disediakan oleh developernya. Terima kasih
                </div>
            </div>
        </div> */}
        <div className="md:container md:mx-auto">
          <div className="flex justify-center items-center h-screen">
            <div className="mb-40 bg-white rounded-lg shadow-md p-8">
              <p className="font-quicksand text-3xl font-bold mb-4 text-center">Fitur belum tersedia</p>
              <p className="font-quicksand font-normal text-gray-600 text-lg text-center">Mohon maaf, fitur ini belum tersedia dan memang tidak akan disediakan oleh developernya. Terima kasih.</p>
              <div className="flex justify-center mt-6">
                <button className="font-montserrat text-sm rounded-40 bg-custom-green-1 text-white hover:drop-shadow-xl text-green font-normal py-2 px-4 rounded-full">
                  Kembali ke halaman utama
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  )
}