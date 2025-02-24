import { useState } from 'react';
import './App.css';
import FileUpload from './components/file-upload/file-upload.component';
import ImageGallery from './components/image-gallery/image-gallery-component';

function App() {
  const [files, setFiles] = useState<File[]>([]);

  const onFileChange = (files: File[]) => {
    setFiles((prev: File[]) => [...prev, ...files]);
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <FileUpload onFileChange={onFileChange} />
      <ImageGallery files={files} />
    </div>
  );
}

export default App;
