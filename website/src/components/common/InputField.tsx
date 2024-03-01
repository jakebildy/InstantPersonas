// import React from 'react';
// // InputField props.
// interface InputFieldProps {
//   label: string;
//   placeholder: string;
//   value: string;
//   onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
//   type?: string;
// }

// // InputField component.
// const InputField = ({ label, placeholder, value, onChange, type = 'text' }: InputFieldProps) => {
//   return (
//     <div>
//       <label className="block text-sm font-medium leading-6 text-gray-900 mt-3">
//         {label}
//       </label>
//       <div className="mt-0">
//         <input
//           type={type}
//           value={value}
//           onChange={onChange}
//           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//           placeholder={placeholder}
//         />
//       </div>
//     </div>
//   );
// };

// export default InputField;

import { useState } from "react";

interface InputFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  validator?: (value: string) => boolean;
  errorMessage?: string;
}

const InputField = ({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  required = false,
  validator,
  errorMessage = "This field is required",
}: InputFieldProps) => {
  const [isValid, setIsValid] = useState(true);

  const handleBlur = () => {
    if (required || validator) {
      setIsValid(validator ? validator(value) : value.trim() !== "");
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium leading-6 text-gray-900 mt-3">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="mt-0">
        <input
          type={type}
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
            isValid ? "ring-gray-300" : "ring-red-500"
          } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          placeholder={placeholder}
        />
      </div>
      {!isValid && (
        <p className="text-red-500 text-xs mt-1 italic">{errorMessage}</p>
      )}
    </div>
  );
};

export default InputField;
