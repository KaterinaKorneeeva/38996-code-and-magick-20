'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;

var GAP = 10;
var COLUMN_GAP = 50;
var FONT_GAP = 16;
var FONT_STYLE = '16px PT Mono';
var COLUMN_WIDTH = 40;
var COLUMN_HEIGHT = 150;

var Message = {
  TITLE: 'Ура вы победили!',
  SUBTITLE: 'Список результатов:',
};

var Color = {
  BLACK: '#000000',
  GREY: 'rgba(0, 0, 0, 0.7)',
  WHITE: '#ffffff',
  RED: 'rgba(255, 0, 0, 1)'
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
    ? Color.RED
    : getRandomBlueColor();
};


var renderPlayerScore = function (ctx, player, i, time, maxTime) {

  var textX = CLOUD_X + COLUMN_GAP + (COLUMN_WIDTH + COLUMN_GAP) * i;
  var textY = CLOUD_HEIGHT - GAP;

  var playerColumnX = CLOUD_X + COLUMN_GAP + (COLUMN_WIDTH + COLUMN_GAP) * i;
  var playerColumnY = CLOUD_HEIGHT - COLUMN_HEIGHT - FONT_GAP - GAP + Math.round(COLUMN_HEIGHT - (time / (maxTime / COLUMN_HEIGHT)));
  var playerColumnHeight = (COLUMN_HEIGHT * time) / maxTime;

  var resultTextX = CLOUD_X + COLUMN_GAP + (COLUMN_WIDTH + COLUMN_GAP) * i;
  var resultTextY = CLOUD_HEIGHT - COLUMN_HEIGHT - FONT_GAP - GAP - GAP;

  ctx.fillText(player, textX, textY);

  ctx.fillStyle = getColorBar(player);
  ctx.fillRect(playerColumnX, playerColumnY, COLUMN_WIDTH, playerColumnHeight);

  ctx.fillStyle = Color.BLACK;
  ctx.fillText(Math.round(time), resultTextX, resultTextY);
};

window.renderStatistics = function (ctx, players, times) {

  var maxTime = getMaxElement(times);

  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, Color.GREY);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, Color.WHITE);

  ctx.fillStyle = Color.BLACK;
  ctx.font = FONT_STYLE;

  ctx.fillText(Message.TITLE, CLOUD_X + 10, CLOUD_Y + FONT_GAP + GAP);
  ctx.fillText(Message.SUBTITLE, CLOUD_X + 10, CLOUD_Y + FONT_GAP * 2 + GAP);


  for (var i = 0; i < players.length; i++) {
    renderPlayerScore(ctx, players[i], i, times[i], maxTime);
  }
};
