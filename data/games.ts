import gwtcBackCrowBody from "~/assets/games/go-with-the-crow/back-crow-body.svg";
import gwtcFrontFeet from "~/assets/games/go-with-the-crow/front-feet.svg";
import obBlockBlue from "~/assets/games/ortris/block-blue.svg";
import obBlockGreen from "~/assets/games/ortris/block-green.svg";
import obBlockOrange from "~/assets/games/ortris/block-orange.svg";
import obBlockRed from "~/assets/games/ortris/block-red.svg";
import obMidGrid from "~/assets/games/ortris/mid-grid.webp";
import obMidScreenBlocks from "~/assets/games/ortris/mid-screen-blocks.svg";
import frameTop from "~/assets/games/frame-top.svg";
import frameBottom from "~/assets/games/frame-bottom.svg";

export type GameVisualId = "go-with-the-crow" | "ortris" | "orange-court";

export type Game = {
  id: GameVisualId;
  titleZh: string;
  titleEn: string;
  type: string;
  players: string;
  duration: string;
  description: string;
  playUrl: string;
};

export const games: readonly Game[] = [
  {
    id: "go-with-the-crow",
    titleZh: "同流合乌",
    titleEn: "Go With The Crow",
    type: "竞技",
    players: "2-6 人",
    duration: "20 分钟",
    description:
      "实际上，公开演讲很有趣。玩家会看到他们从未见过的图片幻灯片和他们从未写过的单词。演讲从来没这么奇怪过，也没这么有趣过。",
    playUrl: "https://orango.ing",
  },
  {
    id: "ortris",
    titleZh: "橘子方块",
    titleEn: "Ortris",
    type: "竞技",
    players: "2-8 人",
    duration: "20 分钟",
    description:
      "这是一段介绍。这是一段介绍。这是一段介绍。这是一段介绍。这是一段介绍。这是一段介绍。这是一段介绍。",
    playUrl: "https://orango.ing",
  },
  {
    id: "orange-court",
    titleZh: "橘子法庭",
    titleEn: "Orange Court",
    type: "派对",
    players: "4-8 人",
    duration: "30 分钟",
    description:
      "扮演法官、律师或证人，在荒诞案件中辩论与投票。规则简单，戏剧效果拉满。",
    playUrl: "https://orango.ing",
  },
] as const;

export const commonAssets = {
  frameTop: frameTop,
  frameBottom: frameBottom,
}

export const goWithTheCrowAssets = {
  backCrowBody: gwtcBackCrowBody,
  frontFeet: gwtcFrontFeet,
} as const;

export const OrtrisAssets = {
  blockOrange: obBlockOrange,
  blockRed: obBlockRed,
  blockGreen: obBlockGreen,
  blockBlue: obBlockBlue,
  midGrid: obMidGrid,
  midScreenBlocks: obMidScreenBlocks,
} as const;
