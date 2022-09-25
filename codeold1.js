"use strict";
figma.showUI(__html__);
figma.ui.resize(700, 700);
// figma.ui.onmessage = async(pluginMessage) => {
//   console.log("requesttt apiiii",pluginMessage.request);
//   await figma.loadFontAsync({ family:"Rubik", style: "Regular"});
//   const postComponentSet = figma.root.findOne(node => node.type == "COMPONENT_SET" && node.name == "post") as ComponentSetNode;
//   // const defaultVarient= postComponentSet.defaultVariant as ComponentNode; 
//   // const defaultDark= postComponentSet.findOne(node => node.type == "COMPONENT" && node.name == "Image=none, Dark mode=true") as ComponentNode;
//   // defaultVarient.createInstance();
//   let selectedVarient;
//   console.log(postComponentSet);
//   console.log(postComponentSet.children);
//   if(pluginMessage.darkModeState === true){
//     // defaultDark.createInstance();
//     // console.log("Welcome to the dark mode state");
//     switch(pluginMessage.imageVariant){
//       case "2":
//           selectedVarient = postComponentSet.findOne(node => node.type == "COMPONENT" && node.name == "Image=single, Dark mode=true") as ComponentNode;
//           break;
//       case "3":
//         selectedVarient = postComponentSet.findOne(node => node.type == "COMPONENT" && node.name == "Image=carousel, Dark mode=true") as ComponentNode;
//          break;
//       default :
//        selectedVarient = postComponentSet.findOne(node => node.type == "COMPONENT" && node.name == "Image=none, Dark mode=true") as ComponentNode;
//        break;
//     }
//   }else{
//     // defaultVarient.createInstance();
//     // console.log("It's now on light state");
//     switch(pluginMessage.imageVariant){
//       case "2":
//           selectedVarient = postComponentSet.findOne(node => node.type == "COMPONENT" && node.name == "Image=single, Dark mode=false") as ComponentNode;
//           break;
//       case "3":
//         selectedVarient = postComponentSet.findOne(node => node.type == "COMPONENT" && node.name == "Image=carousel, Dark mode=false") as ComponentNode;
//          break;
//       default :
//       selectedVarient = postComponentSet.defaultVariant as ComponentNode;
//         break;
//     }
//   }
//   let newPost = selectedVarient.createInstance();
//   const templateName = newPost.findOne(node => node.name == "displayName" && node.type == "TEXT") as TextNode;
//   const templateUsername = newPost.findOne(node => node.name == "@username" && node.type == "TEXT") as TextNode;
//   const templateDescription = newPost.findOne(node => node.name == "description" && node.type == "TEXT") as TextNode;
//   templateName.characters = pluginMessage.name;
//   templateUsername.characters = pluginMessage.username;
//   templateDescription.characters = pluginMessage.description;
//   figma.closePlugin();
// }
figma.ui.onmessage = msg => {
    const { dropPosition, windowSize, offset, itemSize, svgg } = msg;
    // Getting the position and size of the visible area of the canvas.
    const bounds = figma.viewport.bounds;
    // Getting the zoom level
    const zoom = figma.viewport.zoom;
    // There are two states of the Figma interface: With or without the UI (toolbar + left and right panes)
    // The calculations would be slightly different, depending on whether the UI is shown.
    // So to determine if the UI is shown, we'll be comparing the bounds to the window's width.
    // Math.round is used here because sometimes bounds.width * zoom may return a floating point number very close but not exactly the window width.
    const hasUI = Math.round(bounds.width * zoom) !== windowSize.width;
    // Since the left pane is resizable, we need to get its width by subtracting the right pane and the canvas width from the window width.
    const leftPaneWidth = windowSize.width - bounds.width * zoom - 240;
    // Getting the position of the cursor relative to the top-left corner of the canvas.
    const xFromCanvas = hasUI ? dropPosition.clientX - leftPaneWidth : dropPosition.clientX;
    const yFromCanvas = hasUI ? dropPosition.clientY - 40 : dropPosition.clientY;
    // Create a rectangle
    // const rect = figma.createRectangle();
    const rect = svgg;
    console.log("rect", rect);
    // Resize the rectangle to be the same size as the item from the plugin window.
    // rect.resize(itemSize.width, itemSize.height);
    figma.currentPage.appendChild(rect);
    // The canvas position of the drop point can be calculated using the following:
    rect.x = bounds.x + xFromCanvas / zoom - offset.x;
    rect.y = bounds.y + yFromCanvas / zoom - offset.y;
    // Select the rectangle
    figma.currentPage.selection = [rect];
};
