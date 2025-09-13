import firebase from 'expo-firebase-app';

async function uploadImageAsync(uri, uploadUri, onProgress) {
  const onStateChanged = ({ bytesTransferred, totalBytes, state }) => {
    const progress = (bytesTransferred || 0) / totalBytes;
    //Current upload state
    switch (state) {
      case 'running': // or 'running'
        break;
      case 'success': // or 'running'
        onProgress && onProgress(progress);
        break;
      default:
        break;
    }
  };

  return new Promise((res, rej) => {
    const unsubscribe = firebase
      .storage()
      .ref(uploadUri)
      .putFile(uri)
      .on(
        'state_changed',
        onStateChanged,
        error => {
          unsubscribe();
          rej(error);
        },
        uploadedFile => {
          unsubscribe();
          const { downloadURL } = uploadedFile;
          res(downloadURL);
        },
      );
  });
}

export default uploadImageAsync;
