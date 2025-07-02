import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingIndicator from "@/components/LoadingIndicator";
// import { resultsData } from "@/assets/data/resultsData-20250520";
import { resultsData } from "@/assets/data/resultsData-20250702";
import { imagesResultsData } from "@/assets/data/imagesResultsData";
import { imagesLandmarksData } from "@/assets/data/imagesLandmarksData";
import { resultsSets } from "@/assets/data/typesData";
import BaseButton from "@/components/BaseButton";
import { Collapse, Switch, Typography, Input } from "antd";
import { SwapOutlined } from "@ant-design/icons";
import { showSwal } from "@/utils/notification";
import { getResultsRecord, postUserRecord } from "@/services/formService";

const groupByCategory = (features) => {
  const grouped = {};
  Object.values(resultsSets).forEach((arr) => {
    arr.forEach((item) => {
      grouped[item.title] = {};
    });
  });

  for (const [key, value] of Object.entries(features)) {
    for (const [, arr] of Object.entries(resultsSets)) {
      arr.forEach((item) => {
        if (item.options && item.options.some((opt) => opt.value === key)) {
          grouped[item.title][key] = value;
        }
      });
    }
  }
  return grouped;
};

const Results = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageId, setCurrentImageId] = useState(0);
  const [activeKeys, setActiveKeys] = useState(
    Object.keys(groupByCategory(resultsData[0]?.value || {}))
  );
  const [features, setFeatures] = useState(resultsData[0]?.value || {});
  // console.log(features);
  const [diffPercent, setDiffPercent] = useState(0);
  const [isShowLandmarks, setIsShowLandmarks] = useState(false);
  const navigate = useNavigate();
  const grouped = groupByCategory(features);
  // console.log(grouped);

  useEffect(() => {
    const username = localStorage.getItem("userName");
    getResultsRecord().then((data) => {
      const userRecords = data.filter((record) => record.username === username);
      if (userRecords.length > 0) {
        // 取得所有不同的 imageId
        const uniqueImageIds = Array.from(
          new Set(userRecords.map((record) => record.imageId))
        );
        setCurrentImageId(uniqueImageIds.length);
        setFeatures(resultsData[uniqueImageIds.length]?.value || {});

        // 加上全部完成的判斷
        if (uniqueImageIds.length === imagesResultsData.length) {
          showSwal({
            isSuccess: true,
            title: `Congrats! You have done all the tests!`,
          });
          navigate("/login");
        }
      }
      setIsLoading(false);
    });
  }, []);

  const getDiffCount = (a, b) => {
    let changed = 0;
    const allKeys = new Set([...Object.keys(a), ...Object.keys(b)]);
    allKeys.forEach((key) => {
      if (a[key] !== b[key]) changed += 1;
    });
    return { changed, total: allKeys.size };
  };

  const handleSwitchChange = (category, key) => (checked) => {
    setFeatures((prev) => {
      const newFeatures = { ...prev, [key]: checked };
      // 取得原本 features（中文 key）
      const originalFeatures = resultsData[currentImageId]?.value || {};
      const diff = getDiffCount(newFeatures, originalFeatures);
      setDiffPercent(
        Number(
          diff.total > 0 ? ((diff.changed / diff.total) * 100).toFixed(1) : 0
        )
      );
      return newFeatures;
    });
  };

  const handlePrevImage = () => {
    setIsLoading(true);
    setCurrentImageId((prevIndex) =>
      prevIndex === 0 ? imagesResultsData.length - 1 : prevIndex - 1
    );

    const username = localStorage.getItem("userName");
    getResultsRecord().then((data) => {
      const userRecords = data.filter((record) => record.username === username);

      // 取得目前 currentImageId（已經 setCurrentImageId，但這裡還是舊值，所以要自己算）
      const prevId =
        currentImageId === 0
          ? imagesResultsData.length - 1
          : currentImageId - 1;

      // 過濾出該 currentImageId 的所有紀錄
      const recordsForImage = userRecords.filter(
        (record) => record.imageId === imagesResultsData[prevId].imageId
      );

      if (recordsForImage.length > 0) {
        const lastRecord = recordsForImage[recordsForImage.length - 1];
        console.log(lastRecord);
        setDiffPercent(lastRecord.diffPercent);
        setFeatures(lastRecord || {});
      }
      setIsLoading(false);
    });
  };

  const handleNextImage = async () => {
    setIsLoading(true);
    if (currentImageId <= imagesResultsData.length - 1) {
      const userRecordReq = {
        ...features,
        imageId: imagesResultsData[currentImageId].imageId,
        username: localStorage.getItem("userName"),
        diffPercent: diffPercent,
        sheetName: "RESULTS",
      };
      // console.log(userRecordReq);

      try {
        await postUserRecord(userRecordReq);
      } catch (error) {
        console.error("送出紀錄失敗", error);
      }

      setDiffPercent(0);

      if (currentImageId >= imagesResultsData.length - 1) {
        showSwal({
          isSuccess: true,
          title: `Congrats! You have done all the tests!`,
        });
        navigate("/login");
      } else {
        // 切換到下一張時，重設 features 為下一筆資料
        const nextId = currentImageId + 1;
        setCurrentImageId(nextId);

        // 查詢遠端資料庫有沒有下一張的資料
        const username = localStorage.getItem("userName");
        const data = await getResultsRecord();
        const userRecords = data.filter(
          (record) => record.username === username
        );
        const recordsForNextImage = userRecords.filter(
          (record) => record.imageId === imagesResultsData[nextId].imageId
        );

        if (recordsForNextImage.length > 0) {
          const lastRecord =
            recordsForNextImage[recordsForNextImage.length - 1];
          setDiffPercent(lastRecord.diffPercent);
          setFeatures(lastRecord || {});
        } else {
          setFeatures(resultsData[nextId]?.value || {});
        }

        // 展開全部
        setActiveKeys(
          Object.keys(groupByCategory(resultsData[nextId]?.value || {}))
        );
      }
    }
    setIsLoading(false);
  };

  const collapseItems = Object.entries(grouped).map(([category, items]) => {
    // 取得原本的項目
    const entries = Object.entries(items);

    // 定義每個分類的「無法辨識」key
    // let unknownLabel = "";
    // if (category === "眉毛") unknownLabel = "眉毛無法辨識";
    // else if (category === "眼睛") unknownLabel = "眼睛無法辨識";
    // else if (category === "鼻子") unknownLabel = "鼻子無法辨識";
    // else if (category === "嘴巴") unknownLabel = "嘴巴無法辨識";
    // else if (category === "下巴") unknownLabel = "下巴無法辨識";
    // else if (category === "五行臉主") unknownLabel = "五行臉主無法辨識";
    // else if (category === "五行臉輔") unknownLabel = "五行臉輔無法辨識";
    // 只在 entries 裡沒有這個 key 時才 push
    // if (unknownLabel && !entries.some(([key]) => key === unknownLabel)) {
    //   entries.push([unknownLabel, features[unknownLabel] || false]);
    // }

    // 取得該分類的註解選項
    let annotationOption;
    for (const arr of Object.values(resultsSets)) {
      for (const item of arr) {
        if (item.title === category && item.options) {
          annotationOption = item.options.find((opt) =>
            opt.title.includes("註解")
          );
        }
      }
    }

    // 建立英中對照表(僅顯示用)
    const valueToTitleMap = {};
    Object.values(resultsSets).forEach((arr) => {
      arr.forEach((item) => {
        if (item.options) {
          item.options.forEach((opt) => {
            valueToTitleMap[opt.value] = opt.title;
          });
        }
      });
    });

    // 兩兩一組分組
    const filteredEntries = entries.filter(
      ([key]) =>
        !key.includes("註解") && !key.toLowerCase().includes("annotation")
    );
    const specialKeys = [
      "browsLong",
      "browsShort",
      "browsPressEyes",
      "eyesDroopInner",
      "eyesRoundInner",
    ];
    const pairs = [];
    let temp = [];

    filteredEntries.forEach(([key, value]) => {
      if (specialKeys.includes(key)) {
        // 這三個 key 各自一組
        pairs.push([[key, value]]);
      } else {
        temp.push([key, value]);
        if (temp.length === 2) {
          pairs.push([...temp]);
          temp = [];
        }
      }
    });
    // 若 temp 還有剩，補進 pairs
    if (temp.length > 0) {
      pairs.push([...temp]);
    }

    return {
      key: category,
      label: category,
      children: (
        <div className="flex flex-wrap">
          {pairs.map((pair, idx) => (
            <div key={idx} className="flex w-full mb-2 border rounded-lg">
              {pair.map(([key, value]) => (
                <div
                  key={key}
                  className="p-8 h-12 w-1/2 flex justify-between items-center"
                >
                  <Typography.Text>
                    {valueToTitleMap[key] || key}
                  </Typography.Text>
                  <Switch
                    checked={value}
                    onChange={handleSwitchChange(category, key)}
                    // onChange={
                    //   key.endsWith("無法辨識")
                    //     ? (checked) =>
                    //         setFeatures((prev) => ({
                    //           ...prev,
                    //           [key]: checked,
                    //         }))
                    //     : handleSwitchChange(category, key)
                    // }
                  />
                </div>
              ))}
            </div>
          ))}
          {annotationOption && (
            <div className="p-8 h-12 w-full flex justify-between items-center">
              <Input
                placeholder={`請輸入${annotationOption.title}`}
                value={features[annotationOption.value] || ""}
                onChange={(e) =>
                  setFeatures((prev) => ({
                    ...prev,
                    [annotationOption.value]: e.target.value,
                  }))
                }
                size="middle"
              />
            </div>
          )}
        </div>
      ),
    };
  });

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <div className="space-x-4 p-4 w-full flex items-center justify-end">
        <h2>
          {imagesResultsData[currentImageId].sequenceId} /{" "}
          {imagesResultsData.length}
        </h2>
        {/* <h2 className="w-[300px] flex justify-end text-sm text-gray-500">
          更改率 {diffPercent}%
        </h2> */}
        <BaseButton onClick={() => setIsShowLandmarks((prev) => !prev)}>
          <SwapOutlined />
        </BaseButton>
      </div>
      <div className="pb-4 w-[300px] h-[300px] overflow-hidden flex justify-center items-center">
        {!isShowLandmarks ? (
          <img
            className="w-full h-full object-cover rounded-xl"
            key={imagesResultsData[currentImageId].sequenceId}
            src={imagesResultsData[currentImageId].imageUrl}
            alt="image"
          />
        ) : (
          <img
            className="w-full h-full object-cover rounded-xl"
            key={imagesLandmarksData[currentImageId].sequenceId}
            src={imagesLandmarksData[currentImageId].imageUrl}
            alt="image"
          />
        )}
      </div>
      {/* <div className="pb-4 w-[300px] h-[300px] overflow-hidden flex justify-center items-center">
        <img
          className="w-full h-full object-cover rounded-xl"
          key={imagesLandmarksData[currentImageId].sequenceId}
          src={imagesLandmarksData[currentImageId].imageUrl}
          alt="image"
        />
      </div> */}
      {resultsData && (
        <Collapse
          items={collapseItems}
          // defaultActiveKey={collapseItems.map((item) => item.key)} // 預設全部展開
          activeKey={activeKeys}
          onChange={setActiveKeys}
          className="w-full"
        />
      )}
      <div className="p-4 space-x-4 flex justify-center items-center">
        <BaseButton
          label="上一張"
          onClick={handlePrevImage}
          disabled={currentImageId === 0}
        />
        <BaseButton
          label={`${
            currentImageId === imagesResultsData.length - 1 ? "完成" : "下一張"
          }`}
          onClick={handleNextImage}
        />
      </div>
    </>
  );
};

export default Results;
