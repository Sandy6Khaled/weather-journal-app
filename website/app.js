/* Global Variables */

// Create a new date instance dynamically with JS
/*adding +1 to the d.getMonth as that january return 0 not 1 */
let d = new Date();
let newDate = (d.getMonth()+1) +'.'+ d.getDate()+'.'+ d.getFullYear();
// Personal API Key for OpenWeatherMap API
/*personal api from login in the weather api in the udacity review and it is the personal api */
const apiKey = '379052ff75363922268d5998b4f7fefd&units=imperial';

// Event listener to add function to existing HTML DOM element
/*add event listener to the button by get it from its id adding click event with a call back function
with an async with try getting the zipcode and the input in the textra input and a condition if the zip code or the 
textra input gives an alert if the user doesn't put both of them else get the web Api data by taking the zipcode 
as a parameter and getting the temperature and put it in a const tempRes and gives it as a parameter and the input textra 
to the postWeatherData fuction and put it in a const setWeatherRes then get the project data from getProjectData 
then put the date and the temp and the feeling in its html tag by using getElementById and if there is an error catch it 
and give an alert */
document.getElementById('generate').addEventListener('click',async ()=>{
    try{
        const zipCode = document.getElementById('zip').value;
        const feeling = document.getElementById('feelings').value;
        if(!zipCode || !feeling){
            alert("Enter a Zip Code and Your Feeling.");
            return;
        }else{
            const tempRes= await gettingWebAPI(zipCode);
            console.log(tempRes);
            const setWeatherRes = await postWeatherData(tempRes,feeling);
            console.log(setWeatherRes);
            //console.log(await setWeatherRes.json());
            const projectData = await getProjectData();
            console.log(projectData);
            document.getElementById('date').innerHTML = projectData.date;
            document.getElementById('temp').innerHTML = projectData.temp + ' degree';
            document.getElementById('content').innerHTML = 'your feeling is '+ projectData.feeling;
        }
        
    }catch (error){
        console.log('error',error);
        alert("City Not Found Try again.");
    }
})


/* Function called by event listener */
/* Function to POST data */
/*postWeatherData is a function that takes temperature and the feeling from the inputs and set the weather data by fetch the 
api and send the data with json and set the weather data in the projectData object in the server file as a new data */
async function postWeatherData(temp,feel){
    const setWeather =await fetch('/setWeather',{
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            date: newDate,
            temp: temp,
            feeling: feel,
        })
    });
    return setWeather;
}

/* Function to GET Web API Data*/
/*fetch the get web api and get the temp from the weather api by taking the zipcode and the personal apikey  */
async function gettingWebAPI (codeZip){
    const baseUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${codeZip}&appid=${apiKey}`;
    const apiRes = await fetch(baseUrl);
    const apiData = await apiRes.json();
    console.log(apiData);
    const temp = apiData.main.temp;
    console.log(temp);
    return temp;
}

/* Function to GET Project Data */
/*get the projectData from fetching the api set in the server file and transfer it to json */
async function getProjectData(){
    const gettingWeatherRes = await fetch('/gettingWeather');
    const getWthRes = await gettingWeatherRes.json();
    return getWthRes;
}