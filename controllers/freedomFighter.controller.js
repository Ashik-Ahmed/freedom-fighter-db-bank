
exports.getFreedomFighters = async (page) => {
    const url = `http://localhost:5000/api/v1/freedomFighters?page=${page}`
    const result = await fetch(url, {
        next: {
            revalidate: 10
        }
    }).then(res => res.json())


    // const fredomFighters = JSON.parse(JSON.stringify(result));

    return result;
}


// get a single freedom fighter form DB 
exports.getSingleFreedomFighter = async (freedomFighterId, token) => {

    console.log('api called with token:', token);
    const result = await fetch(`http://localhost:5000/api/v1/freedomFighters/${freedomFighterId}`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`
        }
    })
        .then(res => res.json());

    return result[0];
}