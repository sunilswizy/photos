interface ImageFrameProps {
  file: File;
}

const ImageFrame: React.FC<ImageFrameProps> = ({ file }) => {
  return (
    <div className="h-full min-h-30 w-full min-w-30">
      <img src={URL.createObjectURL(file)} alt={file.name} className="h-full w-full rounded-sm object-cover" />
    </div>
  );
};

export default ImageFrame;
