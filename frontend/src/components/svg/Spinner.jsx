import React from 'react';

const Spinner = () => {
  return (
    <svg
      className="animate-spin h-6 w-6 text-blue-500 mx-auto"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.416A7.96 8 0 014.373 7H1.412A10 10 0 1012 2.536V7zm-2 7.583A7.96 8 0 0119.588 17H22.59A10 10 0 1010 21.016v-5.017z"
      ></path>
    </svg>
  );
};

export default Spinner;
