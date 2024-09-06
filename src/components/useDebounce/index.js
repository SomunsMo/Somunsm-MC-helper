import {useEffect, useState} from "react";

// 防抖组件
function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(
        () => {
            // 更新值前的防抖函数
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);

            // 清除防抖
            return () => {
                clearTimeout(handler);
            };
        },
        [value, delay], // 依赖项，这里包括value和delay
    );

    return debouncedValue;
}

export default useDebounce;