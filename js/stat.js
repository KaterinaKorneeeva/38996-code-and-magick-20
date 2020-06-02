'use strict';

var Cloud = {
  WIDTH: 420,
  HEIGHT: 270,
  COOR_X: 100,
  COOR_Y: 10,
  COLOR: '#ffffff',
  SHADOW_COLOR: 'rgba(0, 0, 0, 0.7)'
};

var Message = {
  TITLE: 'Ура вы победили!',
  SUBTITLE: 'Список результатов:',
  STYLE: '16px PT Mono',
  COLOR: '#000000'
};

var Bar = {
  WIDTH: 40,
  HEIGHT: 150
};

var GAP = 10;
var COLUMN_GAP = 50;
var FONT_GAP = 16;
var PLAYER_BAR_COLOR = 'rgba(255, 0, 0, 1)';

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, Cloud.WIDTH, Cloud.HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var getRandomNumber = function (min, max) {
  return Math.floor((Math.random() * max) - min);
};

// Генерацию случайного (синего) цвета
var getRandomBlueColor = function () {
  return 'hsl(240,' + getRandomNumber(0, 100) + '%, 50%)';
};

var getColorBar = function (player) {
  return (player === 'Вы')
    ? PLAYER_BAR_COLOR
    : getRandomBlueColor();
};

var renderPlayerScore = function (ctx, players, times) {
  var maxTime = getMaxElement(times);
  for (var i = 0; i < players.length; i++) {

    var textCoorX = Cloud.COOR_X + COLUMN_GAP + (Bar.WIDTH + COLUMN_GAP) * i;
    var textCoorY = Cloud.HEIGHT - GAP;

    var playerBarCoorX = Cloud.COOR_X + COLUMN_GAP + (Bar.WIDTH + COLUMN_GAP) * i;
    var playerBarCoorY = Cloud.HEIGHT - Bar.HEIGHT - FONT_GAP - GAP + Math.round(Bar.HEIGHT - (times[i] / (maxTime / Bar.HEIGHT)));
    var playerBarHeight = (Bar.HEIGHT * times[i]) / maxTime;

    var resultTextCoorX = Cloud.COOR_X + COLUMN_GAP + (Bar.WIDTH + COLUMN_GAP) * i;
    var resultTextCoorY = Cloud.HEIGHT - Bar.HEIGHT - FONT_GAP - GAP - GAP;

    ctx.fillText(players[i], textCoorX, textCoorY);

    ctx.fillStyle = getColorBar(players[i], i);
    ctx.fillRect(playerBarCoorX, playerBarCoorY, Bar.WIDTH, playerBarHeight);

    ctx.fillStyle = Message.COLOR;
    ctx.fillText(Math.round(times[i]), resultTextCoorX, resultTextCoorY);

  }
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, Cloud.COOR_X + GAP, Cloud.COOR_Y + GAP, Cloud.SHADOW_COLOR);
  renderCloud(ctx, Cloud.COOR_X, Cloud.COOR_Y, Cloud.COLOR);

  ctx.fillStyle = Message.COLOR;
  ctx.font = Message.STYLE;

  ctx.fillText(Message.TITLE, Cloud.COOR_X + 10, Cloud.COOR_Y + FONT_GAP + GAP);
  ctx.fillText(Message.SUBTITLE, Cloud.COOR_X + 10, Cloud.COOR_Y + FONT_GAP * 2 + GAP);

  renderPlayerScore(ctx, players, times);

};
