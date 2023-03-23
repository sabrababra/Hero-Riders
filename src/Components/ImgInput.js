import React from 'react';

const ImgInput = ({ label, photo, setPhoto }) => {

    const handleChange = (e) => {
        let files = e.target.files;
        for (var i = 0; i < files.length; i++) {
            let file = files[i];
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                let fileInfo = {
                    name: file.name,
                    type: file.type,
                    size: Math.round(file.size / 1000) + ' kB',
                    base64: reader.result,
                    file: file,
                };
                setPhoto({base64:fileInfo.base64});
            }
        }
    }

    return (
            <div className="form-control w-full ">
                <label className="label">
                    <span className="label-text">
                        {label}
                    </span>
                </label>
                {
                    photo &&
                    <img className=' w-1/4  ' src={photo.base64} alt="" />
                    
                }
                <input
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    onChange={handleChange}
                    required
                    max-file-size="1024"
                />
            </div>
       
    );
};

export default ImgInput;