import * as three from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import brownDoor from '/textures/door/color.jpg'
import minecraft from '/textures/minecraft.png'
import chessboard from '/textures/checkerboard-8x8.png'

const scene = new three.Scene(window.innerWidth, window.innerHeight)
const camera = new three.PerspectiveCamera(75, window.innerWidth/window.innerHeight)
const renderer = new three.WebGLRenderer({canvas: document.querySelector('canvas.webgl')})

renderer.setSize(window.innerWidth, window.innerHeight)
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

camera.position.z = 3

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.update()

const textureLoader = new three.TextureLoader()
const doorImg = textureLoader.load(brownDoor)
const minecraftImg = textureLoader.load(minecraft)
const chessboardImg = textureLoader.load(chessboard)

const box = new three.Mesh(new three.BoxGeometry(1, 1, 1, 100, 100), new three.MeshBasicMaterial({map : chessboardImg}))
scene.add(box)

// doorImg.repeat.x = 2
// doorImg.repeat.y = 2
// doorImg.wrapS = three.RepeatWrapping
// doorImg.wrapT = three.RepeatWrapping
chessboardImg.generateMipmaps = false
chessboardImg.minFilter = three.NearestFilter
chessboardImg.magFilter = three.NearestFilter
// doorImg.rotation = Math.PI * 0.25
// doorImg.center.x = 0.5
// doorImg.center.y = 0.5

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