const useFreedomFighters = (currentPage, filter) => {
    var url = `http://localhost:5000/api/v1/freedomFighters?page=${parseInt(currentPage || 1)}&country=Bangladesh`

    if (filter) {
        url = `http://localhost:5000/api/v1/freedomFighters?page=${parseInt(currentPage || 1)}&force=${filter || {}}&country=Bangladesh`
    }

    const data = fetch(url)
        .then(res => res.json())
    // .then(data => {
    //     setFreedomFightersData(data.freedomFighters);
    //     setTotalData(data.totalFreedomFighterCount);
    // })

    return data;
}

export default useFreedomFighters;