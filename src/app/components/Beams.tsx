import { useEffect, useRef } from "react";
import * as THREE from "three";

/* ============================================================
   GLSL noise (2D random + 2D value noise + 3D Perlin cnoise)
   ============================================================ */
const noiseGLSL = /* glsl */ `
float random(in vec2 st){
  return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);
}
float noise(in vec2 st){
  vec2 i=floor(st);vec2 f=fract(st);
  float a=random(i);float b=random(i+vec2(1.,0.));
  float c=random(i+vec2(0.,1.));float d=random(i+vec2(1.,1.));
  vec2 u=f*f*(3.-2.*f);
  return mix(a,b,u.x)+(c-a)*u.y*(1.-u.x)+(d-b)*u.x*u.y;
}
vec4 permute(vec4 x){return mod(((x*34.)+1.)*x,289.);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-.85373472095314*r;}
vec3 fade(vec3 t){return t*t*t*(t*(t*6.-15.)+10.);}
float cnoise(vec3 P){
  vec3 Pi0=floor(P);vec3 Pi1=Pi0+vec3(1.);
  Pi0=mod(Pi0,289.);Pi1=mod(Pi1,289.);
  vec3 Pf0=fract(P);vec3 Pf1=Pf0-vec3(1.);
  vec4 ix=vec4(Pi0.x,Pi1.x,Pi0.x,Pi1.x);
  vec4 iy=vec4(Pi0.yy,Pi1.yy);
  vec4 iz0=Pi0.zzzz;vec4 iz1=Pi1.zzzz;
  vec4 ixy=permute(permute(ix)+iy);
  vec4 ixy0=permute(ixy+iz0);vec4 ixy1=permute(ixy+iz1);
  vec4 gx0=ixy0/7.;vec4 gy0=fract(floor(gx0)/7.)-.5;gx0=fract(gx0);
  vec4 gz0=vec4(.5)-abs(gx0)-abs(gy0);vec4 sz0=step(gz0,vec4(0.));
  gx0-=sz0*(step(0.,gx0)-.5);gy0-=sz0*(step(0.,gy0)-.5);
  vec4 gx1=ixy1/7.;vec4 gy1=fract(floor(gx1)/7.)-.5;gx1=fract(gx1);
  vec4 gz1=vec4(.5)-abs(gx1)-abs(gy1);vec4 sz1=step(gz1,vec4(0.));
  gx1-=sz1*(step(0.,gx1)-.5);gy1-=sz1*(step(0.,gy1)-.5);
  vec3 g000=vec3(gx0.x,gy0.x,gz0.x);vec3 g100=vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010=vec3(gx0.z,gy0.z,gz0.z);vec3 g110=vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001=vec3(gx1.x,gy1.x,gz1.x);vec3 g101=vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011=vec3(gx1.z,gy1.z,gz1.z);vec3 g111=vec3(gx1.w,gy1.w,gz1.w);
  vec4 norm0=taylorInvSqrt(vec4(dot(g000,g000),dot(g010,g010),dot(g100,g100),dot(g110,g110)));
  g000*=norm0.x;g010*=norm0.y;g100*=norm0.z;g110*=norm0.w;
  vec4 norm1=taylorInvSqrt(vec4(dot(g001,g001),dot(g011,g011),dot(g101,g101),dot(g111,g111)));
  g001*=norm1.x;g011*=norm1.y;g101*=norm1.z;g111*=norm1.w;
  float n000=dot(g000,Pf0);float n100=dot(g100,vec3(Pf1.x,Pf0.yz));
  float n010=dot(g010,vec3(Pf0.x,Pf1.y,Pf0.z));float n110=dot(g110,vec3(Pf1.xy,Pf0.z));
  float n001=dot(g001,vec3(Pf0.xy,Pf1.z));float n101=dot(g101,vec3(Pf1.x,Pf0.y,Pf1.z));
  float n011=dot(g011,vec3(Pf0.x,Pf1.yz));float n111=dot(g111,Pf1);
  vec3 fade_xyz=fade(Pf0);
  vec4 n_z=mix(vec4(n000,n100,n010,n110),vec4(n001,n101,n011,n111),fade_xyz.z);
  vec2 n_yz=mix(n_z.xy,n_z.zw,fade_xyz.y);
  float n_xyz=mix(n_yz.x,n_yz.y,fade_xyz.x);
  return 2.2*n_xyz;
}
`;

/* ============================================================
   extendMaterial — patch Three's physical shader
   ============================================================ */
function extendMaterial(
  BaseMaterial: typeof THREE.MeshStandardMaterial,
  cfg: {
    header: string;
    vertexHeader?: string;
    fragmentHeader?: string;
    vertex?: Record<string, string>;
    fragment?: Record<string, string>;
    material?: Record<string, unknown>;
    uniforms?: Record<string, unknown>;
  }
) {
  const physical = THREE.ShaderLib.physical;
  const { vertexShader: baseVert, fragmentShader: baseFrag, uniforms: baseUniforms } = physical;
  const baseDefines = (physical as any).defines ?? {};

  const uniforms = THREE.UniformsUtils.clone(baseUniforms);
  const defaults = new BaseMaterial((cfg.material as THREE.MeshStandardMaterialParameters) || {});

  if (defaults.color) uniforms.diffuse.value = defaults.color;
  if ("roughness" in defaults) uniforms.roughness.value = defaults.roughness;
  if ("metalness" in defaults) uniforms.metalness.value = defaults.metalness;

  Object.entries(cfg.uniforms ?? {}).forEach(([key, u]) => {
    uniforms[key] =
      (u !== null && typeof u === "object" && "value" in (u as any) ? u : { value: u }) as THREE.IUniform<any>;
  });

  let vert = `${cfg.header}\n${cfg.vertexHeader ?? ""}\n${baseVert}`;
  let frag = `${cfg.header}\n${cfg.fragmentHeader ?? ""}\n${baseFrag}`;

  for (const [inc, code] of Object.entries(cfg.vertex ?? {})) {
    vert = vert.replace(inc, `${inc}\n${code}`);
  }
  for (const [inc, code] of Object.entries(cfg.fragment ?? {})) {
    frag = frag.replace(inc, `${inc}\n${code}`);
  }

  return new THREE.ShaderMaterial({
    defines: { ...baseDefines },
    uniforms,
    vertexShader: vert,
    fragmentShader: frag,
    lights: true,
    fog: !!(cfg.material as any)?.fog,
  });
}

/* ============================================================
   Stacked-planes buffer geometry
   ============================================================ */
function createStackedPlanesGeometry(
  n: number,
  width: number,
  height: number,
  spacing: number,
  heightSegments: number
) {
  const geometry = new THREE.BufferGeometry();
  const numVerts = n * (heightSegments + 1) * 2;
  const numFaces = n * heightSegments * 2;
  const pos = new Float32Array(numVerts * 3);
  const idx = new Uint32Array(numFaces * 3);
  const uvs = new Float32Array(numVerts * 2);

  let vOff = 0, iOff = 0, uvOff = 0;
  const total = n * width + (n - 1) * spacing;
  const xBase = -total / 2;

  for (let i = 0; i < n; i++) {
    const xOff = xBase + i * (width + spacing);
    const uvX = Math.random() * 300;
    const uvY = Math.random() * 300;

    for (let j = 0; j <= heightSegments; j++) {
      const y = height * (j / heightSegments - 0.5);
      pos.set([xOff, y, 0, xOff + width, y, 0], vOff * 3);
      const v = j / heightSegments;
      uvs.set([uvX, v + uvY, uvX + 1, v + uvY], uvOff);
      if (j < heightSegments) {
        const a = vOff, b = vOff + 1, c = vOff + 2, d = vOff + 3;
        idx.set([a, b, c, c, b, d], iOff);
        iOff += 6;
      }
      vOff += 2;
      uvOff += 4;
    }
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
  geometry.setIndex(new THREE.BufferAttribute(idx, 1));
  geometry.computeVertexNormals();
  return geometry;
}

/* ============================================================
   hexToRGB
   ============================================================ */
const hexToRGB = (hex: string): [number, number, number] => {
  const c = hex.replace("#", "");
  return [
    parseInt(c.substring(0, 2), 16) / 255,
    parseInt(c.substring(2, 4), 16) / 255,
    parseInt(c.substring(4, 6), 16) / 255,
  ];
};

/* ============================================================
   Beams — public React component (vanilla Three.js)
   ============================================================ */
interface BeamsProps {
  beamWidth?: number;
  beamHeight?: number;
  beamNumber?: number;
  lightColor?: string;
  speed?: number;
  noiseIntensity?: number;
  scale?: number;
  rotation?: number;
}

export default function Beams({
  beamWidth = 2,
  beamHeight = 15,
  beamNumber = 12,
  lightColor = "#ffffff",
  speed = 2,
  noiseIntensity = 1.75,
  scale = 0.2,
  rotation = 0,
}: BeamsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    /* ---- reduced-motion check ---- */
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---- renderer ---- */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(new THREE.Color("#0F1113"), 0);
    container.appendChild(renderer.domElement);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";

    /* ---- scene ---- */
    const scene = new THREE.Scene();

    /* ---- camera ---- */
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    camera.position.set(0, 0, 20);

    /* ---- lights ---- */
    scene.add(new THREE.AmbientLight(0xffffff, 0.35));
    const dirLight = new THREE.DirectionalLight(lightColor, 1.0);
    dirLight.position.set(0, 3, 10);
    const shadowCam = dirLight.shadow.camera;
    shadowCam.top = 24;
    shadowCam.bottom = -24;
    shadowCam.left = -24;
    shadowCam.right = 24;
    shadowCam.far = 64;
    dirLight.shadow.bias = -0.004;

    /* ---- material ---- */
    const material = extendMaterial(THREE.MeshStandardMaterial, {
      header: `
varying vec3 vEye;
varying float vNoise;
varying vec2 vUv;
varying vec3 vPosition;
uniform float time;
uniform float uSpeed;
uniform float uNoiseIntensity;
uniform float uScale;
${noiseGLSL}`,
      vertexHeader: `
float getPos(vec3 pos){
  vec3 noisePos=vec3(pos.x*0.,pos.y-uv.y,pos.z+time*uSpeed*3.)*uScale;
  return cnoise(noisePos);
}
vec3 getCurrentPos(vec3 pos){
  vec3 newpos=pos;newpos.z+=getPos(pos);return newpos;
}
vec3 getNormal(vec3 pos){
  vec3 curpos=getCurrentPos(pos);
  vec3 nextposX=getCurrentPos(pos+vec3(0.01,0.,0.));
  vec3 nextposZ=getCurrentPos(pos+vec3(0.,-0.01,0.));
  vec3 tangentX=normalize(nextposX-curpos);
  vec3 tangentZ=normalize(nextposZ-curpos);
  return normalize(cross(tangentZ,tangentX));
}`,
      fragmentHeader: "",
      vertex: {
        "#include <begin_vertex>": "transformed.z += getPos(transformed.xyz);",
        "#include <beginnormal_vertex>": "objectNormal = getNormal(position.xyz);",
      },
      fragment: {
        "#include <dithering_fragment>": `
float randomNoise = noise(gl_FragCoord.xy);
gl_FragColor.rgb -= randomNoise / 15. * uNoiseIntensity;`,
      },
      material: { fog: true },
      uniforms: {
        diffuse: new THREE.Color(...hexToRGB("#000000")),
        time: { value: 0 },
        roughness: 0.3,
        metalness: 0.3,
        uSpeed: { value: speed },
        envMapIntensity: 10,
        uNoiseIntensity: noiseIntensity,
        uScale: scale,
      },
    });

    /* ---- geometry + mesh ---- */
    const geometry = createStackedPlanesGeometry(beamNumber, beamWidth, beamHeight, 0, 100);
    const mesh = new THREE.Mesh(geometry, material);

    /* ---- group (rotation) ---- */
    const group = new THREE.Group();
    group.rotation.z = THREE.MathUtils.degToRad(rotation);
    group.add(mesh);
    group.add(dirLight);
    scene.add(group);

    /* ---- resize handler ---- */
    const onResize = () => {
      const { clientWidth: w, clientHeight: h } = container;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    onResize();
    const ro = new ResizeObserver(onResize);
    ro.observe(container);

    /* ---- animation loop ---- */
    let animId = 0;
    let prev = performance.now();
    const tick = (now: number) => {
      animId = requestAnimationFrame(tick);
      if (prefersReduced) return;
      const delta = (now - prev) / 1000;
      prev = now;
      material.uniforms.time.value += 0.1 * delta;
      renderer.render(scene, camera);
    };
    // render at least once even if reduced motion
    renderer.render(scene, camera);
    animId = requestAnimationFrame(tick);

    /* ---- cleanup ---- */
    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [beamWidth, beamHeight, beamNumber, lightColor, speed, noiseIntensity, scale, rotation]);

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", width: "100%", height: "100%" }}
    />
  );
}