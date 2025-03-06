import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getImagesUrl } from "@/services/formService";
import LoadingIndicator from "@/components/LoadingIndicator";

const FormPage = () => {
  const { title } = useParams();
  const [categories, setCategories] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  // const [answers, setAnswers] = useState([]);

  const categorySets = {
    eyes: [
      {
        title: "此眼睛最符合哪個敘述？",
        options: [
          { title: "明眼", value: "brightEyes" },
          { title: "秀眼", value: "delicateEyes" },
          { title: "圓眼", value: "roundEyes" },
          { title: "長眼", value: "longEyes" },
        ],
      },
    ],
    eyebrows: [
      {
        title: "此眉毛最符合哪個敘述？",
        options: [
          { title: "眉近", value: "closeEyebrows" },
          { title: "印堂開", value: "wideGlabella" },
          { title: "眉高", value: "highEyebrows" },
          { title: "眉伏", value: "lowEyebrows" },
        ],
      },
    ],
    nose: [
      {
        title: "此鼻子最符合哪個敘述？",
        options: [
          { title: "鼻頭大", value: "bigNoseTip" },
          { title: "鼻頭小", value: "smallNoseTip" },
        ],
      },
    ],
    chin: [
      {
        title: "此下巴最符合哪個敘述？",
        options: [
          { title: "地閣潤", value: "smoothChin" },
          { title: "地閣闊", value: "wideChin" },
          { title: "地閣秀", value: "delicateChin" },
        ],
      },
    ],
    face: [
      {
        title: "此五行臉最符合哪個敘述？",
        options: [
          { title: "金", value: "metal" },
          { title: "木", value: "wood" },
          { title: "水", value: "water" },
          { title: "火", value: "fire" },
          { title: "土", value: "earth" },
        ],
      },
    ],
  };

  useEffect(() => {
    if (title in categorySets) {
      setCategories(categorySets[title]);
    }
  }, [title]);

  useEffect(() => {
    getImagesUrl().then((data) => {
      console.log(data);
      setImageUrls(data);
    });
  }, []);

  const convertGoogleDriveUrl = (url) => {
    // 將 Google Drive 圖片網址轉換成直接顯示圖片的網址
    const match = url.match(/\/d\/(.*?)\//);
    return match ? `https://lh3.googleusercontent.com/d/${match[1]}` : url;
  };

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

  if (imageUrls.length === 0) {
    return <LoadingIndicator />;
  }
  return (
    <div>
      {imageUrls.map((url) => (
        <img
          key={url.id}
          src={convertGoogleDriveUrl(url.imageUrl)}
          alt="image"
        />
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
