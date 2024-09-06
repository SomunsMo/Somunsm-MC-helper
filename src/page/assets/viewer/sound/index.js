import React, {useEffect, useRef, useState} from 'react';
import {SoundViewerStyle} from "./style";
import {useLocation} from "react-router";

const SoundViewer = () => {
    // 播放器元素
    const audioRef = useRef();
    // 进度条范围
    const progressBarRef = useRef();
    // 进度条当前进度
    const currentProgressRef = useRef();

    const location = useLocation();
    const {state} = location;

    // 是否播放中
    const [playing, setPlaying] = useState(false);
    // 当前播放时间
    const [currentTime, setCurrentTime] = useState(0);
    // 音频总时长
    const [duration, setDuration] = useState(0);

    useEffect(() => {

        progressBarRef.current.onclick = (e) => {
            // 鼠标点击的位置
            const clickPosition = e.offsetX;
            // 进度条总宽度
            const progressWidth = e.srcElement.offsetWidth;
            // 点击位置占进度条的百分比
            const percentage = (clickPosition / progressWidth) * 100;

            // 音频总时长
            const duration = audioRef.current.duration;
            // 更改后的播放时间
            const latestPlayTime = (percentage * duration) / 100;

            // 设置播放位置
            audioRef.current.currentTime = latestPlayTime;
            // 设置播放时长
            setCurrentTime(latestPlayTime);
            // 设置进度条位置
            setProgressTime(percentage);

            console.log("[click progress bar]",
                "\nclickPosition:" + clickPosition,
                "\npercentage:" + percentage,
                "\nsetTime:" + latestPlayTime
            )
        }
    }, []);

    // 当播放资源发生变更
    useEffect(() => {
        console.log(audioRef.current.duration);
        setDuration(audioRef.current.duration);
    }, [location]);

    const addPlayerListener = () => {
        // 播放器开始播放
        audioRef.current.onplay = () => {

        }

        // 播放器播放位置变动
        audioRef.current.ontimeupdate = (e) => {
            const currentTime = e.srcElement.currentTime;
            const duration = e.srcElement.duration;

            const percentage = (currentTime / duration) * 100;

            console.log(percentage);
            setCurrentTime(currentTime);
            setProgressTime(percentage);
        }

        // 播放器播放完毕
        audioRef.current.onended = () => {
            setPlaying(false);
            audioRef.current.currentTime = 0;
            setProgressTime(0);
        }
    }

    // 设置进度条位置
    const setProgressTime = (percentage) => {
        if (percentage < 0) {
            percentage = 0;
        } else if (percentage > 100) {
            percentage = 100;
        }

        currentProgressRef.current.style.transform = `scaleX(${percentage / 100})`;
    }

    // 控制暂停和播放
    const play = () => {
        if (playing) {
            setPlaying(!playing);
            audioRef.current.pause();
            return;
        }

        setPlaying(!playing);

        addPlayerListener();
        setDuration(audioRef.current.duration);
        audioRef.current.play();
        setPlaying(true);
    }

    const stop = () => {
        setPlaying(false);

        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setProgressTime(0);
    }

    return (
        <SoundViewerStyle>
            <div className={"currentTime"}>{Math.round(currentTime)} / {Math.round(duration)}s</div>

            <div ref={progressBarRef} className={"progressBar"}>
                <div ref={currentProgressRef} className={"currentProgress"}></div>
            </div>

            <button onClick={play}>{playing ? "暂停" : "播放"}</button>
            <button onClick={stop}>停止</button>

            <audio ref={audioRef} src={state.filePath}></audio>
        </SoundViewerStyle>
    );
};

export default SoundViewer;