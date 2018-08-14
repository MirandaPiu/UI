Instruction for developers
===========================
### Tool Instruction:
  The tool I use is DW. One advantage is that it allows developers to have real-time view of how your website will look like. It’s mostly the same as you it on browsers, only if it comes to compatibility differences on various browsers or other problems from some libraries. Honestly, it will save you a lot of time.

### How to Run The Code:
  **Step 1**:  
  Make sure you’ve got a DW. My version is DWCC 2018 though I think most of other versions also work. And then you can download it directly from GitHub. All the extension libraries are already in the folder. So make sure you download them together.

  **Step 2**:  
  Click the 15.html file directly in order to run it on a browser. You should have a view of 3D model on the right side of the website. If not, please follow: 
  * Check WebGL Compatibility. You can just click this link if you need. https://threejs.org/docs/#manual/introduction/WebGL-compatibility-check https://caniuse.com/#feat=webgl 
  * Check the folder static is complete. 
  * Check whether the backend links works. This link is written in 15js.js file. 
    You may found : init(“http://ayeaye.ee.ucla.edu/stool.stl?height=50&legs=3&radius=30”). Since this link might be changed, but this statement will be still. 
  * Open 15.html in Google Chrome which allow users to debug to figure out where exactly the problem is. Sometimes it’s only because there some bugs make it stuck which leads to failure of other functions.

  **Step 3**:  
  Upload a input file. 1. Only .txt file is allowed to uploaded. 2. If it doesn’t generate controls successfully, please check whether the input format is correct. Format grammar will be introduced more detailed later. 3. If there is a error reminder after you upload the file, just fix the format error and refresh the website again before you upload a correct txt file.

### Input Format:  
 Category1;  
         *Inner Content*  
  ~  
  Category2;  
         *Inner Content*  
  ~   
  Category3;  
         *Inner Content*   
  ~     
  ... ...    
  
  Format of *Inner Content*:  
  * textbox, label for this textbox: lower bound, upper bound;   
  * dropdown, label for this dropdown, num n of all choices, choice 1, choice 2, choice 3,...., choice n;  
  
  Under this format, there will be a dropdown list of Category 1, Category 2, .....,  at the top of website. By selecting the dropdown list, you may see corresponding inner content. 
  
  Kind Reminder:  
  * If there is only one category, you should also follow the following format completely:
       Category1;
              *Inner Content*
        ~ 
  * Symbols and formats of textbox and dropdown are different.   
  
  Example:  
   
 Bench;  
	textbox, height: 10, 30;  
	textbox, radius, 15, 30;  
	dropdown, legs, 3, 3, 4, 5;  
~ 
 
Table;  
	textbox, length: 30,80;  
	textbox, width: 30,80;  
	textbox, height: 40,60;  
	textbox, upper edge height: 10,15;  
	textbox, upper leg width: 3,10;   
	textbox, bottom leg width: 3,10;  
	dropdown, thickness, 3, 0.2, 0.4, 0.6;  
	dropdown, material, 3, plastic, wooden, stone;  
	dropdown, connections, 2, edge to edge, edge to face;   
~ 
   
Chair;  
	textbox, backrest length: 30,50;  
	textbox, backrest height: 30,50;  
	dropdown, backrest thickness, 3, 0.3, 0.5,1;   
	textbox, seat length: 10,15;  
	textbox, seat width: 3,10;    
	dropdown, seat thickness, 3, 0.3, 0.5,1;  
	textbox, leg height: 3,10;  
	textbox, leg width: 3,10;  
	dropdown, material, 3, plastic, wooden, stone;  
	dropdown, connections, 2, edge to edge, edge to face;  
~  
  
  ### ID:  
  The id of a control is:   
      **Its category** + **control function** + **row in the content of this category**.  
  For example:    
  Legs: Benchdropdown3  
  Seat width: Chairtextbox5  
  Connections(under Table): Tabledropdown9  
  Connections(under Chair): Chairdropdown10  
 
For more specific information, please turn to **Project Report**.
