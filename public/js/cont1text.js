let listslide = [
    { 
        spanSrc:"/img/bu1.jpg",
        title:"Galaxy Buds2 Pro",
        title2:"",
           
    },
    { 
        spanSrc:"/img/bu2.jpg",
        title:" ",
        title2:" ",
        
    },
    {
        spanSrc:"/img/ap1.jpg",
        title:"AirPodsPro",
        title2:"듣는것을 다시 생각하다 ",
        
    },
    { 
        spanSrc:"/img/ap2.jpg",
        title:"",
        title2:"",
     
    },
];


let swipers = document.querySelector(".swiper-wrapper");
let list2 = "";

listslide.forEach((element)=>{

    list2 += `<div class="swiper-slide ">
                <a href="#"><img src="${element.spanSrc}"></a>
                <div class="slidetext">
                    <h2>${element.title}</h2>
                    <p>${element.title2}
                    </p>
                </div>
                <div>
                    <a class="airs">구매하기<a/>
                </div>
            </div>`
              
});

swipers.innerHTML = list2;
