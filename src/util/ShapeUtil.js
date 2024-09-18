// 校验传入的参数是否有undefined
const hasUndefined = (...args) => {
    for (let arg of args) {
        if (undefined === arg) {
            return true;
        }
    }

    return false;
}

/**
 * 检测坐标是否在矩形范围内
 * @param x 要检测的x坐标
 * @param y 要检测的y坐标
 * @param left 被检测的区域最左边
 * @param top 被检测的区域顶边
 * @param width 被检测的区域宽度
 * @param height 被检测的区域高度
 */
export const inRectangularRange = ({x, y}, {left, top, width, height}) => {
    if (hasUndefined(x, y, left, top, width, height)) {
        return false;
    }

    if (x < left || y < top) {
        return false;
    }

    if (x > (left + width) || y > (top + height)) {
        return false;
    }

    return true;
}