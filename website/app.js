/* Global Variables */

const base_URL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const ID = 'appid=e0051db9c1d6d72491bec735be14f1c4';

document.getElementById('generate').addEventListener('click', calculate);

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

/* Function called by event listener */
function calculate() {
	const zip = document.getElementById('zip').value;
	const content = document.getElementById('feelings').value;

	getWeatherData(base_URL, zip, ID)
		.then(function (data) {
			postData('/post', {
				temp: data.main.temp,
				date: newDate,
				userResponse: content
			});
			dynamicallyUpdateUI('/all');
		
}
)};

const getWeatherData = async(base_URL, zip, ID) => {
	const respnse = await fetch(base_URL + zip + '&' + ID);	
	const data = await respnse.json()
		//console.log(data);
		return data;
	
}

const postData = async(url = '', data = {}) => {
	//console.log(data);
	const response = await fetch(url, {
		method: 'POST', 
		credentials: 'same-origin', 
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data), 
	});
     const Data = await response.json();
     return Data;
		
}

const dynamicallyUpdateUI  = async(url='') => {
    const request = await fetch(url);
    const data = await request.json();

        document.getElementById('date').innerHTML = data.date;
        document.getElementById('temp').innerHTML = data.temperature;
        document.getElementById('content').innerHTML = data.userResponse;
   
};
