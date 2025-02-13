import { type FC } from "react";
import ReadingWritingModule from "./ReadandWrite/ReadandWrite";
import { useParams } from "react-router-dom";

const TestScreen: FC = () => {
  const { id } = useParams();
  return (
    <div className="p-4">
      <ReadingWritingModule testId={id ?? "1"} />
    </div>
  );
};

export default TestScreen;
