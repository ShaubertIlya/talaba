import ImagePicker from 'react-native-image-picker';

function getPicture() {
  return new Promise((resolve, reject) => {
    const options = {
      title: 'Прикрепление',
      takePhotoButtonTitle: "Сделать снимок",
      chooseFromLibraryButtonTitle: "Выбрать из галереи",
      cancelButtonTitle: 'Отменить',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {}
      else if (response.error) {}
      else if (response.customButton) {}
      else {
        resolve({
          name: response.fileName,
          size: response.fileSize,
          type: response.type,
          uri: response.uri
        })
      }
    });
  });
}

export default {
  getPicture
}