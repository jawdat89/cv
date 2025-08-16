// src/components/LoadingSpinner.tsx

/**
 * LoadingSpinner component that displays an animated loading spinner.
 *
 * This spinner is used throughout the application to indicate that content is loading.
 * The animation consists of squares that change color to provide a visual indication of loading.
 *
 * @returns {JSX.Element} - The rendered LoadingSpinner component.
 */

export default function LoadingSpinner(): JSX.Element {
  return (
    <div className="flex justify-center items-center h-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        width="205"
        height="205"
        style={{
          shapeRendering: "auto",
          display: "block",
          background: "rgb(255, 255, 255)",
        }}
      >
        <g>
          <rect fill="#3fd2c7" height="25" width="25" y="9.5" x="9.5">
            <animate
              calcMode="discrete"
              begin="0s"
              repeatCount="indefinite"
              dur="1.3157894736842106s"
              keyTimes="0;0.125;1"
              values="#99ddff;#3fd2c7;#3fd2c7"
              attributeName="fill"
            ></animate>
          </rect>
          <rect fill="#3fd2c7" height="25" width="25" y="9.5" x="37.5">
            <animate
              calcMode="discrete"
              begin="0.16447368421052633s"
              repeatCount="indefinite"
              dur="1.3157894736842106s"
              keyTimes="0;0.125;1"
              values="#99ddff;#3fd2c7;#3fd2c7"
              attributeName="fill"
            ></animate>
          </rect>
          <rect fill="#3fd2c7" height="25" width="25" y="9.5" x="65.5">
            <animate
              calcMode="discrete"
              begin="0.32894736842105265s"
              repeatCount="indefinite"
              dur="1.3157894736842106s"
              keyTimes="0;0.125;1"
              values="#99ddff;#3fd2c7;#3fd2c7"
              attributeName="fill"
            ></animate>
          </rect>
          <rect fill="#3fd2c7" height="25" width="25" y="37.5" x="9.5">
            <animate
              calcMode="discrete"
              begin="1.1513157894736843s"
              repeatCount="indefinite"
              dur="1.3157894736842106s"
              keyTimes="0;0.125;1"
              values="#99ddff;#3fd2c7;#3fd2c7"
              attributeName="fill"
            ></animate>
          </rect>
          <rect fill="#3fd2c7" height="25" width="25" y="37.5" x="65.5">
            <animate
              calcMode="discrete"
              begin="0.4934210526315789s"
              repeatCount="indefinite"
              dur="1.3157894736842106s"
              keyTimes="0;0.125;1"
              values="#99ddff;#3fd2c7;#3fd2c7"
              attributeName="fill"
            ></animate>
          </rect>
          <rect fill="#3fd2c7" height="25" width="25" y="65.5" x="9.5">
            <animate
              calcMode="discrete"
              begin="0.9868421052631579s"
              repeatCount="indefinite"
              dur="1.3157894736842106s"
              keyTimes="0;0.125;1"
              values="#99ddff;#3fd2c7;#3fd2c7"
              attributeName="fill"
            ></animate>
          </rect>
          <rect fill="#3fd2c7" height="25" width="25" y="65.5" x="37.5">
            <animate
              calcMode="discrete"
              begin="0.8223684210526315s"
              repeatCount="indefinite"
              dur="1.3157894736842106s"
              keyTimes="0;0.125;1"
              values="#99ddff;#3fd2c7;#3fd2c7"
              attributeName="fill"
            ></animate>
          </rect>
          <rect fill="#3fd2c7" height="25" width="25" y="65.5" x="65.5">
            <animate
              calcMode="discrete"
              begin="0.6578947368421053s"
              repeatCount="indefinite"
              dur="1.3157894736842106s"
              keyTimes="0;0.125;1"
              values="#99ddff;#3fd2c7;#3fd2c7"
              attributeName="fill"
            ></animate>
          </rect>
          <g></g>
        </g>
      </svg>
    </div>
  );
}
