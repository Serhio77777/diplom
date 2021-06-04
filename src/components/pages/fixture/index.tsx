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
import SideMenu from './sidemenu'
import Options from './options'
import TexturePicker from './texturepicker'

export interface IDispatchProps {
  setModel: (model: ICurrentModel) => void;
}

export interface IProps {
	currentModel: ICurrentModel;
  modelList: Array<IModel>;
}

type Props = IProps & IDispatchProps;

const Scene = () => {
  return <div></div>
}

const Furniture = (props: Props): React.ReactElement => {
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
  
    let model3D: any;

    const loader = new GLTFLoader();

    const getInitMaterials = () => {
      const INITIAL_MTL = new THREE.MeshPhongMaterial( { color: 0xf1f1f1, shininess: 10 } );

      return props.currentModel.elements.map(item => {
        return {
          childID: item.name, mtl: INITIAL_MTL
        }
      });
    }

    const setInitMaterials = (materials: any[]) => {
      for (let object of materials) {
        initColor(model3D, object.childID, object.mtl);
      }
    }

    const setShadow = () => {
      model3D.traverse((object: any) => {
        if (object.isMesh) {
          object.castShadow = true;
          object.receiveShadow = true;
        }
      });
    }

    const setPosition = () => {
      model3D.scale.set(2,2,2);

      if (props.currentModel.rotate) {
        model3D.rotation.y = props.currentModel.rotate;
      }

      model3D.position.y = -1;
    }

    loader.load(props.currentModel.path, function(gltf) {
      model3D = gltf.scene;

      setShadow();
      setPosition();

      const INIT_MATERIALS = getInitMaterials()

      setInitMaterials(INIT_MATERIALS);

      scene.add(model3D);

      if (LOADER) {
        LOADER.remove();
      }
    }, undefined, function(error) {
      console.error(error);
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
      swatch.addEventListener('click', (e: any) => selectSwatch(e, colors, model3D, activeOption));
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
      
      if (model3D && !loaded) {
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
      <SideMenu
        toggleMenu={toggleMenu}
        xPosition={xPosition}
        setModel={props.setModel}
        modelList={props.modelList}
      />
      <div className="loading" id="js-loader">
        <div className="loader" />
      </div>
      <Options
        activeOption={activeOption}
        currentModel={props.currentModel}
        selectOption={selectOption}
      />
      <div className="canvas-element" ref={canvasWrapper}>
        <canvas id="c"></canvas>
      </div>
      <Scene />
      <TexturePicker />
      <span className="drag-notice" id="js-drag-notice">Drag model to rotate</span>
    </div>
  );
}

export const HeaderSidebar = styled.div`
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

export const ListElement = styled.div`
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

export const IconButton = styled.img<{ isExit?: boolean }>`
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
  left: 105px;
  top: 9px;
  display: block;
  position: absolute;
  z-index: 1;
`;


export default Furniture;
