import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="shadow-top bg-white dark:bg-gray-900">
      <div className="w-full mx-auto max-w-screen-xl p-4 flex items-center justify-between">
        <span className="text-sm text-gray-600 sm:text-center dark:text-gray-300">
          © 2023
          <Link to="/" className="hover:underline pl-2 pr-1">Nanar Finder</Link>
          All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center text-sm font-medium text-gray-600 dark:text-gray-300 mt-0">
          <li>
            <a href="https://gravenoire.fr" rel="noreferrer noopener" className="mr-4 hover:underline" target="_blank">About Us</a>
          </li>
          <li>
            <a href="https://github.com/lucaspouchot/nanar-finder" rel="noreferrer noopener" className="mr-4 hover:underline" target="_blank">Github</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
