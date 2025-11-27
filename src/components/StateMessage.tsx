interface Props {
  state: string;
}

const StateMessage = ({ state }: Props) => {
  return (
    <div>
      <p className="stateMessage">
        <i>{state}</i>
      </p>
    </div>
  );
};

export default StateMessage;
