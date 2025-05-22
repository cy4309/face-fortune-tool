import { useState, useEffect } from "react";
import LoadingIndicator from "@/components/LoadingIndicator";
import { imagesData } from "@/assets/data/imagesData";
import { categorySets } from "@/assets/data/typesData";
import BaseButton from "@/components/BaseButton";
import { Select } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { showSwal } from "@/utils/notification";
import { useNavigate } from "react-router-dom";
import { getUserRecord, postUserRecord } from "@/services/formService";

const Home = () => {
  const navigate = useNavigate();
  const { Option } = Select;
  const [showMain, setShowMain] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageId, setCurrentImageId] = useState(0);
  console.log(`currentImageId: ${currentImageId}`);
  // const [currentShowId, setCurrentShowId] = useState(0);
  const [selectedValues, setSelectedValues] = useState({
    eyebrows: categorySets.eyebrows[0].title,
    eyes: categorySets.eyes[0].title,
    nose: categorySets.nose[0].title,
    mouth: categorySets.mouth[0].title,
    chin: categorySets.chin[0].title,
    faceMain: categorySets.faceMain[0].title,
    faceSub: categorySets.faceSub[0].title,
  });

  // useEffect(() => {
  //   if (currentImageIndex > imagesData.length) {
  //     showSwal({
  //       isSuccess: true,
  //       title: "您已完成！",
  //     });
  //     setIsLoading(false);
  //     return;
  //   }
  //   const username = localStorage.getItem("userName");
  //   getUserRecord().then((data) => {
  //     console.log(data);
  //     const userRecords = data.filter((record) => record.username === username);
  //     if (userRecords.length > 0) {
  //       setCurrentImageIndex(data[data.length - 1].imageId);
  //     }
  //     setIsLoading(false);
  //   });
  // }, []);

  useEffect(() => {
    const username = localStorage.getItem("userName");
    getUserRecord().then((data) => {
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
        if (uniqueImageIds === imagesData.length) {
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

  const handlePrevImage = () => {
    setIsLoading(true);
    setCurrentImageId((prevIndex) =>
      prevIndex === 0 ? imagesData.length - 1 : prevIndex - 1
    );

    const username = localStorage.getItem("userName");
    getUserRecord().then((data) => {
      console.log(data);
      const userRecords = data.filter((record) => record.username === username);

      // 取得目前 currentImageId（已經 setCurrentImageId，但這裡還是舊值，所以要自己算）
      const prevId =
        currentImageId === 0 ? imagesData.length - 1 : currentImageId - 1;

      // 過濾出該 currentImageId 的所有紀錄
      const recordsForImage = userRecords.filter(
        (record) => record.imageId === imagesData[prevId].imageId
      );

      if (recordsForImage.length > 0) {
        const lastRecord = recordsForImage[recordsForImage.length - 1];
        setSelectedValues({
          eyebrows: lastRecord.eyebrows,
          eyes: lastRecord.eyes,
          nose: lastRecord.nose,
          mouth: lastRecord.mouth,
          chin: lastRecord.chin,
          faceMain: lastRecord.faceMain,
          faceSub: lastRecord.faceSub,
        });
      }
      setIsLoading(false);
    });
  };

  const handleNextImage = async () => {
    setIsLoading(true);

    // console.log("Selected values:", selectedValues);
    if (
      selectedValues.eyebrows === categorySets.eyebrows[0].title ||
      selectedValues.eyes === categorySets.eyes[0].title ||
      selectedValues.nose === categorySets.nose[0].title ||
      selectedValues.mouth === categorySets.mouth[0].title ||
      selectedValues.chin === categorySets.chin[0].title ||
      selectedValues.faceMain === categorySets.faceMain[0].title ||
      selectedValues.faceSub === categorySets.faceSub[0].title
    ) {
      showSwal({ isSuccess: false, title: "Please select all options." });
      return;
    }
    const userRecodeReq = {
      ...selectedValues,
      imageId: imagesData[currentImageId].imageId,
      username: localStorage.getItem("userName"),
    };
    console.log(userRecodeReq);
    await postUserRecord(userRecodeReq);
    // postUserRecord(userRecodeReq).then((data) => {
    //   console.log(data);
    // });

    // setSelectedValues({
    //   eyebrows: categorySets.eyebrows[0].title,
    //   eyes: categorySets.eyes[0].title,
    //   nose: categorySets.nose[0].title,
    //   mouth: categorySets.mouth[0].title,
    //   chin: categorySets.chin[0].title,
    //   faceMain: categorySets.faceMain[0].title,
    //   faceSub: categorySets.faceSub[0].title,
    // });
    if (currentImageId === imagesData.length - 1) {
      showSwal({
        isSuccess: true,
        title: `Congrats! You have done all the tests!`,
        // title: `Congrats! Your score is ${imagesData.length}.`,
      });
      navigate("/login");
    } else {
      // setCurrentImageId((prevIndex) => prevIndex + 1);
      const nextId = currentImageId + 1;
      setCurrentImageId(nextId);

      // 查詢資料庫有沒有下一張的紀錄
      const username = localStorage.getItem("userName");
      const userRecords = await getUserRecord();
      const recordsForNextImage = userRecords.filter(
        (record) =>
          record.username === username &&
          record.imageId === imagesData[nextId].imageId
      );
      if (recordsForNextImage.length > 0) {
        // 取最後一筆
        const lastRecord = recordsForNextImage[recordsForNextImage.length - 1];
        setSelectedValues({
          eyebrows: lastRecord.eyebrows,
          eyes: lastRecord.eyes,
          nose: lastRecord.nose,
          mouth: lastRecord.mouth,
          chin: lastRecord.chin,
          faceMain: lastRecord.faceMain,
          faceSub: lastRecord.faceSub,
        });
      } else {
        // 沒有就用預設值
        setSelectedValues({
          eyebrows: categorySets.eyebrows[0].title,
          eyes: categorySets.eyes[0].title,
          nose: categorySets.nose[0].title,
          mouth: categorySets.mouth[0].title,
          chin: categorySets.chin[0].title,
          faceMain: categorySets.faceMain[0].title,
          faceSub: categorySets.faceSub[0].title,
        });
      }
      setIsLoading(false);
    }
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

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (!showMain) {
    return (
      <div className="w-full h-full space-y-6 mt-6 flex flex-col items-center justify-center">
        <BaseButton onClick={() => setShowMain(true)}>
          開始測驗
          <CaretRightOutlined />
        </BaseButton>
        <BaseButton onClick={() => navigate("/results")}>
          看AI結果
          <CaretRightOutlined />
        </BaseButton>
      </div>
    );
  }

  return (
    <>
      <h2 className="w-[300px] flex justify-end">
        {imagesData[currentImageId].sequenceId} / {imagesData.length}
      </h2>
      <div className="pb-4 w-[300px] h-[300px] overflow-hidden flex justify-center items-center">
        <img
          className="w-full h-full object-cover rounded-xl"
          key={imagesData[currentImageId].sequenceId}
          src={imagesData[currentImageId].imageUrl}
          alt="image"
        />
      </div>

      <div className="w-full flex flex-col justify-center items-center space-y-4 text-center">
        {renderSelect("eyebrows", categorySets.eyebrows[0])}
        {renderSelect("eyes", categorySets.eyes[0])}
        {renderSelect("nose", categorySets.nose[0])}
        {renderSelect("mouth", categorySets.mouth[0])}
        {renderSelect("chin", categorySets.chin[0])}
        {renderSelect("faceMain", categorySets.faceMain[0])}
        {renderSelect("faceSub", categorySets.faceSub[0])}
      </div>

      <div className="flex justify-center items-center p-4 space-x-4">
        <BaseButton
          label="上一張"
          onClick={handlePrevImage}
          disabled={currentImageId === 0}
        />
        <BaseButton
          label={`${
            currentImageId === imagesData.length - 1 ? "完成" : "下一張"
          }`}
          onClick={handleNextImage}
          // className="bg-primary"
        />
      </div>
    </>
  );
};

export default Home;
