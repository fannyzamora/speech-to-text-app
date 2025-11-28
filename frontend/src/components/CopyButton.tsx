interface Props {
  onClick: () => void;
  tooltip: string;
  name: string;
}

const CopyButton = ({ onClick, tooltip, name }: Props) => {
  return (
    <div className="button">
      <div className="tooltip">
        <button onClick={onClick}>{name}</button>
        <span className="tooltiptext">{tooltip}</span>
      </div>
    </div>
  );
};

export default CopyButton;
