import useTranslate from '@/hooks/useTranslate';
import { DistributionEntity } from '@/models/types/forge';
import dynamic from 'next/dynamic';
import { renderSvgIcon } from '@/components/icons';

const DivaVideoPlayer = dynamic(() => import('@/components/common/DivaVideoPlayer/DivaVideoPlayer'), { ssr: false });

type DivaVideoModalProps = {
  videoEntity: DistributionEntity;
  closeModal: () => void;
};

const DivaVideoModal = ({ videoEntity, closeModal }: DivaVideoModalProps) => {
  const translate = useTranslate();
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black p-2">
      <div className="max-w-[900px] w-full h-auto flex flex-col items-baseline">
        <button
          onClick={closeModal}
          className="flex justify-end w-full mb-5 cursor-pointer"
          aria-label={translate('close')}
        >
          {renderSvgIcon('Close', { fill: 'white', className: 'w-6 h-6' })}
        </button>

        <DivaVideoPlayer videoEntity={videoEntity} />
      </div>
    </div>
  );
};

export default DivaVideoModal;
