const spriteFrameCount = 8; // 設定精靈圖中的動畫影格數量為八張。
const spriteFrameWidth = 58; // 設定每張角色影格的實際寬度為五十八像素。
const spriteFrameHeight = 73; // 設定每張角色影格的高度為七十三像素。
const movementSpeed = 4; // 設定角色每次繪圖移動的像素數量。
let spriteSheet; // 宣告用來存放角色精靈圖的變數。
let characterX; // 宣告用來存放角色水平位置的變數。
let facingRight = true; // 設定角色一開始面向右方。

function preload() { // 在畫面建立前載入角色精靈圖。
  spriteSheet = loadImage('1/跑/all58x73.png'); // 載入八格橫向排列的角色圖片。
} // 結束精靈圖載入函式。

function setup() { // 設定畫布與角色的初始狀態。
  createCanvas(windowWidth, windowHeight); // 建立符合視窗尺寸的全螢幕畫布。
  characterX = width / 2; // 將角色的初始水平位置設在畫布中央。
  imageMode(CENTER); // 讓角色圖片以指定位置作為繪製中心。
} // 結束初始設定函式。

function draw() { // 每個動畫影格更新角色並重繪畫面。
  background('#134074'); // 使用指定的十六進位色彩繪製畫布背景。
  let isMoving = false; // 預設角色目前沒有移動。

  if (keyIsDown(RIGHT_ARROW)) { // 檢查使用者是否按住向右方向鍵。
    characterX += movementSpeed; // 按住向右鍵時將角色往右移動。
    facingRight = true; // 移動方向向右時讓角色面向右方。
    isMoving = true; // 記錄角色正在移動以播放動畫。
  } else if (keyIsDown(LEFT_ARROW)) { // 檢查使用者是否按住向左方向鍵。
    characterX -= movementSpeed; // 按住向左鍵時將角色往左移動。
    facingRight = false; // 移動方向向左時讓角色面向左方。
    isMoving = true; // 記錄角色正在移動以播放動畫。
  } // 結束方向鍵移動判斷。

  characterX = constrain(characterX, spriteFrameWidth / 2, width - spriteFrameWidth / 2); // 限制角色不會移出畫布左右邊界。

  let frameIndex = 0; // 角色停止時固定顯示第一張影格。
  if (isMoving) { // 只有角色移動時才切換動畫影格。
    frameIndex = floor(frameCount / 8) % spriteFrameCount; // 每八個繪圖影格切換一次角色動畫。
  } // 結束動畫影格判斷。

  const frameSpacing = spriteSheet.width / spriteFrameCount; // 依圖片總寬平均計算每格精靈的起點間距。
  const sourceX = frameIndex * frameSpacing; // 計算目前動畫影格在精靈圖中的水平位置。

  push(); // 暫存繪圖設定以免影響其他畫面元素。
  translate(characterX, height / 2); // 將角色繪製位置設在畫布中央高度與目前水平位置。
  scale(facingRight ? 1 : -1, 1); // 依角色朝向決定是否水平翻轉圖片。
  image(spriteSheet, 0, 0, spriteFrameWidth, spriteFrameHeight, sourceX, 0, spriteFrameWidth, spriteFrameHeight); // 繪製目前的五十八乘七十三像素角色影格。
  pop(); // 還原繪圖設定。
} // 結束每影格繪圖函式。

function windowResized() { // 視窗尺寸改變時更新畫布大小。
  resizeCanvas(windowWidth, windowHeight); // 讓畫布持續填滿整個視窗。
  characterX = constrain(characterX, spriteFrameWidth / 2, width - spriteFrameWidth / 2); // 確保視窗縮小後角色仍在畫布範圍內。
} // 結束視窗尺寸更新函式。

function keyPressed() { // 接收鍵盤按鍵以避免方向鍵捲動網頁。
  if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) { // 判斷按下的是否為左右方向鍵。
    return false; // 阻止瀏覽器以方向鍵捲動畫面。
  } // 結束方向鍵判斷。
} // 結束鍵盤按鍵處理函式。
