import * as three from 'three'

const scene = new three.Scene(window.innerWidth, window.innerHeight)
const camera = new three.PerspectiveCamera(75, window.innerWidth/window.innerHeight)
const renderer = new three.WebGLRenderer({canvas: document.querySelector('canvas.webgl')})

renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.set(3, 3 , 5)

scene.add(new three.AxesHelper())

const group = new three.Group()
scene.add(group)

const cube1 = new three.Mesh(new three.BoxGeometry(1, 1, 1), new three.MeshBasicMaterial({color: '#ff0000'}))
const cube2 = new three.Mesh(new three.BoxGeometry(1, 1, 1), new three.MeshBasicMaterial({color: '#00ff00'}))
const cube3 = new three.Mesh(new three.BoxGeometry(1, 1, 1), new three.MeshBasicMaterial({color: '#0000ff'}))
group.add(cube1, cube2, cube3)
cube1.position.x = 1
cube2.position.x = 2
cube3.position.x = -2

group.position.y = 2


// const box = new three.Mesh(new three.BoxGeometry(1, 1, 1), new three.MeshBasicMaterial({color: '#ff0000'}))
// scene.add(box)

// box.position.set(0, 3, 0)
// box.rotation.reorder('YXZ')
// box.rotation.y = Math.PI * 0.25
// box.rotation.x = Math.PI * 0.25

// camera.lookAt(box.position)

// box.position.normalize()

renderer.render(scene, camera)
