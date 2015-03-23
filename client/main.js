var uploader = new Slingshot.Upload("myFileUploads");

// counter starts at 0
  Session.setDefault('uploadProgress', 0)

Template.slingshotForm.events({
  'submit form': function(e) {
    e.preventDefault();
    var file =  document.getElementById('fileToUpload').files[0];


uploader.send(file, function (error, downloadUrl) {
  Meteor.users.update(Meteor.userId(), {$push: {"profile.files": {'name': file.name, 'url': downloadUrl}}});
  console.log(downloadUrl);
});

  }
});


Template.uploadedPictures.helpers ({
  pictures: function() {
    var user = Meteor.users.findOne(Meteor.userId());
    if (user && user.profile && user.profile.files) {
      return user.profile.files;
    } else {
      return [];
    }
  }
});


Template.progressBar.helpers({
  progress: function () {
    return Math.round(uploader.progress() * 100);
    
  }
});