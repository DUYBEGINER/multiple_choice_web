import React from 'react';
import NavBar from '../../components/NavBar';
function LoginPage(props) {
    return (
        <div className="flex min-h-full h-screen items-center justify-center lg:px-8">
            <div className='w-2xl p-5 bg-white rounded-lg shadow-md border border-gray-200'>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="text-2xl text-center font-bold">Login asd</h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6">
                        <div>
                            <input type="text" className='w-full border border-gray-300 p-2 rounded-lg' placeholder='Username'/>
                        </div>
                        <div>
                            <input type="text" className='w-full border border-gray-300 p-2 rounded-lg' placeholder='Username'/>
                        </div>
                        <div>
                            <input type="text" className='w-full border border-gray-300 p-2 rounded-lg' placeholder='Username'/>
                        </div>
                        <div>
                            <input type="text" className='w-full border border-gray-300 p-2 rounded-lg' placeholder='Username'/>
                        </div>
                        

                        <div>
                            <button
                            type="button" 
                            className="w-full px-3 py-1.5 border border-blue-600 text-blue-500 hover:bg-blue-500 hover:text-white"
                            >
                            Facebook Login
                            </button>
                        </div>
                        <div>
                            <button
                            type="submit"
                            className="flex justify-center bg-indigo-500 text-white px-3 py-1.5 w-full text-sm/6 font-semibold rounded hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                            >
                            Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;