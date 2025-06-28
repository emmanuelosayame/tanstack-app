export function Fallback() {
  return (
    <div style={{height: '100%'}}>
      <style>
        {`
        .parent {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          grid-template-rows: repeat(5, 1fr);
          grid-column-gap: 0px;
          grid-row-gap: 0px;
          height: 100%;

          padding: 2rem;
          justify-items: center;
          align-items: center;
        }

        .div1 {
          grid-area: 3 / 3 / 4 / 4;
          height: 40px;
          width: 40px;
          display: inline-grid;
          place-items: center;
          & img {
            height: 100%;
            width: 100%;
            animation: spin 1s linear infinite;
          }
        }

        .div2 {
          grid-area: 5 / 3 / 6 / 4;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
          `}
      </style>
      <div className="parent">
        <span className="div1">
          <img
            src="https://d3ki9tyy5l5ruj.cloudfront.net/obj/38193453c0386e2c22076395d1992519115b4e2c/sp.png"
            alt=""
          />
        </span>
        <svg
          className="div2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 36 36"
          width="28"
          height="28"
        >
          <g data-name="Layer 2">
            <path
              d="M34.434 0a2.41 2.41 0 0 1 1.337 2.408v9.639c0 1.638-.639 2.3-2.241 2.313H19.963c-1.507 0-2.241-.662-2.254-2.097V2.011a8 8 0 0 1 .18-1.072l1.097-.941Z"
              style={{fill: '#014ef0'}}
            />
            <path
              d="M17.879 1c-.314.217-.76.373-.914.688Q12.869 9.459 8.82 17.254c-.675 1.3-1.327 2.615-1.988 3.915a9 9 0 0 1-1.507-.085A7.36 7.36 0 0 1 0 16.109V5.072A7.71 7.71 0 0 1 4.469.446 7 7 0 0 0 5.301 0h12.361a2.5 2.5 0 0 0-.18.724c.013.095.253.18.397.278ZM6.854 21.457a13 13 0 0 1 5.675 1.868 11.48 11.48 0 0 1 5.314 9.783c0 .77.167 1.53.253 2.29v.386l-11.06.167c-1.579 0-3.168.095-4.735 0A9 9 0 0 1 0 35.096V22.289a8.4 8.4 0 0 1 2.074-.711c1.543-.131 3.194-.095 4.784-.121Z"
              style={{fill: '#013fbf'}}
            />
            <path
              d="M6.854 21.457c-1.589 0-3.194 0-4.82.121A9 9 0 0 0 0 22.289V16.11a7.38 7.38 0 0 0 5.337 4.976 9 9 0 0 0 1.494.085Z"
              style={{fill: '#eaeff9'}}
            />
            <path
              d="M18.072 35.783v-.386c1.625-3.155 3.241-6.326 4.879-9.494 1.832-3.518 3.686-7.012 5.495-10.543a.953.953 0 0 1 1.205-.626c2.831.397 5.53 2.543 5.819 5.396a52.5 52.5 0 0 1 0 10.205 6.53 6.53 0 0 1-6.362 5.579c-3.554.121-7.133 0-10.7 0-.085.036-.217-.072-.338-.131Z"
              style={{fill: '#024ff0'}}
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
