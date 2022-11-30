const bigImg = document.querySelector(".image1");
const smallImg = document.querySelectorAll(".pto img");


smallImg.forEach(function(item,index){

    item.addEventListener("click",function(e){
        e.preventDefault();
        let srcValue = item.getAttribute("src");
        bigImg.setAttribute("src",srcValue)
        bigImg.style.backgroundImage = "url("+srcValue+")";
        
    });

});


const bigImg2 = document.querySelector(".image12");
const smallImg2 = document.querySelectorAll(".pto2 img");


smallImg2.forEach(function(item,index){

    item.addEventListener("click",function(e){
        e.preventDefault();
        let srcValue = item.getAttribute("src");
        bigImg2.setAttribute("src",srcValue)
        bigImg2.style.backgroundImage = "url("+srcValue+")";
        
    });

});
