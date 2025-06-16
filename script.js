//Data comes from two places: form & API
//We can't make the api call until the user fills out the form
//So first, run the form to start the submit function
// then, pass data from submit function to api call
//once we get the API data, we can render the image to the user/display to user

const form = document.querySelector("#nasa-form");
const result = document.querySelector("#result")

form.addEventListener("submit", onFormSubmit);

function onFormSubmit(event) {
	event.preventDefault();
	const data = new FormData(event.target);
	const dataObject = Object.fromEntries(data.entries());
	console.log(dataObject);
	getNasaPhoto(dataObject.date);
	form.reset();
}

function getNasaPhoto(date) {
	const url = `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${date}`;
	fetch(url)
		.then(response => response.json())
		.then(data => {
			console.log(data)
			showData(data)
	})
		.catch(error => console.error("API Error:", err))
}

function showData(data) {
	result.innerHTML = `
		<h3>${data.title}</h3>
		<img src="${data.url}" alt="${data.title}" />
`
}