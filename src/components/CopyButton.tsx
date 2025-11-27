interface Props {
  onClick: () => void;
  tooltip: string;
}

const CopyButton = ({ onClick, tooltip }: Props) => {
  return (
    <div className="copyButton">
      <div className="tooltip">
        <button onClick={onClick}>Copy Text</button>
        <span className="tooltiptext">{tooltip}</span>
      </div>
    </div>
  );
};

export default CopyButton;
