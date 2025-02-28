import { FileWithStatus } from '../enums/files.type';
import ImageFrame from '../shared/image-frame/imageFrame.component';

interface ImageGalleryProps {
  files: FileWithStatus[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ files }) => {
  return (
    <div className="grid grid-cols-3 gap-10">
      {files
        .filter((file) => file.downloadURL)
        .map(({ file }, idx) => (
          <ImageFrame file={file} key={idx} />
        ))}
    </div>
  );
};

export default ImageGallery;
