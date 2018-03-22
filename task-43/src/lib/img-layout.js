// import './img-layout.css';
require('./img-layout.css');

function PieceLayout (container, imgArr) {
  this.container = container;
  this.container.classList.add('pieceLayout-container');
  this.imgArr = imgArr;
  this.containerWidth = this.container.getBoundingClientRect().width;
  this.containerHeight = this.container.getBoundingClientRect().height;
  if (this.imgArr.length > 0) {
    this.init();
  }
  return;
}

PieceLayout.prototype.init = function () {
  this.imgArr = this.imgArr.map(function (item, index) {
    return '<div class="pieceLayout-imgWrapper"><img alt="照片" class="pieceLayout-img" src=' + item + ' /></div>';
  });
  
  var str = '';
  this.container.innerHTML = this.imgArr.forEach(function (item, index) {
    str += item
  });
  this.container.innerHTML = str;
  this.arrange();
};

PieceLayout.prototype.arrange = function () {
  switch (this.imgArr.length) {
    case 1:
      break;
    case 2:
      // console.log(this.container)
      this.container.style.position = 'relative';
      var firstContainer = this.container.firstElementChild,
          lastContainer = this.container.lastElementChild;
      firstContainer.classList.add('pieceLayout-clipLeft');
      lastContainer.classList.add('pieceLayout-clipRight');
      firstContainer.querySelector('img').classList.add('pieceLayout-imgLeft');
      lastContainer.querySelector('img').classList.add('pieceLayout-imgRight');
      break;
    case 3:
      var containers = this.container.querySelectorAll('.pieceLayout-imgWrapper');
      this.container.classList.add('pieceLayout-imgWrapper4');
      containers[0].style.width = this.containerWidth - this.containerHeight / 2 + 'px';
      containers[1].style.width = this.containerHeight / 2 + 'px';
      containers[1].style.height = this.containerHeight / 2 + 'px';
      containers[2].style.width = this.containerHeight / 2 + 'px';
      containers[2].style.height = this.containerHeight / 2 + 'px';
      break;
    case 4:
      var containers = this.container.querySelectorAll('.pieceLayout-imgWrapper');
      this.container.classList.add('pieceLayout-imgWrapper4');
      for (var i = 0; i < containers.length; i++) {
        containers[i].style.width = this.containerWidth / 2 + 'px';
        containers[i].style.height = this.containerHeight / 2 + 'px';
      }
      break;
    case 5:
      var containers = this.container.querySelectorAll('.pieceLayout-imgWrapper');
      this.container.classList.add('pieceLayout-imgWrapper4');
      containers[0].style.width = this.containerWidth * 2/3 + 'px';
      containers[0].style.height = this.containerHeight * 2/3 + 'px';
      containers[1].style.width = this.containerWidth * 1/3 + 'px';
      containers[1].style.height = this.containerHeight * 1/3 + 'px';
      containers[2].style.width = this.containerWidth * 1/3 + 'px';
      containers[2].style.height = this.containerHeight * 1/3 + 'px';
      containers[3].style.width = this.containerWidth * 1/3 + 'px';
      containers[3].style.height = this.containerWidth * 1/3 + 'px';
      containers[4].style.width = this.containerWidth * 1/3 + 'px';
      containers[4].style.height = this.containerHeight - this.containerWidth * 1/3 + 'px' ;
      this.insertInnerContainer(this.container, [containers[1], containers[2]]);
      break;
    case 6:
      var containers = this.container.querySelectorAll('.pieceLayout-imgWrapper');
      this.container.classList.add('pieceLayout-imgWrapper4');
      containers[0].style.width = this.containerWidth * 2/3 + 'px';
      containers[0].style.height = this.containerHeight * 2/3 + 'px';
      containers[1].style.width = this.containerWidth * 1/3 + 'px';
      containers[1].style.height = this.containerHeight * 1/3 + 'px';
      containers[2].style.width = this.containerWidth * 1/3 + 'px';
      containers[2].style.height = this.containerHeight * 1/3 + 'px';
      containers[3].style.width = this.containerWidth * 1/3 + 'px';
      containers[3].style.height = this.containerHeight * 1/3 + 'px';
      containers[4].style.width = this.containerWidth * 1/3 + 'px';
      containers[4].style.height = this.containerHeight * 1/3 + 'px';
      containers[5].style.width = this.containerWidth * 1/3 + 'px';
      containers[5].style.height = this.containerHeight * 1/3 + 'px';
      this.insertInnerContainer(this.container, [containers[1], containers[2]]);
      break;
    default:
      console.error('图片数量有误');
      return;
  }
};

PieceLayout.prototype.insertInnerContainer = function (container, itemArr) {
  var div = document.createElement('div');
  div.classList.add('pieceLayout-innerContainer');
  itemArr.forEach(function (item) {
    div.appendChild(item);
  });
  container.insertBefore(div, container.querySelector(':nth-child(2)'));
};

module.exports = PieceLayout;