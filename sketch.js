let heightmap;
function setup() {
  createCanvas(600,600);
  heightmap = generateHeightMap(600,0.02);
}

function draw() {
  background(0);
  image(heightmap,0,0);
  print('img');
  noLoop();
}

function generateHeightMap(size, roughness){
  noiseDetail(2,0.5)
  let img = createImage(width, height);
  img.loadPixels();
  for (let x = 0; x < img.width; x += 1) {
    for (let y = 0; y < img.height; y += 1) {
      let nx = x*roughness;
      let ny = y*roughness;
      img.set(x, y, noise(nx,ny)*255-dist(width/2,height/2,x,y) *(255/(size/2)));
    }
  }
  img.updatePixels();
  return img;
}
