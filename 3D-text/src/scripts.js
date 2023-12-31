import * as three from 'three'
import * as lil from 'lil-gui' 
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry.js'
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader.js'
import matcap from '/matcap.png'

const gui = new lil.GUI()

const scene = new three.Scene(window.innerWidth, window.innerHeight)
const camera = new three.PerspectiveCamera(75, window.innerWidth/window.innerHeight)
const renderer = new three.WebGLRenderer({canvas: document.querySelector('canvas.webgl')})

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

camera.position.z = 6

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.update()

const textureLoader = new three.TextureLoader()
const texture = textureLoader.load(matcap)

three.ColorManagement.enabled = false
renderer.outputColorSpace = three.LinearSRGBColorSpace
texture.colorSpace = three.SRGBColorSpace

const group = new three.Group()
scene.add(group)

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
    group.add(text)
    textGeometry.center()
}) 

const cubeGeometry = new three.BoxGeometry(0.4, 0.4, 0.4)
const donutGeometry = new three.TorusGeometry(0.3, 0.15)

for(let i = 0; i < 200; i++){
    const cube = new three.Mesh(cubeGeometry, new three.MeshMatcapMaterial({matcap: texture}))
    const donut = new three.Mesh(donutGeometry, new three.MeshMatcapMaterial({matcap: texture}))
    cube.position.set(15*(Math.random()-0.5), 15*(Math.random()-0.5), 15*(Math.random()-0.5))
    donut.position.set(15*(Math.random()-0.5), 15*(Math.random()-0.5), 15*(Math.random()-0.5))
    cube.rotation.set(Math.random()*Math.PI, Math.random()*Math.PI, Math.random()*Math.PI)
    donut.rotation.set(Math.random()*Math.PI, Math.random()*Math.PI, Math.random()*Math.PI)
    const scaleValue = Math.random()
    cube.scale.set(scaleValue, scaleValue, scaleValue)
    donut.scale.set(scaleValue, scaleValue, scaleValue)
    group.add(cube, donut)
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

const Clock = new three.Clock()

const rotation = {
    rotate: true
}

gui.add(rotation, 'rotate').name('Rotation')

const animate = () => {
    const time = Clock.getElapsedTime()
    if(!rotation.rotate){
        group.position.x = 0
        group.position.y = 0
    }
    else{
        group.position.x = 2.5*Math.sin(Math.PI*time*0.5)
        group.position.y = 2.5*Math.cos(Math.PI*time*0.5)
    }
    camera.lookAt(group.position)
    renderer.render(scene, camera)
    window.requestAnimationFrame(animate)
}

animate()