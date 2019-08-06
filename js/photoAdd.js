'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var PHOTO_CLASS = 'ad-form__photo';
  var avatarChooser = document.querySelector('.ad-form-header__input');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');

  var photosChooser = document.querySelector('.ad-form__input');
  var photosPreviewContainer = document.querySelector('.ad-form__photo-container');

  function checkType(fileName) {
    return FILE_TYPES.some(function (fileType) {
      return fileName.endsWith(fileType);
    });
  }

  avatarChooser.addEventListener('change', function () {
    var file = avatarChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = checkType(fileName);

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  photosChooser.addEventListener('change', function () {
    var file = photosChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = checkType(fileName);

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var preview = photosPreviewContainer.querySelector('.' + PHOTO_CLASS);
        if (preview.hasChildNodes() === false) {
          preview.remove();
        }
        var photo = document.createElement('img');
        photo.src = reader.result;
        var photoContainerNode = document.createElement('div');
        photoContainerNode.className = PHOTO_CLASS;
        photosPreviewContainer.appendChild(photoContainerNode);
        photoContainerNode.appendChild(photo);
      }
      );

      reader.readAsDataURL(file);
    }
  });

  function reset() {
    avatarPreview.src = 'img/muffin-grey.svg';

    var previewListNode = photosPreviewContainer.querySelectorAll('.' + PHOTO_CLASS);
    for (var i = 0; i < previewListNode.length; i++) {
      previewListNode[i].remove();
    }
    var photoContainerNode = document.createElement('div');
    photoContainerNode.className = PHOTO_CLASS;
    photosPreviewContainer.appendChild(photoContainerNode);
  }
  window.photoAdd = {
    reset: reset
  };
})();
