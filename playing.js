const Base_url= " https://www.googleapis.com/youtube/v3" ;
const Api_key="AIzaSyAZrgjenrvAQGEkwm38zdPkBKls_bBwyK0";



let commentsDiv= document.getElementById("comments");
let statsDiv= document.getElementById("videoStats")
let relatedVideosDiv= document.getElementById("relatedVideo");
// let title= document.getElementById("vTitle");
// let logo= document.getElementById("channelLogo");
// let namee = document.getElementById("channelName");

function onPlayerReady(event) {
    event.target.playVideo();
}


window.addEventListener("load", ()=>{

    

    //     let loader= document.getElementById("loader")
    // loader.style.display="none";
    let storageObj= JSON.parse(localStorage.getItem("obj"));

    let relatedVideosArr= storageObj.videoList;

    // console.log(relatedVideosArr);
    // console.log(storageObj);
    let videoId= storageObj.videoId;
    let channelId= storageObj.channelId;
    let videoTitle= storageObj.videoTitle;
    let channelLogo_url= storageObj.channelLogo_url;
    let channelName= storageObj.channelName;
    let description= storageObj.desc;
    let likesCount = storageObj.likesCount;
    let viewsCount=  storageObj.viewsCount;

    // title.textContent= videoTitle;
    // logo.src= channelLogo_url;
    // namee.textContent= channelName

    

    // console.log(channelId);


    statsDiv.innerHTML=`
                <div>
                    <h2 id="vTitle">${videoTitle}</h2>
                </div>
                <div id="details-div">
                    <div id="details-div-col1">
                        <div id="logo-name-div">
                            <div id= "channel-img-div">
                                <img src=${channelLogo_url} alt="" id="channelLogo" height="100%" width="100%">
                            </div>
                            <div>
                                <h3 id="channelName">${channelName}</h3>
                                <h4 id="views-count">${viewsCount}</h4>
                            </div>
                        </div>
                        <div>
                            <button id= "subscribe-btn">Subscribe</button>
                        </div>
                    </div>


                    <div id="btns-div">
                        <button id="likesCount">${likesCount}</button>
                        <button>Share</button>
                        <button>Download</button>
                        <button id="more">---</button>
                    </div>
                </div>
                <div id="channel-desc">
                    ${description}
                </div>
                `

    // Showing related videos here -->
    function showRelatedVideos(arr){
        
        
        arr.map(relatedVideo=>{
            let relVdiv= document.createElement("div");
            relVdiv.id= "each-related-video"
            relVdiv.innerHTML=`
            <div id="related-Vimg">
                <img src=${relatedVideo.snippet.thumbnails.high.url} alt="">
            </div>
            <div id="related-title">
                    ${relatedVideo.snippet.title}
            </div>
            `
            relatedVideosDiv.appendChild(relVdiv);
        })
    }

    showRelatedVideos(relatedVideosArr);

    async function getComments(videoId){

        try{let response= await fetch(`${Base_url}/commentThreads?key=${Api_key}&videoId=${videoId}&maxResults=25&part=snippet`);
        // console.log(response);
        let responseData= await response.json();

        // console.log(responseData);
        // console.log(responseData.items);
        let comments= responseData.items;
        showComments(comments);
        
        }
        catch(err){
            console.log(err);
        }

    }
    

            

        
    
    getComments(videoId);

    function showComments(comments){
        comments.map(comment=>{
            let text= comment.snippet.topLevelComment.snippet.textDisplay;
            // console.log(text);
            let commentP= document.createElement("p");
            commentP.textContent=`Comment: ${text}`;
            commentsDiv.appendChild(commentP);
        })
    }

    if(YT){
         new YT.Player(
            document.getElementById("video-player-div"),
            {
                height:"500",
                width: "1000",
                videoId: videoId,
                events: {
                    'onReady': onPlayerReady
                  }
            }
            )
    }
    
});