import { useState } from 'react';

export default function Dropdown({
  setItem,
  defaultValue,
  dropdownItems,
}: DropdownProps) {
  const [showItems, setShowItems] = useState(false);

  return (
    <div className="">
      <button
        data-dropdown-toggle="dropdown"
        className="text-white bg-blue-700 font-medium rounded-lg text-xl w-52 py-2.5 text-center items-center"
        type="button"
        onClick={() => setShowItems(!showItems)}
      >
        {defaultValue}
      </button>
      {/* <!-- Dropdown menu --> */}
      {showItems ? (
        <>
          <div className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-56 dark:bg-gray-700 absolute">
            <ul className="flex flex-col items-center py-2 text-xl text-gray-700 dark:text-gray-200">
              {dropdownItems && (
                <>
                  {dropdownItems.map((item: string) => (
                    <li key={item} className="">
                      <button
                        className="py-2 hover:text-blue-500"
                        onClick={() => setItem(item)}
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

type DropdownProps = {
  setItem: (value: React.SetStateAction<string>) => void;
  defaultValue: string;
  dropdownItems: string[];
};
