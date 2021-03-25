import React, {useState} from "react";
import {Transition} from "@headlessui/react";
import Link from "next/link";
import {useRouter} from "next/router";

export default function Navbar() {
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const router = useRouter();
  const unactive = "text-gray-300 hover:bg-gray-700 hover:text-white";
  const active = "bg-gray-900 text-white";

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* <!-- Mobile menu button--> */}
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setIsOpenMenu(!isOpenMenu)}
            >
              <span className="sr-only">Open main menu</span>
              {/* <!--
            Icon when menu is closed.

            Heroicon name: outline/menu

            Menu open: "hidden", Menu closed: "block"
          --> */}
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* <!--
            Icon when menu is open.

            Heroicon name: outline/x

            Menu open: "block", Menu closed: "hidden"
          --> */}
              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <img
                className="block lg:hidden h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                alt="Workflow"
              />
              <img
                className="hidden lg:block h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                alt="Workflow"
              />
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
                <Link href="/">
                  <a
                    className={`${
                      router.pathname === "/" ? active : unactive
                    } px-3 py-2 rounded-md text-sm font-medium`}
                  >
                    Dashboard
                  </a>
                </Link>
                <Link href="/teams">
                  <a
                    className={`${
                      router.pathname === "/teams" ? active : unactive
                    } px-3 py-2 rounded-md text-sm font-medium`}
                  >
                    Teams
                  </a>
                </Link>
                <Link href="/">
                  <a
                    className={`${
                      router.pathname === "/projects" ? active : unactive
                    } px-3 py-2 rounded-md text-sm font-medium`}
                  >
                    Projects
                  </a>
                </Link>
                <Link href="/reports">
                  <a
                    className={`${
                      router.pathname === "/reports" ? active : unactive
                    } px-3 py-2 rounded-md text-sm font-medium`}
                  >
                    Reports
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <div className="hidden sm:block">
            <Link href="/request">
              <a className="text-gray-300 bg-indigo-500 hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium mr-2">
                + Request
              </a>
            </Link>
            </div>
            <button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <span className="sr-only">View notifications</span>
              {/* <!-- Heroicon name: outline/bell --> */}
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>

            {/* <!-- Profile dropdown --> */}
            <div className="ml-3 relative">
              <div>
                <button
                  type="button"
                  className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  id="user-menu"
                  aria-expanded="false"
                  aria-haspopup="true"
                  onClick={() => setIsOpenProfile(!isOpenProfile)}
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </button>
              </div>

              {/* <!--
            Dropdown menu, show/hide based on menu state.

            Entering: "transition ease-out duration-100"
              From: "transform opacity-0 scale-95"
              To: "transform opacity-100 scale-100"
            Leaving: "transition ease-in duration-75"
              From: "transform opacity-100 scale-100"
              To: "transform opacity-0 scale-95"
          --> */}
              <Transition
                show={isOpenProfile}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <div
                  className={`origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ${
                    isOpenProfile ? "block" : "hidden"
                  }`}
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu"
                >
                  <Link href="/">
                    <a
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      onClick={() => setIsOpenProfile(!isOpenProfile)}
                    >
                      Your Profile
                    </a>
                  </Link>
                  <Link href="/">
                    <a
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      onClick={() => setIsOpenProfile(!isOpenProfile)}
                    >
                      Settings
                    </a>
                  </Link>
                  <Link href="/">
                    <a
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      onClick={() => setIsOpenProfile(!isOpenProfile)}
                    >
                      Sign out
                    </a>
                  </Link>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Mobile menu, show/hide based on menu state. --> */}

      <div
        className={`sm:hidden ${isOpenMenu ? "block" : "hidden"}`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
          <Link href="/">
            <a className={`${
                      router.pathname === "/" ? active : unactive
                    } block px-3 py-2 rounded-md text-base font-medium`}>
              Dashboard
            </a>
          </Link>
          <Link href="/teams">
            <a className={`${
                      router.pathname === "/teams" ? active : unactive
                    } block px-3 py-2 rounded-md text-base font-medium`}>
              Teams
            </a>
          </Link>
          <Link href="/">
            <a className={`${
                      router.pathname === "/projects" ? active : unactive
                    } block px-3 py-2 rounded-md text-base font-medium`}>
              Projects
            </a>
          </Link>
          <Link href="/reports">
            <a className={`${
                      router.pathname === "/reports" ? active : unactive
                    } block px-3 py-2 rounded-md text-base font-medium`}>
              Reports
            </a>
          </Link>
          <Link href="/request">
              <a className="block text-gray-300 bg-indigo-500 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium mr-2" role="menuitem">
                + Request
              </a>
            </Link>
        </div>
      </div>
    </nav>
  );
}
