import { Colors } from '../constants/color';
export type noteState = {
  id: string;
  title: string;
  desc: string | undefined;
  position: position | undefined;
  date: string;
  font: font;
  medias: media[] | undefined;
  stickers: sticker[] | undefined;
};

export type font = {
  fontType: string
  fontSize: number
  align: number
  bold: boolean
  italic: boolean
  underline: boolean
  textColor: string
}

export type position = {
  name: string;
  latitude: number;
  longitude: number;
}
export type sticker = {
  stickerId: number;
  x: number;
  y: number;
  isMove: boolean;
}

enum mediaTypes {
  Image = 'image',
  Video = 'video',
  Audio = 'audio',
}


export type media = {
  type: string;
  uri: string;
}



export const defaultFont = {
  fontType: 'Roboto',
  fontSize: 16,
  align: 0,
  bold: false,
  italic: false,
  underline: false,
  textColor: Colors.BLACK,
}

