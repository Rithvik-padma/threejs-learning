import * as three from 'three'

const canvas = document.querySelector('canvas.webgl')
const scene = new three.Scene(window.innerWidth, window.innerHeight)
const camera = new three.PerspectiveCamera(75, window.innerWidth/window.innerHeight)
const renderer = new three.WebGLRenderer({canvas})

renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.set(2, 1, 7)

const box = new three.Mesh(new three.BoxGeometry(1, 1, 1), new three.MeshBasicMaterial({color: '#ff0000'}))
scene.add(box)

renderer.render(scene, camera)
