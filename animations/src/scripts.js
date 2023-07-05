import * as three from 'three'
import gsap from 'gsap'

console.log(gsap)

const scene = new three.Scene(window.innerWidth, window.innerHeight)
const camera = new three.PerspectiveCamera(75, window.innerWidth/window.innerHeight)
const renderer = new three.WebGLRenderer({canvas: document.querySelector('canvas.webgl')})

renderer.setSize(window.innerWidth, window.innerHeight)

camera.position.z = 5

const box = new three.Mesh(new three.BoxGeometry(1, 1, 1), new three.MeshBasicMaterial({color: '#ff0000'}))
scene.add(box)

let clock = new three.Clock()

gsap.to(box.position, {duration: 1, delay: 1, x: 2})
gsap.to(box.position, {duration: 1, delay: 2, x: -2})

const animation = () => {
    const elapsedTime = clock.getElapsedTime();
    console.log(elapsedTime)
    // camera.position.y = 2*Math.sin(elapsedTime)
    // camera.position.x = 2*Math.cos(elapsedTime)
    // camera.lookAt(box.position)
    renderer.render(scene, camera)
    window.requestAnimationFrame(animation)
}

animation()