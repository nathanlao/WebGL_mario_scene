## Interaction
- Press left mouse button to rotate mario's head
- Press right mouse button to trigger orbit camera for dynamic view of the scene
- Using wheel on mouse to zoom in and zoom out
- Press ArrowUp to on keyboard to let Mario jump
- Mario's arms wave
- If Mario's head hit the block, the block "bounce"
- If Mario's head hit the block, the coin is revealed
- Fire sways and flows continuously in the pipe

## Concepts used (Without using three.js)
- Enable Multisample Anti-Aliasing (MSAA) to smooth out jagged edges
- Viewing and Projection: Camera viewer is in relation to the scene
- Scaling transformation (platfrom, brick)
- Rotation transformation (brick, mario, coin, fire)
- Texture mapping, UV Coordinates (platform, brick, mario, coin, pipe, fire)
- lighting calculations (phong light model) and shading (All scene: platform, brick, mario, coin, pipe, fire)
- Hierarchical Modeling: Representing objects as hierarchies, Mario is constructed of multiple parts (head, arms, body, legs)
- Complex Objects and Meshes:
    - Sphere with uv mapping (mario head)
    - Cylinder with texture mapping (mario body and arms)
    - Cylinder With top and bottom caps (Coin)
    - Cylinder with a wider flange on top (pipe)
    - Frustum with texture mapping (mario leg)
    - Create a wavy quad, representing a single "tongue" of flame (fire)
- Depth Testing (Z-buffer Algorithm): When rendering objects in 3D space, I made use of depth testing. Thats is, pixel's depth value is checked against a stored value to determine visibility
- Vertex Manipulation for Animation: The "flowing" effect for the fire, where I modified vertex positions based on sine functions
- Collision Detection: Mario's head and the block

## Resources

### Texture image
https://www.pngkey.com/maxpic/u2e6a9q8r5q8e6u2/

https://www.pixilart.com/art/pixel-mario-question-mark-block-a16e719614a255f

https://www.redbubble.com/i/art-board-print/Question-Mark-Block-Box-Parody-by-ThatMerchStore/45319155.7Q6GI

https://wallpapersafari.com/w/PhoCDs

https://www.deviantart.com/ussempire/art/Mario-Overalls-61761578

https://www.models-resource.com/3ds/amiibolottery/model/15870/

https://www.mprnews.org/story/2023/03/15/itsame-marios-shoe-red-wing-makes-boots-inspired-by-video-game-character-mario

https://www.textures.com/download/PBR0152/133187

https://www.freepik.com/photos/mario-bros

https://wallpapercave.com/w/wp9929411

### Light movement
https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Lighting_in_WebGL

### Hierarchical Modeling
https://math.hws.edu/graphicsbook/c2/s4.html

### Spherical Mapping with Normals
https://www.mvps.org/directx/articles/spheremap.htm
https://codepen.io/ktmpower/pen/ZbGRpW
https://www.spiria.com/en/blog/desktop-software/understanding-uv-mapping-and-textures/

### Cylinder
http://www.songho.ca/opengl/gl_cylinder.html


### Frustum
https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_model_view_projection
https://webglfundamentals.org/webgl/frustum-diagram.html
