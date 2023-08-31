'use client';

import Button from '@/app/components/Button';
import Modal from '@/app/components/Modal/Modal';
import Image from 'next/image';
import React from 'react';

interface ImageModalProps {
  onClose: () => void;
  src?: string;
  isOpen?: boolean;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, src }) => {
  if (!src) {
    return null;
  }
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="flex relative items-center justify-center pointer-events-none max-h-[calc(100vh*0.7)] h-[calc(100vh*0.7)] sm:h-[calc(100vh/2)] sm:max-h-[calc(100vh/2)] ">
          <Image
            src={src}
            alt="image"
            className="object-contain max-h-[calc(100vh*0.7)] h-[calc(100vh*0.7)] sm:h-[calc(100vh/2)] sm:max-h-[calc(100vh/2)]"
            fill></Image>
        </div>
        <div className="sm:hidden">
          <Button onClick={onClose}>Close</Button>
        </div>
      </Modal>
    </>
  );
};

export default ImageModal;
