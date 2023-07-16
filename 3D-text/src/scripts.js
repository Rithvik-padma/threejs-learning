import * as three from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry.js'
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader.js'
import matcap from '/matcap.png'


const scene = new three.Scene(window.innerWidth, window.innerHeight)
const camera = new three.PerspectiveCamera(75, window.innerWidth/window.innerHeight)
const renderer = new three.WebGLRenderer({canvas: document.querySelector('canvas.webgl')})

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

camera.position.z = 5.5


const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.update()

const textureLoader = new three.TextureLoader()
const texture = textureLoader.load(matcap)

three.ColorManagement.enabled = false
renderer.outputColorSpace = three.LinearSRGBColorSpace
texture.colorSpace = three.SRGBColorSpace

const fontLoader = new FontLoader()
fontLoader.load('/Inconsolata.json', (font) => {
    const textGeometry = new TextGeometry('Rithvik Padma', {
        font,
        size: 0.9,
        height: 0.25,
        curveSegments: 12,
        bevelEnabled: true,
        bevelOffset: 0,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelSegments: 5,
    }) 
    const text = new three.Mesh(textGeometry, new three.MeshMatcapMaterial({matcap: texture}))
    scene.add(text)
    textGeometry.center()
})


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

const animate = () => {
    renderer.render(scene, camera)
    window.requestAnimationFrame(animate)
}

animate()