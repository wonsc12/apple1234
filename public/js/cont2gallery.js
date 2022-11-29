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
