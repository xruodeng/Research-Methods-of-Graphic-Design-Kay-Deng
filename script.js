const cube = document.getElementById('cube');
let isDragging = false;
let previousX, previousY;
let currentX = 0, currentY = 0; // 当前旋转角度
let rotationX = 0, rotationY = 0; // 累积旋转角度

document.addEventListener('mousedown', (event) => {
  isDragging = true;
  previousX = event.clientX;
  previousY = event.clientY;
});

document.addEventListener('mousemove', (event) => {
  if (isDragging) {
    const deltaX = event.clientX - previousX;
    const deltaY = event.clientY - previousY;

    rotationY += deltaX;
    rotationX -= deltaY;

    cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;

    previousX = event.clientX;
    previousY = event.clientY;
  }
});

document.addEventListener('mouseup', () => {
  isDragging = false;
});

document.querySelectorAll('.face').forEach(face => {
    face.addEventListener('click', function() {
      const faceType = this.getAttribute('data-face');
      let transformStyle = '';
      switch (faceType) {
        case 'front':
          transformStyle = 'rotateX(0deg) rotateY(0deg)';
          break;
        case 'back':
          transformStyle = 'rotateY(180deg) rotateX(0deg)';
          break;
        case 'right':
          // 如果原来将右面和左面的旋转搞反了，这里需要交换设置
          transformStyle = 'rotateY(-90deg)';
          break;
        case 'left':
          // 同上，调整旋转方向以匹配期望的视图
          transformStyle = 'rotateY(90deg)';
          break;
        case 'top':
          transformStyle = 'rotateX(-90deg)';
          break;
        case 'bottom':
          transformStyle = 'rotateX(90deg)';
          break;
      }
      // 应用旋转并略微放大正方体
      cube.style.transform = `translateZ(-50px) ${transformStyle}`;
    });
  });
  
  
// Add event listeners to each face to open the respective modal
document.querySelectorAll('.face').forEach(face => {
    face.addEventListener('click', function() {
      const faceType = this.getAttribute('data-face');
      document.getElementById(`modal-${faceType}`).style.display = "block";
    });
  });
  
  // Add event listener to close buttons
  document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', function() {
      this.closest('.modal').style.display = "none";
    });
  });
  
