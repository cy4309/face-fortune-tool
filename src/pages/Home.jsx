import { Card } from "antd";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { Meta } = Card;
  const navigate = useNavigate();
  return (
    <>
      <div className="container p-4 text-center">
        <Card className="my-4" onClick={() => navigate(`/form/eyes`)}>
          <Meta title="眼睛" description="0/100" />
        </Card>
        <Card className="my-4" onClick={() => navigate(`/form/eyebrows`)}>
          <Meta title="眉毛" description="0/100" />
        </Card>
        <Card className="my-4" onClick={() => navigate(`/form/nose`)}>
          <Meta title="鼻子" description="0/100" />
        </Card>
        <Card className="my-4" onClick={() => navigate(`/form/chin`)}>
          <Meta title="下巴" description="0/100" />
        </Card>
        <Card className="my-4" onClick={() => navigate(`/form/face`)}>
          <Meta title="五行臉" description="0/100" />
        </Card>
      </div>
    </>
  );
};

export default Home;
