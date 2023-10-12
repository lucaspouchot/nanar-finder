import { Link } from 'react-router-dom';

type ButtonProps = {
  to?: string;
  size?: 'big' | 'small';
  action?: () => void;
} & JSXProps;

export function Button({ to, size = 'small', children, action = () => {} }: ButtonProps) {
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
            <button className={`${sizeClass} rounded shadow text-gray-700 bg-white hover:bg-slate-600 hover:text-white dark:text-white dark:bg-slate-600 hover:dark:bg-slate-700`}><>{text}</></button>
          </Link>
        :
        <button onClick={action} className={`${sizeClass} rounded shadow text-gray-700 bg-white hover:bg-slate-600 hover:text-white dark:text-white dark:bg-slate-600 hover:dark:bg-slate-700`}>{text}</button>
      }
    </>
  );
}
