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
  let xPos=[];
  let yPos=[];

  annotate()
  
  function annotate()
  {
  let t="Cam 2.0"
  textSize(width*0.1)
  fill(255)
  textAlign(CENTER,CENTER)
  text(t,width/2,height*0.1)
  
  stroke(255)
  noFill()
  rect(width/4,height/3,width/2,height/3)
  
  inp1=createInput()
  inp1.position(width*0.4,height*0.15)
  inp2=createInput()
  inp2.position(width*0.4,height*0.2)
  inp3=createInput()
  inp3.position(width*0.4,height*0.25)
  let submit=createButton("submit")
  let cL=createButton("clear")
   submit.position(width*0.85,height*0.3)
  submit.mousePressed(start)
  cL.position(width*0.1,height*0.3)
  cL.mousePressed(clean)
  
  
  textSize(width*0.05)
  fill(255)
  noStroke()
  textAlign(LEFT)
  let txt1="OutStroke"
  let txt2="Dwell"
  let txt3="Return Stroke"
  text(txt1,0,height*0.15)
  text(txt2,0,height*0.2)
  text(txt3,0,height*0.25)
  
  function start(aS)
  {
    var aS=inp1.value()
    var aD=inp2.value()
    var aR=inp3.value()
    translate(width/2,height/2)
    baseCir(r)
    outStroke(aS)
    dwell(aD)
    rtnStroke(aR)
  }
  function clean()
  {
    clear()
    setup()
    draw()
  }
  
  }
  
  function shm(A,u)
  {
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
  
  function baseCir(r)
  {
    stroke(255)
    noFill()
    drawingContext.setLineDash([3,3])
    ellipse(0,0,r)
  }
    
  function outStroke(aS)
  {
    rotate(-90)
    stroke(255)
    shm(aS,0)
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
  
  function rtnStroke(aR)
  {
    xPos=[]
    yPos=[]
    shm(aR,90)
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
