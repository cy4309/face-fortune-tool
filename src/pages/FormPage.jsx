import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { getImagesUrl } from "@/services/formService";
import LoadingIndicator from "@/components/LoadingIndicator";
import { imagesData } from "@/assets/data/imagesData";
import { categorySets } from "@/assets/data/typesData";

const FormPage = () => {
  const { title } = useParams();
  const [categories, setCategories] = useState([]);
  // const [answers, setAnswers] = useState([]);

  useEffect(() => {
    if (title in categorySets) {
      setCategories(categorySets[title]);
    }
  }, [title]);

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
    <div>
      {imagesData.map((url) => (
        <img key={url.id} src={url.imageUrl} alt="image" />
      ))}
      {categories.map((question, index) => (
        <div key={index}>
          <label>{question.title}</label>
          {question.options.map((option, optIndex) => (
            <div key={optIndex}>
              <input
                type="radio"
                name={title}
                value={option.value}
                // onChange={e => handleChange(index, e.target.value)}
              />
              <label>{option.title}</label>
            </div>
          ))}
        </div>
      ))}
      {/* <button onClick={handleSubmit}>提交</button> */}
    </div>
  );
};

export default FormPage;
