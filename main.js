song="";
song1="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreLeftWrist=0;
scoreRightWrist=0;
check1="";
check2="";
function preload()
{
song1=loadSound("music.mp3");
song2=loadSound("music2.mp3");

}
function setup()
{
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose',gotPoses);
}
function draw()
{
    image(video,0,0,600,500);
    fill("#e3a8e0");
    stroke("#e3a8e0");
    check1=song1.isPlaying();
    check2=song2.isPlaying();
    if(scoreLeftWrist>0.2)
    {
        circle(leftWristX,leftWristY,20);
        song1.stop();
        if(check2==false)
        {
            song2.play();
        }
    }
    if(scoreRightWrist>0.2)
    {
        circle(rightWristX,rightWristY,20);
        song2.stop();
        if(check1==false)
        {
            song1.play();
        }
    }
}
function play()
{
    song1.play();
    song1.setVolume(1);
    song1.rate(1);
}
function modelLoaded()
{
    console.log("poseNet is Initialized");

}
function gotPoses(results)
{
    if(results.length>0)
    {
        console.log(results);
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        scoreRightWrist=results[0].pose.keypoints[10].score;
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("leftWristX="+leftWristX+"leftWristY="+leftWristY);
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("rightWristX="+rightWristX+"rightWristY="+rightWristY);
    }
}