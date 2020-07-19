function setup()
{ 
  createCanvas(displayWidth,displayWidth*1.778);
  background(0);
  angleMode(DEGREES);
  noLoop();
}


function draw()
{
  var R=60;//resolution;
  
  let xPos=[];
  let yPos=[];

  annotate();
  
  function annotate()
  {
  let t="Cam 2.0";
  textSize(width*0.1);
  fill(255);
  textAlign(CENTER,CENTER);
  text(t,width/2,height*0.05);
  let K="Designed by: Ariful Hoque, ME, CUET.";
  textSize(width*0.04);
  text(K,width/2,height*0.1);
  
  inp1=createInput(60,'number');
  inp1.size(30);
  inp1.position(width*0.35,height*0.15);
  s1=createSelect();
  s1.position(width*0.6,height*0.15);
  s1.option("linear");
  s1.option("simple harmonic");
  s1.option("uniform acceleration");
  inp2=createInput(30,'number');
  inp2.size(30);
  inp2.position(width*0.35,height*0.2);
  inp3=createInput(60,'number');
  inp3.size(30);
  inp3.position(width*0.35,height*0.25);
  s3=createSelect();
  s3.position(width*0.6,height*0.25);
  s3.option("linear");
  s3.option("simple harmonic");
  s3.option("uniform acceleration");
  let submit=createButton("submit");
  let cL=createButton("clear");
  submit.position(width*0.85,height*0.4);
  submit.mousePressed(start);
  cL.position(width*0.1,height*0.4);
  cL.mousePressed(clean);
  rad=createInput(40,'number');
  rad.size(30);
  rad.position(width*0.35,height*0.3);
  disp=createInput(40,'number');
  disp.size(30);
  disp.position(width*0.75,height*0.3);
  off=createInput(20,'number');
  off.size(30);
  off.position(width*0.35,height*0.35);
  
  textSize(width*0.04);
  fill(255);
  noStroke();
  textAlign(LEFT);
  let txt1="OutStroke:";
  let txt2="Dwell:";
  let txt3="Return Stroke:";
  let txt4="base circle radius:";
  let txt5="type:";
  let txt6="displacement:";
  let txt7="offset:";
  text(txt1,0,height*0.15);
  text(txt2,0,height*0.2);
  text(txt3,0,height*0.25);
  text(txt4,0,height*0.3);
  text(txt5,width*0.47,height*0.15);
  text(txt5,width*0.47,height*0.25);
  text(txt6,width*0.47,height*0.3);
  text(txt7,0,height*0.35);

  let nb="Please clear the canvas before entering new data.\n Works best on mobile devices"
  textAlign(CENTER);
  text(nb,width*0.5,height*0.95);
  
  function start()
  {
    var aS=inp1.value();
    var aD=inp2.value();
    var aR=inp3.value();
    var r=rad.value();
    var h=disp.value();
    var q=off.value();
    q=Number(q);
    r=Number(r);
    h=Number(h);
    aS=Number(aS)
    aD=Number(aD)
    aR=Number(aR)
    q=4*q;
    r=4*r;
    h=2*h;
    var g;//type of motion 0:line 1:shm 2:uniform
    translate(width*0.6,height*0.67);
    baseCir(r,q,aS,aD,aR);
    if(s1.value()=="linear")g=0
    else if(s1.value()=="simple harmonic")g=1;
    else g=2;
    outStroke(aS,g,r,h,q);
    dwell(aD,r,h,q,aS);
    if(s3.value()=="linear")g=0;
    else if(s3.value()=="simple harmonic")g=1;
    else g=2;
    rtnStroke(aR,g,r,h,q,aS+aD);
  }
  function clean()
  {
    clear();
    setup();
    draw();
  }
  
  }
  
  function shm(A,u,g,r,h,q)
  {
  var j=asin(q/r)//offset angle
  if(g===-1){
  for(let i=0;i<R;i++)
  {
    let ang=map(i,0,R-1,-u,-A-u);
    let p=2*h*sin(j/2);
    let k=p*cos(90-j/2+ang);
    let c=p*sin(90-j/2+ang);
    let x=cos(ang)*(r/2+h)-k;
    let y=sin(ang)*(r/2+h)-c;
    xPos.push(x);
    yPos.push(y);
  }
  }
  if(g===0){
  for(let i=0;i<R;i++)
  {
    let ang=map(i,0,R-1,-u,-A-u);
    let o=0;
    if(u!=0) o=h;
    let H=map(i,0,R-1,o,h-o);
    let p=2*H*sin(j/2);
    let k=p*cos(90-j/2+ang);
    let c=p*sin(90-j/2+ang);
    let x=cos(ang)*(r/2+H)-k;
    let y=sin(ang)*(r/2+H)-c;
    xPos.push(x);
    yPos.push(y);
  }
  }
  if(g==1){
  for(let i=0;i<R;i++)
  {
    let ang=map(i,0,R-1,-u,-A-u);
    let o=0;
    if(u!=0) o=180;
    let H=map(i,0,R-1,o,180-o);
    let Q=(h/2)-(h/2)*cos(H);
    let p=2*Q*sin(j/2)
    let k=p*cos(90-j/2+ang)
    let c=p*sin(90-j/2+ang)
    let x=cos(ang)*(r/2+Q)-k;
    let y=sin(ang)*(r/2+Q)-c;
    xPos.push(x);
    yPos.push(y);
  }
  }
  if(g==2){
  for(let i=0;i<R;i++)
  {
    let ang=map(i,0,R-1,-u,-A-u);
    let P=0;
    if(u!=0) P=R
    let H=map(i,0,R-1,P,R-P);
    
    if(H<(R/2)){
      let o=2*h*pow((H/R),2);
      let p=2*o*sin(j/2)
      let k=p*cos(90-j/2+ang)
      let c=p*sin(90-j/2+ang)
      let x=cos(ang)*(r/2+o)-k;
      let y=sin(ang)*(r/2+o)-c;
      xPos.push(x);
      yPos.push(y);
    }
    else if(H>=(R/2)){
      let o=h-2*h*pow(((H-R)/R),2);
      let p=2*o*sin(j/2)
      let k=p*cos(90-j/2+ang)
      let c=p*sin(90-j/2+ang)
      let x=cos(ang)*(r/2+o)-k;
      let y=sin(ang)*(r/2+o)-c;
      xPos.push(x);
      yPos.push(y);
    }
  }
  }
  }
  
  function baseCir(r,q,aS,aD,aR)
  {
    stroke(255);
    noFill();
    drawingContext.setLineDash([3,3]);
    ellipse(0,0,r);
    drawingContext.setLineDash([2,5])
    ellipse(0,0,q)
    var j=asin(q/r)//offset angle
    rotate(-90+j);
    drawingContext.setLineDash([]);
    line(0,0,200,0);
    rotate(-aS);
    line(0,0,200,0);
    rotate(-aD);
    line(0,0,200,0);
    rotate(-aR);
    line(0,0,200,0);
    rotate(aD+aS+aR);
    arc(0,0,r,r,0,-aS-aD-aR);
  }
    
  function outStroke(aS,g,r,h,q)
  {
    shm(aS,0,g,r,h,q);
    for(let i=0;i<R-1;i++)
    {
      let x=xPos[i];
      let y=yPos[i];
      let px=xPos[i+1];
      let py=yPos[i+1];
      line(x,y,px,py);
      //ellipse(x,y,1,1)
    }
  }
  
  function dwell(aD,r,h,q,aS)
  {
    shm(aD,aS,-1,r,h,q)
    for(let i=(R-1);i<(2*R-1);i++)
    {
      let x=xPos[i];
      let y=yPos[i];
      let px=xPos[i+1];
      let py=yPos[i+1];
      line(x,y,px,py);
      //ellipse(x,y,3,3)
    }
  }
  
  function rtnStroke(aR,g,r,h,q,w)
  {
    shm(aR,w,g,r,h,q);
    for(let i=(2*R-1);i<(3*R-1);i++)
    {
      let x=xPos[i];
      let y=yPos[i];
      let px=xPos[i+1];
      let py=yPos[i+1];
      line(x,y,px,py);
      //ellipse(x,y,5,5)
    }
  }
}
