import { useEffect, useState } from "react";
import { resultsData } from "@/assets/data/resultsData-20250520";
import { imagesResultsData } from "@/assets/data/imagesResultsData";
import BaseButton from "@/components/BaseButton";
import { Collapse, Switch, Typography } from "antd";

const groupByCategory = (features) => {
  const grouped = {
    眉毛: {},
    眼睛: {},
    鼻子: {},
    嘴巴: {},
    嘴唇: {},
    五行臉: {},
  };
  for (const [key, value] of Object.entries(features)) {
    if (key.includes("眉")) grouped["眉毛"][key] = value;
    else if (key.includes("眼")) grouped["眼睛"][key] = value;
    else if (key.includes("鼻")) grouped["鼻子"][key] = value;
    else if (key.includes("嘴") && !key.includes("唇"))
      grouped["嘴巴"][key] = value;
    else if (key.includes("唇")) grouped["嘴唇"][key] = value;
    else grouped["其他"][key] = value;
  }

  return grouped;
};

const Results = () => {
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

  const handleNextImage = () => {
    if (currentImageId < imagesResultsData.length - 1) {
      setCurrentImageId((prev) => prev + 1);
      // 展開全部
      setActiveKeys(
        Object.keys(
          groupByCategory(resultsData[currentImageId + 1]?.value || {})
        )
      );
    }
  };

  const collapseItems = Object.entries(grouped).map(([category, items]) => ({
    key: category,
    label: category,
    children: (
      <>
        {Object.entries(items).map(([key, value]) => (
          <div
            key={key}
            className="p-8 w-1/2 h-12 flex justify-between items-center"
          >
            <Typography.Text>{key}</Typography.Text>
            <Switch
              checked={value}
              onChange={handleSwitchChange(category, key)}
            />
          </div>
        ))}
      </>
    ),
  }));

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
