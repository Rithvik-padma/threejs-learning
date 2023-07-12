import * as three from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'


const scene = new three.Scene(window.innerWidth, window.innerHeight)
const camera = new three.PerspectiveCamera(75, window.innerWidth/window.innerHeight)
const renderer = new three.WebGLRenderer({canvas: document.querySelector('canvas.webgl')})

renderer.setSize(window.innerWidth, window.innerHeight)

camera.position.z = 2

const controls = new OrbitControls(camera, renderer.domElement)
controls.update()

// const ambientLight = new three.AmbientLight(0xffffff, 1.5)
// scene.add(ambientLight)
// ambientLight.position.z = 1

const pointLight = new three.PointLight(0xffffff, 0.5)
scene.add(pointLight)
pointLight.position.set(0, 0, 5)

const ambientLight = new three.AmbientLight(0xffffff, 0.6)
scene.add(ambientLight)

const tloader = new three.TextureLoader()
const door = tloader.load('textures/door/color.jpg')
const ambientOcclusion = tloader.load('textures/door/ambientOcclusion.jpg')
const heightMapping = tloader.load('textures/door/height.jpg')
const normal = tloader.load('textures/door/normal.jpg')
const alpha = tloader.load('textures/door/alpha.jpg')
const metalness = tloader.load('textures/door/metalness.jpg')
const roughness = tloader.load('textures/door/roughness.jpg')

three.ColorManagement.enabled = false
renderer.outputColorSpace = three.LinearSRGBColorSpace
door.colorSpace = three.SRGBColorSpace

const material = new three.MeshStandardMaterial({side: three.DoubleSide, map: door})
material.transparent = true
material.aoMap = ambientOcclusion
material.normalMap = normal
material.alphaMap = alpha
material.metalness = 0.45
material.roughness = 0.65
material.metalnessMap = metalness
material.roughnessMap = roughness
material.displacementMap = heightMapping
material.displacementScale = 0.05
material.aoMap = ambientOcclusion
material.aoMapIntensity = 0.5

const plane = new three.Mesh(new three.PlaneGeometry(1, 1, 100, 100), material)
scene.add(plane)

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