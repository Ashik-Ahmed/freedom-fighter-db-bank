import React from 'react';
import { Card } from 'primereact/card';
import { Checkbox } from 'primereact/checkbox';
import { useState } from 'react';
import { useEffect } from 'react';
import { Button } from 'primereact/button';

const ManageFilterCriteria = () => {

    const [criterias, setCriterias] = useState([])
    const [categories, setCategories] = useState([])

    const getAllCategories = () => {
        // setLoading(true)
        fetch('http://localhost:5000/api/v1/memberCategory')
            .then(res => res.json())
            .then(data => {
                console.log(data.data);
                setCategories(data.data)
                // setLoading(false)
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


    const filterCriterias = [
        { label: 'Name', value: 'name' },
        { label: 'Invitation Count', value: 'invitationCount' },
        { label: 'Freedom Fighter Rank', value: 'freedomFighterRank.point' },
        { label: 'Official Rank', value: 'officialRank.point' },
    ]


    return (
        <div className='flex flex-col gap-2'>
            {
                categories.map((category, index) => {
                    return (
                        <Card key={index} title={category.name}>
                            <div className="flex flex-wrap justify-content-start gap-3">
                                {
                                    filterCriterias.map((filterCriteria, index) => {
                                        return (
                                            <div key={index} className="flex align-items-center">
                                                <Checkbox onChange={onCriteriaChange} inputId="ingredient1" name="pizza" value="Cheese" checked={criterias.includes('Cheese')} />
                                                <label htmlFor="ingredient1" className="ml-2">{filterCriteria.label}</label>
                                            </div>
                                        )
                                    })
                                }
                                {/* <div className="flex align-items-center">
                                    <Checkbox onChange={onCriteriaChange} inputId="ingredient2" name="pizza" value="Mushroom" checked={criterias.includes('Mushroom')} />
                                    <label htmlFor="ingredient2" className="ml-2">Invitation Count</label>
                                </div>
                                <div className="flex align-items-center">
                                    <Checkbox onChange={onCriteriaChange} inputId="ingredient3" name="pizza" value="Pepper" checked={criterias.includes('Pepper')} />
                                    <label htmlFor="ingredient3" className="ml-2">Freedom Fighter Rank</label>
                                </div>
                                <div className="flex align-items-center">
                                    <Checkbox onChange={onCriteriaChange} inputId="ingredient4" name="pizza" value="Onion" checked={criterias.includes('Onion')} />
                                    <label htmlFor="ingredient4" className="ml-2">Official Rank</label>
                                </div> */}
                            </div>

                            <Button label="Submit" className='p-button-info p-button-sm mt-4' />

                        </Card>
                    )
                })
            }

        </div>
    );
};

export default ManageFilterCriteria;