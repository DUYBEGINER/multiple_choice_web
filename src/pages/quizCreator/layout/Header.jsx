import React , {useCallback, useContext} from 'react';
import {SettingOutlined} from "@ant-design/icons";
import { logOutRequest } from '../../../api/authAPI';
import { getIdTokenForLogout, logOut } from '../../../firebase/auth';
// import { AuthContext } from '../../../context/AuthProvider';
import useAuth from '../../../hook/useAuth'

function Header(props) {

    // Lấy user và setUser từ context
    const { setUser, setAuthenticate } = useAuth();


    const handleLogout = async () => {
      try {
        const idToken = await getIdTokenForLogout();
        await logOutRequest(idToken);
        await logOut();
        console.log("Đăng xuất thành công");
        setUser(null);
        setAuthenticate(false);
        // Có thể navigate tới trang login
      } catch (error) {
        console.error("Logout error:", error);
        alert("Có lỗi xảy ra, vui lòng thử lại");
      }
    };

    
    return (
        <nav className="h-[70px] max-h-[70px] top-0 z-10 bg-white shadow-sm flex items-center justify-between ">
        <div className=" px-3 lg:px-5 lg:pl-3 flex items-center gap-5">
          <button className="text-gray-500 hover:text-gray-700 bg-gray-100 px-2 py-2 rounded">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <p className="text-sm sm:text-xl font-OppenSans">Edit test</p>
        </div>

        {/*Title*/}
        <div className="">
          <h1>Tiêu đề nằm ở đây</h1>
        </div>

        <div className="flex items-center gap-4 pr-2">
          <button className="p-3 bg-wild-sand-100 rounded-md"><SettingOutlined /></button>
          <button className=" btn bg-wild-sand-50 hover:bg-wild-sand-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
              />
            </svg>
            <span>Preview</span>
          </button>
          <button className="btn text-white bg-red-600 hover:bg-red-800" onClick={handleLogout}>Logout</button>
          <button className="btn text-white bg-blue-violet-600 hover:bg-blue-violet-800">Publish</button>
        </div>
      </nav>
    );
}

export default Header;