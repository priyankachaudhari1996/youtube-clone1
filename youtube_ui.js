
function renderVideos(data){

    // console.log(data);
    let videoList= data.items;
    // console.log(videoList);

    videoList.forEach(videoInfo => {
        
        let videoDisplayDiv= document.createElement("div");
        videoDisplayDiv.className="video-display-div";
        let videoId= videoInfo.id.videoId;
        let thumbnail_url= videoInfo.snippet.thumbnails.high.url;
        let videoTitle= videoInfo.snippet.title;
        let channelName= videoInfo.snippet.channelTitle;
        let channelId= videoInfo.snippet.channelId;
        let desc= videoInfo.snippet.description;
        let channelLogo_url;
        let likesCount;
        let viewsCount;
        // console.log(channelId);

        videoDisplayDiv.addEventListener("click", ()=>{
            let obj={
                videoId,
                channelId,
                channelName,
                videoTitle,
                channelLogo_url,
                videoList,
                desc,
                likesCount,
                viewsCount
            }
            localStorage.setItem("obj", JSON.stringify(obj));
            window.location.href="./videoPlayer.html";
        })

        

        async function getStats(videoId){
            try{
    
                let response= await fetch(`${Base_url}/videos?key=${Api_key}&id=${videoId}&part=statistics`)
                let responseData= await response.json();
                // console.log(responseData);
                likesCount= responseData.items[0].statistics.likeCount
                viewsCount= responseData.items[0].statistics.viewCount

                function convertLikesandViews(data) {
                    if (data / 1000 >= 1 && data / 1000 <= 999) {
                      return (data / 1000).toFixed(1) + "K";
                    }
                    if (data / 1000000 >= 1 && data / 1000000 <= 999) {
                      return (data / 1000000).toFixed(1) + "M";
                    }
                    if (data / 1000000000 >= 1 && data / 1000000000 <= 999) {
                      return (data / 1000000000).toFixed(1) + "B";
                    } else {
                      return data;
                    }
                }
                likesCount= convertLikesandViews(likesCount);
                likesCount= likesCount+" Likes"
                viewsCount= convertLikesandViews(viewsCount);
                viewsCount= viewsCount+" views"

            }
            catch(err){
                console.log(err);
            }
    
        }
        getStats(videoId);

        // Function to fetch Channel LOGO by Channel ID-

        async function getChannelLogo(channelId){

            try {
                let logoResponse= await fetch(`${Base_url}/channels?key=${Api_key}&part=snippet&id=${channelId}`)
                const logoData= await logoResponse.json();

                channelLogo_url= logoData.items[0].snippet.thumbnails.high.url;
                // console.log("logoData",logoData);


                videoDisplayDiv.innerHTML=
                                        `<div class="video-thumbnail"><img src="${thumbnail_url}" alt=""></div>
                                            <div class="below-img-info">
                                                <div class="channel-logo-div"><img src="${channelLogo_url}" alt="channel-logo"></div>
                                                <div >
                                                    <p>${videoTitle}</p>
                                                    <h4 class="channel-name">${channelName} </h4>
                                                    <p>${viewsCount}</p>
                                                </div>
                                            </div>
                                        `

                allVideosContainer.appendChild(videoDisplayDiv);

                
            } 
            catch (err) {
                console.log(err);
            }
        }
        getChannelLogo(channelId);
        
        
    });
}