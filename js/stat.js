'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_COOR_X = 100;
var CLOUD_COOR_Y = 10;

var GAP = 10;
var COLUMN_GAP = 50;
var FONT_GAP = 16;
var FONT_STYLE = '16px PT Mono';

var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;

var Messages = {
  TITLE: 'Ура вы победили!',
  SUBTITLE: 'Список результатов:',
};

var Colors = {
  FONT_COLOR: '#000000',
  SHADOW_COLOR: 'rgba(0, 0, 0, 0.7)',
  CLOUD_COLOR: '#ffffff',
  PLAYER_BAR_COLOR: 'rgba(255, 0, 0, 1)'
};


var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
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
    ? Colors.PLAYER_BAR_COLOR
    : getRandomBlueColor();
};


var renderPlayerScore = function (ctx, players, i, times) {
  var maxTime = getMaxElement(times);

  var textCoorX = CLOUD_COOR_X + COLUMN_GAP + (BAR_WIDTH + COLUMN_GAP) * i;
  var textCoorY = CLOUD_HEIGHT - GAP;

  var playerBarCoorX = CLOUD_COOR_X + COLUMN_GAP + (BAR_WIDTH + COLUMN_GAP) * i;
  var playerBarCoorY = CLOUD_HEIGHT - BAR_HEIGHT - FONT_GAP - GAP + Math.round(BAR_HEIGHT - (times[i] / (maxTime / BAR_HEIGHT)));
  var playerBarHeight = (BAR_HEIGHT * times[i]) / maxTime;

  var resultTextCoorX = CLOUD_COOR_X + COLUMN_GAP + (BAR_WIDTH + COLUMN_GAP) * i;
  var resultTextCoorY = CLOUD_HEIGHT - BAR_HEIGHT - FONT_GAP - GAP - GAP;

  ctx.fillText(players[i], textCoorX, textCoorY);

  ctx.fillStyle = getColorBar(players[i], i);
  ctx.fillRect(playerBarCoorX, playerBarCoorY, BAR_WIDTH, playerBarHeight);

  ctx.fillStyle = Colors.FONT_COLOR;
  ctx.fillText(Math.round(times[i]), resultTextCoorX, resultTextCoorY);
};


window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_COOR_X + GAP, CLOUD_COOR_Y + GAP, Colors.SHADOW_COLOR);
  renderCloud(ctx, CLOUD_COOR_X, CLOUD_COOR_Y, Colors.CLOUD_COLOR);

  ctx.fillStyle = Colors.FONT_COLOR;
  ctx.font = FONT_STYLE;

  ctx.fillText(Messages.TITLE, CLOUD_COOR_X + 10, CLOUD_COOR_Y + FONT_GAP + GAP);
  ctx.fillText(Messages.SUBTITLE, CLOUD_COOR_X + 10, CLOUD_COOR_Y + FONT_GAP * 2 + GAP);

  for (var i = 0; i < players.length; i++) {
    renderPlayerScore(ctx, players, i, times);
  }

};
