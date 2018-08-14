//---------------------------------------------------------WebGL threejs----------------------------------------------
if (!Detector.webgl) {
    Detector.addGetWebGLMessage();
}

//variables used for canvas
var container;
var camera, controls, scene, renderer;
var lighting, ambient, keyLight, fillLight, backLight;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

//import stl file 
init("http://ayeaye.ee.ucla.edu/stool.stl?height=50&legs=3&radius=30");// backend url
render();//render and update

function init(url) {
	//create a div under 3D model, in order to delete and recreate a new div once 3D model updates
   	var footer=document.getElementById("footer");
	container=document.createElement("div");
	container.id="container1";
	footer.appendChild(container);

    // CAMERA
    camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 100000);
    camera.position.z = 200;

    // SCENE
    scene = new THREE.Scene();
    scene.background = new THREE.Color("rgb(255,255,255)" );

    // OBJECT
    var loader = new THREE.STLLoader();
    loader.load( url, function ( geometry ) { // load stl file with "url"

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

// render without which 3D model can not shown
function render() {
    requestAnimationFrame(render);
    controls.update();
    renderer.render(scene, camera);
}


//--------------------------------------------------------file compiler-------------------------------------------------------------

var content;// global variable used to store all the content in txt file 
var area = new Array();// global variable used to store content sorted by different categories

//read file
function  handleFiles(files)
  {
    if(files.length)//if successful to read
    {
       var file = files[0];
       var reader = new FileReader();
       reader.onload = function()
       {
		   content=this.result;
		   analyzeFile(content);//store in global varialbe: content
	   };
       reader.readAsText(file);//type: text
    }
  }

//compiler
function analyzeFile(con) 
{
	var ctgy = new Array();//store categories names
	area = con.split("~"); //separate by categories (use symbol ~)
    var  n_area = area.length-1;//get rid of the empty area followed by the last symbol "~"
	//collect categories names
	for (var i = 0; i < n_area; i++) {
		var a = new Array();
		a = area[i].split(";");
		ctgy[i] = a[0];
	}
	//create a select control for category 
	var top = document.getElementById("top");
	var select = document.createElement("select");
	var div = document.createElement("div");
	div.innerHTML = "Category: ";
	div.id = "belowCategory";
	select.id = "category";
	select.setAttribute('onchange','category_onchange(this[selectedIndex].value)');
	for (i = 0; i < n_area; i++)//create select options  
	{
		var obj = document.createElement("option");
		obj.value = ctgy[i];
		obj.text = ctgy[i];
		obj.id = ctgy[i];
		select.appendChild(obj);
	}
	div.appendChild(select);
	top.appendChild(div);//append to the last control
	//create controls one by one
	for (i = 0; i < n_area; i++) // for each category
	{
		var belowSelect = document.getElementById("belowCategory");//implement under div:belowCategory
		var cdiv = document.createElement("div");//create a new div for each category
		var inrrow=new Array();//save each row of this category
		inrrow=area[i].split(";");//like textbox, height: 20,50.
		cdiv.id=inrrow[0]+"div";//generate id for this new div
		cdiv.innerHTML="<br/>";
		var a_id=cdiv.id;
		if(i===0)//during initialization: only show the content belongs to the first category 
			{
				cdiv.style.display = "block";//show
			}
		else{
				cdiv.style.display = "none";//hide
		}
		belowSelect.appendChild(cdiv);//append 
		//read every row in this category
		for(var c=1;c<inrrow.length;c++)
			{
				var str=inrrow[c];//str has blanks, for example, str="   textbox"
				if((str.indexOf("textbox"))>-1)//judge if it's a textbox
					{
						var row=new Array();
						row=inrrow[c].split(/[,:,]/);//separate textbox row
						var top=document.getElementById(a_id);//create a new control
						var input=document.createElement("input");
						var div=document.createElement("div");
						var x=row[1];//name of textbox
						var y=row[2];//lower bound
						var z=row[3];//higher bound
						div.innerHTML=x+":<br/>";
						input.type="text";
						input.name="v";
						input.value=y+"~"+z;
						input.id=inrrow[0]+"textbox"+c;//generate input id: category name+"textbox"+row number in this category
						input.onfocus=function()//once click, value which shows as a hint disappear 
						{
							this.value="";
						};
						div.appendChild(input);
						top.appendChild(div);//append this new control
					}
				else if((str.indexOf("dropdown"))>-1)//judge if it's a select
				{
					var row=new Array();
					row=inrrow[c].split(/[,]/);//separate deopdown row
					var top=document.getElementById(a_id);//create a new control
					var select=document.createElement("select");
					var div=document.createElement("div");
					var ai=row[0];//dropdown
					var name=row[1];//name of dropdown
					var num=row[2];//the third para: num of choices 
					var num2=row.length-3;//nums of choices in reality
					if(parseInt(num)!==num2)//judge whether num of choices is correct 
						{
							alert("Format error:"+ctgy[i]+",Row:"+c);//error reminder
						}
					div.innerHTML=name+": ";
					select.id=inrrow[0]+"dropdown"+c;//generate dropdown id: category name+"dropdown"+row number in this category 
					for(var t=0;t<num;t++)
						{
							var obj=document.createElement("option");//create options in selector
							obj.value=row[3+t];
							obj.text=row[3+t];
							select.appendChild(obj);
						}
					div.appendChild(select);
					top.appendChild(div);
				}

			}
	
	}
	//create a save button
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
	document.getElementById("save").onclick=function(){save()};//once click
}

function save()
{
	//remove the exsisting canvas
	var child=document.getElementById("container1");
	child.parentNode.removeChild(child);
	//collect information online by id
	var obj=document.getElementById("category");
	var index=obj.selectedIndex;//confirm the category user select  
	var text = obj.options[index].text; 
	//searching for id
	area = content.split("~");//separate content by category
    var  n_area = area.length-1;
	var a=new Array();//save each row in the category
	//work out URL path
	var label=new Array();//store the name of the control
	var label_value=new Array();//store the value of the control
	a=area[index].split(";");//separate this category (user select) by row
	for(var row=1;row<a.length;row++)//collect names and values and store in array:label(), label_value()
		{
			var str=a[row];
			if((str.indexOf("textbox"))>-1)
				{
					var tem=new Array();
				    tem=str.split(/[,:,]/);
					label[row]=tem[1].trim();//remove blank space
					var this_id=text+"textbox"+row;
					label_value[row]=document.getElementById(this_id).value;
				}
			else if((str.indexOf("dropdown"))>-1)
				{
					var tem=new Array();
					tem=str.split(/[,]/);
					label[row]=tem[1].trim();//remove blank space
					var this_id=text+"dropdown"+row;
					var tem_dropdown_value=document.getElementById(this_id).value;
					label_value[row]=tem_dropdown_value.trim();
				}
		}
	var partialUrl="http://ayeaye.ee.ucla.edu/stool.stl?";//partial of the url
	for(var row=1;row<a.length-1;row++)//compose the rest of the url
		{
			if(row>1)
				{
					partialUrl=partialUrl+"&"+label[row]+"="+label_value[row];
				}
			else
				{
					partialUrl=partialUrl+label[row]+"="+label_value[row];	
				}
		}
	//renew stl file
	init(partialUrl);
	render();
}

//switch contents by categories
function category_onchange(val)
{
		  var select1 = document.getElementById('category');
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




