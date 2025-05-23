export const categorySets = {
  eyebrows: [
    {
      title: "此眉毛最符合哪個敘述？",
      options: [
        // { title: "眉毛太近", value: "browsClose" },
        // { title: "眉毛太遠", value: "browsWide" },
        // { title: "眉毛高", value: "browsHigh" },
        // { title: "眉毛低", value: "browsLow" },
        { title: "一字眉", value: "browsStraight" },
        { title: "八字眉", value: "browsSplayed" },
        { title: "劍眉", value: "browsSword" },
        { title: "彎月眉", value: "browsCrescent" },
        { title: "標準眉", value: "browsStandard" },
        { title: "秀雅眉", value: "browsElegant" },
        { title: "豆眉", value: "browsBean" },
        { title: "雜亂眉", value: "browsMessy" },
        { title: "眉毛無法辨識", value: "browsUncertain" },
      ],
    },
  ],
  eyes: [
    {
      title: "此眼睛最符合哪個敘述？",
      options: [
        // { title: "眼睛大", value: "eyesBig" },
        // { title: "眼睛小", value: "eyesSmall" },
        // { title: "眼睛圓", value: "eyesRound" },
        // { title: "眼睛長", value: "eyesLong" },
        // { title: "眼頭彎", value: "innerCanthusCurved" },
        // { title: "眼頭圓", value: "innerCanthusRound" },
        // { title: "大小眼", value: "eyesUneven" },
        { title: "上斜眼", value: "eyesUpturned" },
        { title: "下斜眼", value: "eyesDownturned" },
        { title: "丹鳳眼", value: "eyesPhoenix" },
        { title: "杏眼", value: "eyesAlmond" },
        { title: "細長眼", value: "eyesSlender" },
        { title: "銅鈴眼", value: "eyesRound" },
        { title: "眼睛無法辨識", value: "eyesUncertain" },
      ],
    },
  ],
  nose: [
    {
      title: "此鼻子最符合哪個敘述？",
      options: [
        // { title: "鼻頭大", value: "noseTipBig" },
        // { title: "鼻頭小", value: "noseTipSmall" },
        { title: "塌梁鼻", value: "noseFlatBridge" },
        { title: "希臘鼻", value: "noseGreek" },
        { title: "朝天鼻", value: "noseUptilted" },
        { title: "獅子鼻", value: "noseLion" },
        { title: "肉鼻子", value: "noseFleshy" },
        { title: "鷹鈎鼻", value: "noseHooked" },
        { title: "鼻子無法辨識", value: "noseUncertain" },
      ],
    },
  ],
  mouth: [
    {
      title: "此嘴巴最符合哪個敘述？",
      options: [
        { title: "弓口唇", value: "mouthBow" },
        { title: "標準唇", value: "mouthStandard" },
        { title: "櫻桃口", value: "mouthCherry" },
        { title: "薄唇", value: "mouthThin" },
        { title: "虎口唇", value: "mouthTiger" },
        { title: "覆口唇", value: "mouthOverlapping" },
        { title: "嘴巴無法辨識", value: "mouthUncertain" },
      ],
    },
  ],
  chin: [
    {
      title: "此下巴最符合哪個敘述？",
      options: [
        { title: "下巴圓", value: "chinRound" },
        { title: "下巴寬", value: "chinWide" },
        { title: "下巴窄", value: "chinNarrow" },
        { title: "下巴無法辨識", value: "chinUncertain" },
      ],
    },
  ],
  faceMain: [
    {
      title: "此五行臉(主)最符合哪個敘述？",
      options: [
        { title: "金", value: "metal" },
        { title: "木", value: "wood" },
        { title: "水", value: "water" },
        { title: "火", value: "fire" },
        { title: "土", value: "earth" },
        { title: "五行臉主無法辨識", value: "faceMainUncertain" },
      ],
    },
  ],
  faceSub: [
    {
      title: "此五行臉(輔)最符合哪個敘述？",
      options: [
        { title: "金", value: "metal" },
        { title: "木", value: "wood" },
        { title: "水", value: "water" },
        { title: "火", value: "fire" },
        { title: "土", value: "earth" },
        { title: "五行臉輔無法辨識", value: "faceSubUncertain" },
      ],
    },
  ],
};

export const resultsSets = {
  eyebrows: [
    {
      title: "眉毛",
      options: [
        { title: "眉毛長", value: "browsLong" },
        { title: "眉毛短", value: "browsShort" },
        { title: "眉毛上揚", value: "browsRise" },
        { title: "眉毛下垂", value: "browsDroop" },
        { title: "眉毛太近", value: "browsClose" },
        { title: "眉毛太遠", value: "browsWide" },
        { title: "眉毛高", value: "browsHigh" },
        { title: "眉毛低", value: "browsLow" },
        { title: "眉壓眼", value: "browsPressEyes" },
        { title: "眉毛無法辨識", value: "browsUncertain" },
      ],
    },
  ],
  eyes: [
    {
      title: "眼睛",
      options: [
        { title: "眼睛大", value: "eyesBig" },
        { title: "眼睛小", value: "eyesSmall" },
        { title: "眼睛圓", value: "eyesRound" },
        { title: "眼睛長", value: "eyesLong" },
        { title: "眼頭垂", value: "eyesDroopInner" },
        { title: "眼頭圓", value: "eyesRoundInner" },
        { title: "眼睛無法辨識", value: "eyesUncertain" },
      ],
    },
  ],
  // nose: [
  //   {
  //     title: "鼻子",
  //     options: [
  //       { title: "鼻翼寬", value: "noseWide" },
  //       { title: "鼻翼窄", value: "noseNarrow" },
  //       { title: "鼻子無法辨識", value: "noseUncertain" },
  //     ],
  //   },
  // ],
  // mouth: [
  //   {
  //     title: "嘴巴",
  //     options: [
  //       { title: "嘴巴寬", value: "mouthWide" },
  //       { title: "嘴巴窄", value: "mouthNarrow" },
  //       { title: "厚唇", value: "mouthThick" },
  //       { title: "薄唇", value: "mouthThin" },
  //       { title: "嘴巴無法辨識", value: "mouthUncertain" },
  //     ],
  //   },
  // ],
  // chin: [
  //   {
  //     title: "下巴",
  //     options: [],
  //   },
  // ],
  // faceMain: [
  //   {
  //     title: "五行臉主",
  //     options: [],
  //   },
  // ],
  // faceSub: [
  //   {
  //     title: "五行臉輔",
  //     options: [],
  //   },
  // ],
};
