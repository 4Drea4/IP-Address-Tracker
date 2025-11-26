const searchIP = document.getElementById("search");
const searchButton = document.getElementById("search-btn");
const ipText = document.querySelector(".ip-text");
const locationText = document.querySelector(".location-text");
const timezoneText = document.querySelector(".timezone-text");
const ispText = document.querySelector(".isp-text");
const inputError = document.getElementById("IpError");

//function to bring in api ip data
async function getAPI(api){
  const apiKey = "at_Dw02MjcDxw7tH0ttIuN7b1nlHrV1J";
  const apiUrl = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${api}`;
  const response = await fetch(apiUrl);
    
        if(!response.ok){
            throw new Error("Could not get api data")
        }
    
        const apiData = await response.json();
        return apiData;
}

// getAPI("8.8.8.8").then(data => console.log(data)); // Testing to make sure it works

//event listener on button
searchButton.addEventListener("click", async () => {
    const userIp = searchIP.value.trim();

    if(!searchIP.checkValidity()){
        inputError.textContent = "This is not a proper IP address";
        return;
     }

     
    const userData = await getAPI(userIp); //getting users ip from the input of their search
    console.log("This button was clicked", userData); //console log to ensure it was successful
    displayDetails(userData);//making sure its pulling
    updateMap(userData);
    
    
    return(searchIP);
});
//"mapping" api info
function displayDetails (apiData){
    ipText.textContent = apiData.ip;
    //change the location to be what the api info is
    locationText.textContent = `${apiData.location.city}, ${apiData.location.country}`;
    timezoneText.textContent = `${apiData.location.timezone}`;
    ispText.textContent = apiData.isp ;
}


// map
const map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
//change to pull in coordinates from API
}).addTo(map);

let pin = L.marker([51.505, -0.09]).addTo(map);

function updateMap (apiData){
    let latitude = apiData.location.lat;
    let longitude = apiData.location.lng;
    console.log("This is your", longitude ,"and", latitude, "of your IP Address")
    map.setView([latitude, longitude],13);
    pin.setLatLng([latitude, longitude],13);
}
//display error when improperly inputting an ip
