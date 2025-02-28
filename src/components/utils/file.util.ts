import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../config/firebase.config";

export const uploadFile = async (file: File, path: string) => {
    if (!file) return;

    const storageRef = ref(storage, `${path}/${file.name}`);

    try {
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;
    }
    catch (e) {
        console.error("Error at file Uploading", 2)
    }
};

export const uploadFileWithProgress = (file: File, path: string) => {
    if (!file) return;

    const storageRef = ref(storage, `${path}/${file.name}`);
    return uploadBytesResumable(storageRef, file);
}