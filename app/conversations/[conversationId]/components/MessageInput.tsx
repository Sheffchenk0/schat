'use client';

import React from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface MessageInputProps {
  id: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const MessageInput: React.FC<MessageInputProps> = ({
  id,
  register,
  placeholder,
  required,
  type,
  errors,
}) => {
  return (
    <div className="relative w-full">
      <input
        type={type}
        id={id}
        // autoComplete={id}
        placeholder={placeholder}
        {...register(id, { required })}
        className="
            text-black
            font-light
            py-2
            px-4
            bg-neutral-100
            w-full
            focus:outline-none
            rounded-full
        "
      />
    </div>
  );
};

export default MessageInput;
