"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Box,
  Center,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  IconButton,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { playState } from "@/recoil/recoilstore";
import { usePathname } from "next/navigation";
import Interection from "@/api/Interection";

export function CustomAudio2({ music_data, index, feedId, ref }: any) {
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  //   const currentAudioRef = ref;
  const handleAudioSwitch = useCallback((target: HTMLAudioElement) => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
    }
    currentAudioRef.current = target;
  }, []);

  return (
    <>
      <AudioPlayer
        music_data={music_data}
        index={index}
        feedId={feedId}
        handleAudioSwitch={handleAudioSwitch}
      />
    </>
  );
}

export function AudioPlayer({
  handleAudioSwitch,
  music_data,
  index,
  feedId,
}: {
  handleAudioSwitch: (target: HTMLAudioElement) => void;
  music_data: string;
  index: number;
  feedId: string;
}) {
  const { Interection_plus } = Interection();
  const [music, setMusic] = useRecoilState(playState);
  const [play, setPlay] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const path = usePathname();
  const parts = path.split("/"); // 경로를 '/' 문자로 분리
  const lastPart = parts[parts.length - 1]; // 마지막 부분을 가져오기
  const [blobUrl, setBlobUrl] = useState<any>(null);

  useEffect(() => {
    if (music_data) {
      const binaryData = atob(music_data);
      const uint8Array = new Uint8Array(binaryData.length);
      for (let i = 0; i < binaryData.length; i++) {
        uint8Array[i] = binaryData.charCodeAt(i);
      }
      const blob = new Blob([uint8Array], { type: "audio/mpeg" });
      const newBlobUrl = URL.createObjectURL(blob);
      setBlobUrl(newBlobUrl);
    }
  }, [music_data]);

  //조회수 증가
  useEffect(() => {
    if (lastPart != "reupload" && lastPart != "upload" && play) {
      Interection_plus(feedId);
    }
  }, [play]);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const callbackRef = useCallback<(target: HTMLAudioElement) => void>(
    (target) => {
      if (target?.duration) setTotalTime(target?.duration);
      audioRef.current = target;
    },
    []
  );
  const progress = totalTime ? (currentTime / totalTime) * 100 : 0;

  const handleToggle = () => {
    const play = audioRef.current?.paused;
    if (play === undefined || !audioRef.current) return;
    handleAudioSwitch(audioRef.current);
    audioRef.current[play ? "play" : "pause"]();
  };

  const handleSliderChange = (value: number) => {
    if (!audioRef.current) return;
    handleAudioSwitch(audioRef.current);

    audioRef.current.currentTime = (value * audioRef.current.duration) / 100;
  };

  return (
    <Box>
      <Center>
        <IconButton
          mr={2}
          bg="transparent"
          aria-label="Play"
          onClick={handleToggle}
          colorScheme={play ? "transparent" : "transparent"}
          // id={`playButton${index}`} // ID 추가
          icon={
            play ? (
              <img
                src="/stop-arrow.png"
                alt="Stop"
                width="12px"
                height="12px"
              />
            ) : (
              <img
                src="/play-arrow.png"
                alt="Play"
                width="34px"
                height="34px"
              />
            )
          }
        >
          {/* {play ? "일시 정지" : "재생"} */}
        </IconButton>

        <Slider
          value={progress}
          onChange={handleSliderChange}
          mr={6}
          focusThumbOnChange={false}
        >
          <SliderTrack>
            <SliderFilledTrack bg="#651FFF" />
          </SliderTrack>
          <SliderThumb bg="#651FFF" />
        </Slider>
        <Center mr={6}>
          <Box>{formatTime(currentTime)}</Box>
          <Box mx={2}>/</Box>
          <Box>{formatTime(totalTime)}</Box>
        </Center>
      </Center>
      <audio
        // id={`audioElement${index}`}
        onPlay={() => setPlay(true)}
        onPause={() => setPlay(false)}
        onLoadedMetadata={(e) => setTotalTime(e.currentTarget.duration)}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onFocus={undefined}
        onBlur={undefined}
        ref={callbackRef}
        src={
          lastPart === "upload"
            ? music
            : lastPart === "reupload"
            ? music
            : blobUrl
        }
      />
    </Box>
  );
}

function formatTime(timeInSeconds: number) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}
