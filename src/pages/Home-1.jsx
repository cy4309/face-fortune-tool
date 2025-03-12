// 這裡待做上一張資訊自動帶入的功能

import { useState, useEffect } from "react";
import LoadingIndicator from "@/components/LoadingIndicator";
import { imagesData } from "@/assets/data/imagesData";
import { categorySets } from "@/assets/data/typesData";
import BaseButton from "@/components/BaseButton";
import { Select } from "antd";
import { showSwal } from "@/utils/notification";
import { useNavigate } from "react-router-dom";
import { getUserRecord, postUserRecord } from "@/services/formService";

const Home = () => {
  // const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();
  const { Option } = Select;
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  console.log(currentImageIndex);
  const [userRecords, setUserRecords] = useState([]);
  console.log(userRecords);
  const username = localStorage.getItem("userName");
  const defaultValues = {
    eyes: categorySets.eyes[0].title,
    eyebrows: categorySets.eyebrows[0].title,
    nose: categorySets.nose[0].title,
    chin: categorySets.chin[0].title,
    faceMain: categorySets.faceMain[0].title,
    faceSub: categorySets.faceSub[0].title,
  };
  const [selectedValues, setSelectedValues] = useState(defaultValues);

  useEffect(() => {
    getUserRecord().then((data) => {
      console.log(data);
      const userData = data.filter((record) => record.username === username);
      setUserRecords(userData);

      if (userData.length > 0) {
        const lastRecord = userData[userData.length - 1];
        console.log(lastRecord);
        setCurrentImageIndex(lastRecord.imageId);
        setSelectedValues({
          eyes: lastRecord.eyes || defaultValues.eyes,
          eyebrows: lastRecord.eyebrows || defaultValues.eyebrows,
          nose: lastRecord.nose || defaultValues.nose,
          chin: lastRecord.chin || defaultValues.chin,
          faceMain: lastRecord.faceMain || defaultValues.faceMain,
          faceSub: lastRecord.faceSub || defaultValues.faceSub,
        });
      }
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    updateSelectedValues(currentImageIndex);
  }, [currentImageIndex, userRecords]);

  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      const newImageId = currentImageIndex;
      console.log(newImageId);
      setCurrentImageIndex(newImageId);
      // updateSelectedValues(newImageId);
    }
  };

  const handleNextImage = () => {
    if (
      Object.values(selectedValues).some(
        (value) => value === defaultValues.eyes
      )
    ) {
      showSwal({ isSuccess: false, title: "Please select all options." });
      return;
    }

    const newImageId = currentImageIndex + 1;
    const userRecordReq = { ...selectedValues, imageId: newImageId, username };

    postUserRecord(userRecordReq).then(() => {
      setUserRecords((prevRecords) => [...prevRecords, userRecordReq]);
    });

    if (newImageId === imagesData.length) {
      showSwal({ isSuccess: true, title: "Congrats! Your score is 100." });
      navigate("/login");
    } else {
      setCurrentImageIndex(newImageId);
      // updateSelectedValues(newImageId);
    }
  };

  const updateSelectedValues = (imageId) => {
    const foundRecord = userRecords.find(
      (record) => record.imageId === imageId && record.username === username
    );
    setSelectedValues(foundRecord || defaultValues);
  };

  const handleSelectChange = (name, value) => {
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const renderSelect = (name, category) => (
    <Select
      name={name}
      className="w-2/3 h-10"
      defaultValue={category.title}
      value={selectedValues[name]}
      onChange={(value) => handleSelectChange(name, value)}
    >
      {category.options.map((option, index) => (
        <Option key={index} value={option.value}>
          {option.title}
        </Option>
      ))}
    </Select>
  );

  // useEffect(() => {
  //   getImagesUrl().then((data) => {
  //     console.log(data);
  //   });
  // }, []);

  // useEffect(() => {
  //   // 假設從 API 取得上次紀錄
  //   fetch(`/getUserRecord/${title}`)
  //     .then((response) => {
  //       if (response.ok) {
  //         return response.json();
  //       }
  //       return [];
  //     })
  //     .then((data) => {
  //       setAnswers(data);
  //     });

  //   // 假設從 API 取得問題列表
  //   fetch(`/getQuestions/${title}`)
  //     .then((response) => {
  //       if (response.ok) {
  //         return response.json();
  //       }
  //       return [];
  //     })
  //     .then((data) => {
  //       setQuestions(data);
  //     });
  // }, [title]);

  // const handleSubmit = () => {
  //   // 提交表單資料到 Google Apps Script
  //   fetch(`/saveUserRecord/${title}`, {
  //     method: "POST",
  //     body: JSON.stringify(answers),
  //   });
  // };

  if (isLoading) {
    return <LoadingIndicator />;
  }
  return (
    <>
      <h2 className="w-[300px] flex justify-end">
        {imagesData[currentImageIndex].id} / {imagesData.length}
      </h2>
      <div className="pb-4 w-[300px] h-[300px] overflow-hidden flex justify-center items-center">
        <img
          className="w-full h-full object-cover rounded-xl"
          key={imagesData[currentImageIndex].id}
          src={imagesData[currentImageIndex].imageUrl}
          alt="image"
        />
      </div>

      <div className="w-full flex flex-col justify-center items-center space-y-4 text-center">
        {renderSelect("eyes", categorySets.eyes[0])}
        {renderSelect("eyebrows", categorySets.eyebrows[0])}
        {renderSelect("nose", categorySets.nose[0])}
        {renderSelect("chin", categorySets.chin[0])}
        {renderSelect("faceMain", categorySets.faceMain[0])}
        {renderSelect("faceSub", categorySets.faceSub[0])}
      </div>

      <div className="flex justify-center items-center p-4 space-x-4">
        <BaseButton
          label="上一張"
          onClick={handlePrevImage}
          disabled={currentImageIndex === 0}
        />
        <BaseButton
          label={`${
            currentImageIndex === imagesData.length - 1 ? "完成" : "下一張"
          }`}
          onClick={handleNextImage}
          // className="bg-primary"
        />
      </div>
    </>
  );
};

export default Home;
