import React, {useEffect, useRef, useState} from 'react'
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three-orbitcontrols-ts';
import {Link} from 'react-router-dom'
import styled from 'styled-components';

import { ICurrentModel, IModel } from '../../../store/control/types';

import { 
  resizeRendererToDisplaySize, 
  initColor, 
  buildColors,
  selectSwatch,
  colors
} from '../../../services/calculation';

import { slide } from '../../../services/partials';

import sidemenuIcon from '../../../assets/sidemenu.svg';
import exit from '../../../assets/exit.svg';

export interface IDispatchProps {
  setModel: (model: ICurrentModel) => void;
}

export interface IProps {
	currentModel: ICurrentModel;
  modelList: Array<IModel>;
}

type Props = IProps & IDispatchProps;

const Fixture = (props: Props): React.ReactElement => {
  const canvasWrapper = useRef(document.createElement('div'))
  const [activeOption, setActiveOption] = useState(props.currentModel.elements[0]);

	useEffect(() => {
    document.body.classList.remove('menu');

    initialize();
	}, []);

  const initialize = () => {
    const DRAG_NOTICE: any = document.getElementById('js-drag-notice');
    const TRAY: any = document.getElementById('js-tray-slide');
    const LOADER: any = document.getElementById('js-loader');
    buildColors(colors, TRAY);

    let activeOption = props.currentModel.elements[0];
    let loaded = false;

    const BACKGROUND_COLOR = 0xC7BDBD;

    const scene: any = new THREE.Scene();
  
    scene.background = new THREE.Color(BACKGROUND_COLOR );
    scene.fog = new THREE.Fog(BACKGROUND_COLOR, 20, 100);
  
    const canvas: any = document.querySelector('#c');
  
    const renderer: any = new THREE.WebGLRenderer({canvas, antialias: true});
    renderer.autoClear = true;

    renderer.shadowMap.enabled = true;
    renderer.setPixelRatio(window.devicePixelRatio); 
    canvasWrapper.current.appendChild(renderer.domElement);

    const cameraFar = 5;
    const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = cameraFar;
    camera.position.x = 0;
  
    let theModel: any;

    const loader = new GLTFLoader();
  
    loader.load(props.currentModel.path, function(gltf) {
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
      const INITIAL_MAP = props.currentModel.elements.map(item => {
        return {
          childID: item.name, mtl: INITIAL_MTL
        }
      });

      for (let object of INITIAL_MAP) {
        initColor(theModel, object.childID, object.mtl);
      }
        scene.add(theModel);
        if (LOADER) {
          LOADER.remove();
        }
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
      color: 0xe1d7d7,
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
  const [xPosition, setX] = React.useState(300);
  const toggleMenu = () => {
    if (xPosition > 0) {
      setX(0);
    } else {
      setX(300);
    }
  };

  useEffect(() => {
    initialize();
  }, [props.currentModel])

  return (
    <div className="App">
      <LinkButton to='/home'>Back</LinkButton>
      <IconButton src={sidemenuIcon} onClick={() => toggleMenu()} />
      <div
        className="side-bar"
        style={{
          transform: `translate(${xPosition}px)`,
          width: 300
        }}
      >
        <div className="content">
          <HeaderSidebar>Select Model<IconButton isExit src={exit} onClick={() => toggleMenu()} /></HeaderSidebar>
          {props.modelList.map((model: IModel) => 
            <ListElement onClick={() => {
              toggleMenu();
              props.setModel({ name: model.label, path: model.value, elements: model.elements })
            }}>{model.label}</ListElement>
          )}
        </div>
      </div>
      <div className="loading" id="js-loader">
        <div className="loader" />
      </div>
      <div className="options">
        {
          props.currentModel.elements.map(item => {
            return (
              <div className={activeOption === item.name ? 'option  --is-active' : 'option'} onClick={selectOption} data-option={item.name}>
                {item.name}
              </div>
            )
          })
        }
      </div>
      <div className="canvas-element" ref={canvasWrapper}>
        <canvas id="c"></canvas>
      </div>
      <div className="controls">
        {/* <div className="info">
          <div className="info__message">
            <p><strong>&nbsp;Grab&nbsp;</strong> to rotate chair. <strong>&nbsp;Scroll&nbsp;</strong> to zoom. <strong>&nbsp;Drag&nbsp;</strong> swatches to view more.</p>
          </div>
        </div> */}
        <div id="js-tray" className="tray">
          <div id="js-tray-slide" className="tray__slide"></div>
        </div>
      </div>
      <span className="drag-notice" id="js-drag-notice">Drag to rotate 360&#176;</span>
    </div>
  );
}

const HeaderSidebar = styled.div`
  width: 300px;
  height: 60px;
  font-family: monospace;
  font-style: normal;
  font-weight: 900;
  font-size: 20px;
  text-align: center;
  padding: 20px 15px;
  border-bottom: 1px solid;
`;

const WrapperSidebar = styled.div`
  width: 300px;
  height: calc(100% - 60px);
`;

const ListElement = styled.div`
  width: 100%;
  height: 40px;
  font-family: monospace;
  font-style: normal;
  font-weight: 800;
  font-size: 15px;
  text-align: center;
  padding: 10px 15px;
  cursor: pointer;
`;

const IconButton = styled.img<{ isExit?: boolean }>`
  width: 35px;
  height: 35px;
  border-radius: 15px;
  position: absolute;
  right: 20px;
  top: ${({ isExit }) => !isExit ? '20px' : '15px'};
  background: white;
  padding: ${({ isExit }) => !isExit ? '5px' : '9px'};
  cursor: pointer;
  z-index: 1;
`;

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
  left: 85px;
  top: 11px;
  display: block;
  position: absolute;
  z-index: 1;
`;


export default Fixture;
