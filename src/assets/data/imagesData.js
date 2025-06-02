// Get-ChildItem *.JPG | Rename-Item -NewName { $_.Name.ToLower() } terminal執行檔名全小寫

const images = import.meta.glob("@/assets/images-tests/*.{jpg,JPG,Jpg,png}", {
  eager: true,
});

const imageKeyReg = /(\d+).*?\.(jpg|png)$/i;

// 將鍵值排序，確保按照數字順序排列
export const imagesData = Object.keys(images)
  .filter((key) => imageKeyReg.test(key))
  .sort((a, b) => {
    const matchA = a.match(imageKeyReg);
    const matchB = b.match(imageKeyReg);
    const numA = matchA ? parseInt(matchA[1], 10) : 0;
    const numB = matchB ? parseInt(matchB[1], 10) : 0;
    return numA - numB;
  })
  .map((key, index) => {
    // console.log(key, index);
    const match = key.match(imageKeyReg);
    return {
      // imageId: parseInt(key.match(/(\d+)\.(jpg|png)$/)[1], 10),
      imageId: match ? parseInt(match[1], 10) : null,
      // imageUrl: key,
      sequenceId: index + 1,
      imageUrl: images[key].default, //這裡要用 `.default` 才會得到圖片的 `src`
    };
  });
