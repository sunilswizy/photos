interface ImageFrameProps {
  file: File;
}

const ImageFrame: React.FC<ImageFrameProps> = ({ file }) => {
  return (
    <div className="h-65 w-full min-w-30 shadow-xl">
      <img src={URL.createObjectURL(file)} alt={file.name} className="h-full w-full rounded-sm object-cover" />
    </div>
  );
};

export default ImageFrame;
