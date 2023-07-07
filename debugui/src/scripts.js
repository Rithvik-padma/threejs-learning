import * as three from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import * as lil from 'lil-gui'
import gsap from 'gsap'

const scene = new three.Scene(window.innerWidth, window.innerHeight)
const camera = new three.PerspectiveCamera(75, window.innerWidth/window.innerHeight)
const renderer = new three.WebGLRenderer({canvas: document.querySelector('canvas.webgl')})

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

camera.position.z = 5

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.update()

const gui = new lil.GUI()

const box = new three.Mesh(new three.BoxGeometry(1, 1, 1), new three.MeshBasicMaterial({color: '#ff0000'}))
scene.add(box)

gui
    .add(box.position, 'x')
    .min(-3)
    .max(3)
    .step(0.01)
    .name('Horizontally')
// gui.add(box.position, 'y', -3, 3, 0.01)
// gui.add(box.position, 'z', -3, 3, 0.01)

gui
    .add(box, 'visible')
    .name('Visible')

gui
    .add(box.material, 'wireframe')
    .name('Wireframe mode')

gui
    .addColor(box.material, 'color')
    .name('Box color')

const boxParameters = {
    spin: () => {
        gsap.to(box.rotation, {
            duration: 1.5,
            y: box.rotation.y + 2*Math.PI
        })
    }
}

gui
    .add(boxParameters, 'spin')
    .name('Spin Box')
    

const animate = () => {
    renderer.render(scene, camera)
    window.requestAnimationFrame(animate)
}

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth/window.innerHeight
    camera.updateProjectionMatrix()
})

let resizeButton = document.querySelector('.resize') 
let resizeIcon = document.querySelector('.resize>i')

resizeButton.addEventListener('click', ()=>{
    if(!document.fullscreenElement){
        document.body.requestFullscreen()
        resizeIcon.classList.replace('fa-expand', 'fa-compress')
    }
    else{
        document.exitFullscreen()
        resizeIcon.classList.replace('fa-compress', 'fa-expand')
    }
})

animate()