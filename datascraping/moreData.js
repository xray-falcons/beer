const axios = require('axios')

const getBeer = async() => {
    try {
        const {data} = await axios.get('https://api.brewerydb.com/v2/?&name=Brooklyn&key=3334899a170bab1fca77841574dc587f')
        console.log(data.data)
    } catch (error) {
        console.log('houston, we have a problem')
    }
}

getBeer()
