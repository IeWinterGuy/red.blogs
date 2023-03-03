/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-var-requires */
const Embed = require('@editorjs/embed')
const Header = require('@editorjs/header')
const List = require('@editorjs/list')
const Marker = require('@editorjs/marker')
const ImageTool = require('@editorjs/image')
const CodeTool = require('@editorjs/code');
const Delimiter = require('@editorjs/delimiter');

import { Guid } from "@lib/utils/guid.util"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"

export const toolsConfig = {
  Marker :{
    class : Marker,
    shortcut : 'CMD+SHIFT+M'
  },
  header: {
    class: Header,
    inlineToolbar: [
      'link', 'bold', 'italic'
    ]
  },
  list: {
    class: List,
    inlineToolbar: [
      'link','bold'
    ]
  },
  embed : {
    class : Embed,
    inlineToolbar: false,
    config: {
      services: {
        youtube: true,
        coub: true
      }
    }
  },
  image: {
    class: ImageTool,
    config: {
      uploader: {
        /**
         * Upload file to the server and return an uploaded image data
         * @param {File} file - file selected from the device or pasted by drag-n-drop
         * @return {Promise.<{success, file: {url}}>}
         */
         async uploadByFile(file: Blob) {
          return await imgUpstreamHelper(file).then((res) => {
            return res;
          })
        },
        async uploadByUrl(url: string) {
          const res: {success: number, file: {url: string}} = {
            success: 1,
            file: {
              url: url
            }
          }
          return res;
        }
      }
    }
  },
  code: CodeTool,
  delimiter: Delimiter
}


export const editorjsConfig = {
  holder: 'editorjs',
  autofocus: false,
  readOnly: false,
  placeholder: 'Share your story ... ',
  tools: toolsConfig
}

export const editorjsConfigReadOnly = {
  holder: 'editorjs',
  autofocus: false,
  readOnly: true,
  tools: toolsConfig,
  data: {}
}

function imgUpstreamHelper(file: Blob) {
  const res: {success: number, file: {url: string}} = {
    success: 0,
    file: {
      url: ''
    }
  }
  /**
   * Upload file to the server and return an uploaded image data
   * @param {Resolve} param - file selected from the device or pasted by drag-n-drop
   * @return {Promise.<{success, file: {url}}>}
   */
  return new Promise((resolve) => {
    const storage = getStorage();
    // Create the file metadata
    /** @type {any} */
    const metadata = {
      contentType: 'image/png'
    };

    const storageRef = ref(storage, 'images/' + Guid.newGuid() + '.png');
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    uploadTask.on('state_changed', function(snapshot) {
      const percent = snapshot.bytesTransferred / snapshot.totalBytes * 100;
      },(error) => {},
      () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            res.success = 1;
            res.file.url = downloadURL;
            resolve(res)
          });
      })
  })
}
