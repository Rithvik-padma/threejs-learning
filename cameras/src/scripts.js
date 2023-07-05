import * as three from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

let cursor ={ 
    x: 0,
    y: 0
}

window.addEventListener('mousemove', (e) => {
    cursor.x = e.clientX/window.innerWidth - 0.5
    cursor.y = -(e.clientY/window.innerHeight - 0.5)
})

const scene = new three.Scene(window.innerWidth, window.innerHeight)
const camera = new three.PerspectiveCamera(75, window.innerWidth/window.innerHeight,)
const renderer = new three.WebGLRenderer({canvas: document.querySelector('canvas.webgl')})

const controls = new OrbitControls(camera, renderer.domElement)
// controls.target.y = 1
// controls.update()
controls.enableDamping = true

renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.z = 5
const box = new three.Mesh(new three.BoxGeometry(1, 1, 1, 100, 100 ,500), new three.MeshBasicMaterial({color: '#ff0000'}))
scene.add(box)
// camera.lookAt(box.position)

let clock = new three.Clock()

const animation = () => {
    // const elapsedTime = clock.getElapsedTime()
    // box.rotation.y = elapsedTime

    // camera.position.x = 5*Math.sin(Math.PI*2*cursor.x)
    // camera.position.z = 5*Math.cos(Math.PI*2*cursor.x)
    // camera.position.y = 5*cursor.y
    // camera.lookAt(box.position)
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(animation)
}

animation()