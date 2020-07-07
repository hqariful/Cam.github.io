function setup()
{ 
createCanvas(displayWidth,displayHeight)
  background(0)
  angleMode(DEGREES)
  noLoop()
}


function draw()
{
  var r=50
  var h=20//displacement
  var R=20//resolution
  //var g=0;
  let xPos=[];
  let yPos=[];

  annotate()
  
  function annotate()
  {
  let t="Cam 2.0"
  textSize(width*0.1)
  fill(255)
  textAlign(CENTER,CENTER)
  text(t,width/2,height*0.05)
  
  stroke(255)
  noFill()
  rect(width/4,height*0.4,width/2,height/3)
  
  inp1=createInput(0,'number')
  inp1.size(30)
  inp1.position(width*0.35,height*0.15)
  s1=createSelect();
  s1.position(width*0.6,height*0.15)
  s1.option("linear")
  s1.option("simple harmonic")
  s1.option("uniform acceleration")
  inp2=createInput(0,'number')
  inp2.size(30)
  inp2.position(width*0.35,height*0.2)
  inp3=createInput(0,'number')
  inp3.size(30)
  inp3.position(width*0.35,height*0.25)
  s3=createSelect();
  s3.position(width*0.6,height*0.25)
  s3.option("linear")
  s3.option("simple harmonic")
  s3.option("uniform acceleration")
  let submit=createButton("submit")
  let cL=createButton("clear")
   submit.position(width*0.85,height*0.35)
  submit.mousePressed(start)
  cL.position(width*0.1,height*0.35)
  cL.mousePressed(clean)
  rad=createInput(0,'number')
  rad.size(30)
  rad.position(width*0.35,height*0.3)
  disp=createInput(0,'number')
  disp.size(30)
  disp.position(width*0.75,height*0.3)
  
  textSize(width*0.04)
  fill(255)
  noStroke()
  textAlign(LEFT)
  let txt1="OutStroke:"
  let txt2="Dwell:"
  let txt3="Return Stroke:"
  let txt4="base circle radius:"
  let txt5="type:"
  let txt6="displacement:"
  text(txt1,0,height*0.15)
  text(txt2,0,height*0.2)
  text(txt3,0,height*0.25)
  text(txt4,0,height*0.3)
  text(txt5,width*0.47,height*0.15)
  text(txt5,width*0.47,height*0.25)
  text(txt6,width*0.47,height*0.3)
  
  function start()
  {
    var aS=inp1.value()
    var aD=inp2.value()
    var aR=inp3.value()
    //var r=rad.value()
    var g;//type of motion 0:line 1:shm 2:uniform
    translate(width/2,height*0.58)
    baseCir(r)
    if(s1.value()=="linear")g=0
    else if(s1.value=="simple harmonic")g=1
    else g=2
    outStroke(aS,g)
    dwell(aD)
    if(s3.value()=="linear")g=0
    else if(s3.value=="simple harmonic")g=1
    else g=2
    rtnStroke(aR,g)
  }
  function clean()
  {
    clear()
    setup()
    draw()
  }
  
  }
  
  function shm(A,u,g)
  {
  if(g==0){
  for(let i=0;i<R+1;i++)
  {
    let ang=map(i,0,R,0,-A)
    let H=map(i,0,R,u,h-u)
    let x=cos(ang)*(r/2+H);
    let y=sin(ang)*(r/2+H)
    xPos.push(x);
    yPos.push(y);
  }
  }
  if(g==1){
  for(let i=0;i<R+1;i++)
  {
    let ang=map(i,0,R,0,-A)
    let H=map(i,0,R,u,90-u)
    let x=cos(ang)*(r/2+h*sin(H));
    let y=sin(ang)*(r/2+h*sin(H))
    xPos.push(x);
    yPos.push(y);
  }
  }
  if(g==2){
  for(let i=0;i<R+1;i++)
  {
    let ang=map(i,0,R,0,-A)
    let H=map(i,0,R,u,R-u)
    if(H<(R/2)){
      let o=2*h*pow((H/R),2)
      let x=cos(ang)*(r/2+o);
      let y=sin(ang)*(r/2+o)
      xPos.push(x);
      yPos.push(y);
    }
    else if(H>=(R/2)){
      let o=h-2*h*pow(((H-R)/R),2)
      let x=cos(ang)*(r/2+o);
      let y=sin(ang)*(r/2+o)
      xPos.push(x);
      yPos.push(y);
    }
  }
  }
  }
  
  function baseCir(r)
  {
    stroke(255)
    noFill()
    drawingContext.setLineDash([3,3])
    ellipse(0,0,r)
  }
    
  function outStroke(aS,g)
  {
    rotate(-90)
    stroke(255)
    shm(aS,0,g,r)
    drawingContext.setLineDash([])
    for(let i=0;i<R;i++)
    {
      let x=xPos[i]
      let y=yPos[i]
      let px=xPos[i+1]
      let py=yPos[i+1]
      line(x,y,px,py)
    }
    
    line(0,0,50,0)
    rotate(-aS)
    line(0,0,50,0)
  }
  
  function dwell(aD)
  {
    arc(0,0,r+2*h,r+2*h,-aD,0)
    rotate(-aD)
    line(0,0,50,0)
  }
  
  function rtnStroke(aR,g)
  {
    xPos=[]
    yPos=[]
    var w
    if(g==0) w=h;
    else if(g==1) w=90;
    else if(g==2) w=R
    shm(aR,w,g,r)
    for(let i=0;i<R;i++)
    {
      let x=xPos[i]
      let y=yPos[i]
      let px=xPos[i+1]
      let py=yPos[i+1]
      line(x,y,px,py)
    }
    rotate(-aR)
    line(0,0,50,0)
  }
}
