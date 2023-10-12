import PageNotFoundImg from '../assets/images/pagenotfound.png';
import { Button } from "../components";

export function PageNotFound() {
  return (
    <main>
      <section className='flex flex-col justify-center px-2'>
        <div className="flex flex-col items-center my-4">
          <p className="text-4xl md:text-7xl text-gray-700 dark:text-white mb-10">Page doesn't exists</p>
          <div className="max-w-lg">
            <img src={PageNotFoundImg} alt="404" className="rounded"/>
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <Button to='/' size="big">
            Back to Home
          </Button>
        </div>
      </section>
    </main>
  );
}
