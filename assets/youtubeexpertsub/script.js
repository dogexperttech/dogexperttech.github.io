const channels=['UCCdit1D68jqUOKne5tKBALA'];
    
    
    //Repeating Cards
    for(let i=0;i<channels.length;i++){ 
    
    document.getElementById("cards").insertAdjacentHTML("afterend",
 "<div class='col-lg-4 col-md-6'>"+
      "<div class='product-card-container'>"+
    "<div class='product-card' style='position:flex;align-items:center;'>"+
            "<div class='picture'>"+
                "<img class='img-fluid' src='https://dogexperttech.github.io/assets/expertyoutube.jpg'>"+
            "</div>"+
                        
            "<div class='team-content'>"+
                "<h1 style='margin-top:-20px;font-size:18px;text-transform:uppercase;' id='channelName-"+i+"'></h1>"+
               
               "<p style='font-size:350px;font-size:80px;margin-top:12px;' class='odometer animated fadeIn' id='odometer-"+i+"'></p>"+
                                       "<a href='https://www.youtube.com/channel/UCCdit1D68jqUOKne5tKBALA' target='blank'><button class='subscribe-btn'><svg xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' width='30' height='30'viewBox='0 0 172 172' style=' fill:#000000;position:absolute;margin-left:-13px'><g fill='none' fill-rule='nonzero' stroke='none' stroke-width='1' stroke-linecap='butt' stroke-linejoin='miter' stroke-miterlimit='10' stroke-dasharray='' stroke-dashoffset='0' font-family='none' font-weight='none' font-size='none' text-anchor='none' style='mix-blend-mode: normal'><path d='M0,172v-172h172v172z' fill='none'></path><g fill='#ffffff'><path d='M34.4,17.2c-3.16643,0 -5.73333,2.5669 -5.73333,5.73333c-0.00001,0.00747 -0.00001,0.01493 0,0.0224v63.04427v63.04427c-0.00001,0.00746 -0.00001,0.01493 0,0.02239c0,3.16643 2.5669,5.73333 5.73333,5.73333c1.19346,-0.00345 2.3561,-0.37925 3.32578,-1.075l0.0112,0.0112l113.71485,-62.52917c2.03773,-0.93223 3.34559,-2.96619 3.34817,-5.20703c0.00115,-2.30642 -1.37987,-4.38898 -3.50495,-5.28542l-113.55807,-62.45078h-0.0112c-0.97102,-0.69177 -2.13354,-1.06362 -3.32578,-1.0638z'></path></g></g></svg><span style='margin-left:25px;'>Subscribe</span></button></a>"+
                                                        
                                                        
                                                        
            "</div>"+
          "</div>"+
         "</div>"+
    "</div>");
    
  
    
    
    // Get Subscribers
  
    const youtubeKey = 'AIzaSyDO15RWFN3fEZGNIjvfGPXoz03J7yKMxY0';
    const youtubeUser = channels[i];
    const subCount = document.getElementById('odometer-'+i);
    const channelName = document.getElementById('channelName-'+i);
    const delay = 1000; // 10 min
    let getSubscribers = () => {

        fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${youtubeUser}&key=${youtubeKey}`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log(data);
            subCount.innerHTML = data["items"][0].statistics.subscriberCount;
            
            
        })

    }
    
    let getChannelName = () => {

        fetch(`https://www.googleapis.com/youtube/v3/channels?part=brandingSettings&id=${youtubeUser}&key=${youtubeKey}`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log(data);
            channelName.innerHTML = data["items"][0].brandingSettings.channel.title;
           // channelName.innerHTML = data["items"][0].statistics.channelName;
            
        })

    }/****/

    setInterval(() => {
        getSubscribers();
        getChannelName();
        
    }, delay);
    
    
    }
  
  
    
    
        
var odometer = new Odometer({ 
            el: $('.odometer')[0], 
            value: 0, 
            theme: 'minimal',
            duration: 3000
            });
            odometer.render();

        //$('.odometer').text(5446);
