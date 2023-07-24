import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Checkbox } from 'primereact/checkbox';
import React, { useState } from 'react';
import Cookies from 'universal-cookie';

const FilterCriteria = ({ category, toast }) => {

    const cookies = new Cookies()

    const [criterias, setCriterias] = useState(category.priorityCriterias)
    const [buttonActive, setButtonActive] = useState(false)

    const onCriteriaChange = (e) => {
        setButtonActive(true)
        let _criterias = [...criterias];

        // console.log(e.value.value);

        if (e.checked)
            _criterias.push(e.value);
        else {
            // console.log(e.value);
            // console.log(e.value.value, 'index: ', _criterias.findIndex(criteria => criteria.value === e.value.value));
            _criterias.splice(_criterias.findIndex(criteria => criteria.value === e.value.value), 1);
        }

        setCriterias(_criterias);
    }


    const priorityCriterias = [
        { label: 'Name', value: 'name' },
        { label: 'Invitation_Count', value: 'invitationCount' },
        { label: 'Freedom_Fighter_Rank', value: 'freedomFighterRank.point' },
        { label: 'Official_Rank', value: 'officialRank.point' },
    ]

    const handleUpdateCriteria = (memberCategory) => {
        console.log(memberCategory, criterias);
        const priorityCriteria = criterias;

        const url = `http://localhost:5000/api/v1/memberCategory/${memberCategory._id}`

        fetch(url, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${cookies.get("TOKEN")}`
            },
            body: JSON.stringify(priorityCriteria)
        })
            .then(res => res.json())
            .then(data => {
                if (data?.status == 'Success') {
                    setButtonActive(false)
                    toast.current.show({ severity: 'success', summary: 'Success', detail: 'Priority Criteria updated', life: 3000 })
                }
                else {
                    toast.current.show({ severity: 'error', summary: 'Error', detail: data.error, life: 3000 });
                }
            })
    }

    return (
        <Card title={category.name}>
            <div className="flex flex-wrap justify-content-start gap-3">
                {
                    priorityCriterias.map((filterCriteria, index) => {
                        return (
                            <div key={index} className="flex align-items-center">
                                <Checkbox onChange={onCriteriaChange} inputId={filterCriteria.label} name={filterCriteria.label} value={filterCriteria} checked={criterias.map(criteria => { return criteria.value }).includes(filterCriteria.value)} />
                                <label htmlFor={filterCriteria.label} className="ml-2">{filterCriteria.label}</label>
                            </div>
                        )
                    })
                }
            </div>

            <Button onClick={() => handleUpdateCriteria(category)} disabled={!buttonActive} label="Submit" className='p-button-info p-button-sm mt-4' />

        </Card>
    );
};

export default FilterCriteria;