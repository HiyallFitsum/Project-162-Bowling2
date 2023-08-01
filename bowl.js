AFRAME .registerComponent("bowling", {
    schema : {

    },

    init : function() {
        this.bowl();
    },

    bowl : function() {

        window.addEventListener("keydown", (e)=>{
            if(e.key === "z") {

                var ball = document.createElement("a-entity")

                ball.setAttribute("gltf-model", "./models/bowling_ball/scene.gltf");

                ball.setAttribute("scale", { x: 3, y: 3,  z: 3});
                
                var cam = document.querySelector("#camera")
                var pos = cam.getAttribute("position");
                ball.setAttribute("position", {x: pos.x, y: pos.y, z: pos.z})

                var camera = document.querySelector("#camera").object3D;

                var direction = new THREE.Vector3()
                camera.getWorldDirection(direction)

                ball.setAttribute("velocity", direction.multiplyScalar(-20))

                var scene = document.querySelector("#scene")

                ball.setAttribute("dynamic-body", {
                    shape: "sphere",
                    mass: "0"
                });

                ball.addEventListener("collide", this.addCollision);
                scene.appendChild(ball)

                var wall = document.querySelector("#wall");
                wall.addEventListener("collide", this.removePins);
            }
        })
    },

    addCollision : function(e) {
        var element = e.detail.target.el;

        var elementHit = e.detail.body.el;

        if (elementHit.id.includes("pin")){
            //console.log(elementHit)

            var impulse = new CANNON.Vec3(-2, 2, 1);
            var worldPoint = new CANNON.Vec3().copy(elementHit.getAttribute("position"));
      
            elementHit.body.applyForce(impulse, worldPoint);

            element.removeEventListener("collide", this.addCollision)

            var scene = document.querySelector("#scene")
            scene.removeChild(element);
        }
    },
    removePins : function(e) {

        var elementHit = e.detail.body.el;

        var scoreTxt = document.querySelector("#score")
        var score = scoreTxt.getAttribute("text").value;
        var count = parseInt(score);

        var pinsTxt = document.querySelector("#pinsLeft")
        var pins = pinsTxt.getAttribute("text").value;
        var pinsLeft = parseInt(pins);

        if (elementHit.id.includes("pin")){   
                console.log("Its working")
                var scene = document.querySelector("#scene")
                scene.removeChild(elementHit)
                count += 1;
                pinsLeft-=1;
                scoreTxt.setAttribute("text", {value: count})
                pinsTxt.setAttribute("text", {value: pinsLeft})
        }
        
    },
})