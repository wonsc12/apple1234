const header = document.querySelector("#header");
const gnb = document.querySelectorAll(".gnbb > li");
const sections = document.querySelectorAll(".section")

console.log(sections);
console.log(gnb);
let secStart = [];

    for(let i=0 ; i< gnb.length; i++){

        
            for(let i = 0 ; i < sections.length; i++){

                secStart[i] = sections[i].offsetTop;
            }
        
    };
   
    
    console.log(secStart);
    window.addEventListener("scroll",function(){

        //스크롤바의 위치가 cont2구역의 시작 위치값 -40을 위치보다 크다면
        //조건문 이용해서 클래스가 붙고  / 떨어지게 처리
        let scTop = window.scrollY; 
        let cont2Start = document.querySelector(".cont2").offsetTop;
    
        if(scTop >= cont2Start -40 ){

            header.classList.add("fixer");
            
            fluson();
        }
        else{
            header.classList.remove("fixer");
            
            fluson();
        }
        
        
    });

