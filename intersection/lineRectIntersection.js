function lineRectIntersection(lineStartPoint, lineEndPoint, rectangle) {
  const minXLinePoint =
    lineStartPoint.x <= lineEndPoint.x ? lineStartPoint : lineEndPoint;
  const maxXLinePoint =
    lineStartPoint.x <= lineEndPoint.x ? lineEndPoint : lineStartPoint;
  const minYLinePoint =
    lineStartPoint.y <= lineEndPoint.y ? lineStartPoint : lineEndPoint;
  const maxYLinePoint =
    lineStartPoint.y <= lineEndPoint.y ? lineEndPoint : lineStartPoint;

  const rectMaxX = rectangle.xMax;
  const rectMinX = rectangle.xMin;
  const rectMinY = rectangle.yMin;
  const rectMaxY = rectangle.yMax;

  //x轴平行
  if (lineStartPoint.y === lineEndPoint.y) {
    if (minXLinePoint.x >= rectMaxX || maxXLinePoint.x <= rectMinX) {
      return false;
    }
    return true;
  }
  //y轴平行
  if (lineStartPoint.x === lineEndPoint.x) {
    if (minYLinePoint.y >= rectMaxY || maxYLinePoint.y <= rectMinY) {
      return false;
    }
    return true;
  }

  /**
   * 线和矩形在x轴方向上有相交
   */
  if (minXLinePoint.x <= rectMaxX && rectMaxX <= maxXLinePoint.x) {
    //三角形对边比斜边
    const tan =
      (maxXLinePoint.y - minXLinePoint.y) / (maxXLinePoint.x - minXLinePoint.x);
    /**
     *用最大的矩形x值减去最小的线的x
     *在乘以tan，得到对应角度的对边长度，
     *最后加上最小的矩形y值，就是在坐标系中的y的实际值
     *如果这个值在线段的最小最大y之间并且在矩形最小最大y之间，就相交
     */
    const intersectionY = (rectMaxX - minXLinePoint.x) * tan + minXLinePoint.y;
    if (
      minYLinePoint.y <= intersectionY &&
      intersectionY <= maxYLinePoint.y &&
      rectMinY <= intersectionY &&
      intersectionY <= rectMaxY
    ) {
      return true;
    }
  }
  //一下同上
  if (minXLinePoint.x <= rectMinX && rectMinX <= maxXLinePoint.x) {
    const tan =
      (maxXLinePoint.y - minXLinePoint.y) / (maxXLinePoint.x - minXLinePoint.x);
    const intersectionY = (rectMinX - minXLinePoint.x) * tan + minXLinePoint.y;
    if (
      minYLinePoint.y <= intersectionY &&
      intersectionY <= maxYLinePoint.y &&
      rectMinY <= intersectionY &&
      intersectionY <= rectMaxY
    ) {
      return true;
    }
  }
  if (minYLinePoint.y <= rectMaxY && rectMaxY <= maxYLinePoint.y) {
    const rm =
      (maxYLinePoint.x - minYLinePoint.x) / (maxYLinePoint.y - minYLinePoint.y);
    const intersectionX = (rectMaxY - minYLinePoint.y) * rm + minYLinePoint.x;
    if (
      minXLinePoint.x <= intersectionX &&
      intersectionX <= maxXLinePoint.x &&
      rectMinX <= intersectionX &&
      intersectionX <= rectMaxX
    ) {
      return true;
    }
  }
  if (minYLinePoint.y <= rectMinY && rectMinY <= maxYLinePoint.y) {
    const rm =
      (maxYLinePoint.x - minYLinePoint.x) / (maxYLinePoint.y - minYLinePoint.y);
    const intersectionX = (rectMinY - minYLinePoint.y) * rm + minYLinePoint.x;
    if (
      minXLinePoint.x <= intersectionX &&
      intersectionX <= maxXLinePoint.x &&
      rectMinX <= intersectionX &&
      intersectionX <= rectMaxX
    ) {
      return true;
    }
  }

  return false;
}
console.log(
  lineRectIntersection(
    {
      x: 513.5,
      y: 253.5,
    },
    {
      x: 555.5,
      y: 253.5,
    },
    {
      xMax: 667.5000019073486,
      xMin: 453.5000008477105,
      yMin: 155.5000004768372,
      yMax: 359.499999165535,
    }
  )
);
