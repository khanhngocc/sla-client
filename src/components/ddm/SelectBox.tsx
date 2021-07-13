import { useEffect, useRef, useState } from "react";

let useClickOutside = (handler: any) => {
  let domNode: any = useRef();

  useEffect(() => {
    let maybeHandler = (event: any) => {
      if (!domNode.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  });

  return domNode;
};

interface Props {
  items?: SelectBox[];
  searchKeyWord?: string;
  typeResult?: string;
}

interface SelectBox {
  label?: string;
  searchType?: number;
}

const SelectBox = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  let domNode = useClickOutside(() => {
    setIsOpen(false);
  });

  const [currentType, setCurrentType] = useState(
    props.items ? props.items[0].label : ""
  );

  const handleClick = (e: any, item: SelectBox) => {
    e.preventDefault();
    setCurrentType(item.label);
    setIsOpen(false);
  };

  return (
    <div>
      <div ref={domNode} className="relative inline-block text-left">
        <div>
          <button
            type="button"
            className=" border w-24 border-gray-300 bg-white dark:bg-gray-800 shadow-sm 
            flex items-center justify-center rounded-md px-4 py-1 text-sm font-medium text-gray-700 dark:text-gray-50
             hover:text-gray-900 dark:hover:bg-gray-500 focus:outline-none"
            id="options-menu"
            onClick={() => setIsOpen(!isOpen)}
          >
            {currentType}
            <svg
              width={20}
              height={20}
              fill="currentColor"
              viewBox="0 0 1792 1792"
              xmlns="http://www.w3.org/2000/svg"
              className="pl-1"
            >
              <path d="M1408 704q0 26-19 45l-448 448q-19 19-45 19t-45-19l-448-448q-19-19-19-45t19-45 45-19h896q26 0 45 19t19 45z" />
            </svg>
          </button>
        </div>
        {isOpen ? (
          <div className="origin-top-right absolute mt-2 w-32 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
            <div
              className="py-1 "
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              {props.items?.map((item, index) => {
                return (
                  <a
                    href=""
                    className="block px-4 py-1 font-medium text-sm text-gray-700 hover:bg-blue-500 hover:text-white dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
                    onClick={(e) => handleClick(e, item)}
                    key={index}
                  >
                    <span className="flex flex-col">
                      <span>{item.label}</span>
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SelectBox;
