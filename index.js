let api_key = 'VNKey9QQZ79QgJJv1eduqLtb761K0xWaSMQEuGQr'
let searchURL = 'https://developer.nps.gov/api/v1/parks'


function pressSubmit() {
    $('#submitPark').on('click', function(s) {
        s.preventDefault();
        let search = $('#submitPark').val();
        getNationalParks(search);
    })
}


function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}



function getNationalParks(search) {
    let limits = $('#limit').val();
    const params = {
        limit: limits != "" ? limits : 10,
        q: search,
        api_key: api_key,
    };



    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString;


    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } 
            throw new Error(response.statusText)
        })
        .then(responseJson => displayParks(responseJson))
        .catch(err => console.log(err.message))


} 


function displayParks(responseJson) {
    console.log('displayParks ran!')
    console.log(responseJson)
    $('.results').removeClass('hidden');
     for (let i=0; i < responseJson.data.length; i++) {
         console.log(responseJson.data[i].fullName)
         $('.resultsList').append(`
         <li> 
            <p><a href="${responseJson.data[i].url}">${responseJson.data[i].fullName}</a></p>
            <p>${responseJson.data[i].description}</p>
        </li>
         `)

    }
}


$(pressSubmit);