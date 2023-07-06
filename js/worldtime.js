
const countries = [
    { name: "United States", code: "US", timeZone: "America/New_York" },
    { name: "United Kingdom", code: "GB", timeZone: "Europe/London" },
    { name: "Germany", code: "DE", timeZone: "Europe/Berlin" },
    { name: "India", code: "IN", timeZone: "Asia/Kolkata" },
    { name: "Japan", code: "JP", timeZone: "Asia/Tokyo" },
    { name: "China", code: "CN", timeZone: "Asia/Shanghai" },
    { name: "Brazil", code: "BR", timeZone: "America/Sao_Paulo" },
    { name: "Australia", code: "AU", timeZone: "Australia/Sydney" },
    { name: "Canada", code: "CA", timeZone: "America/Toronto" },
    { name: "France", code: "FR", timeZone: "Europe/Paris" },
    { name: "Russia", code: "RU", timeZone: "Europe/Moscow" },
    { name: "South Africa", code: "ZA", timeZone: "Africa/Johannesburg" },
    { name: "Mexico", code: "MX", timeZone: "America/Mexico_City" },
    { name: "Italy", code: "IT", timeZone: "Europe/Rome" },
    { name: "Spain", code: "ES", timeZone: "Europe/Madrid" },
    { name: "Argentina", code: "AR", timeZone: "America/Argentina/Buenos_Aires" },
    { name: "Egypt", code: "EG", timeZone: "Africa/Cairo" },
    { name: "Netherlands", code: "NL", timeZone: "Europe/Amsterdam" },
    { name: "Saudi Arabia", code: "SA", timeZone: "Asia/Riyadh" },
    { name: "South Korea", code: "KR", timeZone: "Asia/Seoul" },
    { name: "Turkey", code: "TR", timeZone: "Europe/Istanbul" },
    { name: "Indonesia", code: "ID", timeZone: "Asia/Jakarta" },
    { name: "Poland", code: "PL", timeZone: "Europe/Warsaw" },
    { name: "Sweden", code: "SE", timeZone: "Europe/Stockholm" },
    { name: "Switzerland", code: "CH", timeZone: "Europe/Zurich" },
    { name: "Belgium", code: "BE", timeZone: "Europe/Brussels" },
    { name: "Austria", code: "AT", timeZone: "Europe/Vienna" },
    { name: "Norway", code: "NO", timeZone: "Europe/Oslo" },
    { name: "Denmark", code: "DK", timeZone: "Europe/Copenhagen" },
    { name: "Finland", code: "FI", timeZone: "Europe/Helsinki" },
    { name: "Greece", code: "GR", timeZone: "Europe/Athens" },
    { name: "Portugal", code: "PT", timeZone: "Europe/Lisbon" },
    { name: "Ireland", code: "IE", timeZone: "Europe/Dublin" },
    { name: "New Zealand", code: "NZ", timeZone: "Pacific/Auckland" },
    { name: "UAE", code: "AE", timeZone: "Asia/Dubai" },
    { name: "Singapore", code: "SG", timeZone: "Asia/Singapore" },
    { name: "Malaysia", code: "MY", timeZone: "Asia/Kuala_Lumpur" },
    { name: "Colombia", code: "CO", timeZone: "America/Bogota" },
    { name: "Chile", code: "CL", timeZone: "America/Santiago" },
    { name: "Peru", code: "PE", timeZone: "America/Lima" },
    { name: "Nigeria", code: "NG", timeZone: "Africa/Lagos" },
    { name: "Vietnam", code: "VN", timeZone: "Asia/Ho_Chi_Minh" },
    { name: "Thailand", code: "TH", timeZone: "Asia/Bangkok" },
    { name: "Iran", code: "IR", timeZone: "Asia/Tehran" },
    { name: "Maldives", code: "MV", timeZone: "Indian/Maldives" },
    { name: "Kenya", code: "KE", timeZone: "Africa/Nairobi" },
    { name: "Pakistan", code: "PK", timeZone: "Asia/Karachi" },
    { name: "Israel", code: "IL", timeZone: "Asia/Jerusalem" },
    { name: "Czech Republic", code: "CZ", timeZone: "Europe/Prague" },
    { name: "Romania", code: "RO", timeZone: "Europe/Bucharest" },
    { name: "Philippines", code: "PH", timeZone: "Asia/Manila" },
    { name: "Hungary", code: "HU", timeZone: "Europe/Budapest" },
    { name: "Slovakia", code: "SK", timeZone: "Europe/Bratislava" },
];

function getCurrentTime(country) {
    const options = {
        timeZone: country.timeZone,
        hour12: false,
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    };
    return new Date().toLocaleTimeString([], options);
}

const clockContainer = document.querySelector(".clock-container");
const search = document.getElementById("search");
const clocksearchcontainer = document.querySelector(".clock-searchcontainer");


function getCountryTime (country) {
    const clockCard = document.createElement("div");
    clockCard.classList.add("clock-card");

    const countryName = document.createElement("div");
    countryName.classList.add("country-name")
    countryName.textContent = country;

    const currentTime = document.createElement("div");
    currentTime.classList.add("current-time");
    currentTime.textContent = getCurrentTime(country);
    console.log(currentTime)
    console.log(countryName)
    clockCard.appendChild(countryName);
    clockCard.appendChild(currentTime);
    clocksearchcontainer.appendChild(clockCard);
}

function searchCountry()
{
    const inputElement = document.getElementById("search");
    const inputValue = inputElement.value;
    
    const pattern = /^[A-Z][a-zA-Z]*$/;
    const isValid = pattern.test(inputValue);
    
    if (!isValid) {
      alert("Please enter a valid input with the first letter capitalized and only alphabets.");
      // You can optionally reset the input value here if desired
      // inputElement.value = "";
    }
    const searchTerm = document.getElementById("search").value
    console.log(searchTerm)

    if (searchTerm == "")
    {
        clockContainer.classList.remove("d-none");
    }else{
        clockContainer.classList.add("d-none");
    }


    countries.forEach((country)=>{
        if(country.name==searchTerm){
            getCountryTime(country.name);
        }else{
            console.log("No data")
        }
    })
}


countries.forEach((country) => {
    const clockCard = document.createElement("div");
    clockCard.classList.add("clock-card");

    const countryName = document.createElement("div");
    countryName.classList.add("country-name");
    countryName.textContent = country.name;

    const currentTime = document.createElement("div");
    currentTime.classList.add("current-time");
    currentTime.textContent = getCurrentTime(country);

    clockCard.appendChild(countryName);
    clockCard.appendChild(currentTime);
    clockContainer.appendChild(clockCard);
});

setInterval(() => {
    const currentTimeElements = document.querySelectorAll(".current-time");

    currentTimeElements.forEach((element, index) => {
        element.textContent = getCurrentTime(countries[index]);
    });
}, 1000);



// Function to get the time of a county using an API
async function getTimeOfCounty(county) {
    const apiUrl = `https://timeapi.io/api/Time/current/zone?timeZone=${encodeURIComponent(county)}`;


    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log('Error:', error);
    }
}

// Example usage
const counties = ['Asia/Kolkata', 'America/New_York', 'Europe/London'];

counties.forEach((county) => {
    getTimeOfCounty(county);
});


