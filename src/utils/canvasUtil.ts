import * as _ from 'lodash';

import { CanvasInfo } from 'store/editor/EditorGetters';
import Fraction from './fraction';
import { Coord, Rect } from './types/scoreTypes';
import { LaneStylePart, LaneTheme } from './types/themeTypes';

export default class CanvasUtil {
  static getCanvasUtil(canvas: HTMLCanvasElement): CanvasUtil {
    const ctx = canvas.getContext('2d');
    if (ctx !== null) {
      return new CanvasUtil(ctx);
    } else {
      throw Error(`Cannot get CanvasRenderingContext2D from canvas object: ${canvas}`);
    }
  }

  /**
   * match pixel position to the middle of pixel
   * (e.g. (3, 5.4) -> (3.5, 5.5))
   * @param {number} pos
   */
  static _linePixel(pos: number): number {
    return Math.round(pos + 0.5) - 0.5;
  }

  ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  width(): number {
    return this.ctx.canvas.width;
  }

  height(): number {
    return this.ctx.canvas.height;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width(), this.height());
  }

  fillBackground(colorText: string) {
    const ctx = this.ctx;
    ctx.save();
    ctx.fillStyle = colorText;
    ctx.fillRect(0, 0, this.width(), this.height());
    ctx.restore();
  }

  drawEditor(
    canvasInfo: CanvasInfo,
    laneTheme: LaneTheme,
  ) {
    const gridColors = laneTheme.gridColors;
    const laneStyles = laneTheme.laneStyles;
    const ctx = this.ctx;
    const canvasHeight = this.height();
    const canvasWidth = this.width();

    this.clear();
    this.fillBackground(gridColors.backgroundColor);

    // Draw Background and Vertical Lane Splitter of Each Lanes
    ctx.strokeStyle = gridColors.verticalLineColor;
    ctx.lineWidth = gridColors.lineWidth;
    ctx.beginPath();
    for (let laneNo = 0; laneNo < laneStyles.length; laneNo++) {
      const style = laneStyles[laneNo];
      const laneX = canvasInfo.laneXList[laneNo];
      const nextLaneX =
        (laneNo === laneStyles.length - 1) ? canvasWidth : canvasInfo.laneXList[laneNo + 1];
      ctx.fillStyle = style.laneBackgroundColor;
      this._drawLine(laneX, 0, laneX, canvasHeight);
      this._drawRect(laneX, 0, nextLaneX - laneX, canvasHeight);
    }
    ctx.stroke();

    // Stroke Horizontal Panel Splitter
    ctx.strokeStyle = gridColors.sectionBorderColor;
    ctx.lineWidth = gridColors.lineWidth;
    ctx.beginPath();
    for (const laneY of canvasInfo.measureYList) {
      this._drawLine(0, canvasHeight - laneY, canvasWidth, canvasHeight - laneY);
    }
    ctx.stroke();

    // Stroke Main Grid
    ctx.strokeStyle = gridColors.mainGridColor;
    ctx.beginPath();
    for (const laneY of canvasInfo.mainGridYList) {
      this._drawLine(0, canvasHeight - laneY, canvasWidth, canvasHeight - laneY);
    }
    ctx.stroke();

    // Stroke Sub Grid
    ctx.strokeStyle = gridColors.subGridColor;
    ctx.beginPath();
    for (const laneY of canvasInfo.subGridYList) {
      this._drawLine(0, canvasHeight - laneY, canvasWidth, canvasHeight - laneY);
    }
    ctx.stroke();

    // Draw Panel Number
    ctx.font = '13px sans-serif';
    ctx.fillStyle = gridColors.sectionNumberColor;
    for (let measureNo = 0; measureNo < canvasInfo.measureYList.length; measureNo += 1) {
      const laneY = canvasInfo.measureYList[measureNo];
      const laneStr = _.padStart(`${measureNo}`, 3, '0');
      ctx.fillText(`[${laneStr}]`, 0, canvasHeight - (laneY + 3));
    }
  }

  // PRIVATE METHODS

  /**
   * Pixel Perfect Draw Line
   * @private
   */
  _drawLine(x0: number, y0: number, x1: number, y1: number) {
    this.ctx.moveTo(CanvasUtil._linePixel(x0), CanvasUtil._linePixel(y0));
    this.ctx.lineTo(CanvasUtil._linePixel(x1), CanvasUtil._linePixel(y1));
  }

  /**
   * Pixel Perfect Draw Rect
   * @private
   */
  _drawRect(x: number, y: number, w: number, h: number) {
    this.ctx.fillRect(Math.round(x), Math.round(y),
      Math.round(w), Math.round(h));
  }
}
