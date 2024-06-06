const View = () => {
  return (
    <>
      <div
        style={{
          width: "100px",
          height: "40px",
          border: "1px solid #C3C3C3",
          borderRadius: "5px",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          background: "white",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="14"
          viewBox="0 0 16 14"
          fill="none"
        >
          <path
            d="M1 0C0.44 0 0 0.44 0 1C0 1.56 0.44 2 1 2C1.56 2 2 1.56 2 1C2 0.44 1.56 0 1 0ZM4 0V2H16V0H4ZM1 4C0.44 4 0 4.44 0 5C0 5.56 0.44 6 1 6C1.56 6 2 5.56 2 5C2 4.44 1.56 4 1 4ZM4 4V6H16V4H4ZM1 8C0.44 8 0 8.44 0 9C0 9.56 0.44 10 1 10C1.56 10 2 9.56 2 9C2 8.44 1.56 8 1 8ZM4 8V10H16V8H4ZM1 12C0.44 12 0 12.44 0 13C0 13.56 0.44 14 1 14C1.56 14 2 13.56 2 13C2 12.44 1.56 12 1 12ZM4 12V14H16V12H4Z"
            fill="black"
          />
        </svg>
        <div
          style={{
            padding: "2px",
            backgroundColor: "#EAEAEA",
            borderRadius: "5px",
            border: "1px solid #E2E2E2",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M2.74976 2.74976V10.0831H10.0831V2.74976H2.74976ZM8.24976 8.24976H4.58309V4.58309H8.24976V8.24976ZM2.74976 11.9164V19.2498H10.0831V11.9164H2.74976ZM8.24976 17.4164H4.58309V13.7498H8.24976V17.4164ZM11.9164 2.74976V10.0831H19.2498V2.74976H11.9164ZM17.4164 8.24976H13.7498V4.58309H17.4164V8.24976ZM11.9164 11.9164V19.2498H19.2498V11.9164H11.9164ZM17.4164 17.4164H13.7498V13.7498H17.4164V17.4164Z"
              fill="black"
            />
          </svg>
        </div>
      </div>
    </>
  );
};

export default View;
