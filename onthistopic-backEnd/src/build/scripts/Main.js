function init(){
    var scene = new THREE.Scene()

    var box = getBox()
    var plane = getPlane(4)
    scene.add(box)
    scene.add(plane)
    plane.rotation.x = Math.PI/2
    // box.position.y = box.geometry.parameters.height/2

    var camera = new THREE.PerspectiveCamera(
        45, 
        window.innerWidth/window.innerHeight,
        1,
        1000
    )
    camera.position.x = 1
    camera.position.y = 2
    camera.position.z = 3
    camera.lookAt(new THREE.Vector3(0, 0, 0))


    var renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.getElementById("experiments").appendChild(renderer.domElement)
    renderer.render(
        scene, 
        camera
    )

}
function getPlane(size){
    var geometry = new THREE.PlaneGeometry(size, size)
    var material = new THREE.MeshBasicMaterial({
        color:0xF7B801,
        side:THREE.DoubleSide
    })
    var mesh = new THREE.Mesh(
        geometry, 
        material
    )
    return mesh
}
function getBox(w, h, d){
    var geometry = new THREE.BoxGeometry(w, h, d)
    var material = new THREE.MeshBasicMaterial({
        color:0x67E0A3
    })
    var mesh = new THREE.Mesh(
        geometry, 
        material
    )
    return mesh
}

window.addEventListener('load', function () {
  init()
})