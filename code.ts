figma.showUI(__html__);
// import axios from 'axios';
// const puppeteer = require('axios')
figma.ui.resize(500,700);

// Receive the drop event from the UI
figma.on('drop', (event: DropEvent) => {
  const { files, node, dropMetadata } = event;
  if(files.length > 0 && files[0].type === 'image/svg+xml'){
    // const newNode = figma.createNodeFromSvg(items[0],data);
    // if (node.appendChild) {
    //   node.appendChild(newNode);
    // }
    files[0].getTextAsync().then(text => {
      if (dropMetadata.parentingStrategy === 'page') {
        const newNode = figma.createNodeFromSvg(text);
        newNode.x = event.absoluteX;
        newNode.y = event.absoluteY;
        
        figma.currentPage.selection = [newNode];
      } 
      else if (dropMetadata.parentingStrategy === 'immediate') {
        const newNode = figma.createNodeFromSvg(text);
        if (node.appendChild) {
          node.appendChild(newNode);
        }
              
        newNode.x = event.x;
        newNode.y = event.y;
              
        figma.currentPage.selection = [newNode];
      }
    });
  }
  
  
  return false;
});


figma.ui.onmessage = async(pluginMessage) => {

  await figma.clientStorage.setAsync('my-token',pluginMessage.username)
  const token = await figma.clientStorage.getAsync('my-token');
  // console.log(token,"tokennnnn");

  const compNode = figma.root.findOne(node => node.type == "COMPONENT_SET" && node.name == "post");
  console.log(compNode,'compNode');
  const postComponentSet = compNode as ComponentSetNode;
  const defaultVarient= postComponentSet.defaultVariant as ComponentNode; 
  defaultVarient.createInstance();

  const selected = figma.currentPage.selection[0];
  console.log(selected,'selected node');
  const postComponentSet2=selected as ComponentSetNode;
  const newNode = postComponentSet2.defaultVariant as ComponentNode;
  // newNode.createInstance();
  for (const node of figma.currentPage.selection) {
    console.log(node,'nodee')
  }

    
  figma.currentPage.selection[0].clone()
  console.log(figma.currentPage.selection[0].clone(),"clone")

    // const { currentPage } = figma
    //   const selectedNode = currentPage.selection;
    //   console.log(selectedNode,'selectedNodeselectedNode')
    //   if (selectedNode.length > 0) {
    //     const clonedNodes: SceneNode[] = []
    //     selectedNode.forEach(node => clonedNodes.push(node.clone()));
    //     const group = figma.group(clonedNodes, currentPage)
    //     console.log(group,'grouppppppp')
    //   }


  // const defaultDark= postComponentSet.findOne(node => node.type == "COMPONENT" && node.name == "Image=none, Dark mode=true") as ComponentNode;
  // console.log("defaultVarient",defaultVarient)


  // console.log(postComponentSet,"postComponentSet")
  // // defaultVarient.createInstance();
  // let selectedVarient;
  // console.log(defaultVarient,"defaultVarient");
  // selected.createInstance();
  // console.log(selected,"selected");
  



    // await axios({
    //   method: "get",
    //   url: "http://localhost:3333/getCategory",
    //   // url: "https://sandbox-vendors.paddle.com/api/2.0/product/generate_pay_link",
    // })
    //   .then(function (response) {
    //     //handle success
    //     // if(response.data){
    //     //   checkoutPaylinkUrl=response.data.response.url
    //     // }
    //     // isSuccess=true
    //   })
    //   .catch(function (response) {
    //     //handle error
        
    //   });
    // figma.closePlugin();
}