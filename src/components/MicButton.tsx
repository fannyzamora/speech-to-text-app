import { Icon } from "@iconify/react";
import microphone from "@iconify/icons-mdi/microphone";

interface Props {
  onClick: () => void;
}

const MicButton = ({ onClick }: Props) => {
  return (
    <button className="micButton" onClick={onClick}>
      <Icon icon={microphone} className="micIcon" />
    </button>
  );
};

export default MicButton;
