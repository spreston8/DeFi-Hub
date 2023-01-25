import Link from 'next/link';

export default function FourZeroFour() {
  return (
    <div className="flex flex-col items-start justify-start md:justify-center md:items-center md:flex-row md:space-x-6 md:mt-24">
      <div className="pt-6 pb-8 space-x-2 md:space-y-5">
        <h1 className="text-6xl font-extrabold tracking-tight text-gray-900 leading-9 dark:text-gray-100 md:text-8xl md:leading-14 md:border-r-2 md:px-6">
          404
        </h1>
      </div>
      <div className="max-w-md">
        <p className="mb-4 text-xl font-bold leading-normal md:text-2xl">
          Sorry we couldn't find this page.
        </p>
        <p className="mb-8">
          But dont worry, you can find plenty of other things on our homepage.
        </p>
        <Link href="/">
          <button
            type="button"
            className="inline px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg shadow leading-5 transition-colors duration-150 focus:outline-none focus:shadow-outline-blue hover:bg-blue-700 dark:hover:bg-blue-500"
          >
            Back to homepage
          </button>
        </Link>
      </div>
    </div>
  );
}
