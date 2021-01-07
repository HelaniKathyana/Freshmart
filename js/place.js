var user = {
    id : "8B998DBC-5C43-4A9D-AA71-FDF522CA65B2"
}

var placeId = "CA2FEDB9-09E5-4855-A8E5-47769844AFD8"
async function initializePage(){
    await request({
        method: "GET",
        uri: `https://localhost:5000/api/values/${user.id}/place-details/${placeId}`,
        json: true,
      }).then(body => {
        //const data = JSON.parse(body);
        //this.ask(data.user.name);
        console.log(body);
      }).catch(e => console.log(e));

}

async function getPlaces(){
  var places = null
  await request({
    method: "GET",
    uri: `${backendBaseUrl}/api/values/places`,
    json: true,
  }).then(body => {
    //const data = JSON.parse(body);
    //this.ask(data.user.name);
    console.log(body);
    places = body;
  }).catch(e => console.log(e));

  return places;
}

function getPlaceDetails (method,url){

}
