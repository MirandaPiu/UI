// JavaScript Document// JavaScript Document//--------------------------------------------------threejs-----------------------
if (!Detector.webgl) {
    Detector.addGetWebGLMessage();
}

// All of these variables will be needed later, just ignore them for now.
var container;
var camera, controls, scene, renderer;
var lighting, ambient, keyLight, fillLight, backLight;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
render();

function init() {
   	var footer=document.getElementById("footer");//---------------------------create in footer
	container=document.createElement("div");
	footer.appendChild(container);

    // CAMERA
    camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 100000);
    camera.position.z = 200;

    // SCENE
	
    scene = new THREE.Scene();
    scene.background = new THREE.Color("rgb(255,255,255)" );

    // OBJECT
    var loader = new THREE.STLLoader();
    loader.load( 'static/table.stl', function ( geometry ) {

        var material = new THREE.MeshPhongMaterial( { color: 0x331a00, specular: 0x111111, shininess: 200 } );
        var mesh = new THREE.Mesh( geometry, material );
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        geometry.computeFaceNormals();
        geometry.computeVertexNormals();
		
        scene.add( mesh );
    } );

    // LIGHTING
    scene.add( new THREE.HemisphereLight( 0x994d00, 0x994d00 ) );
    addShadowedLight( 1000, 1000, 1000, 0xffffff, 1.35 );
    addShadowedLight( 500, 1000, -1000, 0x994d00, 1 );

    // RENDERER
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(700,700);
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.shadowMap.enabled = true;

    // CONTROLS
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;

    container.appendChild(renderer.domElement);

}

function addShadowedLight( x, y, z, color, intensity ) {
    var directionalLight = new THREE.DirectionalLight( color, intensity );
    directionalLight.position.set( x, y, z );
    scene.add( directionalLight );
    directionalLight.castShadow = true;
    var d = 1;
    directionalLight.shadow.camera.left = -d;
    directionalLight.shadow.camera.right = d;
    directionalLight.shadow.camera.top = d;
    directionalLight.shadow.camera.bottom = -d;
    directionalLight.shadow.camera.near = 1;
    directionalLight.shadow.camera.far = 4;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.bias = -0.002;
}

function render() {
    requestAnimationFrame(render);
    controls.update();
    renderer.render(scene, camera);
}

//--------------------------------------------------------syntax analyze---------------
 // JavaScript Document// JavaScript Document// JavaScript Document// JavaScript Document
 
function  handleFiles(files)
  {
    if(files.length)
    {
       var file = files[0];
       var reader = new FileReader();
       reader.onload = function()
       {
		   //document.getElementById("in_width").innerHTML = this.result;
		   var content=this.result;
		   analyzeFile(content);
	   };
       reader.readAsText(file);
    }
  }

function analyzeFile(con) 
{
	var area = new Array();
	var ctgy = new Array();
	area = con.split("~"); // 区
	var n_area = area.length-1;
	//Catagory
	for (var i = 0; i < n_area; i++) {
		var a = new Array();
		a = area[i].split(";");
		ctgy[i] = a[0];
	}
	var top = document.getElementById("top");
	var select = document.createElement("select");
	var div = document.createElement("div");
	div.innerHTML = "Category: ";
	div.id = "belowCatagory";
	select.id = "catagory";
	select.setAttribute('onchange','category_onchange(this[selectedIndex].value)');
	for (i = 0; i < n_area; i++) 
	{
		var obj = document.createElement("option");
		obj.value = ctgy[i];
		obj.text = ctgy[i];
		obj.id = ctgy[i];
		select.appendChild(obj);
	}
	div.appendChild(select);
	top.appendChild(div);
	
	// inner Catagory
	for (i = 0; i < n_area; i++) // separate area 2
	{
		var belowSelect = document.getElementById("belowCatagory");
		var cdiv = document.createElement("div");
		var inrrow=new Array();
		inrrow=area[i].split(";");//like textbox, height: 20,50.
		cdiv.id=inrrow[0]+"div";// chairdiv
		cdiv.innerHTML="<br/>";
		var a_id=cdiv.id;
		if(i===0)
			{
				cdiv.style.display = "block";
			}
		else{
				cdiv.style.display = "none";
		}
		belowSelect.appendChild(cdiv);
		for(var c=1;c<inrrow.length;c++)
			{
				var str=inrrow[c];
				if((str.indexOf("textbox"))>-1)
					{
						var row=new Array();
						row=inrrow[c].split(/[,:,]/);
						var top=document.getElementById(a_id);
						var input=document.createElement("input");
						var div=document.createElement("div");
						var x=row[1];
						var y=row[2];
						var z=row[3];
						div.innerHTML=x+":<br/>";
						input.type="text";
						input.name="v";
						input.value=y+"~"+z;
						input.id="v";
						input.onfocus=function()
						{
							this.value="";
						};
						div.appendChild(input);
						top.appendChild(div);
					}
				else if((str.indexOf("dropdown"))>-1)
				{
					var row=new Array();
					row=inrrow[c].split(/[,]/);
					var top=document.getElementById(a_id);
					var select=document.createElement("select");
					var div=document.createElement("div");
					var ai=row[0];
					var name=row[1];
					var num=row[2];
					var num2=row.length-3;
					if(parseInt(num)!==num2)
						{
							alert("Format error:"+ctgy[i]+",Row:"+c);
						}
					div.innerHTML=name+": ";
					select.id=ai+i;
					for(var t=0;t<num;t++)
						{
							var obj=document.createElement("option");
							obj.value=row[3+t];
							obj.text=row[3+t];
							select.appendChild(obj);
						}
					div.appendChild(select);
					top.appendChild(div);
				}

			}
	
	}
	var row = new Array();
	var top = document.getElementById("medium");
	var input = document.createElement("input");
	var div = document.createElement("div");
	div.innerHTML =  "<br/>" ;
	input.type = "button";
	input.name = "v";
	input.value = "Save";
	input.id = "save";
	input.class="button button1";
	input.style.width = "15%";
	div.appendChild(input);
	top.appendChild(div);
	document.getElementById("save").onclick=function(){save()};
}

function save()
{
	
}


function category_onchange(val)
{
		  var select1 = document.getElementById('catagory');
		  for( var i=0;i<select1.length;i++)
			  {
				  document.getElementById(select1[i].value+"div").style.display = 'none';

			  }
		  for( var i=0;i<select1.length;i++)
			  {
				  if(val===select1[i].value)
					  {
						  document.getElementById(val+"div").style.display = 'block';
					  }
			  }

}


			// input
					
					

				/*

					// input
					var row=new Array();
					row=arr[i].split(/[,:,]/);
					var top=document.getElementById("top");
					var input=document.createElement("input");
					var div=document.createElement("div");
					var x=row[1];
					var y=row[2];
					var z=row[3];
					div.innerHTML=x+":<br/>";
					input.type="text";
					input.name="v";
					input.value=y+"~"+z;
					input.id="v";
					input.onfocus=function()
					{
						this.value="";
					};
					
					div.appendChild(input);
					top.appendChild(div);

					// button
					var row=new Array();
					row=arr[i].split(/[,:,]/);
					var top=document.getElementById("top");
					var input=document.createElement("input");
					var div=document.createElement("div");
					var x=row[1];
					var y=row[2];
					var z=row[3];
					div.innerHTML=x+":<br/>";
					input.type="button";
					input.name="v";
					input.value=x;
					input.id="v";
					input.style.width="15%";
					div.appendChild(input);
					top.appendChild(div);
					
				// slider
					var top=document.getElementById("top");
					var input=document.createElement("input");
					var div=document.createElement("div");
					var x=arr[i];
					div.innerHTML=x+"<br/>";
					div.id="d1";
					input.href="https://maxcdn.bootstrapcdn.com/bootstrap/css/bootstrap.min.css"; 
					input.href="css/bootstrap-slider.min.css";
					input.rel="stylesheet";
					input.type="text";
					input.name="v";
					input.id="v";
					input.setAttribute("data-Slider-id","vv");
					input.setAttribute("data-Slider-min","1");
					input.setAttribute("data-Slider-max","10");
					input.setAttribute("data-Slider-step","1");
					input.setAttribute("data-Slider-tooltip","show");
					input.setAttribute("data-Slider-value","5");
					input.setAttribute("class","tooltip");
					$('#v').slider({
					formatter: function(value) {
						document.getElementById("#d1").innerHTML= 'current value: ' + value;	
					}
						
				});
					div.appendChild(input);
					top.appendChild(div);	
					*/


