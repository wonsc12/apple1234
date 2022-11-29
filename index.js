const express = require("express");
const MongoClient = require("mongodb").MongoClient;

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
// 파일업로드 라이브러리 multer
const multer  = require('multer')
const moment = require("moment");
const momentTimezome = require("moment-timezone");

const app = express();
const port = process.env.PORT || 1212;

app.set("view engine","ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(session({secret : 'secret', resave : true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());

// 파일업로드해서 처리할 경로 요청 
// upload.single()함수는 multer라이브러리에서 제공하는 함수
// single() <-- 안에 적을 값은 input type="file" 태그의 name값  
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/upload')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8'))
    }
  })
  
const upload = multer({ storage: storage })


MongoClient.connect("mongodb+srv://admin:qwer1234@cluster0.ahltorl.mongodb.net/?retryWrites=true&w=majority",function(err,result){
    //에러가 발생했을경우 메세지 출력(선택사항)
    if(err) { return console.log(err); }

    //위에서 만든 db변수에 최종연결 ()안에는 mongodb atlas 사이트에서 생성한 데이터베이스 이름
    db = result.db("portfolio");

    //db연결이 제대로 됬다면 서버실행
    app.listen(port,function(){
        console.log("서버연결 성공");
    });

});

// 상품 메뉴 페이지
app.get("/menu/apple",(req,res)=>{
  db.collection("ex1_list").find({category:"애플"}).toArray((err,result)=>{
    res.render("menu",{listData:result});
  });
});

app.get("/menu/samsung",(req,res)=>{
  db.collection("ex1_list").find({category:"삼성"}).toArray((err,result)=>{
    res.render("menu",{listData:result});
  });
});


  // 매장 검색 페이지(사용자)
  app.get("/store",async(req,res)=>{
    let pageNumber = (req.query.page ==null) ? 1 : Number(req.query.page) ; //let pageNumber = 조건식 ? 참 : 거짓 ;
    // console.log(pageNumber);
    
    // 블록당 보여줄 데이터 갯수  
    let perPage = 4;   // 게시판 목록에 보여줄 갯수
    
    // 블록당 보여줄 페이징 번호 갯수
  
    let blockCount = 3; // 숫자에 따라 계산은 달라짐
  
    // 현재 페이지 블록 구하기
  
    let blockNum = Math.ceil(pageNumber / blockCount);  // Math.ceil 올림
  
    // console.log(blockNum);
  
    // 블록안에 있는 페이징의 시작번호 값을 알아내기
  
    let blockStart = ((blockNum - 1) * blockCount) + 1;
  
    // console.log(blockStart);    
  
    // 블록안에 있는 페이징의 끝 번호 값을 알아내자
    
    let blockEnd = blockStart + blockCount -1 ;
  
    // 데이터베이스 콜렉션에 있는 전체 객체의 갯수값 가져오는 명령어
  
    let totalData = await db.collection("ex1_storelist").countDocuments({});
    
    // console.log(totalData);
  
    // 전체 데이터값을 통해서 -> 몃개의 페이징 번호가 만들어져야 하는지 계산
  
    let paging = Math.ceil(totalData / perPage);
  
    // 블록에서 마지막 번호가 페이징의 끝번호보다 크다면 페이징의 끝번호를 강제로 부여
    if(blockEnd > paging){
        blockEnd = paging;
    }
  
    // 블록의 총 갯수 구하기
  
    let totalBlock = Math.ceil(paging / blockCount);
    
    // 데이터베이스에서 꺼내오는 데이터의 순번값을 결정   0 2번페이지2 4
  
    let startFrom = (pageNumber -1) * perPage 
  
  
    // 데이터베이스 콜렉션에서 데이터값을 2개씩 순번에 맞춰서 가져오기
    db.collection("ex1_storelist").find({}).toArray((err,result)=>{
      
   
      db.collection("ex1_storelist").find({}).sort({number:-1}).skip(startFrom).limit(perPage).toArray((err,result)=>{ // 역순-1  정순서 1
        // console.log(result);                 //역순      //순서   //2개
        res.render("store",{storelist:result,
                            paging:paging,
                            pageNumber:pageNumber,
                            blockStart:blockStart,
                            blockEnd:blockEnd,
                            blockNum:blockNum,
                            totalBlock:totalBlock});
      }); 
    });
  });
  
  
  
  // 매장 지역검색 결과화면 페이지(사용자)
  app.get("/search/local",(req,res)=>{
    // 시/도 선택시 
    if(req.query.city1 !== "" && req.query.city2 === ""){
      db.collection("ex1_storelist").find({sido:req.query.city1}).toArray((err,result)=>{
        res.render("store",{storelist:result});
      });
    }
    // 시/도 구/군 선택시
    else if (req.query.city1 !== "" && req.query.city2 !==""){
      db.collection("ex1_storelist").find({sido:req.query.city1,sigugun:req.query.city2}).toArray((err,result)=>{
        res.render("store",{storelist:result});
      });
  
    }
    // 아무것도 선택하지 않았을 때
    else{
      res.redirect("/store")
    }
    
  });

  

  //메인페이지 get 요청
app.get("/",function(req,res){
    
  db.collection("ex1_insert").find({}).toArray(function(err,result){  
    db.collection("ex15_slide").find({}).toArray(function(err,result2){
      res.render("index",{userData:req.user,insert:result,slide:result2}); //로그인시 회원정보데이터 ejs 파일로 전달
    });
  });
});

// 회원가입 페이지 get 요청
app.get("/join",function(req,res){
  res.render("join"); // 회원가입 페이지로 응답
});

// 회원가입 페이지에서 보내준 데이터를 db에 저장요청
app.post("/joindb",function(req,res){
  // 회원가입시 입력한 데이터 중에 아이디 확인 
  db.collection("ex1_join").findOne({joinid:req.body.userid,joinnick:req.body.usernick},function(err,result){ //.findOne({joinid:"내가폼태그에서 입력한 id"})
      // db 베이스에서 해당 회원아이디가 존재하는 경우
      if(result){
          res.send("<script>alert('이미 가입된 아이디 입니다'); location.href='/join';</script>") // send 문자열 string만 들어감
      }
      else {
          db.collection("ex1_count").findOne({name:"회원정보"},function(err,result){
          db.collection("ex1_join").insertOne({
              joinno:result.joinCount + 1 ,
              joinid:req.body.userid,
              joinemail:req.body.useremail,
              joinnick:req.body.usernick,
              joinphone:req.body.userphone, 
              joinpass:req.body.userpass,        
              
          },function(err,result){
              db.collection("ex1_count").updateOne({name:"회원정보"},{$inc:{joinCount:1}},function(err,result){

              
                  res.send("<script>alert('회원가입성공!'); location.href='/login';</script>"); // 회원가입후 로그인 페이지 경로로 이동
              });
          });
      });
    }
  });     
});

// 로그인 경로 get 요청

app.get("/login",function(req,res){
  res.render("login");
});

// 로그아웃 경로 get 요청
app.get("/logout",function(req,res){
  req.session.destroy(function(err){ // 요청 -> 세션제거
      res.clearCookie("connect.sid"); // 응답 -> 본인접속 웹브라우저 쿠키 제거
      res.redirect("/"); // 메인페이지 이동
  })
});

// 로그인 페이지에서 입력한 아이디 비밀번호 검증 처리 요청
app.post("/loginresult",passport.authenticate('local', {failureRedirect : '/fail'}),function(req,res){ // 검증
  // 실패시 / fail 경로로 요청
  res.redirect("/"); // 로그인 성공시 메인페이지로 이동
});
app.get("/fail",function(req,res){
  res.send("<script>alert('아이디 비번을 재대로 입력하세요'); location.href='/login';</script>");
});

// /loginresult 경로 요청시 passport.autenticate() 함수구간 아이디 비번 로그인 검증구간

passport.use(new LocalStrategy({
  usernameField: 'userid',
  passwordField: 'userpass',
  session: true,
  passReqToCallback: false,
}, function (userid, userpass, done) {
  
  db.collection('ex1_join').findOne({ joinid : userid  }, function (err, result) {  // 찾아오고자 할 프로퍼티 
    if (err) return done(err)    //데이터베이스 : 내가입력한값

    if (!result) return done(null, false, { message: '존재하지않는 아이디 입니다.' })
    if (userpass == result.joinpass) {   // 로그인한 시점에서 내가입력한 로그인 비밀번호 == 회원가입했을때 데이터 베이스에 있는 비밀번호
      return done(null, result)
    } else {
      return done(null, false, { message: '비번이 틀렸습니다.' })
    }
  })
}));


// 처음 로그인 했을시 해당 사용자의 아이디를 기반으로 세션을 생성함
// 데이터 베이스에 있는 아이디와 비번이 일치하면 
// 세션을 생성하고 해당 아이디와 비번을 기록하여 저장하는 작업
passport.serializeUser(function (user, done) {
  // 아이디로된 세션생성
  done(null, user.joinid) // 데이터베이스에 있는 아이디가 저장되 있는 프로퍼티명 기술
                      // 서버에데가 세션만들어줘 -> 사용자 웹브라우저에서는 쿠키를 만들어줘
  // 사용자가 로그아웃시 다시 로그인할때 확인 최초의로그인한번
});

// 로그인을 한 후 다른 페이지들을 접근할 시 생성된 세션에 있는 회원정보 데이터를 보내주는 처리
// 그전에 데이터베이스에 있는 아이디와 세션에 있는 회원정보중에 아이디랑 매칭되는지 찾아주는 작업
// 만들어진 세션을 전달해서 다른페이지 에서도 해당 세션을 사용할수 있도록 처리(페이지 접근제한) 
passport.deserializeUser(function (id, done) {  // id: 작명가능 로구인중인 아이디
  // 데이터베이스에 있는 로그인 했을때 아이디만 불러와서
  // 다른페이지 에서도 세션을 사용할수 있도록 처리
  // done(null, {})
  db.collection("ex1_join").findOne({joinid:id},function(err,result){
      done(null, result); // 이동할때마다
  });
});

// 마이페이지(회원정보수정) 페이지 요청 경로
app.get("/mypage",function(req,res){
  // console.log(req.user); // 세트로 보여줌
  // res.send("테스트");
  res.render("mypage",{userData:req.user});  // userData작명
});

// 마이페이지에서 입력한 데이터를 db에 수정반영처리
app.post("/myupdate",function(req,res){
  // 회원정보(ex13_join) 콜렉션에 접근해서 해당 아이디에 맞는
  // 비번/닉네임/이메일주소/전화번호 수정한걸 변경처리 updateOne
  
  // 원래는 mypage.ejs파일에서 원래 비밀번호 입력창과 / 변경할 비밀번호 입력창
  // 조건문으로 db에 있는 비밀번호와 mypage에서 입력한 원래 비밀번호가 일치하면
  
  // db에 있는 로그인한 유저의 비빌번호  값은 findOne으로 찾아와서 
  // if(mypage에서 입력한 비번과 db에 있는 비밀번호가 똑같다면){}
  if(req.body.originpass === req.user.joinpass){  
      db.collection("ex1_join").updateOne({joinid:req.user.joinid},{$set:{
                                      // ({어떤항목을찾아서},{무엇을바꿀건지})
          
          joinnick:req.body.usernick,
          joinpass:req.body.userpass, // 마이페이지에 있는 네임
          joinphone:req.body.userphone, 
          joinemail:req.body.useremail
      }},function(err,result){
          res.send("<script>alert('회원정보 수정완료'); location.href='/';</script>");            
      });
  }
  else{
      res.send("<script>alert('원래비밀번호가 안맞음'); location.href='/mypage';</script>")
  }    
});






// 관리자 화면 로그인 유무 확인
// app.post("/login",개입,)
app.post("/login2",passport.authenticate('local', {failureRedirect : '/fail'}),(req,res)=>{
  res.redirect("admin/list");  //상품등록을하는화면
  // 로그인 성공시 관리자 상품등록 페이지로 이동
});




// 관리자 상품등록 페이지
app.get("/admin/prdlist",(req,res)=>{
  // db에 저장되있는 상품목록들 find 찾아와서 전달  순번이정해져있는 배열 toArry
  db.collection("ex1_list").find({}).toArray((err,result)=>{
    res.render("admin_prdlist",{userData:req.user,prdData:result});
  })                          // 로그인 했을떄 유저정보
  
});

// 상품을 db에 넣는 경로                  
app.post("/add/prdlist",upload.single('thumbnail'),(req,res)=>{
                                    //image 첨부한 이미지 name값

  // 파일첨부가 있을 때
  if(req.file){
      fileTest = req.file.originalname;
  }
  // 파일첨부가 없을때
  else{
      fileTest = null;
  }
  db.collection("ex1_count").findOne({name:"상품등록"},(err,result1)=>{
    db.collection("ex1_list").insertOne({
      num:result1.prdCount + 1,
      name:req.body.name,
      context:req.body.context,
      thumbnail:fileTest, // 파일태그
      category:req.body.category // 셀렉트 태그
    },(err,result)=>{
      db.collection("ex1_count").updateOne({name:"상품등록"},{$inc:{prdCount:1}},(err,result)=>{
        res.redirect("/admin/prdlist"); // 상품등록 페이지로 이동
      })
    })
  })                                    
});                   


app.get("/search/storename",(req,res)=>{

  // query: <-- store.ejs 파일에서 입력한 input text  ->req.query.name
  // path: <-- db storelist 콜렉션에서 어떤 항목명으로 찾을건지 name
  let storeSearch = [
    {
      $search: {
        index: "store_search",
        text: {
          query:req.query.name,  
          path: "name"      
        }
      }
    }
  ]
  // 검색어 입력시
if(req.query.name !==""){
  db.collection("ex1_storelist").aggregate(storeSearch).toArray((err,result)=>{
    // 내가입력한 검색단어 매치
    res.render("store",{storelist:result});                                    
});

}
// 검색어 미입력신
else{
  res.redirect("/store");
}
});

// 관리자 매장등록 페이지 경로
app.get("/admin/storelist",(req,res)=>{
// 모든 매장리스트 다 보여줌
db.collection("ex1_storelist").find({}).toArray((err,result)=>{
  res.render("admin_store",{userData:req.user,storelist:result});
});      
});

app.post("/addstore",(req,res)=>{
db.collection("ex1_count").findOne({name:"매장등록"},(err,result1)=>{
  db.collection("ex1_storelist").insertOne({
    num:result1.storeCount + 1, // 매장등록순번
    name:req.body.name,
    sido:req.body.city1,
    sigugun:req.body.city2, // store에서 넘겨준 name값
    adress:req.body.detail,
    phone:req.body.phone // 스토어에서 작성한 name값
  },(err,result)=>{
    db.collection("ex1_count").updateOne({name:"매장등록"},{$inc:{storeCount:1}},(err,result)=>{
      res.redirect("/admin/storelist"); // 매장등록 페이지로 이동
    });
  });
});         
})



  

// 관리자 공지글등록 페이지 경로
app.get("/admin/insert",(req,res)=>{
  // 글 작성
  db.collection("ex1_insert").find({}).toArray((err,result)=>{
    res.render("admin_insert",{userData:req.user,insertData:result});
  });      
});

app.post("/addinsert",upload.single('file'),(req,res)=>{
    if(req.file){
      fileUpload = req.file.originalname;
    }
    else{
        fileUpload = null;
    }
  
  db.collection("ex1_count").findOne({name:"공지글등록"},(err,result1)=>{
    db.collection("ex1_insert").insertOne({
      num:result1.insertlist + 1, // 글등록순번
      subject:req.body.subject,
      date:req.body.date,
      context:req.body.context, // insert에서 넘겨준 값
      file:fileUpload,
      views:0,
      date2:moment().tz("Asia/seoul").format("YYYY-MM-DD HH:mm:ss")
    },(err,result)=>{
      db.collection("ex1_count").updateOne({name:"공지글등록"},{$inc:{insertlist:1}},(err,result)=>{
        res.redirect("/admin/insert"); // 매장등록 페이지로 이동
      });
    });
  });         
})



//게시글 목록 get 요청


// 게시글 상세화면 get 요청 / :변수명 작명가능
app.get("/brddetail/:no",function(req,res){  //no 작명  // 원하는 페이지만 갖고옴
  // db안에 해당 게시글번호에 맞는 데이터만 꺼내오고 ejs 파일로 응답
  db.collection("ex1_insert").updateOne({num:Number(req.params.no)},{$inc:{brdviews:1}},function(err,result1){
      db.collection("ex1_insert").findOne({num:Number(req.params.no)},function(err,result1){
          
              res.render("brddetail",{insertData:result1,userData:req.user});  
          });                                //게시물                        
      });
  });

  

  
//공지게시판 화면 get 요청
app.get("/brdlist",async (req,res)=>{
  // query string 보내줌 데이터값 받는 방법
  // console.log(req.query.page);  // boardtest?page=300
  // res.send("테스트");

  // 사용자가 게시판에 접속시 몃번 페이징 번호로 접속했는지 체크
  // let pageNumber = typeof(req.query.page);
  // console.log(pageNumber);
  // res.send("테스트");
  let pageNumber = (req.query.page ==null) ? 1 : Number(req.query.page) ; //let pageNumber = 조건식 ? 참 : 거짓 ;
  // console.log(pageNumber);
  
  // 블록당 보여줄 데이터 갯수  
  let perPage = 3;   // 게시판 목록에 보여줄 갯수
  
  // 블록당 보여줄 페이징 번호 갯수

  let blockCount = 3; // 숫자에 따라 계산은 달라짐

  // 현재 페이지 블록 구하기

  let blockNum = Math.ceil(pageNumber / blockCount);  // Math.ceil 올림

  // console.log(blockNum);

  // 블록안에 있는 페이징의 시작번호 값을 알아내기

  let blockStart = ((blockNum - 1) * blockCount) + 1;

  // console.log(blockStart);    

  // 블록안에 있는 페이징의 끝 번호 값을 알아내자
  
  let blockEnd = blockStart + blockCount -1 ;

  // 데이터베이스 콜렉션에 있는 전체 객체의 갯수값 가져오는 명령어

  let totalData = await db.collection("ex1_insert").countDocuments({});
  
  // console.log(totalData);

  // 전체 데이터값을 통해서 -> 몃개의 페이징 번호가 만들어져야 하는지 계산

  let paging = Math.ceil(totalData / perPage);

  // 블록에서 마지막 번호가 페이징의 끝번호보다 크다면 페이징의 끝번호를 강제로 부여
  if(blockEnd > paging){
      blockEnd = paging;
  }

  // 블록의 총 갯수 구하기

  let totalBlock = Math.ceil(paging / blockCount);
  
  // 데이터베이스에서 꺼내오는 데이터의 순번값을 결정   0 2번페이지2 4

  let startFrom = (pageNumber -1) * perPage 


  // 데이터베이스 콜렉션에서 데이터값을 2개씩 순번에 맞춰서 가져오기
  db.collection("ex1_insert").find({}).sort({number:-1}).skip(startFrom).limit(perPage).toArray((err,result)=>{ // 역순-1  정순서 1
      // console.log(result);                 //역순      //순서   //2개
      res.render("brdlist",{insertData2:result,
                          
                          paging:paging,
                          pageNumber:pageNumber,
                          blockStart:blockStart,
                          blockEnd:blockEnd,
                          blockNum:blockNum,
                          totalBlock:totalBlock});
  }); 
      // board.ejs에 전달해줘야할 데이터들
      // 1.board 콜렉션에서 가지고온 데이터값 result
      // 2.페이징 번호의 총 갯수값 paging
      // 3.몃번 페이징을 보고 있는지 번호값 pageNumber
      // 4.블록안에 페이징 시작하는 번호값 blockStart
      // 5.블록안에 페이징 끝나는 번호값 blockEnd
      // 6.블록 번호 순서값 blockNum
      // 7.블록 총 갯수 totalBlock
  

  // sort({정렬할프로퍼티명:1}) 1 오름차순 -1 은 내림차순

  // 블록의 총갯수 , 데이터베이스에 실제 값을 꺼내기 위해 몇개씩 꺼내올건지 설정 , find 명령어 sort() skip() limit()

  // 만약 블록안에 있는 페이징의 끝 번호값이 전체 페이징 갯수보다 많다면 강제로 마지막 페이징 번호 부여
  
 
});

// 관리자 공지글등록 페이지 경로
app.get("/admin/event",(req,res)=>{
  // 글 작성
  db.collection("ex1_event").find({}).toArray((err,result)=>{
    res.render("admin_event",{userData:req.user,eventData:result});
  });      
});

app.post("/addevent",upload.single('file'),(req,res)=>{
    if(req.file){
      fileUpload = req.file.originalname;
    }
    else{
        fileUpload = null;
    }
  
  db.collection("ex1_count").findOne({name:"이벤트"},(err,result1)=>{
    db.collection("ex1_event").insertOne({
      num:result1.eventlist + 1, // 글등록순번
      subject:req.body.subject,
      date:req.body.date,
      context:req.body.context, // insert에서 넘겨준 값
      file:fileUpload,
      views:0,
      date2:moment().tz("Asia/seoul").format("YYYY-MM-DD HH:mm:ss")
    },(err,result)=>{
      db.collection("ex1_count").updateOne({name:"이벤트"},{$inc:{eventlist:1}},(err,result)=>{
        res.redirect("/admin/event"); // 매장등록 페이지로 이동
      });
    });
  });         
})
// 이벤트 상세화면 get 요청 / :변수명 작명가능
app.get("/eventdetail/:no",function(req,res){  //no 작명  // 원하는 페이지만 갖고옴
  // db안에 해당 게시글번호에 맞는 데이터만 꺼내오고 ejs 파일로 응답
  db.collection("ex1_event").updateOne({num:Number(req.params.no)},{$inc:{eventviews:1}},function(err,result1){
      db.collection("ex1_event").findOne({num:Number(req.params.no)},function(err,result1){
          
              res.render("eventdetail",{eventData:result1,userData:req.user});  
          });                                //게시물                        
      });
  });

// 조건문을 이용해서 입력한 검색어가 있는 경우는 aggregate({}).sort()skip().limit()

//게시판 화면 get 요청
app.get("/event",async (req,res)=>{
  // query string 보내줌 데이터값 받는 방법
  // console.log(req.query.page);  // boardtest?page=300
  // res.send("테스트");

  // 사용자가 게시판에 접속시 몃번 페이징 번호로 접속했는지 체크
  // let pageNumber = typeof(req.query.page);
  // console.log(pageNumber);
  // res.send("테스트");
  let pageNumber = (req.query.page ==null) ? 1 : Number(req.query.page) ; //let pageNumber = 조건식 ? 참 : 거짓 ;
  // console.log(pageNumber);
  
  // 블록당 보여줄 데이터 갯수  
  let perPage = 3;   // 게시판 목록에 보여줄 갯수
  
  // 블록당 보여줄 페이징 번호 갯수

  let blockCount = 3; // 숫자에 따라 계산은 달라짐

  // 현재 페이지 블록 구하기

  let blockNum = Math.ceil(pageNumber / blockCount);  // Math.ceil 올림

  // console.log(blockNum);

  // 블록안에 있는 페이징의 시작번호 값을 알아내기

  let blockStart = ((blockNum - 1) * blockCount) + 1;

  // console.log(blockStart);    

  // 블록안에 있는 페이징의 끝 번호 값을 알아내자
  
  let blockEnd = blockStart + blockCount -1 ;

  // 데이터베이스 콜렉션에 있는 전체 객체의 갯수값 가져오는 명령어

  let totalData = await db.collection("ex1_event").countDocuments({});
  
  // console.log(totalData);

  // 전체 데이터값을 통해서 -> 몃개의 페이징 번호가 만들어져야 하는지 계산

  let paging = Math.ceil(totalData / perPage);

  // 블록에서 마지막 번호가 페이징의 끝번호보다 크다면 페이징의 끝번호를 강제로 부여
  if(blockEnd > paging){
      blockEnd = paging;
  }

  // 블록의 총 갯수 구하기

  let totalBlock = Math.ceil(paging / blockCount);
  
  // 데이터베이스에서 꺼내오는 데이터의 순번값을 결정   0 2번페이지2 4

  let startFrom = (pageNumber -1) * perPage 


  // 데이터베이스 콜렉션에서 데이터값을 2개씩 순번에 맞춰서 가져오기
  db.collection("ex1_event").find({}).sort({number:-1}).skip(startFrom).limit(perPage).toArray((err,result)=>{ // 역순-1  정순서 1
      // console.log(result);                 //역순      //순서   //2개
      res.render("event",{eventData:result,
                          
                          paging:paging,
                          pageNumber:pageNumber,
                          blockStart:blockStart,
                          blockEnd:blockEnd,
                          blockNum:blockNum,
                          totalBlock:totalBlock});
  }); 
      // board.ejs에 전달해줘야할 데이터들
      // 1.board 콜렉션에서 가지고온 데이터값 result
      // 2.페이징 번호의 총 갯수값 paging
      // 3.몃번 페이징을 보고 있는지 번호값 pageNumber
      // 4.블록안에 페이징 시작하는 번호값 blockStart
      // 5.블록안에 페이징 끝나는 번호값 blockEnd
      // 6.블록 번호 순서값 blockNum
      // 7.블록 총 갯수 totalBlock
  

  // sort({정렬할프로퍼티명:1}) 1 오름차순 -1 은 내림차순

  // 블록의 총갯수 , 데이터베이스에 실제 값을 꺼내기 위해 몇개씩 꺼내올건지 설정 , find 명령어 sort() skip() limit()

  // 만약 블록안에 있는 페이징의 끝 번호값이 전체 페이징 갯수보다 많다면 강제로 마지막 페이징 번호 부여
  
 
});



// 조건문을 이용해서 입력한 검색어가 있는 경우는 aggregate({}).sort()skip().limit()




// 조건문을 이용해서 입력한 검색어가 있는 경우는 aggregate({}).sort()skip().limit()



// 게시글 작성 후 데이터 베이스에 넣는 작업 요청

app.post("/Inquire",upload.single('file'),function(req,res){
  // db베이스에 접근해서 게시글 입력처리
  // 게시글 목록페이지로 이동
  // moment 사용해서 현재시간 추가
  //파일 첨부 여부에 따라 변수(작명)에 들어갈 값을 대입해줌
  
  if(req.file){
      fileUpload = req.file.originalname;
  }
  else{
      fileUpload = null;
  }

  db.collection("ex1_count").findOne({name:"문의게시판"},function(err,result){
      db.collection("ex1_Inquire").insertOne({
          brdid:result.board +1 ,
          brdname:req.body.name,
          brdemail:req.body.email,
          brdphone:req.body.Number,
          brdcontext:req.body.context,
          brdsubject:req.body.subject,
          brdauther:req.user.joinnick, // 로그인한 유저의 닉네임
          brdviews:0,
          brdfile:fileUpload,
          brddate:moment().tz("Asia/seoul").format("YYYY-MM-DD HH:mm:ss") //tz=timezone
          //                                        2022-10-21 10:43:20
      },function(err,result){
          db.collection("ex1_count").updateOne({name:"문의게시판"},{$inc:{board:1}},function(err,result){
              res.redirect("/Inquire");  // 게시글 작d성후 게시글 목록경로 요청
          })
      });
  });
});