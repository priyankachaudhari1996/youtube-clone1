const Base_url= " https://www.googleapis.com/youtube/v3" ;
const Api_key="AIzaSyAZrgjenrvAQGEkwm38zdPkBKls_bBwyK0";

const allVideosContainer = document.getElementById("videos");




async function fetchVideos(searchQuery){

    // if(searchQuery==="" || searchQuery==="undefined"){
    //     document.title= "Youtube-video"
    // }
    // else{
    //     document.title=
    // }

    try{
        const response= await fetch(`${Base_url}/search?key=${Api_key}&type=video&part=snippet&q=${searchQuery}&maxResults=20`);
        const data= await response.json();
        renderVideos(data);

    }
    catch(err){
        console.log(err);
    }

    // console.log(data);
    // console.log(data.items);
    // console.log(data.items[0].snippet);
}


//  for initial state -->
fetchVideos("");
let form= document.getElementById("form");


form.addEventListener("submit" , (e)=>{
    e.preventDefault();
    let searchQuery= form.searchQuery.value;
    // console.log(searchQuery)
    allVideosContainer.innerHTML="";
    fetchVideos(searchQuery);
})
