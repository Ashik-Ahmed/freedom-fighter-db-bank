import { Button } from 'primereact/button';
import React, { useState } from 'react';

const FileUpload = () => {

    const [image, setImage] = useState(null);

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('image', image);
        formData.append('album', 'invitation-management'); // Replace with your album name

        try {
            await fetch('https://api.imgbb.com/1/upload?key=a0bd0c6e9b17f5f8fa7f35d20163bdf3', {
                method: 'POST',
                body: formData
            })
                .then(res => res.json())
                .then(data => console.log(data.data.url))
        } catch (error) {
            console.error('Error occurred during image upload:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <button type="submit">Upload Image</button>
        </form>
    );
};

export default FileUpload;