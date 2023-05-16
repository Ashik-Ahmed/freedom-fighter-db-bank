import React from 'react';
import { Card } from 'primereact/card';
import { Checkbox } from 'primereact/checkbox';
import { useState } from 'react';
import { useEffect } from 'react';

const ManageFilterCriteria = () => {

    const [criterias, setCriterias] = useState([])
    const [categories, setCategories] = useState([])

    const getAllCategories = () => {
        setLoading(true)
        fetch('http://localhost:5000/api/v1/memberCategory')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setCategories(data.data)
                setLoading(false)
            })
    }

    useEffect(() => {
        getAllCategories()
    }, [])

    const onCriteriaChange = (e) => {
        let _criterias = [...criterias];

        if (e.checked)
            _criterias.push(e.value);
        else
            _criterias.splice(_criterias.indexOf(e.value), 1);

        setIngredients(_criterias);
    }

    return (
        <div>
            <Card title="Freedom Fighter">
                <div className="flex flex-wrap justify-content-start gap-3">
                    <div className="flex align-items-center">
                        <Checkbox onChange={onCriteriaChange} inputId="ingredient1" name="pizza" value="Cheese" checked={criterias.includes('Cheese')} />
                        <label htmlFor="ingredient1" className="ml-2">Cheese</label>
                    </div>
                    <div className="flex align-items-center">
                        <Checkbox onChange={onCriteriaChange} inputId="ingredient2" name="pizza" value="Mushroom" checked={criterias.includes('Mushroom')} />
                        <label htmlFor="ingredient2" className="ml-2">Mushroom</label>
                    </div>
                    <div className="flex align-items-center">
                        <Checkbox onChange={onCriteriaChange} inputId="ingredient3" name="pizza" value="Pepper" checked={criterias.includes('Pepper')} />
                        <label htmlFor="ingredient3" className="ml-2">Pepper</label>
                    </div>
                    <div className="flex align-items-center">
                        <Checkbox onChange={onCriteriaChange} inputId="ingredient4" name="pizza" value="Onion" checked={criterias.includes('Onion')} />
                        <label htmlFor="ingredient4" className="ml-2">Onion</label>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default ManageFilterCriteria;