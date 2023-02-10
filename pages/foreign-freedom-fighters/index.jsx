import { InputText } from 'primereact/inputtext';
import { FileUpload } from 'primereact/fileupload';
import React, { useEffect, useState } from 'react';

const ForeignFreedomFighters = () => {
    const [freedomFightersData, setFreedomFightersData] = useState([]);
    const [totalData, setTotalData] = useState(0);
    const [currentPage, setCurrentPage] = useState(0)
    const [filter, setFilter] = useState('')

    // useEffect(() => {

    //     var url = `http://localhost:5000/api/v1/freedomFighters?page=${parseInt(currentPage || 1)}&country=Bangladesh`

    //     if (filter) {
    //         url = `http://localhost:5000/api/v1/freedomFighters?page=${parseInt(currentPage || 1)}&force=${filter || {}}&country=Bangladesh`
    //     }

    //     fetch(url)
    //         .then(res => res.json())
    //         .then(data => {
    //             setFreedomFightersData(data.freedomFighters);
    //             setTotalData(data.totalFreedomFighterCount)
    //         })


    // }, [currentPage, filter])

    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formDataWithFile = new FormData();
        Object.keys(formData).forEach((key) => {
            formDataWithFile.append(key, formData[key]);
        });
        formDataWithFile.append("photo", file);

        // console.log(formDataWithFile.get("file"));

        const userData = {
            name: formDataWithFile.get("name"),
            email: formDataWithFile.get("email"),
            file: formDataWithFile.get("photo"),
        }


        fetch("http://localhost:5000/api/v1/freedomFighters", {
            method: "POST",
            headers: {
                'encType': 'multipart/form-data'
            },
            body: formDataWithFile
        });
        console.log(userData)
        // console.log(await response.json());

    };

    return (
        <div>
            <p className='text-primary text-2xl font-bold flex justify-center items-center'>Insert Freedom Fighter</p>

            <form onSubmit={handleSubmit} encType='multipart/form-data' className='flex flex-col gap-2 p-4'>
                <input type="text" name="name" onChange={handleChange} />
                <input type="email" name="email" onChange={handleChange} />
                {/* <input type="file" name='file' onChange={handleFileChange} /> */}
                <input name='photo' type="file" onChange={handleFileChange} className="file-input file-input-primary input-bordered file-input-sm w-full bg-white text-gray-400" />
                <button type="submit" className='btn btn-primary'>Submit</button>
            </form>
        </div>
    );
};

export default ForeignFreedomFighters;