const images = import.meta.glob("@/assets/images-result/*.{jpg,JPG,Jpg}", {
  eager: true,
});
// 將鍵值排序，確保按照數字順序排列
export const imagesResultsData = Object.keys(images)
  .sort((a, b) => {
    // 提取檔案名稱中的數字部分進行比較
    const numA = parseInt(a.match(/(\d+)\.jpg$/)[1], 10);
    const numB = parseInt(b.match(/(\d+)\.jpg$/)[1], 10);
    return numA - numB;
  })
  .map((key, index) => {
    // console.log(key, index);
    return {
      imageId: parseInt(key.match(/(\d+)\.jpg$/)[1], 10),
      imageUrl: key,
      sequenceId: index + 1,
      // imageUrl: images[key].default, //這裡要用 `.default` 才會得到圖片的 `src`
    };
  });
