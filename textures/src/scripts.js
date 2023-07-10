import * as three from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

const scene = new three.Scene(window.innerWidth, window.innerHeight)
const camera = new three.PerspectiveCamera(75, window.innerWidth/window.innerHeight)
const renderer = new three.WebGLRenderer({canvas: document.querySelector('canvas.webgl')})

renderer.setSize(window.innerWidth, window.innerHeight)

camera.position.z = 3

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.update()

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