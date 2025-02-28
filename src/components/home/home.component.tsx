import { useState } from 'react';
import FileUpload from '../shared/file-upload/file-upload.component';
import ImageGallery from '../image-gallery/image-gallery-component';
import { FileUploadState, FileWithStatus } from '../enums/files.type';
import { uploadFileWithProgress } from '../utils/file.util';
import { getDownloadURL } from 'firebase/storage';
import ProgressBar from '../shared/progress-bar/progress-bar.component';

const HomeComponent = () => {
  const [files, setFiles] = useState<FileWithStatus[]>([]);
  const [isFileUploading, setIsFileUploading] = useState(false);
  const [_uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [totalProgress, setTotalProgress] = useState(0);

  const onFileChange = async (files: File[]) => {
    const newFiles: FileWithStatus[] = files.map((file) => {
      return {
        file,
        status: FileUploadState.pending,
      };
    });

    setIsFileUploading(true);
    setUploadProgress({});

    const uploadedPromises = newFiles.map((each) => {
      const uploadTask = uploadFileWithProgress(each.file, 'uploads');

      return new Promise((resolve, reject) => {
        uploadTask?.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

            setUploadProgress((prevProgress) => {
              const newProgress = { ...prevProgress, [each.file.name]: progress };
              const total = Math.ceil(Object.values(newProgress).reduce((acc, val) => acc + val, 0) / newFiles.length);

              setTotalProgress(total);

              return newProgress;
            });
          },
          (error) => {
            console.log('Error uploading Files', error);
            reject(error);
            setIsFileUploading(false);
            setUploadProgress({});
          },
          async () => {
            const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
            each.downloadURL = downloadUrl;
            each.status = FileUploadState.uploaded;

            setFiles((prev: FileWithStatus[]) => [...prev, each]);
            resolve(true);
          }
        );
      });
    });

    await Promise.all(uploadedPromises);

    setIsFileUploading(false);
    setUploadProgress({});
  };

  return (
    <div className="flex w-full flex-col items-center justify-center pt-20">
      <div className="flex h-30 w-50 flex-col gap-2 sm:h-50 sm:w-95 lg:h-70 lg:w-140">
        <div className="h-[80%]">
          <FileUpload onFileChange={onFileChange} />
        </div>
        <div className="h-[20%]">{isFileUploading && <ProgressBar progress={totalProgress} />}</div>
      </div>

      <div className="flex pr-25 pb-10 pl-25">
        <ImageGallery files={files} />
      </div>
    </div>
  );
};

export default HomeComponent;
