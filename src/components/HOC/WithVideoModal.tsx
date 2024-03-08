import { DistributionEntity } from '@/models/types/forge';
import React, { FC, useState, useEffect } from 'react';
import DivaVideoModal from '@/components/common/DivaVideoModal/DivaVideoModal';

export type WithVideoModalProps = {
  openVideoModal: (videoEntity: DistributionEntity) => void;
};

const WithVideoModal = <T extends object>(WrappedComponent: React.ComponentType<T & WithVideoModalProps>): FC<T> => {
  const WithVideoModal: FC<T> = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [videoData, setVideoData] = useState<DistributionEntity | null>(null);

    useEffect(() => {
      // Prevent the user from scrolling the page while the modal is open
      const htmlElement = document.documentElement;

      if (isModalOpen) {
        htmlElement.style.overflow = 'hidden';
      } else {
        htmlElement.style.overflow = '';
      }

      return () => {
        htmlElement.style.overflow = '';
      };
    }, [isModalOpen]);

    const openModal = (videoEntity: DistributionEntity) => {
      setVideoData(videoEntity);
      setIsModalOpen(true);
    };

    const closeModal = () => {
      setIsModalOpen(false);
      setVideoData(null);
    };

    return (
      <>
        <WrappedComponent
          {...props}
          openVideoModal={openModal}
        />
        {isModalOpen && videoData && (
          <DivaVideoModal
            videoEntity={videoData}
            closeModal={closeModal}
          />
        )}
      </>
    );
  };
  return WithVideoModal;
};

export default WithVideoModal;
