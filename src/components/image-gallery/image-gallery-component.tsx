import ImageFrame from '../image-frame/imageFrame.component';

interface ImageGalleryProps {
  files: File[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ files }) => {
  return (
    <div className="grid grid-cols-3 gap-5">
      {files.map((file, idx) => (
        <ImageFrame file={file} key={idx} />
      ))}
    </div>
  );
};

export default ImageGallery;
