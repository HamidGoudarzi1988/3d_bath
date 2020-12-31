//variables for setup

// for html page container

let container;
let camera;
let renderer;
let scene;
let bath;


function init(){
    container = document.querySelector('.scene');

    //Create scene
    scene = new THREE.Scene();


    //the whole conitaner that we want to see:
    const fov = 35;
    const aspect = container.clientWidth / container.clientHeight;
    // for 3D we can see the far from 1m to 50m:
    const near = 0.1;
    const far = 500;

    //set up camera:

    camera = new THREE.PerspectiveCamera(fov,aspect,near,far);

    //position of camera:

    camera.position.set(-40,50,400);


    


    // we need light for showing the item otherwise it is dark

    const ambient = new THREE.AmbientLight(0x404040,3);
    scene.add(ambient)

    //let light add light from above:
    const light = new THREE.DirectionalLight(0xffffff, 5);
    light.position.set(10,20,30);
    scene.add(light);



    //Renderer

    renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);

    //load model:

    let loader = new THREE.GLTFLoader();
    loader.load('./3d/scene.gltf', function(gltf){
        scene.add(gltf.scene);
        bath = gltf.scene.children[0];
        animate();
        
        
    })
//controls
    let controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', renderer);

}

// add animation to rotate the item:
function animate(){
    requestAnimationFrame(animate);
    // bath.rotation.z +=0.005;
    renderer.render(scene,camera);
}

init();

// make it resposive:

function onWindowResize(){
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(container.clientWidth, container.clientHeight);

}

window.addEventListener('resize', onWindowResize)

