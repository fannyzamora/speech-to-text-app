interface Props {
  title: string;
}

const Title = ({ title }: Props) => {
  return (
    <div className="appTitle">
      <h1>{title}</h1>
    </div>
  );
};

export default Title;
