/**
 * 计算百分比
 * @param part 部分值
 * @param total 总量
 * @param scale 保留多少位小数，当舍弃的第一位>5时进位，=<时舍去
 */
export const percentage = (part, total, scale = 0) => {
    const p = (part / total) * 100;
    return parseFloat(p.toFixed(scale));
}