figma.showUI(__html__);

figma.ui.resize(700,700);

figma.ui.onmessage = async(pluginMessage) => {

  console.log("requesttt apiiii",pluginMessage.request);



  await figma.loadFontAsync({ family:"Rubik", style: "Regular"});
  const postComponentSet = figma.root.findOne(node => node.type == "COMPONENT_SET" && node.name == "post") as ComponentSetNode;
  // const defaultVarient= postComponentSet.defaultVariant as ComponentNode; 
  // const defaultDark= postComponentSet.findOne(node => node.type == "COMPONENT" && node.name == "Image=none, Dark mode=true") as ComponentNode;
  // defaultVarient.createInstance();
  let selectedVarient;
  console.log(postComponentSet);
  console.log(postComponentSet.children);
  console.log(postComponentSet.name);

  // console.log("pluginMesage from ts",pluginMessage.name);
  if(pluginMessage.darkModeState === true){
    // defaultDark.createInstance();
    // console.log("Welcome to the dark mode state");
    switch(pluginMessage.imageVariant){
      case "2":
          selectedVarient = postComponentSet.findOne(node => node.type == "COMPONENT" && node.name == "Image=single, Dark mode=true") as ComponentNode;
          break;
      case "3":
        selectedVarient = postComponentSet.findOne(node => node.type == "COMPONENT" && node.name == "Image=carousel, Dark mode=true") as ComponentNode;
         break;
      default :
       selectedVarient = postComponentSet.findOne(node => node.type == "COMPONENT" && node.name == "Image=none, Dark mode=true") as ComponentNode;
       break;
    }
  }else{
    // defaultVarient.createInstance();
    // console.log("It's now on light state");
    switch(pluginMessage.imageVariant){
      case "2":
          selectedVarient = postComponentSet.findOne(node => node.type == "COMPONENT" && node.name == "Image=single, Dark mode=false") as ComponentNode;
          break;
      case "3":
        selectedVarient = postComponentSet.findOne(node => node.type == "COMPONENT" && node.name == "Image=carousel, Dark mode=false") as ComponentNode;
         break;
      default :
      selectedVarient = postComponentSet.defaultVariant as ComponentNode;
        break;
    }
  }

  let newPost = selectedVarient.createInstance();
  const templateName = newPost.findOne(node => node.name == "displayName" && node.type == "TEXT") as TextNode;
  const templateUsername = newPost.findOne(node => node.name == "@username" && node.type == "TEXT") as TextNode;
  const templateDescription = newPost.findOne(node => node.name == "description" && node.type == "TEXT") as TextNode;

  templateName.characters = pluginMessage.name;
  templateUsername.characters = pluginMessage.username;
  templateDescription.characters = pluginMessage.description;



  
  // await axios({
  //   method: "post",
  //   url: "https://vendors.paddle.com/api/2.0/product/generate_pay_link",
  //   // url: "https://sandbox-vendors.paddle.com/api/2.0/product/generate_pay_link",
  //   data: bodyData,
  // })
  //   .then(function (response) {
  //     //handle success
  //     if(response.data){
  //       checkoutPaylinkUrl=response.data.response.url
  //     }
  //     isSuccess=true
  //   })
  //   .catch(function (response) {
  //     //handle error
  //   });
    
 
  figma.closePlugin();
}