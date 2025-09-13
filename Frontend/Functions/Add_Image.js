import * as filestack from "filestack-js";

// create client instance with your API key
const client = filestack.init(import.meta.VITE_FILESTACK_API);


const handleImageUpload = () => {
  client
    .picker({
      accept: ["image/*"],   // only images
      maxFiles: 1,           // only one file at a time
      onUploadDone: (res) => {
        console.log("Filestack response:", res);

        // res.filesUploaded is an array of uploaded files
        // grab the public URL of the first uploaded file
        setImage(res.filesUploaded[0].url);
      },
    })
    .open();
};
