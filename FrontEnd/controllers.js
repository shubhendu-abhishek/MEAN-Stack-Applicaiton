angular.module('controllers', ['ngCookies', 'mobiscroll-form'])

  .controller('LoginController', ['$scope', '$location', '$http', '$cookies', function ($scope, $location, $http, $cookies) {
    $scope.showSuccessToast = function (msg) {
      mobiscroll.toast({
        message: msg,
        color: 'success',
        display: 'top'
      });
    };
    $scope.showDangerToast = function (msg) {
      mobiscroll.toast({
        message: msg,
        color: 'danger',
        display: 'top'
      });
    };
    $scope.login = function () {
      let data = {
        email: $scope.email,
        password: $scope.password
      }
      $http.get(`http://localhost:5000/users/login?email=${$scope.email}&&password=${$scope.password}`).then((res) => {
        //console.log(res);
        if (res.status === 200 && res.data.length !==0) {
          $cookies.put('LoggedInUser', res.data.userName);
          // console.log($cookies.get('LoggedInUser'))
          $scope.showSuccessToast('Login Successful');
          $location.path('/posts');
        } else {
          $scope.showDangerToast('Invalid Credential ! Please try Again');
        }

      })
      console.log("LoginController Login")
    }

    $scope.reg = function () {
      $location.path('/newuser');
    }
  }])

  .controller('newUserRegController', ['$scope', '$location', '$http', function ($scope, $location, $http) {
    console.log('newUserRegController')
    $scope.RegisterUser = function () {
      let data = {
        email: $scope.email,
        password: $scope.password,
        userName: $scope.UserName
      }
      $http.post("http://localhost:5000/users/addUser", data).then((res) => {
        console.log(res);
        $scope.showSuccessToast('User Registerd');
        $location.path('/login');
      })
      console.log(data);
    }
  }])

  // Posts Controllers

  .controller('NewsPostController', ['$scope', '$location', '$http', '$cookies', function ($scope, $location, $http, $cookies) {
    $scope.showSuccessToast = function (msg) {
      mobiscroll.toast({
        message: msg,
        color: 'success',
        display: 'top'
      });
    };
    $scope.showDangerToast = function (msg) {
      mobiscroll.toast({
        message: msg,
        color: 'danger',
        display: 'top'
      });
    };
    $scope.postsCreate = function () {
      let postData = {
        title: $scope.title,
        content: $scope.content,
        owner: $cookies.get('LoggedInUser')
      }
      $http.post("http://localhost:5000/posts/addPosts", postData).then((res) => {
        console.log(res);
        $scope.showSuccessToast('Post Created');
        $scope.getFeeds();
        $location.path('/posts');
      });
    }

    $scope.getFeeds = function () {
      $http.get("http://localhost:5000/posts").then((feeds) => {
        $scope.Feeds = feeds.data;
        console.log($scope.Feeds);
      });
    }
    $scope.getFeeds();
    
    $scope.deletePost = function(feed){
      console.log(feed);
      $http.delete(`http://localhost:5000/posts/deletePosts?id=${feed._id}`).then((feeds) => {
        $scope.showSuccessToast(`Deleted Post Title :${feed.title}`);
        $scope.getFeeds();
      });
    }

    $scope.updatePost = function(feed){
      $http.put("http://localhost:5000/posts/updatePosts",feed).then((feeds) => {
        $scope.showSuccessToast(`Update Post :${feed.title}`);
        $scope.getFeeds();
      });
    }
  }])