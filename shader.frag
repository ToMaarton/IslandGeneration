precision mediump float;

varying vec2 pos;

uniform sampler2D colorMap;
uniform sampler2D heightMap;
uniform float width;
uniform vec3 lightDir;
void main() {
    vec2 newPos = pos;
    newPos.y = 1. - newPos.y;
    vec4 col = texture2D(colorMap, newPos);
    float d = 1./width;
    vec2 posdx = newPos;
    posdx.x = posdx.x+d;
    vec2 posdy = newPos;
    posdy.y = posdy.y+d;
    float height = texture2D(heightMap, newPos).x*100.;
    float heightdx = texture2D(heightMap, posdx).x*100.;
    float heightdy = texture2D(heightMap, posdy).x*100.;
    vec3 unnormal = vec3((heightdx-height),(heightdy-height),1);
    vec3 normal = normalize(unnormal);
    float brightness = dot(lightDir,normal);
    brightness = clamp(brightness, 0.2, 1.);
    col.rgb = col.rgb*brightness;
    gl_FragColor = col;
}