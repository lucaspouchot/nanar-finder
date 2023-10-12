import React, { useEffect, useState } from "react";
import Logo from '../assets/logo.png';
import { Link, NavLink, useNavigate } from "react-router-dom";

export function Header() {
  const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem("darkMode") || 'false'));
  const [hidden, setHidden] = useState(true);
  const navigate = useNavigate();

  const linkClassPos: string = "block text-base min-[1000px]:text-lg py-2 pl-3 pr-4 rounded min-[1000px]:p-0"
  const linkClassLight: string = "text-gray-500 hover:bg-gray-100 min-[1000px]:hover:bg-transparent min-[1000px]:hover:text-blue-700"
  const linkClassDark: string ="dark:text-gray-400 dark:hover:bg-gray-700 min-[1000px]:dark:hover:bg-transparent min-[1000px]:dark:hover:text-gray-300 dark:hover:text-gray-300 dark:border-gray-700"
  const linkClass: string = `${linkClassPos} ${linkClassLight} ${linkClassDark}`

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const search = e.currentTarget.search.value as string;
    e.currentTarget.reset();
    return navigate(`/movies?search=${search}`);
  }

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));

    if(darkMode){
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

  }, [darkMode]);

  return (
    <header className="shadow">
      <nav className="bg-white dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2 min-[1000px]:p-4">
          <Link to="/" className="flex items-center">
            <img src={Logo} className="h-7 mr-3 min-[1000px]:h-10" alt="Nanar Finder Logo" />
            <span className="self-center text-xl min-[1000px]:text-3xl font-semibold whitespace-nowrap dark:text-white">Nanar Finder</span>
          </Link>
          <div className="flex min-[1000px]:order-2">
            <button onClick={() => setDarkMode(!darkMode)} data-tooltip-target="navbar-search-example-toggle-dark-mode-tooltip" type="button" data-toggle-dark="light" className="flex items-center p-2 mr-2 text-xs font-medium text-gray-700 bg-white rounded-lg border border-gray-200 toggle-dark-state-example hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-gray-800 focus:outline-none dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
              { darkMode ? (<svg aria-hidden="true" data-toggle-icon="sun" className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd"></path></svg>) : (<svg aria-hidden="true" data-toggle-icon="moon" className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>) }
            </button>
            <button onClick={() => setHidden(hidden => !hidden)} type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded="false" className="min-[1000px]:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1" >
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
              <span className="sr-only">Search</span>
            </button>
            <div className="hidden relative min-[1000px]:block">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
                <span className="sr-only">Search icon</span>
              </div>
              <form onSubmit={handleSearch}>
                <input type="text" name="search" id="search-navbar" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
              </form>
            </div>
            <button onClick={() => setHidden(hidden => !hidden)} data-collapse-toggle="navbar-search" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg min-[1000px]:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-search" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
              </svg>
            </button>
          </div>
          <div className={`${hidden ? 'hidden' : ''} items-center justify-between w-full min-[1000px]:flex min-[1000px]:w-auto min-[1000px]:order-1`} id="navbar-search">
            <div className="relative mt-3 min-[1000px]:hidden">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
              </div>
              <form onSubmit={handleSearch}>
                <input type="text" name="search" id="search-navbar" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
              </form>
            </div>
            <ul className="flex flex-col p-4 min-[1000px]:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 min-[1000px]:flex-row min-[1000px]:space-x-8 min-[1000px]:mt-0 min-[1000px]:border-0 min-[1000px]:bg-white dark:bg-gray-800 min-[1000px]:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <NavLink to="/" className={linkClass} aria-current="page" end>Bottom Rated</NavLink>
              </li>
              <li>
                <NavLink to="/movies/unpopular" className={linkClass}>Unpopular</NavLink>
              </li>
              <li>
                <NavLink to="/movies/recent" className={linkClass}>Recent</NavLink>
              </li>
              <li>
                <NavLink to="/movies/upcoming" className={linkClass}>Upcoming</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
