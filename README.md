# UI
                                               Instruction for Developers

Tool Instruction:
The tool I use is DW. One of the advantage is that it allows developers to have real-time view of how your website will look like. It’s mostly the same as you it on browsers, only if it comes to compatibility differences on various browsers or other problems from some libraries. Honestly, it will save you a lot of time.

How to Run The Code:
The first step is make sure you’ve got a DW. My version is DWCC 2018 though I think most of  other versions also work. And then you can download it directly from GitHub. All the extension libraries are already in the folder. So make sure you download them together. 

The second step is to click the 15.html file directly in order to run it on a browser. You should have a view of 3D model on the right side of the website. If not, please follow:
      1. Check WebGL Compatibility. You can just click this link if you need. 
          https://threejs.org/docs/#manual/introduction/WebGL-compatibility-check
          https://caniuse.com/#feat=webgl
      2. Check the folder static is complete.
      3. Check whether the backend links works. This link is written in 15js.js file.  You may found : init(“http://ayeaye.ee.ucla.edu/stool.stl?height=50&legs=3&radius=30”). Since this link might be changed, but this statement will be still.
      4. Open 15.html in Google Chrome which allow users to debug to figure out where exactly the problem is. Sometimes it’s only because there some bugs make it stuck which leads to failure of other functions. 

The third step is to upload a input file.
      1. Only .txt file is allowed to uploaded.
      2. If it doesn’t generate controls successfully, please check whether the input format is correct. Format grammar will be introduced more detailed later.
      3. If there is a error reminder after you upload the file, just fix the format error and refresh the website again before you upload a correct txt file.

Input Format:



