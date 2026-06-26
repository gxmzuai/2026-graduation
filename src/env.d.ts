/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// APlayer 1.10.1 ships no type declarations; we only use `new APlayer(options)`.
declare module 'aplayer' {
  interface APlayerAudio {
    name?: string;
    artist?: string;
    url: string;
    cover?: string;
    lrc?: string;
    theme?: string;
    type?: 'auto' | 'hls' | 'normal' | string;
  }
  interface APlayerOptions {
    container: HTMLElement;
    fixed?: boolean;
    mini?: boolean;
    autoplay?: boolean;
    theme?: string;
    loop?: 'all' | 'one' | 'none';
    order?: 'list' | 'random';
    preload?: 'none' | 'metadata' | 'auto';
    volume?: number;
    mutex?: boolean;
    listFolded?: boolean;
    listMaxHeight?: number | string;
    lrcType?: 0 | 1 | 3;
    storageName?: string;
    audio: APlayerAudio | APlayerAudio[];
  }
  export default class APlayer {
    constructor(options: APlayerOptions);
    play(): void;
    pause(): void;
    toggle(): void;
    seek(time: number): void;
    volume(percentage: number, nostorage?: boolean): void;
    notice(text: string, time?: number, opacity?: number): void;
    on(event: string, handler: (...args: unknown[]) => void): void;
    destroy(): void;
  }
}

declare module 'aplayer/dist/APlayer.min.css';
