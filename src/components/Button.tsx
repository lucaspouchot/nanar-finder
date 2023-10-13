import { Link } from 'react-router-dom';
import React from "react";

type ButtonProps = {
  to?: string;
  size?: 'big' | 'small';
  action?: (e: React.MouseEvent<HTMLButtonElement>) => void;
} & JSXProps;

export function Button({ to, size = 'small', children, className = '', action = () => {} }: ButtonProps) {
  let sizeClass: string = 'text-3xl px-8 py-4';
  if(size === 'small'){
    sizeClass = 'px-6 py-2';
  }
  const text = children ? <>{children}</> : '';
  return (
    <>
      {
        to
        ? <Link to={to}>
            <button className={`${sizeClass} ${className} rounded shadow text-gray-700 bg-white hover:bg-slate-600 hover:text-white dark:text-white dark:bg-slate-700 hover:dark:bg-slate-600`}><>{text}</></button>
          </Link>
        :
        <button onClick={(e) => action(e)} className={`${sizeClass} ${className} rounded shadow text-gray-700 bg-white hover:bg-slate-600 hover:text-white dark:text-white dark:bg-slate-700 hover:dark:bg-slate-600`}>{text}</button>
      }
    </>
  );
}
