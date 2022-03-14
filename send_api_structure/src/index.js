const sendAPI = require('./sendAPI');
const apiStructure = require('./datasource/flightAPIStructure.json');
const fs = require('file-system');

let genAPIArray = [];
let apiName = 'FlightNew';
let apiNameAndID = '';


let genAPIJson = fs.readFileSync('datasource/generatedAPIs.json');

if (genAPIJson.length !== 0) {
    genAPIArray = JSON.parse(genAPIJson.toString());
    genAPIArray.map(api => {
        if (api.apiName === apiName) {
            apiNameAndID = api;
        }
    })
}

if (apiNameAndID !== '') {
    console.log('API already created!');
    console.log('Name: ' + apiNameAndID.apiName);
    console.log('GUID: ' + apiNameAndID.uuid);
    return apiNameAndID;
}


const flightAPIStruc = new sendAPI({userName: '', password: ''})

createAPI().then(res => console.log(res.status));

async function createAPI() {
    let response = await flightAPIStruc.buildAPI({payload: apiStructure});

    if (response.status === 200) {
        genAPIArray.push({ apiName: apiName, uuid: response.data })
        genAPIJson = JSON.stringify(genAPIArray);
        fs.writeFileSync('datasource/generatedAPIs.json', genAPIJson);
        return response;
    } else {
        console.log('Status: ' + response.status + ' Reason: ' + response.data);
    }

}

