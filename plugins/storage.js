import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/database';

const max = 52428800;

async function upload(files, path, onPercentage) {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    if(!!file.url) continue;

    const blob = await getBlob(file.uri);
    
    const url = await uploadFile(blob, file.name, path, snapshot => {
      const { bytesTransferred, totalBytes } = snapshot;

      const filePercentage = (bytesTransferred / totalBytes) * 100;

      const perFilePercentage = (100 / files.length);
      const percentage =
            (perFilePercentage * i) +
            (perFilePercentage * (filePercentage/100));

      if(onPercentage) onPercentage(Math.round(percentage));
    });

    file.url = url;
  }

  if(onPercentage) onPercentage(null);

  return files.map(file => ({
    name: file.name,
    size: file.size,
    type: file.type,
    url: file.url
  }))
}

function uploadFile(blob, name, path, onSnapshot) {
  return new Promise((resolve, reject) => {
    const storage = firebase.storage().ref(),
        child = storage.child(path + name),
        task = child.put(blob);

    task.on('state_changed', onSnapshot, reject, async () => {
      const url = await task.snapshot.ref.getDownloadURL();

      resolve(url);
    });
  });
}

function getBlob(uri) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function(e) {
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });
}

export default {
  max,
  upload
}