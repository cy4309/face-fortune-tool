import { useState } from "react";
// import { getImagesUrl } from "@/services/formService";
import LoadingIndicator from "@/components/LoadingIndicator";
import { imagesData } from "@/assets/data/imagesData";
import { categorySets } from "@/assets/data/typesData";
import BaseButton from "@/components/BaseButton";
import { Select } from "antd";
import { showSwal } from "@/utils/notification";
import { useNavigate } from "react-router-dom";

const Home = () => {
  // const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();
  const { Option } = Select;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedValues, setSelectedValues] = useState({
    eyes: categorySets.eyes[0].title,
    eyebrows: categorySets.eyebrows[0].title,
    nose: categorySets.nose[0].title,
    chin: categorySets.chin[0].title,
    face: categorySets.face[0].title,
  });

  const handleNextImage = () => {
    console.log("Selected values:", selectedValues); //準備把這個資料送到後端
    if (
      selectedValues.eyes === categorySets.eyes[0].title ||
      selectedValues.eyebrows === categorySets.eyebrows[0].title ||
      selectedValues.nose === categorySets.nose[0].title ||
      selectedValues.chin === categorySets.chin[0].title ||
      selectedValues.face === categorySets.face[0].title
    ) {
      showSwal({ isSuccess: false, title: "Please select all options." });
      return;
    }

    if (currentImageIndex === imagesData.length - 1) {
      showSwal({ isSuccess: true, title: "Congrats! Your score is 100." });
      navigate("/login");
    } else {
      setSelectedValues({
        eyes: categorySets.eyes[0].title,
        eyebrows: categorySets.eyebrows[0].title,
        nose: categorySets.nose[0].title,
        chin: categorySets.chin[0].title,
        face: categorySets.face[0].title,
      });
      setCurrentImageIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? imagesData.length - 1 : prevIndex - 1
    );
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

  if (imagesData.length === 0) {
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
        {renderSelect("face", categorySets.face[0])}
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
