import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingIndicator from "@/components/LoadingIndicator";
import { resultsData } from "@/assets/data/resultsData-20250520";
import { imagesResultsData } from "@/assets/data/imagesResultsData";
import { resultsSets } from "@/assets/data/typesData";
import BaseButton from "@/components/BaseButton";
import { Collapse, Switch, Typography } from "antd";
import { showSwal } from "@/utils/notification";
import { getResultsRecord, postUserRecord } from "@/services/formService";

const groupByCategory = (features) => {
  const grouped = {};
  Object.values(resultsSets).forEach((arr) => {
    arr.forEach((item) => {
      grouped[item.title] = {};
    });
  });

  // for (const [key, value] of Object.entries(features)) {
  //   if (key.includes("眉")) grouped["眉毛"][key] = value;
  //   else if (key.includes("眼")) grouped["眼睛"][key] = value;
  //   else if (key.includes("鼻")) grouped["鼻子"][key] = value;
  //   else if (key.includes("嘴") || key.includes("唇"))
  //     grouped["嘴巴"][key] = value;
  //   else if (key.includes("下巴")) grouped["下巴"][key] = value;
  //   // else grouped["其他"][key] = value;
  // }

  for (const [key, value] of Object.entries(features)) {
    for (const [category, arr] of Object.entries(resultsSets)) {
      arr.forEach((item) => {
        if (item.options && item.options.some((opt) => opt.title === key)) {
          grouped[item.title][key] = value;
        }
      });
    }
  }

  return grouped;
};

const Results = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageId, setCurrentImageId] = useState(0);
  const [activeKeys, setActiveKeys] = useState(
    Object.keys(groupByCategory(resultsData[0]?.value || {}))
  );
  const [features, setFeatures] = useState(resultsData[0]?.value || {});
  console.log(features);
  const grouped = groupByCategory(features);

  useEffect(() => {
    console.log("resultsData", resultsData);
    console.log("imagesResultsData", imagesResultsData);
  }, []);

  useEffect(() => {
    const username = localStorage.getItem("userName");
    getResultsRecord().then((data) => {
      console.log(data);
      const userRecords = data.filter((record) => record.username === username);
      if (userRecords.length > 0) {
        // setCurrentImageId(data[data.length - 1].imageId);
        // 取得所有不同的 imageId
        const uniqueImageIds = Array.from(
          new Set(userRecords.map((record) => record.imageId))
        );
        setCurrentImageId(uniqueImageIds.length);

        // 加上全部完成的判斷
        // if (data[data.length - 1].imageId === imagesData.length) {
        if (uniqueImageIds === imagesResultsData.length) {
          showSwal({
            isSuccess: true,
            title: `Congrats! You have done all the tests!`,
            // title: `Your score is ${data[data.length - 1].imageId} / ${
            //   imagesData.length
            // }！`,
          });
          navigate("/login");
        }
      }
      setIsLoading(false);
    });
  }, []);

  // 轉換 features 的 key（中文）為英文 value
  const convertFeaturesKeysToValue = (features) => {
    const keyMap = {};
    const allUncertain = [];

    Object.values(resultsSets).forEach((arr) => {
      arr.forEach((item) => {
        if (item.options) {
          item.options.forEach((opt) => {
            keyMap[opt.title] = opt.value;
            // 收集所有 uncertain 的英文 key
            if (opt.value && opt.value.toLowerCase().includes("uncertain")) {
              allUncertain.push(opt.value);
            }
          });
        }
      });
    });

    const result = {};
    for (const [key, value] of Object.entries(features)) {
      // 若有對應英文 value 就用英文，否則保留原本 key
      result[keyMap[key] || key] = value;
    }
    // 再補上所有未出現或非 true 的 uncertain，設為 false
    allUncertain.forEach((uncertainKey) => {
      if (result[uncertainKey] !== true) {
        result[uncertainKey] = false;
      }
    });

    return result;
  };

  const handleSwitchChange = (category, key) => (checked) => {
    setFeatures((prev) => ({
      ...prev,
      [key]: checked,
    }));
  };

  const handlePrevImage = () => {
    if (currentImageId > 0) {
      setCurrentImageId((prev) => prev - 1);
      // 展開全部
      setActiveKeys(
        Object.keys(
          groupByCategory(resultsData[currentImageId - 1]?.value || {})
        )
      );
    }
  };

  const handleNextImage = async () => {
    if (currentImageId < imagesResultsData.length - 1) {
      const convertedFeatures = convertFeaturesKeysToValue(features);
      const userRecodeReq = {
        ...convertedFeatures,
        imageId: imagesResultsData[currentImageId].imageId,
        username: localStorage.getItem("userName"),
        sheetName: "RESULTS",
      };
      console.log(userRecodeReq);

      try {
        await postUserRecord(userRecodeReq);
      } catch (error) {
        console.error("送出紀錄失敗", error);
      }

      if (currentImageId === imagesResultsData.length - 1) {
        showSwal({
          isSuccess: true,
          title: `Congrats! You have done all the tests!`,
        });
        navigate("/login");
      } else {
        // 切換到下一張時，重設 features 為下一筆資料
        // setCurrentImageId((prevIndex) => prevIndex + 1);
        const nextId = currentImageId + 1;
        setCurrentImageId(nextId);
        setFeatures(resultsData[nextId]?.value || {});
        // 展開全部
        setActiveKeys(
          Object.keys(groupByCategory(resultsData[nextId]?.value || {}))
        );
      }
    }
  };

  const collapseItems = Object.entries(grouped).map(([category, items]) => {
    // 取得原本的項目
    const entries = Object.entries(items);

    // 定義每個分類的「無法辨識」key
    let unknownLabel = "";
    if (category === "眉毛") unknownLabel = "眉毛無法辨識";
    else if (category === "眼睛") unknownLabel = "眼睛無法辨識";
    else if (category === "鼻子") unknownLabel = "鼻子無法辨識";
    else if (category === "嘴巴") unknownLabel = "嘴巴無法辨識";
    // else if (category === "下巴") unknownLabel = "下巴無法辨識";
    // else if (category === "五行臉主") unknownLabel = "五行臉主無法辨識";
    // else if (category === "五行臉輔") unknownLabel = "五行臉輔無法辨識";

    // 只在 entries 裡沒有這個 key 時才 push
    if (unknownLabel && !entries.some(([key]) => key === unknownLabel)) {
      entries.push([unknownLabel, features[unknownLabel] || false]);
    }

    return {
      key: category,
      label: category,
      children: (
        <>
          {/* {Object.entries(items).map(([key, value]) => ( */}
          {entries.map(([key, value]) => (
            <div
              key={key}
              className="p-8 w-1/2 h-12 flex justify-between items-center"
            >
              <Typography.Text>{key}</Typography.Text>
              <Switch
                checked={value}
                onChange={
                  key.endsWith("無法辨識")
                    ? (checked) =>
                        setFeatures((prev) => ({
                          ...prev,
                          [key]: checked,
                        }))
                    : handleSwitchChange(category, key)
                }
              />
            </div>
          ))}
        </>
      ),
    };
  });

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <h2 className="w-[300px] flex justify-end">
        {imagesResultsData[currentImageId].sequenceId} /{" "}
        {imagesResultsData.length}
      </h2>
      <div className="pb-4 w-[300px] h-[300px] overflow-hidden flex justify-center items-center">
        <img
          className="w-full h-full object-cover rounded-xl"
          key={imagesResultsData[currentImageId].sequenceId}
          src={imagesResultsData[currentImageId].imageUrl}
          alt="image"
        />
      </div>
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
