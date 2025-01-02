'use client';
import { ContextProvider } from '@/context/Context';
import { getAuth, signOut } from 'firebase/auth';
import Link from 'next/link';
import { useContext } from 'react';

const MainHeader = () => {
  const { user } = useContext(ContextProvider);
  const auth = getAuth();
  console.log(user?.displayName);
  const name = user?.displayName;

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };
  return (
    <div className='mx-8 mt-4'>
      <div className='navbar bg-base-100 shadow-md'>
        <div className='flex-none'>
          <button className='btn btn-square btn-ghost'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              className='inline-block h-5 w-5 stroke-current'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h16M4 18h16'
              ></path>
            </svg>
          </button>
        </div>
        <div className='flex-1'>
          <a className='btn btn-ghost text-xl'>daisyUI</a>
        </div>
        <div className='flex gap-2 mr-4'>
          <button className='btn btn-ghost'>
            <Link href='/'>Home</Link>
          </button>
          {!user?.email && (
            <div>
              <button className='btn btn-ghost'>
                <Link href='/pages/signup'>Signup</Link>
              </button>
              <button className='btn btn-ghost'>
                <Link href='/pages/login'>Login</Link>
              </button>
            </div>
          )}
        </div>
        {user?.email && (
          <div className='flex-none'>
            {/* start */}
            <div className='dropdown dropdown-end'>
              <div
                tabIndex={0}
                role='button'
                className='btn btn-ghost btn-circle avatar'
              >
                <div className='bg-neutral text-neutral-content w-16 pt-2 rounded-full'>
                  <span className='text-xl'>
                    {name?.slice(0, 1).toUpperCase()}
                  </span>
                </div>
              </div>
              <ul
                tabIndex={0}
                className='menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow'
              >
                <li>
                  <a className='justify-between'>
                    {name}
                    <span className='badge'>New</span>
                  </a>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
            {/* end */}
          </div>
        )}
      </div>
    </div>
  );
};

export default MainHeader;
