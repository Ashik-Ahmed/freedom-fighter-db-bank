exports.getFreedomFighters = async (page) => {
    const url = `http://localhost:5000/api/v1/freedomFighters?page=${page}`
    console.log(url);
    const result = await fetch(url, {
        next: {
            revalidate: 10
        }
    }).then(res => res.json())

    console.log(result);

    // const fredomFighters = JSON.parse(JSON.stringify(result));

    return result;
}


// get a single freedom fighter form DB 
exports.getSingleFreedomFighter = async (freedomFighterId) => {

    const result = await fetch(`http://localhost:5000/api/v1/freedomFighters/${freedomFighterId}`)
        .then(res => res.json());

    return result[0];
}