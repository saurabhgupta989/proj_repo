app.controller('homeController', function($state,$interval,$http){
  var vm=this;
  var i=1;
  vm.imgurl="images/logo.jpg"
  var updateImage = function()
  {
       if(i==8)
       	i=1;
       else
       {
       	var str="images/img"+i+".jpg";
       	vm.imgurl=str;
       
       i++;
       }
  }
vm.open_chatbox= function ()
 {
 
 $('#chatBox').fadeIn(1000);
 }
vm.closeChat= function()
 {
 $('#chatBox').fadeOut(1000);

 }
vm.sendmessage= function ()
 {
 
 var message=$('#message').val();
 alert("you sent this message to me"+message);
 $('#message').val("");
 }
    
    $interval(updateImage, 3000);

     console.log("hello");


vm.open_FileUpload= function ()
 {
 console.log("helloupload");

 $('#FileUploadBox').show();
 }
vm.closeFileUpload= function()
 {
 $('#FileUploadBox').hide();

 }
vm.UploadFile= function ()
 {
 var f = document.getElementById('file').files[0],
      r = new FileReader();
  r.onloadend = function(e){
    var data = e.target.result;
    console.log(data);
    var fd = new FormData();
        fd.append('file', data);
        fd.append('file_name', f.name);
        $http.post('upload', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(){
            console.log('success');
        })
        .error(function(){
            console.log('error');
        });
    //send your binary data via $http or $resource or do anything else with it
  }
  r.readAsBinaryString(f);
  
 }
    
    $interval(updateImage, 3000);

     console.log("hello");
});
app.controller('galleryController', function($state,$http) {
    var vm=this;
    $http.get("json/imagejson.json")
    .then(function(response) {
       vm.array= response.data;
    });
});
app.controller('updateController', function($http,$state, $stateParams, $location) {
    var vm=this;
    var logged="hi";
    vm.loggeduser=logged;
    $http.get("json/users.json")
    .then(function(response) {
       vm.users= response.data;
    });
    vm.loginUser = function() {
        var loggedin = false;
        var totalUsers = vm.users.length;
        

        for( i=0; i < totalUsers; i++ ) {
         console.log(vm.userUsername+ " " + vm.password);
            if( vm.users[i].name === vm.userUsername && vm.users[i].password === vm.password ) {
                loggedin = true;
                vm.loggeduser=vm.users[i].name;
                break;
            }
        }

        if( loggedin === true ) {
            alert("login successful");
           // $location.path("/gallery");
        } else {
            alert("username does not exist")
        }
    }
});


app.controller('quizController', function($state,$http,$scope,$interval) {
 var vm = this;
  

vm.quizactive=false;
vm.quizfinished=false;
vm.activeQuestion=0;
vm.finalise=false;
vm.started=true;
vm.minute=0;
  vm.second=0;
vm.yourans=[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5];
vm.setActiveQuestion= function(index){
  if(index === undefined)
                var breakOut = false;
   else 
       vm.activeQuestion=index;
     console.log(index);
             //quizquestion[index].selected="yes";
               }
vm.selectAnswer =function (index) {
  if(index === undefined)
                var breakOut = false;
             console.log(index);
             
             vm.quizquestion[vm.activeQuestion].selected=true;
             if (vm.quizquestion[vm.activeQuestion].answer===index) {
              vm.quizquestion[vm.activeQuestion].correct=true;
              
             }
             else
             {
              vm.quizquestion[vm.activeQuestion].correct=false;
             }
             vm.yourans[vm.activeQuestion]=index;
  //ans.[activeQuestion]=index;
}
vm.questionAnswered=function()
{
  if (vm.activeQuestion===vm.quizlength-1) {
    vm.activeQuestion=0;
    vm.finalise=true;
  }
  else{
console.log(vm.activeQuestion);
vm.activeQuestion++;
console.log(vm.activeQuestion);
}

}
vm.finaliseAnswers=function()
{
  vm.quizactive=false;
  vm.quizfinished=true;
}
vm.timer=function()
{ 
  vm.second++;
  if (vm.second===60)
  {
  vm.minute=vm.minute+1;
  vm.second=vm.second-60;
  }
  if (vm.minute >=1) {
    clearInterval(t);
    vm.finaliseAnswers(); 
  }
//var t= setInterval(function(){
 //       vm.timer();
        
        //console.log(vm.countDown);
   // }, 1000); 
}
vm.startquiz=function(){
  vm.started=false;
  $http.get("json/questin.json")
    .then(function(response) {
       vm.quizquestion= response.data.question;
       vm.quizlength=vm.quizquestion.length
       console.log(vm.quizlength);
    });
  vm.quizactive=true;
  vm.quizfinished=false;
  vm.activeQuestion=0;
  vm.finalise=false;
  vm.countDown = 20;    
     vm.timer();
}


  vm.calculatePerc=function(){
    var c=0;
    for (var i = 0; i < vm.quizlength; i++) {
       if (vm.yourans[i]===vm.quizquestion[i].answer) {
        c=c+1;
       }
    }
     vm.numCorrect=c;
     var p=c/vm.quizlength;
    return p*100;
  }
vm.reset=function(){
  vm.started=true;
  vm.quizfinished=false;
}
vm.getAnswerClass=function(index)
{
  if (index===vm.quizquestion[vm.activeQuestion].answer) {
    return "bg-success";
  }
  else
  { 
    if (vm.yourans[vm.activeQuestion]===index && vm.quizquestion[vm.activeQuestion].correct!==true ) {
      return "bg-danger";
    }
    
  }
}
});