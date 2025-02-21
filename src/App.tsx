import { useState } from 'react';
import './App.css';

function App() {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

 const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
   e.preventDefault();
   e.stopPropagation();
   setIsDragging(false);

   if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
     onFileChange(e.dataTransfer.files);
     e.dataTransfer.clearData();
   }
 };

  const onFileChange = (event: any) => {
    console.log(event.target.files);
  }

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div
        className={`h-30 w-50 border-2 border-dashed ${
          isDragging ? 'border-blue-500 bg-blue-100' : 'border-pink-500'
        } border-pink-500 sm:h-50 sm:w-95 lg:h-70 lg:w-120`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="file-upload"
          multiple
          onChange={onFileChange}
          className="h-full w-full cursor-pointer text-transparent opacity-0"
          title=""
        />
        <p className="text-center text-gray-500">
          {isDragging ? 'Drop files here' : 'Drag & Drop files or Click to Upload'}
        </p>
      </div>
    </div>
  );
}

export default App;
