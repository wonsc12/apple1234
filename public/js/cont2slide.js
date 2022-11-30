        const prevBtn2 = document.querySelector(".prevBtn2");

        // 오른쪽 버튼 대상
        const nextBtn2 = document.querySelector(".nextBtn2");

        // 슬라이드 화면들 선택
        const silderView2 = document.querySelectorAll(".view > div");

        // 하단 동그라미 버튼들

        const circleBtn2 = document.querySelectorAll(".circleBtn2 > li");   

        // silder 는 버튼 이랑 동그라미 까지 다 포함되어 있음
        const silderWrap2 = document.querySelector(".silder");

         //슬라이드 순번값
         let sNumber2 = 0 ;

          //이전버튼 클릭시 

        prevBtn2.addEventListener("click",(e)=>{
            e.preventDefault();
            prevCheck2(); //이전버튼 조건문 체크 함수 호출
            silderStart(); //슬라이드 화면 전환 및 동그라미 버튼 활성비활성 함수 호출
            
        });


        //이후 버튼 클릭시
        nextBtn2.addEventListener("click",(e)=>{
            e.preventDefault();
           nextCheck2();
           silderStart(); //슬라이드 화면 전환 및 동그라미 버튼 활성비활성 함수 호출
        });  

        // 동그라미 버튼들 클릭시
        for(let j=0; j < circleBtn2.length; j++){

            circleBtn2[j].addEventListener("click",(e)=>{
                e.preventDefault();
                sNumber2 = j; //클릭한 동그라미 버튼 순번값을 슬라이드 순번값으로 넣어줌
                silderStart(); //슬라이드 화면 동작함수 호출



            });
        }

        //슬라이드 자동실행구간
        let autoSiled = setInterval(()=>{
            nextCheck2(); // 다음화면 조건문 체크
            silderStart(); // 슬라이드 화면 전환되고 동그라미 버튼 활성 비활성


        },3000);

        //슬라이더에 마우스를 올렸을 때 자동실행을 멈춘다.
        silderWrap2.addEventListener("mouseenter",()=>{
            //autoside 변수에 있는 자동실행 함수를 제거시킴
            clearInterval(autoSiled); // 


        });

        //슬라이더에 마우스를 내렸을 때 자동실행을 다시 동작하게 처리
        silderWrap2.addEventListener("mouseleave",()=>{
            //autosile 변수에 자동실행 함수를 다시 새롬게 대입해서 채워줌
            autoSiled = setInterval(()=>{

                nextCheck2();
                silderStart();
            },3000);

        });
        
        // 이전버튼 슬라이드 조건문 함수구간
        function prevCheck2(){

            if(sNumber2 == 0){
                sNumber2 = silderView2.length-1;
            }
            else{
                sNumber2--;
            }
        }
            // 이후버튼 슬라이드 조건문 함수구간
        function nextCheck2(){

            if(sNumber2 == silderView2.length-1){
                sNumber2 = 0;
            }
            else{
                sNumber2++;
            }
        }
                        
        // 슬라이드 나타나고 사라지는  & 동그라미버튼 활성비활성 함수구간
        function silderStart(){
            for(let i = 0; i < circleBtn2.length; i++){
                circleBtn2[i].classList.remove("on");
                silderView2[i].style.opacity = 0;
                silderView2[i].style.zIndex = 2;
            }

            circleBtn2[sNumber2].classList.add("on");
            silderView2[sNumber2].style.opacity = 1;     //z indent ,opacity 단위없음
            silderView2[sNumber2].style.zIndex = 3;
            
        }

        const prevBtn22 = document.querySelector(".prevBtn22");

        // 오른쪽 버튼 대상
        const nextBtn22 = document.querySelector(".nextBtn22");

        // 슬라이드 화면들 선택
        const silderView22 = document.querySelectorAll(".view2 > div");

        // 하단 동그라미 버튼들

        const circleBtn22 = document.querySelectorAll(".circleBtn22 > li");   

        // silder 는 버튼 이랑 동그라미 까지 다 포함되어 있음
        const silderWrap22 = document.querySelector(".silder2");

         //슬라이드 순번값
         let sNumber22 = 0 ;

          //이전버튼 클릭시 

        prevBtn22.addEventListener("click",(e)=>{
            e.preventDefault();
            prevCheck22(); //이전버튼 조건문 체크 함수 호출
            silderStart2(); //슬라이드 화면 전환 및 동그라미 버튼 활성비활성 함수 호출
            
        });


        //이후 버튼 클릭시
        nextBtn22.addEventListener("click",(e)=>{
            e.preventDefault();
           nextCheck22();
           silderStart2(); //슬라이드 화면 전환 및 동그라미 버튼 활성비활성 함수 호출
        });  

        // 동그라미 버튼들 클릭시
        for(let j=0; j < circleBtn22.length; j++){

            circleBtn22[j].addEventListener("click",(e)=>{
                e.preventDefault();
                sNumber22 = j; //클릭한 동그라미 버튼 순번값을 슬라이드 순번값으로 넣어줌
                silderStart2(); //슬라이드 화면 동작함수 호출



            });
        }

        //슬라이드 자동실행구간
        let autoSiled2 = setInterval(()=>{
            nextCheck22(); // 다음화면 조건문 체크
            silderStart2(); // 슬라이드 화면 전환되고 동그라미 버튼 활성 비활성


        },3000);

        //슬라이더에 마우스를 올렸을 때 자동실행을 멈춘다.
        silderWrap22.addEventListener("mouseenter",()=>{
            //autoside 변수에 있는 자동실행 함수를 제거시킴
            clearInterval(autoSiled2); // 


        });

        //슬라이더에 마우스를 내렸을 때 자동실행을 다시 동작하게 처리
        silderWrap22.addEventListener("mouseleave",()=>{
            //autosile 변수에 자동실행 함수를 다시 새롬게 대입해서 채워줌
            autoSiled2 = setInterval(()=>{

                nextCheck22();
                silderStart2();
            },3000);

        });
        
        // 이전버튼 슬라이드 조건문 함수구간
        function prevCheck22(){

            if(sNumber22 == 0){
                sNumber22 = silderView22.length-1;
            }
            else{
                sNumber22--;
            }
        }
            // 이후버튼 슬라이드 조건문 함수구간
        function nextCheck22(){

            if(sNumber22 == silderView22.length-1){
                sNumber22 = 0;
            }
            else{
                sNumber22++;
            }
        }
                        
        // 슬라이드 나타나고 사라지는  & 동그라미버튼 활성비활성 함수구간
        function silderStart2(){
            for(let i = 0; i < circleBtn22.length; i++){
                circleBtn22[i].classList.remove("on");
                silderView22[i].style.opacity = 0;
                silderView22[i].style.zIndex = 2;
            }

            circleBtn22[sNumber22].classList.add("on");
            silderView22[sNumber22].style.opacity = 1;     //z indent ,opacity 단위없음
            silderView22[sNumber22].style.zIndex = 3;
            
        }