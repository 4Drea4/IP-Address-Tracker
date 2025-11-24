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

getAPI("8.8.8.8").then(data => console.log(data));