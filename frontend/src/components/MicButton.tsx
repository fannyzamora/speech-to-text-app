import { Icon } from "@iconify/react";
import microphone from "@iconify/icons-mdi/microphone";
import microphoneSettings from "@iconify/icons-mdi/microphone-settings";

interface Props {
  onClick: () => void;
  recordingState: boolean;
}

const MicButton = ({ onClick, recordingState }: Props) => {
  return (
    <button
      className={recordingState ? "micButton active" : "micButton"}
      onClick={onClick}
    >
      <Icon
        icon={recordingState ? microphoneSettings : microphone}
        className="micIcon"
      />
    </button>
  );
};

export default MicButton;
