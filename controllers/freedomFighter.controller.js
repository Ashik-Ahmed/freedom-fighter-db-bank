exports.getFreedomFighter = async () => {
    const result = await fetch('http://localhost:5000/api/v1/freedomFighters', {
        next: {
            revalidate: 10
        }
    })

    // const fredomFighters = JSON.parse(JSON.stringify(result));

    return result.json();
}