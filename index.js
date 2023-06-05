let score = 0;
let wicket = 0;
let ballWiseRes = [];
let showBall = [];
let hit = 0;
let inputRef = React.createRef();

function addscore(num) {
  hit = num;
  rootElement.render(<App />);
}

function addWicket() {
  hit = "W";
  console.log(hit);
  rootElement.render(<App />);
}

function reset() {
  wicket = 0;
  score = 0;
  ballWiseRes = [];
  showBall = [];
  hit = 0;
  rootElement.render(<App />);
}

const ScoreButtons = () => (
  <>
    <div>
      <button className="btn btn-primary mx-2" onClick={() => addscore(0)} disabled={wicket === 10}>
        0
      </button>
      <button className="btn btn-primary mx-2" onClick={() => addscore(1)} disabled={wicket === 10}>
        1
      </button>
      <button className="btn btn-primary mx-2" onClick={() => addscore(2)} disabled={wicket === 10}>
        2
      </button>
      <button className="btn btn-primary mx-2" onClick={() => addscore(3)} disabled={wicket === 10}>
        3
      </button>
      <button className="btn btn-primary mx-2" onClick={() => addscore(4)} disabled={wicket === 10}>
        4
      </button>
      <button className="btn btn-primary mx-2" onClick={() => addscore(5)} disabled={wicket === 10}>
        5
      </button>
      <button className="btn btn-primary mx-2" onClick={() => addscore(6)} disabled={wicket === 10}>
        6
      </button>
      <button className="btn btn-primary mx-2" onClick={addWicket}>
        Wicket
      </button>
    </div>
    <div>
      <button className="btn btn-primary my-3" onClick={reset}>
        Reset Score Card
      </button>
    </div>
  </>
);

const Result = () => {
  if (showBall.length > 36) {
    alert("Last 36 balls will be shown");
    showBall = []; // Resetting the array to an empty array
  }

  return (
    <div>
      <h2>Last 36 Balls</h2>
      {showBall.map((item, index) => (
        <>
          {index % 6 === 0 ? <br /> : null}
          <span key={index}>
            {item === 0 ? (
              <strong>.</strong>
            ) : item === "W" ? (
              <strong style={{ color: "red" }}>W</strong>
            ) : (
              item
            )}
          </span>
          &nbsp;&nbsp;
        </>
      ))}
    </div>
  );
};

function hnadleSumbit(event) {
  event.preventDefault();
  if (wicket >= 10) {
    alert("All Out!");
  } else {
    ballWiseRes.unshift(
      <span>
        {`${hit}, ${inputRef.current.value}`}
      </span>
    );
  }

  if (hit === "W" && wicket < 10) {
    wicket++;
    showBall.unshift("W");
  } else if (wicket < 10) {
    score += hit;
    showBall.unshift(hit);
  }
  hit = 0;
  inputRef.current.value = "";
  console.log(inputRef.current.value);
  rootElement.render(<App />);
}

const Form = () => {
  return (
    <>
      <form action="" onSubmit={hnadleSumbit}>
        <input value={hit} disabled className="mx-2"/>
        <input type="text" ref={inputRef} placeholder="Add a comment" className=" mx-2" />
        <button type="submit" className="btn btn-primary mx-2" >Submit</button>
      </form>
    </>
  );
};

const App = () => (
  <>
    <h1>SCORE KEEPER</h1>
    <h2>SCORE: {score}/{wicket}</h2>
    <ScoreButtons />
    <Result />
    <br />
    <Form />
    <hr />
    <h1>Commentary</h1>
    {ballWiseRes.map((res, index) => (
      <p key={index}>{res}</p>
    ))}
  </>
);

const rootElement = ReactDOM.createRoot(document.getElementById("root"));
rootElement.render(<App />);
