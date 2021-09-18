'use strict'
    let canvas = document.getElementById("mycanvas");
    let ctx = canvas.getContext("2d");


    //+生成したミサイルを入れる変数+//
    let enemys = [];


    //タイマー
    let time = 60
    let count = 0

    
    let playerX = 460
    let playerY = 450

    let id = setInterval(draw, 10);

    //プレイヤーの丸
    function player() {
      ctx.beginPath();
      ctx.arc(playerX, playerY, 5, 0, Math.PI * 2, false);
      ctx.fillStyle = "rgb(45, 129, 207)";
      ctx.fill();
      ctx.closePath();
    }


    //ゲーム処理
    function draw() {
      //ゲーム画面
      ctx.fillStyle = "rgb(37, 37, 37)";
      ctx.fillRect(0, 0, 900, 750);


      player()
      

      //タイム
      count += 1
      if (count % 100 == 0) {
        time -= 1
      }
      ctx.font = "20px'MS ゴジック'";
      ctx.fillStyle = "#FFFFFF";
      ctx.fillText("Timer:" + time, 10, 30);

      if (time == 0) {
        ctx.font = 'bold 100px serif';
        ctx.fillStyle = "rgb(45, 129, 207)";
        ctx.fillText("Game Clear!", 150, 200);
        clearInterval(id)
      }


      //ミサイルの生成 @ 10を小さくすると数増えます//
      if (Math.floor(Math.random() * 10) === 0) {
        createMissile();
      }
      // ミサイルの移動
      moveEnemys();
      // ミサイルの描画
      drawEnemys();
      // あたり判定
      hitCheck();
    }


    //特定のキーでプレイヤーを動かす
    document.onkeydown = keydown;
    function keydown(e) {
      if (e.which == 37 && playerX > 20) {
        playerX -= 20;
      }
      else if (e.which == 38 && playerY > 10) {
        playerY -= 20;
      }
      else if (e.which == 39 && playerX < 900) {
        playerX += 20;
      }
      else if (e.which == 40 && playerY < 580) {
        playerY += 20;
      }

    }

    //↓追加した関数↓//

    //ランダム関数でミサイルの横位置作成とスピード設定
    function createMissile() {
      let randomPositionX = Math.floor(Math.random() * canvas.width);
      let randomSpeedY = Math.floor(Math.random() * 15) + 5;
      enemys.push({
        x: randomPositionX,
        y: -10,
        moveY: randomSpeedY
      });
    }
    //セットインターバル毎にY値の変更
    function moveEnemys() {
      for (const enemy of enemys) {
        enemy.y += enemy.moveY;
      }
      // 画面の外に出たミサイルを配列から削除
      enemys = enemys.filter(enemy => enemy.y < 600);
    }

    //セットインターバル毎にミサイルを描画
    function drawEnemys() {
      for (const enemy of enemys) {
        ctx.fillStyle = 'red';
        ctx.fillRect(enemy.x, enemy.y, 5, 20);
      }
    }

    //ミサイルがヒットしたかどうか
    function hitCheck() {
      console.log(playerX,playerY);
      for (const enemy of enemys) {
        
        if (
            Math.abs(playerX - 10 - enemy.x) < 10 &&
            Math.abs(playerY - 10 - enemy.y) < 20
       ) {
        //↓あたったときの処理//
          ctx.font = 'bold 100px serif';
          ctx.fillText(`Game Over!`, 150, 200);
          clearInterval(id);
        }
      }
    }