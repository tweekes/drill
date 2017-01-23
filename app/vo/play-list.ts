export class PlayList {
  id: number;
  title: string;
  items: PlayItem[];
}

export class PlayItem {
  title: string;
  whatMp3?: Mp3Holder;
  ansMp3?: Mp3Holder;
  selected?: boolean;  // Used when user want to select only a subset to play / practice.
}

export class Mp3Holder {
  title: string;
  audioIndex?: number;   // Gets initialised when preloaded into Audio Buffer.
}
