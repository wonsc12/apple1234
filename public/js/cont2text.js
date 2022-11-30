let listDatef = [
    { 
        spanSrc:"/img/fo12.jpg",
        title:"야구모자 무지 볼캡",
        title2:"야구모자 무지 볼캡",
        title3:"검정",
       
        
        
    },
    { 
        spanSrc:"/img/fo13.jpg",
        title:" 1495-red 무지볼캡",
        title2:" 1495-red 무지볼캡",
        title3:"빨강",
       
        
    },
    {
        spanSrc:"/img/fo14.jpg",
        title:" 무지 볼캡 야구모자 ",
        title2:" 무지 볼캡 야구모자 ",
        title3:"흰색",
      
       
       
    },
    { 
        spanSrc:"/img/fp15.jpg",
        title:"베이직 비니 보라",
        title2:"베이직 비니 보라",
        title3:"보라",
      
        
       
    },{ 
        spanSrc:"/img/fo16.jpg",
        title:"베이직 비니 ",
        title2:"베이직 비니 ",
        title3:"오렌지",
     
        
        
    },
    { 
        spanSrc:"/img/fo17.jpg",
        title:" 귀달이모자",
        title2:" 귀달이모자",
        title3:"베이지",
      
       
        
    },
    {
        spanSrc:"/img/fo18.jpg",
        title:"무지 버킷햇",
        title2:"무지 버킷햇",
        title3:"흰색",
     
       
    },
    { 
        spanSrc:"/img/fo19.jpg",
        title:"무지 면볼캡[카멜]",
        title2:"무지 면볼캡[카멜]",
        title3:"감색",
       
        
       
    },
    
];


let list = document.querySelector(".list");
let list3 = "";

listDatef.forEach((element)=>{

    list3 += `<div class="list">
                <div class="textp2">
                    <h2>${element.title}</h2>
                    <h3>${element.title2}</h3>
                    <p>${element.title3}</p>
                </div>
                <div class="munuimage2">
                    <img src="${element.spanSrc}">
                </div>
            </div>`
              
});

list.innerHTML = list3;



