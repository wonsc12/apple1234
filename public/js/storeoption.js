// 옵션태그들 생성 및 이벤트 거는 구간

// 시,도 나오게 하는 select 태그선택
const city1 = document.querySelector(".city1");

// 구,군 나오게 하는 select 태그선택
const city2 = document.querySelector(".city2");

for(let i = 0 ; i <hangjungdong.sido.length; i++){
    let city1Tag = document.createElement("option"); // 태그 생성 옵션 태그를 담고 있음
    let city1Text = document.createTextNode(hangjungdong.sido[i].codeNm); // 태그에 들어갈 텍스트 생성
    city1Tag.append(city1Text);
    city1Tag.setAttribute("value",hangjungdong.sido[i].codeNm); // <option value="서울" data-sido="11">서울</option> 
    city1Tag.setAttribute("data-sido",hangjungdong.sido[i].sido);
    city1.append(city1Tag); // 만들어진 option태그를 select안에 마지막번째 자식으로 계속추가
}

// city1 셀렉트 태그에 change이벤트를 사용하여 해당 시/도를 고르면 해당하는 구/군 option생성

city1.addEventListener("change",()=>{
    // let city1Date = 셀렉트태그변수.options[셀렉트태그변수.selectedIndex].value
    // let city1Date = city1.options[city1.selectedIndex].value
    // console.log(city1Date);
    // 선택한 option태그의 data-sido의 값을 기지고 옴 
    let city1Date = city1.options[city1.selectedIndex].getAttribute("data-sido");
    // console.log(city1Date);

    // 구/군/ 만드는 코드 함수로 만들어서 호출
    sigugun(city1Date);
});

// 시구군 생성하는 코드작업 함수
// const sigugun = (데이터  sido 코드값 전달) =>{        //  function sigugun()
    // 반복문을 이용하여 데이터 sido 코드값에 맞는 구/군의 데이터를 기반으로 
    // option 태그 생성
    // for( i=0; i < hangjungdong.sigugun.length; i++){
    //     if(데이터 sido 코드값 전달 == hangjungdong.sigugun[i].sido)
    // }    

const sigugun = (city1Date) =>{   // 매개변수는 작명
    // 기존 option태그들 갈아치워주자
    city2.innerHTML = "<option value>구/군 선택</option>";
    for( i=0; i < hangjungdong.sigugun.length; i++){
        // 전달받은 sido 코드값과 행정동 객체에 있는 sido 코드값하고 일치하면 option 태그생성
        if(city1Date == hangjungdong.sigugun[i].sido){
            let city2Tag = document.createElement("option"); // 태그 생성 옵션태그를 담고있음
            let city2Text = document.createTextNode(hangjungdong.sigugun[i].codeNm); // 태그에 들어갈 텍스트 생성
            city2Tag.append(city2Text); 
            city2Tag.setAttribute("value",hangjungdong.sigugun[i].codeNm); // <option value="마포구" data-sido="11">마포구</option>       
            
            city2.append(city2Tag); // 만들어진 option태그를 select안에 마지막번째 자식으로 계속추가
        }
    }    
}