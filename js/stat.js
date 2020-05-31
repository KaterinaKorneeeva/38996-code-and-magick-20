'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var COLUMN_GAP = 50;
var FONT_GAP = 16;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;

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


var getColorBar = function (player, i) {
  return (player === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'hsl(' + (240 - i * 10) + ',100%,50%)';
};

window.renderStatistics = function(ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  var maxTime = getMaxElement(times);

  ctx.fillText('Ура вы победили!', CLOUD_X + 10, CLOUD_Y + FONT_GAP + GAP);
  ctx.fillText('Список результатов:', CLOUD_X + 10, CLOUD_Y + FONT_GAP * 2 + GAP);

  players.forEach((player, i) => {
    ctx.fillText(player, CLOUD_X + COLUMN_GAP + (BAR_WIDTH + COLUMN_GAP) * i, CLOUD_HEIGHT - GAP);
    ctx.fillStyle = getColorBar(player, i );
    ctx.fillRect(CLOUD_X + COLUMN_GAP + (BAR_WIDTH + COLUMN_GAP) * i, CLOUD_HEIGHT - BAR_HEIGHT - FONT_GAP - GAP + Math.round(BAR_HEIGHT - (times[i] / (maxTime / BAR_HEIGHT))), BAR_WIDTH, (BAR_HEIGHT * times[i]) / maxTime);
    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(times[i]), CLOUD_X + COLUMN_GAP + (BAR_WIDTH + COLUMN_GAP) * i, CLOUD_HEIGHT - BAR_HEIGHT - FONT_GAP - GAP - GAP)
  });
};
