import React, {useEffect, useRef, useState} from 'react'
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three-orbitcontrols-ts';
import {Link} from 'react-router-dom'
import styled from 'styled-components';

import { 
  resizeRendererToDisplaySize, 
  initColor, 
  buildColors,
  selectSwatch,
  colors
} from '../../../services/calculation';

import { 
  initialRotation,
  slide
} from '../../../services/partials';

const Fixture = () => {
  const canvasWrapper = useRef(document.createElement('div'))
  const [activeOption, setActiveOption] = useState('legs');

	useEffect(() => {
		// window.addEventListener('resize', resizeWindow);

		// props.initScene(container, animateCallback);
    document.body.classList.remove('menu');

    initialize();
	}, []);

    // slide(slider, sliderItems);
  const initialize = () => {
    const DRAG_NOTICE: any = document.getElementById('js-drag-notice');
    const TRAY: any = document.getElementById('js-tray-slide');
    const LOADER: any = document.getElementById('js-loader');
    buildColors(colors, TRAY);

    let activeOption = 'legs';
    let loaded = false;
    // let initRotate = 0;

    const BACKGROUND_COLOR = 0xf1f1f1;

    const scene: any = new THREE.Scene();
  
    scene.background = new THREE.Color(BACKGROUND_COLOR );
    scene.fog = new THREE.Fog(BACKGROUND_COLOR, 20, 100);
  
    const canvas: any = document.querySelector('#c');
    console.log([canvas])
    // renderer.render(scene, camera);
  
    const renderer: any = new THREE.WebGLRenderer({canvas, antialias: true});

    renderer.shadowMap.enabled = true;
    renderer.setPixelRatio(window.devicePixelRatio); 
    canvasWrapper.current.appendChild(renderer.domElement);
    // document.body.appendChild(renderer.domElement);

    const cameraFar = 5;
    const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = cameraFar;
    camera.position.x = 0;
  
    let theModel: any;
    const MODEL_PATH = "images/chair.glb";
  
    const loader = new GLTFLoader();
  
    loader.load(MODEL_PATH, function(gltf) {
      theModel = gltf.scene;
      theModel.traverse((o: any) => {
        if (o.isMesh) {
          o.castShadow = true;
          o.receiveShadow = true;
        }
      });
      theModel.scale.set(2,2,2);
      theModel.rotation.y = Math.PI;
          // Offset the y position a bit
      theModel.position.y = -1;
    
      const INITIAL_MTL = new THREE.MeshPhongMaterial( { color: 0xf1f1f1, shininess: 10 } );
      const INITIAL_MAP = [
        {childID: "back", mtl: INITIAL_MTL},
        {childID: "base", mtl: INITIAL_MTL},
        {childID: "cushions", mtl: INITIAL_MTL},
        {childID: "legs", mtl: INITIAL_MTL},
        {childID: "supports", mtl: INITIAL_MTL},
      ];

      for (let object of INITIAL_MAP) {
        initColor(theModel, object.childID, object.mtl);
      }
        scene.add(theModel);
        LOADER.remove();
    }, undefined, function(error) {
      console.error(error)
    });

    const options: any = document.querySelectorAll(".option");

    for (const option of options) {
      option.addEventListener('click',selectOption);
    }

    function selectOption(e: any) {
      let option = e.target;
      activeOption = e.target.dataset.option;
      for (const otherOption of options) {
        otherOption.classList.remove('--is-active');
      }
      option.classList.add('--is-active');
    }

    const swatches: any = document.querySelectorAll(".tray__swatch");

    for (const swatch of swatches) {
      swatch.addEventListener('click', (e: any) => selectSwatch(e, colors, theModel, activeOption));
    }

    const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.61 );
    hemiLight.position.set( 0, 50, 0 );
    // Add hemisphere light to scene   
    scene.add( hemiLight );

    const dirLight = new THREE.DirectionalLight( 0xffffff, 0.54 );
    dirLight.position.set( -8, 12, 8 );
    dirLight.castShadow = true;
    dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
    scene.add( dirLight );

    // Floor
    const floorGeometry = new THREE.PlaneGeometry(5000, 5000, 1, 1);
    const floorMaterial = new THREE.MeshPhongMaterial({
      color: 0xeeeeee,
      shininess: 0
    });

    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -0.5 * Math.PI;
    floor.receiveShadow = true;
    floor.position.y = -1;
    scene.add(floor);

    const controls = new OrbitControls( camera, renderer.domElement );
    controls.maxPolarAngle = Math.PI / 2;
    controls.minPolarAngle = Math.PI / 3;
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.dampingFactor = 0.1;
    controls.autoRotate = false; // Toggle this if you'd like the chair to automatically rotate
    controls.autoRotateSpeed = 0.2; // 30

    function animate() {
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
      
      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }
      
      if (theModel && !loaded) {
        initialRotation(loaded, theModel);
        DRAG_NOTICE.classList.add('start');
      }
    }

    animate();

    const slider: any = document.getElementById('js-tray');
    const sliderItems: any = document.getElementById('js-tray-slide');

    slide(slider, sliderItems, sliderItems);
  }

  const selectOption = (e: any) => {
    // setActiveOption(e.target.dataset.option);
  }

  return (
    <div className="App">
      <LinkButton to='/home'>Back</LinkButton>
      <div className="loading" id="js-loader">
        <div className="loader" />
      </div>
      <div className="options">
        <div className={activeOption ==='legs' ? 'option  --is-active' : 'option'} onClick={selectOption} data-option="legs">
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/legs.svg" alt=""/>
        </div>
        <div className={activeOption ==='cushions' ? 'option  --is-active' : 'option'} onClick={selectOption} data-option="cushions">
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/cushions.svg" alt=""/>
        </div>
        <div className={activeOption ==='base' ? 'option  --is-active' : 'option'} onClick={selectOption} data-option="base">
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/base.svg" alt=""/>
        </div>
        <div className={activeOption ==='supports' ? 'option  --is-active' : 'option'} onClick={selectOption} data-option="supports">
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/supports.svg" alt=""/>
        </div>
        <div className={activeOption ==='back' ? 'option  --is-active' : 'option'} onClick={selectOption} data-option="back">
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/back.svg" alt=""/>
        </div>
      </div>
      <div ref={canvasWrapper}>
        <canvas id="c"></canvas>
      </div>
      <div className="controls">
        <div className="info">
          <div className="info__message">
            <p><strong>&nbsp;Grab&nbsp;</strong> to rotate chair. <strong>&nbsp;Scroll&nbsp;</strong> to zoom. <strong>&nbsp;Drag&nbsp;</strong> swatches to view more.</p>
          </div>
        </div>
        <div id="js-tray" className="tray">
          <div id="js-tray-slide" className="tray__slide"></div>
        </div>
      </div>
      <span className="drag-notice" id="js-drag-notice">Drag to rotate 360&#176;</span>
    </div>
  );
}


const LinkButton = styled(Link)`
  font-family: monospace;
  font-style: normal;
  font-weight: 800;
  font-size: 15px;
  text-align: center;
  color: rgb(255 255 255);
  padding-top: 6px;
  margin: 0;
  text-decoration: none;
  background-color: #a1a1a1;
  border: 0;
  border-radius: 30px;
  cursor: pointer;
  width: 80px;
  height: 30px;
  left: 65px;
  top: 11px;
  display: block;
  position: absolute;
`;


export default Fixture;
