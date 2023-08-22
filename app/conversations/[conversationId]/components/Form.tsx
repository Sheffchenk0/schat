'use client';

import axios from 'axios';
import React from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { HiPaperAirplane } from 'react-icons/hi2';
import { AiOutlinePaperClip } from 'react-icons/ai';
import MessageInput from './MessageInput';
import { CldUploadButton } from 'next-cloudinary';

interface FormProps {
  conversationId: string;
}

const Form: React.FC<FormProps> = ({ conversationId }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue('message', '', { shouldValidate: true });
    axios.post('/api/messages', { ...data, conversationId });
  };

  const handleUpload = (result: any) => {
    axios.post('/api/messages', {
      image: result?.info?.secure_url,
      conversationId,
    });
  };

  return (
    <div
      className="
        py-4
        px-4
        border-t
        flex
        items-center
        gap-2
        lg:gap-4
        w-full
      ">
      <CldUploadButton options={{ maxFiles: 1 }} onUpload={handleUpload} uploadPreset="awbsirwi">
        <AiOutlinePaperClip size={30} className="text-sky-500 cursor-pointer" />
      </CldUploadButton>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="
          flex
          items-center
          gap-2
          lg:gap-4
          w-full
        ">
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Write a message"
        />
        <button
          type="submit"
          className="
          ">
          <HiPaperAirplane
            size={30}
            className="
              text-sky-500
              cursor-pointer
              hover:text-sky-600  
            "
          />
        </button>
      </form>
    </div>
  );
};

export default Form;
