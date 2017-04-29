app.config(function($stateProvider,$urlRouterProvider,$locationProvider) {
   
    $stateProvider
               .state("/",{
                    url:"/",
                    templateUrl:"templates/home.html",
                    controller:"homeController",
                    controllerAs:"homeCtrl"
                })
                .state("home",{
                    url:"/home",
                    templateUrl:"templates/home.html",
                    controller:"homeController",
                    controllerAs:"homeCtrl"
                })
                .state("update",{
                    url:"/Sbi-PO-2017",
                    templateUrl:"templates/update.html",
                    controller:"updateController",
                    controllerAs:"updateCtrl"
                })
                 .state("gallery",{
                    url:"/gallery",
                    templateUrl:"templates/gallery.html",
                    controller:"galleryController",
                    controllerAs:"galleryCtrl"
                })
                  .state("quiz",{
                    url:"/quiz",
                    templateUrl:"templates/quiz.html",
                    controller:"quizController",
                    controllerAs:"quizCtrl"
                })
    $urlRouterProvider.otherwise('/home'); 
});



app.run(run);
run.$inject = ['$rootScope', '$location', '$window'];
    function run($rootScope, $location, $window) {
        // initialise google analytics
        $window.ga('create', 'UA-97899620-1', 'auto');
 
        // track pageview on state change
        $rootScope.$on('$stateChangeSuccess', function (event) {
            $window.ga('send', 'pageview', $location.path());
           console.log("statechange");
        });
    }