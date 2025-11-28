interface Props {
  transcript: string;
}

const Transcript = ({ transcript }: Props) => {
  return (
    <div className="transcriptBox">
      <p>{transcript}</p>
    </div>
  );
};

export default Transcript;
