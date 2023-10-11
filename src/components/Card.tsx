import { Link } from "react-router-dom";

type CardProps = {
  title: string;
  description: string;
  image?: string;
  smallImage?: string;
  link?: string;
}

export function Card({ title, description, image, smallImage, link }: CardProps) {
  return (
    <Link to={link ? link : '#'} className="flex flex-row md:flex-col w-[90vw] md:w-80 items-center bg-white border border-gray-200 rounded shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-slate-900 dark:hover:bg-slate-950">
      { image
        ? <>
          {
            smallImage
              ? <>
                  <img className="md:hidden block object-cover rounded-l h-52" src={smallImage} alt="" />
                  <img className="hidden md:block object-cover w-full h-auto rounded-none rounded-t" src={image} alt="" />
                </>
              : <img className="object-cover w-60 md:w-full rounded-l h-96 md:h-auto md:rounded-none md:rounded-t" src={image} alt="" />
          }
          </>
        : <></>
      }
      {
        (title || description) &&
          <div className="flex flex-col justify-between p-4 leading-normal h-44">
            { title && <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5> }
            { description && <p className="font-normal text-gray-700 dark:text-gray-400 max-h-24 line-clamp-4">{description}</p> }
          </div>
      }
    </Link>
  );
}
