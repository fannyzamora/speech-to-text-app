interface Props {
  onClick: () => void;
}

const CopyButton = ({ onClick }: Props) => {
  return (
    <div className="tooltip copyButton">
      <button onClick={onClick}>Copy Text</button>
    </div>
  );
};

export default CopyButton;
