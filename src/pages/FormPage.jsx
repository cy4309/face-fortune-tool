import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const FormPage = () => {
  const { title } = useParams();
  const [categories, setCategories] = useState([]);
  // const [answers, setAnswers] = useState([]);

  const categorySets = {
    eyes: ["此眼睛最符合哪個敘述？"],
    eyebrows: [
      {
        title: "此眉毛最符合哪個敘述？",
        options: [
          { title: "A", value: "A" },
          { title: "B", value: "B" },
          { title: "C", value: "C" },
          { title: "D", value: "D" },
        ],
      },
    ],
    nose: ["此鼻子最符合哪個敘述？"],
    chin: ["此下巴最符合哪個敘述？"],
    face: ["此五行臉最符合哪個敘述？"],
  };

  useEffect(() => {
    if (title in categorySets) {
      setCategories(categorySets[title]);
    }
  }, [title]);

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

  return (
    <div>
      {categories.map((question, index) => (
        <div key={index}>
          <label>{question}</label>
          {/* <input
            className="border border-gray-300 rounded-md"
            type="radio"
            value={answers[index] || ""}
            onChange={(e) => handleChange(index, e.target.value)}
          /> */}
        </div>
      ))}
      {/* <button onClick={handleSubmit}>提交</button> */}
    </div>
  );
};

export default FormPage;
