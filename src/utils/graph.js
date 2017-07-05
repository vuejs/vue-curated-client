export function getSplineControlPoints (firstPoint, middlePoint, afterPoint, tension) {
  // Props to Rob Spencer at scaled innovation for his post on splining between points
  // http://scaledinnovation.com/analytics/splines/aboutSplines.html
  const d01 = Math.sqrt(Math.pow(middlePoint.x - firstPoint.x, 2) + Math.pow(middlePoint.y - firstPoint.y, 2))
  const d12 = Math.sqrt(Math.pow(afterPoint.x - middlePoint.x, 2) + Math.pow(afterPoint.y - middlePoint.y, 2))
  const fa = tension * d01 / (d01 + d12) // scaling factor for triangle Ta
  const fb = tension * d12 / (d01 + d12)
  return {
    inner: {
      x: middlePoint.x - fa * (afterPoint.x - firstPoint.x),
      y: middlePoint.y - fa * (afterPoint.y - firstPoint.y),
    },
    outer: {
      x: middlePoint.x + fb * (afterPoint.x - firstPoint.x),
      y: middlePoint.y + fb * (afterPoint.y - firstPoint.y),
    },
  }
}

export function getSplinePoints (points, min, max, tension = 0.5) {
  const result = []

  for (let i = 1; i < points.length; i++) {
    const currentPoint = points[i]
    const previousPoint = points[i - 1]
    const nextPoint = i < points.length - 1 ? points[i + 1] : currentPoint

    const controlPoints = getSplineControlPoints(previousPoint, currentPoint, nextPoint, tension)

    // Prevent the curves from overflowing
    if (controlPoints.inner.y > max || controlPoints.outer.y > max) {
      controlPoints.inner.y = controlPoints.outer.y = max
    } else if (controlPoints.inner.y < min || controlPoints.outer.y < min) {
      controlPoints.inner.y = controlPoints.outer.y = min
    }

    result.push({
      controlPoints,
      point: currentPoint,
    })
  }

  return result
}

export function getSplineCurves (points, min, max, tension) {
  const result = []
  const splinePoints = getSplinePoints(points, min, max, tension)

  for (let i = 1; i < splinePoints.length; i++) {
    const previousPoint = splinePoints[i - 1]
    const currentPoint = splinePoints[i]
    const coords = [
      previousPoint.controlPoints.outer.x,
      previousPoint.controlPoints.outer.y,
      currentPoint.controlPoints.inner.x,
      currentPoint.controlPoints.inner.y,
      currentPoint.point.x,
      currentPoint.point.y,
    ]
    result.push(coords)
  }

  return result
}

export function printPoint (op, ...coords) {
  const points = []
  for (let i = 0; i < coords.length; i += 2) {
    points.push(`${coords[i]},${coords[i + 1]}`)
  }
  return `${op} ${points.join(' ')} `
}
