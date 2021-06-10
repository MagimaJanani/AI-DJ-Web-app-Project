song1="";
song2="";
song1status="";
song2status="";
scoreLeftWrist=0;
scoreRightWrist=0;
function preload(){
    song1=loadSound("Auli'i Cravalho - How Far I'll Go.mp3");
    song2=loadSound("music.mp3");
}
function setup() {
    canvas=createCanvas(600,500);
    canvas.center();
    
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
 function draw() {
     image(video,0,0,600,500);

     fill("#FF0000");
     stroke("#FF0000");
     song1status=song1.isPlaying();
     song2status=song2.isPlaying();
    if(scoreLeftWrist > 0.2){
      
     circle(leftWristX,leftWristY,20);
     song1.stop();
     if(song2status==false){
         song2.play();
         document.getElementById("speed").innerHTML="playing:Music.mp3"
     }
    }
    if(scoreRightWrist > 0.2){
      
        circle(RightWristX,RightWristY,20);
        song2.stop();
        if(song1status==false){
            song1.play();
            document.getElementById("speed").innerHTML="playing:How Far I'll Go.mp3"
        }
       }

 }

 function modelLoaded(){
 console.log("poseNet is Intialized");
 }

 function gotPoses(results){
    if (results.length > 0){
        console.log(results);
        scoreRightWrist=results[0].pose.keypoints[10].score;
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = "+scoreLeftWrist);

    leftWristX= results[0].pose.leftWrist.x;
    leftWristY= results[0].pose.leftWrist.y;
    console.log("LeftWristX = "+ leftWristX +"leftWristY = "+ leftWristY);

    rightWristX= results[0].pose.rightWrist.x;
    rightWristY= results[0].pose.rightWrist.y;
    console.log("rightWristX = "+ rightWristX +"rightWristY = "+ rightWristY);

    }
     
   
    
} 

 function play(){
 song1.play();
 song2.play();
 }