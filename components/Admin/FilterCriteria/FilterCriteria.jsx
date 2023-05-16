import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Checkbox } from 'primereact/checkbox';
import React, { useState } from 'react';

const FilterCriteria = ({ category }) => {

    const [criterias, setCriterias] = useState([])

    const onCriteriaChange = (e) => {
        let _criterias = [...criterias];

        if (e.checked)
            _criterias.push(e.value);
        else
            _criterias.splice(_criterias.indexOf(e.value), 1);

        setCriterias(_criterias);
        const crts = criterias.map(criteria => { return criteria.value })
    }


    const filterCriterias = [
        { label: 'Name', value: 'name' },
        { label: 'Invitation_Count', value: 'invitationCount' },
        { label: 'Freedom_Fighter_Rank', value: 'freedomFighterRank.point' },
        { label: 'Official_Rank', value: 'officialRank.point' },
    ]

    const handleUpdateCriteria = (memberCategory) => {
        console.log(memberCategory);
    }

    return (
        <Card title={category.name}>
            <div className="flex flex-wrap justify-content-start gap-3">
                {
                    filterCriterias.map((filterCriteria, index) => {
                        return (
                            <div key={index} className="flex align-items-center">
                                <Checkbox onChange={onCriteriaChange} inputId={filterCriteria.label} name={filterCriteria.label} value={filterCriteria} checked={criterias.map(criteria => { return criteria.value }).includes(filterCriteria.value)} />
                                <label htmlFor="ingredient1" className="ml-2">{filterCriteria.label}</label>
                            </div>
                        )
                    })
                }
            </div>

            <Button onClick={() => handleUpdateCriteria(category.name)} disabled={criterias.length == 0} label="Submit" className='p-button-info p-button-sm mt-4' />

        </Card>
    );
};

export default FilterCriteria;