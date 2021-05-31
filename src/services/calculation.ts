import * as THREE from 'three';

export const resizeRendererToDisplaySize = (renderer: any) => {
  const canvas = renderer.domElement;
  const canvasPixelWidth = canvas.width / window.devicePixelRatio;
  const canvasPixelHeight = canvas.height / window.devicePixelRatio;

  const needResize = canvasPixelWidth !== window.innerWidth || canvasPixelHeight !== window.innerHeight;
  if (needResize) {
    renderer.setSize(window.innerWidth, window.innerHeight, false);
  }
  return needResize;
}

export const initColor = (parent: any, type: any, mtl: any) => {
  parent.traverse((o: any) => {
    if (o.isMesh && o.name.includes(type)) {
      o.material = mtl;
      o.nameID = type; // Set a new property to identify this object
    }
  });
}

export const buildColors = (colors: any, TRAY: any) => {
  for (let [i, color] of colors.entries()) {
    let swatch = document.createElement('div');
    swatch.classList.add('tray__swatch');    
    if (color.texture) {
      swatch.style.backgroundImage = "url(" + color.texture + ")";   
    } else {
      swatch.style.background = "#" + color.color;
    }
    swatch.setAttribute('data-key', i);
    TRAY.append(swatch);
  }
}

export const selectSwatch = (e: any, colors: any, theModel: any, activeOption: string) => {
  // let color = colors[parseInt(e.target.dataset.key)];
  // let new_mtl = new THREE.MeshPhongMaterial({
  //   color: parseInt('0x' + color.color),
  //   shininess: color.shininess ? color.shininess : 10
  // });

  // setMaterial(theModel, activeOption, new_mtl);

  let color = colors[parseInt(e.target.dataset.key)];
  let new_mtl: any;

  if (color.texture) {
    let txt: any = new THREE.TextureLoader().load(color.texture);
    txt.repeat.set( color.size[0], color.size[1], color.size[2]);
    txt.wrapS = THREE.RepeatWrapping;
    txt.wrapT = THREE.RepeatWrapping;
    new_mtl = new THREE.MeshPhongMaterial( {
      map: txt,
      shininess: color.shininess ? color.shininess : 10
    });    
  } else {
    new_mtl = new THREE.MeshPhongMaterial({
      color: parseInt('0x' + color.color),
      shininess: color.shininess ? color.shininess : 10
    });
  }
  
  setMaterial(theModel, activeOption, new_mtl);
}
export const setMaterial = (parent: any, type: any, mtl: any) => {
  parent.traverse((o: any) => {
    if (o.isMesh && o.nameID != null && o.nameID == type) {
      o.material = mtl;
    }
  });
}

export const colors = [
  {
    texture: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/wood_.jpg',
    size: [2,2,2],
    shininess: 60
  },
  {
    texture: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/fabric_.jpg',
    size: [4, 4, 4],
    shininess: 0
  },
  {
    texture: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/pattern_.jpg',
    size: [8, 8, 8],
    shininess: 10
  },
  {
    texture: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/denim_.jpg',
    size: [3, 3, 3],
    shininess: 0
  },
  {
    texture: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/quilt_.jpg',
    size: [6, 6, 6],
    shininess: 0
  },
  { color: '131417' },
  { color: '374047' },
  { color: '5f6e78' },
  { color: '7f8a93' },
  { color: '97a1a7' },
  { color: 'acb4b9' },
  { color: 'DF9998' },
  { color: '7C6862' },
  { color: 'A3AB84' },
  { color: 'D6CCB1' },
  { color: 'F8D5C4' },
  { color: 'A3AE99' },
  { color: 'EFF2F2' },
  { color: 'B0C5C1' },
  { color: '8B8C8C' },
  { color: '565F59' },
  { color: 'CB304A' },
  { color: 'FED7C8' },
  { color: 'C7BDBD' },
  { color: '3DCBBE' },
  { color: '264B4F' },
  { color: '389389' },
  { color: '85BEAE' },
  { color: 'F2DABA' },
  { color: 'F2A97F' },
  { color: 'D85F52' },
  { color: 'D92E37' },
  { color: 'FC9736' },
  { color: 'F7BD69' },
  { color: 'A4D09C' },
  { color: '4C8A67' },
  { color: '25608A' },
  { color: '75C8C6' },
  { color: 'F5E4B7' },
  { color: 'E69041' },
  { color: 'E56013' },
  { color: '11101D' },
  { color: '630609' },
  { color: 'C9240E' },
  { color: 'EC4B17' },
  { color: '281A1C' },
  { color: '4F556F' },
  { color: '64739B' },
  { color: 'CDBAC7' },
  { color: '946F43' },
  { color: '66533C' },
  { color: '173A2F' },
  { color: '153944' },
  { olor: '27548D' },
  { color: '438AAC' }
];