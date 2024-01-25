let heightmap;
let colormap;
let shadows;

function preload(){
  shadows = loadShader('shader.vert', 'shader.frag');
}
function setup() {
  createCanvas(windowHeight,windowHeight, WEBGL);
  print(height)
  shader(shadows);
  noStroke();
  //noiseSeed(1)
  heightmap = generateHeightMap(height,0.015);
  colormap = generateColorMap(heightmap);
  shadows.setUniform('colorMap',colormap);
  shadows.setUniform("heightMap", heightmap);
  shadows.setUniform("width",width)
}

function draw() {
  background(0);
  dir = createVector(1,1,2).normalize()
  shadows.setUniform("lightDir",[dir.x,dir.y,dir.z])
  rect(0,0,width,height);
  noLoop();
}

function generateHeightMap(size, roughness){
  noiseDetail(5,0.5)
  let img = createImage(width, height);
  img.loadPixels();
  for (let x = 0; x < img.width; x += 1) {
    for (let y = 0; y < img.height; y += 1) {
      let nx = x*roughness;
      let ny = y*roughness;
      let terrainHeight = (noise(nx,ny)-(dist(width/2,height/2,x,y)/(size/2)))*400;
      img.set(x, y, terrainHeight);
    }
  }
  img.updatePixels();
  return img;
}

function generateColorMap(HM){
  let img = createImage(width, height);
  HM.loadPixels();
  img.loadPixels();
  for (let x = 0; x < img.width; x += 1) {
    for (let y = 0; y < img.height; y += 1) {
      H = HM.get(x,y)[1]
      let c;
      if(H>200){
        c = color(100);
      }else if(H>100){
        c = color(100,150,50);
      }else if(H>50){
        c = color(200,250,100);
      }else if(H>30){
        c = color(250,250,200);
      }else{
        c = color(0,0, 200)
      }
      img.set(x, y, c);
    }
  }
  img.updatePixels();
  HM.updatePixels();
  return img;
}