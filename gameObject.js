AFRAME.registerComponent("bowling-pins", {
    schema : {
        count: {type:"number", default:"0"}
    },

    update : function () {
        this.spawnPins();
    },

    init : function () {
        //this.spawnPins();
    },

    spawnPins : function() {
        let xPosition = -3;

        if(this.data.count < 1){
            for(var i = 1; i < 11; i++){
                var pin = document.createElement("a-entity");

                var positionX = xPosition + 1*i;
                if(i < 5){
                    var position = { x: positionX, y: 0, z: -6}
                }else if(i < 8 && i>4){
                    var position = { x: positionX-3.6, y: 0, z: -5}
                }else if(i < 10 && i>7){
                    var position = { x: positionX-6.25, y: 0, z: -4}
                }else if(i>9){
                    var position = { x: positionX-7.95, y: 0, z: -3}
                }
                
                var scale = { x: 4, y: 4, z: 4}

                pin.setAttribute("id", "pin" + i);
                pin.setAttribute("gltf-model", "./models/bowling_pin/scene.gltf");
                //pin.setAttribute("geometry", {primitive: "sphere", radius: 0.25,})
                pin.setAttribute("position", position);
                pin.setAttribute("scale", scale);
                pin.setAttribute("material", {color: "white"})
                pin.setAttribute("dynamic-body", {mass: 1})

                console.log(pin.getAttribute("id"));

                var scene = document.querySelector("#scene")
                scene.appendChild(pin)

                this.data.count += 0.1;
            }
        }
    }
})