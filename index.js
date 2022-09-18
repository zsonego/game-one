(function () {
  //封装获取元素方法
  function $(selector) {
    return document.querySelector(selector);
  }
  function $$(selector) {
    return document.querySelectorAll(selector);
  }
  //获取元素
  var chessboard = $(".chessboard");
  var container = $(".container");
  //游戏状态
  var isGameOver = false;
  //棋子颜色
  var color = "white";
  //保存所有棋子的数组
  var allChess = [];
  //初始化棋盘
  function initChessboard() {
    var allTr = "";
    for (var i = 0; i < 14; i++) {
      var tr = "<tr>";
      for (var j = 0; j < 14; j++) {
        tr += `<td data-row = '${i}' data-line = '${j}'></td>`;
      }
      tr += "</tr>";
      allTr += tr;
    }
    chessboard.innerHTML = allTr;
  }
  //判断棋子是否已经存在
  function exist(temp) {
    return allChess.find(function (item) {
      return item.x === temp.x && item.y === temp.y;
    });
  }
  //创建棋子
  function createChess(e) {
    if (!isGameOver && e.target.tagName === "TD") {
      var targetData = Object.assign({}, e.target.dataset);
      //判断点击位置，确定棋子位置
      var halfWidth = (container.clientWidth * 0.92) / 28; //格子一半的长度
      var positionX = e.offsetX > halfWidth;
      var positionY = e.offsetY > halfWidth;
      var temp = {
        x: positionX
          ? parseInt(targetData.line) + 1
          : parseInt(targetData.line),
        y: positionY ? parseInt(targetData.row) + 1 : parseInt(targetData.row),
        c: color,
      };
      //判断棋子是否已经创建
      if (!exist(temp)) {
        //将棋子插入DOM
        if (temp.x < 14 && temp.y < 14) {
          $(
            `td[data-row = '${temp.y}'][data-line = '${temp.x}']`
          ).innerHTML += `<div class = 'chess ${temp.c}' data-row = '${temp.y}' data-line = '${temp.x}'></div>`;
          allChess.push(temp);
          //切换颜色
          color === "white" ? (color = "black") : (color = "white");
        } else if (temp.x === 14 && temp.y < 14) {
          $(
            `td[data-row = '${temp.y}'][data-line = '${temp.x - 1}']`
          ).innerHTML += `<div class = 'chess ${temp.c}' data-row = '${temp.y}' data-line = '${temp.x}' style = 'left:50%'></div>`;
          allChess.push(temp);
          //切换颜色
          color === "white" ? (color = "black") : (color = "white");
        } else if (temp.y === 14 && temp.x < 14) {
          $(
            `td[data-row = '${temp.y - 1}'][data-line = '${temp.x}']`
          ).innerHTML += `<div class = 'chess ${temp.c}' data-row = '${temp.y}' data-line = '${temp.x}' style = 'top:50%'></div>`;
          allChess.push(temp);
          //切换颜色
          color === "white" ? (color = "black") : (color = "white");
        } else if (temp.x === 14 && temp.y === 14) {
          $(
            `td[data-row = '${temp.y - 1}'][data-line = '${temp.x - 1}']`
          ).innerHTML += `<div class = 'chess ${temp.c}' data-row = '${temp.y}' data-line = '${temp.x}' style = 'left:50%;top:50%'></div>`;
          allChess.push(temp);
          //切换颜色
          color === "white" ? (color = "black") : (color = "white");
        }
      }
    }
    //每一颗棋子创建结束，需要判断游戏是否结束
    checkGame();
  }
  //判断游戏是否结束，也就是有没有五颗相同颜色的棋子连成线
  function checkGame() {
    //横着五个
    for (let i = 0; i < allChess.length; i++) {
      let result1 = allChess.find(function (item) {
        return (
          allChess[i].x + 1 === item.x &&
          allChess[i].y === item.y &&
          allChess[i].c === item.c
        );
      });
      let result2 = allChess.find(function (item) {
        return (
          allChess[i].x + 2 === item.x &&
          allChess[i].y === item.y &&
          allChess[i].c === item.c
        );
      });
      let result3 = allChess.find(function (item) {
        return (
          allChess[i].x + 3 === item.x &&
          allChess[i].y === item.y &&
          allChess[i].c === item.c
        );
      });
      let result4 = allChess.find(function (item) {
        return (
          allChess[i].x + 4 === item.x &&
          allChess[i].y === item.y &&
          allChess[i].c === item.c
        );
      });
      if (result1 && result2 && result3 && result4 && allChess[i]) {
        console.log(allChess);
        console.log(result4.x, result4.y);
        $(
          `td div[data-row ='${allChess[i].y}'][data-line = '${allChess[i].x}']`
        ).classList.add("end");
        $(
          `td div[data-row ='${result1.y}'][data-line = '${result1.x}']`
        ).classList.add("end");
        $(
          `td div[data-row ='${result2.y}'][data-line = '${result2.x}']`
        ).classList.add("end");
        $(
          `td div[data-row ='${result3.y}'][data-line = '${result3.x}']`
        ).classList.add("end");
        $(
          `td div[data-row ='${result4.y}'][data-line = '${result4.x}']`
        ).classList.add("end");
        for (let j = 0; j < allChess.length; j++) {
          $(
            `td div[data-row ='${allChess[j].y}'][data-line = '${allChess[j].x}']`
          ).innerText = j + 1;
        }
        isGameOver = true;
      }
    }
    //竖着五个
    for (let i = 0; i < allChess.length; i++) {
      let result1 = allChess.find(function (item) {
        return (
          allChess[i].x === item.x &&
          allChess[i].y + 1 === item.y &&
          allChess[i].c === item.c
        );
      });
      let result2 = allChess.find(function (item) {
        return (
          allChess[i].x === item.x &&
          allChess[i].y + 2 === item.y &&
          allChess[i].c === item.c
        );
      });
      let result3 = allChess.find(function (item) {
        return (
          allChess[i].x === item.x &&
          allChess[i].y + 3 === item.y &&
          allChess[i].c === item.c
        );
      });
      let result4 = allChess.find(function (item) {
        return (
          allChess[i].x === item.x &&
          allChess[i].y + 4 === item.y &&
          allChess[i].c === item.c
        );
      });
      if (result1 && result2 && result3 && result4 && allChess[i]) {
        $(
          `td div[data-row ='${allChess[i].y}'][data-line = '${allChess[i].x}']`
        ).classList.add("end");
        $(
          `td div[data-row ='${result1.y}'][data-line = '${result1.x}']`
        ).classList.add("end");
        $(
          `td div[data-row ='${result2.y}'][data-line = '${result2.x}']`
        ).classList.add("end");
        $(
          `td div[data-row ='${result3.y}'][data-line = '${result3.x}']`
        ).classList.add("end");
        $(
          `td div[data-row ='${result4.y}'][data-line = '${result4.x}']`
        ).classList.add("end");
        for (let j = 0; j < allChess.length; j++) {
          $(
            `td div[data-row ='${allChess[j].y}'][data-line = '${allChess[j].x}']`
          ).innerText = j + 1;
        }
        isGameOver = true;
      }
    }
    //正斜五个
    for (let i = 0; i < allChess.length; i++) {
      let result1 = allChess.find(function (item) {
        return (
          allChess[i].x + 1 === item.x &&
          allChess[i].y + 1 === item.y &&
          allChess[i].c === item.c
        );
      });
      let result2 = allChess.find(function (item) {
        return (
          allChess[i].x + 2 === item.x &&
          allChess[i].y + 2 === item.y &&
          allChess[i].c === item.c
        );
      });
      let result3 = allChess.find(function (item) {
        return (
          allChess[i].x + 3 === item.x &&
          allChess[i].y + 3 === item.y &&
          allChess[i].c === item.c
        );
      });
      let result4 = allChess.find(function (item) {
        return (
          allChess[i].x + 4 === item.x &&
          allChess[i].y + 4 === item.y &&
          allChess[i].c === item.c
        );
      });
      if (result1 && result2 && result3 && result4 && allChess[i]) {
        console.log("ok");
        $(
          `td div[data-row ='${allChess[i].y}'][data-line = '${allChess[i].x}']`
        ).classList.add("end");
        $(
          `td div[data-row ='${result1.y}'][data-line = '${result1.x}']`
        ).classList.add("end");
        $(
          `td div[data-row ='${result2.y}'][data-line = '${result2.x}']`
        ).classList.add("end");
        $(
          `td div[data-row ='${result3.y}'][data-line = '${result3.x}']`
        ).classList.add("end");
        $(
          `td div[data-row ='${result4.y}'][data-line = '${result4.x}']`
        ).classList.add("end");
        for (let j = 0; j < allChess.length; j++) {
          $(
            `td div[data-row ='${allChess[j].y}'][data-line = '${allChess[j].x}']`
          ).innerText = j + 1;
        }
        isGameOver = true;
      }
    }
    //反斜五个
    for (let i = 0; i < allChess.length; i++) {
      let result1 = allChess.find(function (item) {
        return (
          allChess[i].x - 1 === item.x &&
          allChess[i].y + 1 === item.y &&
          allChess[i].c === item.c
        );
      });
      let result2 = allChess.find(function (item) {
        return (
          allChess[i].x - 2 === item.x &&
          allChess[i].y + 2 === item.y &&
          allChess[i].c === item.c
        );
      });
      let result3 = allChess.find(function (item) {
        return (
          allChess[i].x - 3 === item.x &&
          allChess[i].y + 3 === item.y &&
          allChess[i].c === item.c
        );
      });
      let result4 = allChess.find(function (item) {
        return (
          allChess[i].x - 4 === item.x &&
          allChess[i].y + 4 === item.y &&
          allChess[i].c === item.c
        );
      });
      if (result1 && result2 && result3 && result4 && allChess[i]) {
        $(
          `td div[data-row ='${allChess[i].y}'][data-line = '${allChess[i].x}']`
        ).classList.add("end");
        $(
          `td div[data-row ='${result1.y}'][data-line = '${result1.x}']`
        ).classList.add("end");
        $(
          `td div[data-row ='${result2.y}'][data-line = '${result2.x}']`
        ).classList.add("end");
        $(
          `td div[data-row ='${result3.y}'][data-line = '${result3.x}']`
        ).classList.add("end");
        $(
          `td div[data-row ='${result4.y}'][data-line = '${result4.x}']`
        ).classList.add("end");
        for (let j = 0; j < allChess.length; j++) {
          $(
            `td div[data-row ='${allChess[j].y}'][data-line = '${allChess[j].x}']`
          ).innerText = j + 1;
        }
        isGameOver = true;
      }
    }
  }
  //点击事件绑定
  function bindEvent() {
    container.addEventListener("click", function (e) {
      if (!isGameOver) {
        //游戏没有结束并且点的是格子里,创建棋子
        createChess(e);
      } else {
        if (window.confirm("是否重新来局?")) {
          initChessboard();
          isGameOver = false;
          allChess = [];
          color = "white";
        }
      }
    });
  }
  function main() {
    //初始化棋盘
    initChessboard();
    //绑定点击事件
    bindEvent();
  }
  main();
})();
